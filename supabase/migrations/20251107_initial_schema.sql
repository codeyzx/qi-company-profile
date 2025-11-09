-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- =============================================
-- ADMIN USERS TABLE
-- =============================================
CREATE TABLE admin_users (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    email TEXT UNIQUE NOT NULL,
    full_name TEXT,
    avatar_url TEXT,
    role TEXT DEFAULT 'admin' CHECK (role IN ('admin', 'super_admin')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- SITE CONFIG TABLE (Multi-language)
-- =============================================
CREATE TABLE site_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    key TEXT UNIQUE NOT NULL,
    value_id TEXT,
    value_en TEXT,
    description TEXT,
    status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published')),
    version INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    updated_by UUID REFERENCES admin_users(id)
);

-- =============================================
-- HERO CONTENT TABLE (Multi-language)
-- =============================================
CREATE TABLE hero_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_id TEXT NOT NULL,
    title_en TEXT NOT NULL,
    subtitle_id TEXT,
    subtitle_en TEXT,
    description_id TEXT NOT NULL,
    description_en TEXT NOT NULL,
    badge_text_id TEXT,
    badge_text_en TEXT,
    cta_primary_text_id TEXT,
    cta_primary_text_en TEXT,
    cta_primary_url TEXT,
    cta_secondary_text_id TEXT,
    cta_secondary_text_en TEXT,
    cta_secondary_url TEXT,
    stats JSONB DEFAULT '[]',
    -- Array of {label_id, label_en, value}
    status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published')),
    version INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    updated_by UUID REFERENCES admin_users(id)
);

-- =============================================
-- NEWS ARTICLES TABLE (Multi-language with SEO)
-- =============================================
CREATE TABLE news_articles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_id TEXT NOT NULL,
    title_en TEXT NOT NULL,
    slug_id TEXT UNIQUE NOT NULL,
    slug_en TEXT UNIQUE NOT NULL,
    excerpt_id TEXT NOT NULL,
    excerpt_en TEXT NOT NULL,
    content_id TEXT NOT NULL,
    content_en TEXT NOT NULL,
    thumbnail_url TEXT,
    category_id TEXT,
    category_en TEXT,
    author_id UUID REFERENCES admin_users(id),
    read_time INTEGER,
    -- in minutes
    published_date TIMESTAMPTZ,
    scheduled_publish_at TIMESTAMPTZ,
    -- For auto-scheduling
    views_count INTEGER DEFAULT 0,
    -- SEO Metadata
    seo_meta_title_id TEXT,
    seo_meta_title_en TEXT,
    seo_meta_description_id TEXT,
    seo_meta_description_en TEXT,
    seo_og_image_url TEXT,
    seo_keywords TEXT [],
    -- Array of keywords
    status TEXT DEFAULT 'draft' CHECK (
        status IN ('draft', 'scheduled', 'published', 'archived')
    ),
    version INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    updated_by UUID REFERENCES admin_users(id)
);

CREATE INDEX idx_news_articles_status ON news_articles(status);

CREATE INDEX idx_news_articles_published_date ON news_articles(published_date DESC);

CREATE INDEX idx_news_articles_scheduled ON news_articles(scheduled_publish_at)
WHERE
    status = 'scheduled';

-- =============================================
-- GAME CATEGORIES TABLE (Multi-language)
-- =============================================
CREATE TABLE game_categories (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title_id TEXT NOT NULL,
    title_en TEXT NOT NULL,
    description_id TEXT NOT NULL,
    description_en TEXT NOT NULL,
    icon TEXT,
    -- lucide icon name
    badge_id TEXT,
    badge_en TEXT,
    count_text_id TEXT,
    count_text_en TEXT,
    gradient_from TEXT DEFAULT '#F5CB3B',
    gradient_to TEXT DEFAULT '#322F81',
    border_color TEXT,
    sort_order INTEGER DEFAULT 0,
    status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published')),
    version INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    updated_by UUID REFERENCES admin_users(id)
);

CREATE INDEX idx_game_categories_sort ON game_categories(sort_order ASC);

-- =============================================
-- ABOUT CONTENT TABLE (Multi-language)
-- =============================================
CREATE TABLE about_content (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    main_title_id TEXT NOT NULL,
    main_title_en TEXT NOT NULL,
    main_description_id TEXT NOT NULL,
    main_description_en TEXT NOT NULL,
    secondary_description_id TEXT,
    secondary_description_en TEXT,
    slogan_id TEXT,
    slogan_en TEXT,
    image_url TEXT,
    values
        JSONB DEFAULT '[]',
        -- Array of {icon, title_id, title_en, description_id, description_en}
        stats JSONB DEFAULT '[]',
        -- Array of {value, label_id, label_en, color}
        status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published')),
        version INTEGER DEFAULT 1,
        created_at TIMESTAMPTZ DEFAULT NOW(),
        updated_at TIMESTAMPTZ DEFAULT NOW(),
        updated_by UUID REFERENCES admin_users(id)
);

-- =============================================
-- CONTACT INFO TABLE (Multi-language)
-- =============================================
CREATE TABLE contact_info (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    emails TEXT [] DEFAULT ARRAY [] :: TEXT [],
    phone_numbers TEXT [] DEFAULT ARRAY [] :: TEXT [],
    social_links JSONB DEFAULT '{}',
    -- {instagram, youtube, tiktok, etc}
    operating_hours_id TEXT,
    operating_hours_en TEXT,
    address_id TEXT,
    address_en TEXT,
    status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published')),
    version INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    updated_by UUID REFERENCES admin_users(id)
);

-- =============================================
-- CONTENT VERSIONS TABLE (For all tables)
-- =============================================
CREATE TABLE content_versions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    table_name TEXT NOT NULL,
    record_id UUID NOT NULL,
    content_snapshot JSONB NOT NULL,
    version_number INTEGER NOT NULL,
    change_summary TEXT,
    created_by UUID REFERENCES admin_users(id),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_content_versions_record ON content_versions(table_name, record_id, version_number DESC);

-- =============================================
-- ACTIVITY LOG TABLE
-- =============================================
CREATE TABLE activity_log (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES admin_users(id),
    action TEXT NOT NULL,
    -- 'create', 'update', 'delete', 'publish', 'unpublish', 'restore'
    table_name TEXT NOT NULL,
    record_id UUID,
    details JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_activity_log_user ON activity_log(user_id, created_at DESC);

CREATE INDEX idx_activity_log_table ON activity_log(table_name, record_id);

-- =============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =============================================
-- Enable RLS on all tables
ALTER TABLE
    admin_users ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    site_config ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    hero_content ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    news_articles ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    game_categories ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    about_content ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    contact_info ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    content_versions ENABLE ROW LEVEL SECURITY;

ALTER TABLE
    activity_log ENABLE ROW LEVEL SECURITY;

-- Public can read published content
CREATE POLICY "Public can read published site_config" ON site_config FOR
SELECT
    USING (status = 'published');

CREATE POLICY "Public can read published hero_content" ON hero_content FOR
SELECT
    USING (status = 'published');

CREATE POLICY "Public can read published news_articles" ON news_articles FOR
SELECT
    USING (status = 'published');

CREATE POLICY "Public can read published game_categories" ON game_categories FOR
SELECT
    USING (status = 'published');

CREATE POLICY "Public can read published about_content" ON about_content FOR
SELECT
    USING (status = 'published');

CREATE POLICY "Public can read published contact_info" ON contact_info FOR
SELECT
    USING (status = 'published');

-- Authenticated admins can do everything
CREATE POLICY "Admins can manage site_config" ON site_config FOR ALL USING (
    auth.uid() IN (
        SELECT
            id
        FROM
            admin_users
    )
) WITH CHECK (
    auth.uid() IN (
        SELECT
            id
        FROM
            admin_users
    )
);

CREATE POLICY "Admins can manage hero_content" ON hero_content FOR ALL USING (
    auth.uid() IN (
        SELECT
            id
        FROM
            admin_users
    )
) WITH CHECK (
    auth.uid() IN (
        SELECT
            id
        FROM
            admin_users
    )
);

CREATE POLICY "Admins can manage news_articles" ON news_articles FOR ALL USING (
    auth.uid() IN (
        SELECT
            id
        FROM
            admin_users
    )
) WITH CHECK (
    auth.uid() IN (
        SELECT
            id
        FROM
            admin_users
    )
);

CREATE POLICY "Admins can manage game_categories" ON game_categories FOR ALL USING (
    auth.uid() IN (
        SELECT
            id
        FROM
            admin_users
    )
) WITH CHECK (
    auth.uid() IN (
        SELECT
            id
        FROM
            admin_users
    )
);

CREATE POLICY "Admins can manage about_content" ON about_content FOR ALL USING (
    auth.uid() IN (
        SELECT
            id
        FROM
            admin_users
    )
) WITH CHECK (
    auth.uid() IN (
        SELECT
            id
        FROM
            admin_users
    )
);

CREATE POLICY "Admins can manage contact_info" ON contact_info FOR ALL USING (
    auth.uid() IN (
        SELECT
            id
        FROM
            admin_users
    )
) WITH CHECK (
    auth.uid() IN (
        SELECT
            id
        FROM
            admin_users
    )
);

CREATE POLICY "Admins can read all versions" ON content_versions FOR
SELECT
    USING (
        auth.uid() IN (
            SELECT
                id
            FROM
                admin_users
        )
    );

CREATE POLICY "Admins can read activity log" ON activity_log FOR
SELECT
    USING (
        auth.uid() IN (
            SELECT
                id
            FROM
                admin_users
        )
    );

-- Allow insert during registration (before user is in admin_users table)
CREATE POLICY "Allow admin registration" ON admin_users FOR
INSERT
    WITH CHECK (true);

-- Allow admins to read all admin users
CREATE POLICY "Admins can read admin_users" ON admin_users FOR
SELECT
    USING (
        auth.uid() IN (
            SELECT
                id
            FROM
                admin_users
        )
    );

-- =============================================
-- FUNCTIONS AND TRIGGERS
-- =============================================
-- Function to update updated_at timestamp
CREATE
OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $ $ BEGIN NEW.updated_at = NOW();

RETURN NEW;

END;

$ $ LANGUAGE plpgsql;

-- Apply updated_at trigger to all relevant tables
CREATE TRIGGER update_site_config_updated_at BEFORE
UPDATE
    ON site_config FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_hero_content_updated_at BEFORE
UPDATE
    ON hero_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_news_articles_updated_at BEFORE
UPDATE
    ON news_articles FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_game_categories_updated_at BEFORE
UPDATE
    ON game_categories FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_about_content_updated_at BEFORE
UPDATE
    ON about_content FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_contact_info_updated_at BEFORE
UPDATE
    ON contact_info FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to auto-publish scheduled articles
CREATE
OR REPLACE FUNCTION auto_publish_scheduled_articles() RETURNS void AS $ $ BEGIN
UPDATE
    news_articles
SET
    status = 'published',
    published_date = NOW()
WHERE
    status = 'scheduled'
    AND scheduled_publish_at <= NOW();

END;

$ $ LANGUAGE plpgsql SECURITY DEFINER;

-- =============================================
-- STORAGE BUCKETS SETUP
-- =============================================
-- Create storage buckets (run these in Supabase Dashboard or via API)
-- INSERT INTO storage.buckets (id, name, public) VALUES ('article-images', 'article-images', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('game-thumbnails', 'game-thumbnails', true);
-- INSERT INTO storage.buckets (id, name, public) VALUES ('site-assets', 'site-assets', true);
-- Storage policies (to be created after buckets exist)
-- CREATE POLICY "Public can read article-images"
--     ON storage.objects FOR SELECT
--     USING (bucket_id = 'article-images');
-- CREATE POLICY "Admins can upload article-images"
--     ON storage.objects FOR INSERT
--     WITH CHECK (
--         bucket_id = 'article-images' 
--         AND auth.uid() IN (SELECT id FROM admin_users)
--     );
-- =============================================
-- SEED DATA (Initial content)
-- =============================================
-- Insert default hero content
INSERT INTO
    hero_content (
        title_id,
        title_en,
        description_id,
        description_en,
        badge_text_id,
        badge_text_en,
        cta_primary_text_id,
        cta_primary_text_en,
        cta_primary_url,
        cta_secondary_text_id,
        cta_secondary_text_en,
        cta_secondary_url,
        stats,
        status
    )
VALUES
    (
        'Jelajahi Dunia Game Bersama Kami',
        'Explore the Game Universe with Us',
        'Portal berita dan insight terbaru tentang game lokal dan global untuk gamer Indonesia',
        'Latest news and insights about local and global games for Indonesian gamers',
        'Portal Game Terkini untuk Gen Z',
        'Latest Gaming Portal for Gen Z',
        'Baca Berita Terbaru',
        'Read Latest News',
        '#berita',
        'Explore Game Populer',
        'Explore Popular Games',
        '#kategori',
        '[
        {"value": "500+", "label_id": "Artikel Game", "label_en": "Game Articles"},
        {"value": "100+", "label_id": "Game Reviews", "label_en": "Game Reviews"},
        {"value": "50K+", "label_id": "Pembaca Aktif", "label_en": "Active Readers"}
    ]',
        'published'
    );

-- Insert default contact info
INSERT INTO
    contact_info (
        emails,
        social_links,
        operating_hours_id,
        operating_hours_en,
        status
    )
VALUES
    (
        ARRAY ['hello@jelajahgame.com', 'support@jelajahgame.com'],
        '{"instagram": "https://instagram.com/jelajahgame", "youtube": "https://youtube.com/@jelajahgame", "tiktok": "https://tiktok.com/@jelajahgame"}',
        'Senin - Jumat: 09:00 - 18:00 WIB<br>Sabtu: 10:00 - 15:00 WIB<br>Minggu: Libur',
        'Monday - Friday: 09:00 - 18:00 WIB<br>Saturday: 10:00 - 15:00 WIB<br>Sunday: Closed',
        'published'
    );

-- Insert default site config
INSERT INTO
    site_config (key, value_id, value_en, status)
VALUES
    (
        'site_name',
        'Jelajah Game',
        'Jelajah Game',
        'published'
    ),
    (
        'site_slogan',
        'Explore the Game Universe.',
        'Explore the Game Universe.',
        'published'
    ),
    (
        'site_description_id',
        'Portal berita dan insight terbaru tentang game lokal dan global untuk gamer Indonesia',
        'Latest news and insights about local and global games for Indonesian gamers',
        'published'
    );

COMMENT ON TABLE admin_users IS 'Stores admin user information for CMS access';

COMMENT ON TABLE site_config IS 'Global site configuration with multi-language support';

COMMENT ON TABLE hero_content IS 'Hero section content with multi-language support';

COMMENT ON TABLE news_articles IS 'News articles with SEO metadata and multi-language support';

COMMENT ON TABLE game_categories IS 'Game category content with multi-language support';

COMMENT ON TABLE about_content IS 'About Us section content with multi-language support';

COMMENT ON TABLE contact_info IS 'Contact information with multi-language support';

COMMENT ON TABLE content_versions IS 'Version history for all content tables';

COMMENT ON TABLE activity_log IS 'Audit log for all admin actions';