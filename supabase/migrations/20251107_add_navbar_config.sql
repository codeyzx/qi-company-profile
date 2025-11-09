-- Add navbar configuration table for dynamic navigation
CREATE TABLE navbar_config (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    menu_items JSONB DEFAULT '[]',
    -- Array of {href, label_id, label_en, order}
    status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published')),
    version INTEGER DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    updated_by UUID REFERENCES admin_users(id)
);

-- Enable RLS
ALTER TABLE
    navbar_config ENABLE ROW LEVEL SECURITY;

-- Public can read published navbar config
CREATE POLICY "Public can read published navbar_config" ON navbar_config FOR
SELECT
    USING (status = 'published');

-- Admins can manage navbar config
CREATE POLICY "Admins can manage navbar_config" ON navbar_config FOR ALL USING (
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

-- Add updated_at trigger
CREATE TRIGGER update_navbar_config_updated_at BEFORE
UPDATE
    ON navbar_config FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Insert default navbar configuration
INSERT INTO
    navbar_config (menu_items, status)
VALUES
    (
        '[
        {"href": "#home", "label_id": "Home", "label_en": "Home", "order": 1},
        {"href": "#berita", "label_id": "Berita", "label_en": "News", "order": 2},
        {"href": "#kategori", "label_id": "Kategori", "label_en": "Categories", "order": 3},
        {"href": "#tentang", "label_id": "Tentang Kami", "label_en": "About Us", "order": 4},
        {"href": "#contact", "label_id": "Kontak", "label_en": "Contact", "order": 5}
    ]',
        'published'
    );

COMMENT ON TABLE navbar_config IS 'Configuration for dynamic navigation menu items';