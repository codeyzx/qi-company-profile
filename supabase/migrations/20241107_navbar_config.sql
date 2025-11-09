-- Create navbar_config table for dynamic navigation menu
CREATE TABLE IF NOT EXISTS navbar_config (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    menu_items JSONB NOT NULL DEFAULT '[]' :: jsonb,
    status VARCHAR(20) NOT NULL DEFAULT 'published' CHECK (status IN ('draft', 'published')),
    version INTEGER NOT NULL DEFAULT 1,
    created_at TIMESTAMPTZ DEFAULT now(),
    updated_at TIMESTAMPTZ DEFAULT now(),
    updated_by UUID REFERENCES auth.users(id)
);

-- Create RLS policies
ALTER TABLE
    navbar_config ENABLE ROW LEVEL SECURITY;

-- Policy for reading navbar config (public access)
CREATE POLICY "Allow public read access to navbar_config" ON navbar_config FOR
SELECT
    USING (true);

-- Policy for admins to manage navbar config
CREATE POLICY "Allow admin users to manage navbar_config" ON navbar_config FOR ALL USING (
    EXISTS (
        SELECT
            1
        FROM
            admin_users
        WHERE
            admin_users.id = auth.uid()
    )
);

-- Insert default navbar configuration
INSERT INTO
    navbar_config (menu_items, status, updated_by)
VALUES
    (
        '[
        {"href": "#home", "label_id": "Home", "label_en": "Home", "order": 1},
        {"href": "#berita", "label_id": "Berita", "label_en": "News", "order": 2},
        {"href": "#kategori", "label_id": "Kategori", "label_en": "Categories", "order": 3},
        {"href": "#tentang", "label_id": "Tentang Kami", "label_en": "About Us", "order": 4},
        {"href": "#contact", "label_id": "Kontak", "label_en": "Contact", "order": 5}
    ]' :: jsonb,
        'published',
        NULL
    ) ON CONFLICT DO NOTHING;

-- Add trigger to update updated_at automatically
CREATE
OR REPLACE FUNCTION update_updated_at_column() RETURNS TRIGGER AS $ $ BEGIN NEW.updated_at = now();

RETURN NEW;

END;

$ $ language 'plpgsql';

CREATE TRIGGER update_navbar_config_updated_at BEFORE
UPDATE
    ON navbar_config FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();