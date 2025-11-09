# Supabase Setup Guide

## Prerequisites

- Supabase account (sign up at https://supabase.com)
- Project created in Supabase Dashboard

## Setup Steps

### 1. Create Supabase Project

1. Go to https://app.supabase.com
2. Click "New Project"
3. Fill in project details:
   - Name: `jelajah-game-cms`
   - Database Password: (generate strong password)
   - Region: Choose closest to your location

### 2. Get API Credentials

1. Go to Project Settings > API
2. Copy the following values to your `.env` file:
   - `PUBLIC_SUPABASE_URL`: Project URL
   - `PUBLIC_SUPABASE_ANON_KEY`: anon/public key
   - `SUPABASE_SERVICE_ROLE_KEY`: service_role key (for admin operations)

### 3. Run Database Migration

1. Go to SQL Editor in Supabase Dashboard
2. Copy the content from `migrations/20251107_initial_schema.sql`
3. Paste and execute the SQL

### 4. Create Storage Buckets

1. Go to Storage in Supabase Dashboard
2. Create three buckets:
   - `article-images` (Public bucket)
   - `game-thumbnails` (Public bucket)
   - `site-assets` (Public bucket)

For each bucket:

- Click "New bucket"
- Name it as above
- Set "Public bucket" to ON
- Click "Create bucket"

### 5. Setup Storage Policies

Go to each bucket > Policies and create:

**Read Policy (for all buckets)**:

```sql
CREATE POLICY "Public can read [bucket-name]"
ON storage.objects FOR SELECT
USING (bucket_id = '[bucket-name]');
```

**Upload Policy (for all buckets)**:

```sql
CREATE POLICY "Authenticated users can upload [bucket-name]"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = '[bucket-name]' AND auth.role() = 'authenticated');
```

**Delete Policy (for all buckets)**:

```sql
CREATE POLICY "Authenticated users can delete [bucket-name]"
ON storage.objects FOR DELETE
USING (bucket_id = '[bucket-name]' AND auth.role() = 'authenticated');
```

### 6. Create First Admin User

After setting up authentication in your app:

1. Register a user through the app
2. Go to SQL Editor and run:

```sql
INSERT INTO admin_users (id, email, full_name, role)
VALUES (
    'YOUR-AUTH-USER-ID',  -- Get this from Authentication > Users
    'your-email@example.com',
    'Your Name',
    'super_admin'
);
```

### 7. Setup Edge Function for Auto-Publishing (Optional)

Create a Supabase Edge Function to run scheduled publish:

1. Install Supabase CLI
2. Run:

```bash
supabase functions new auto-publish-articles
```

3. Add code to call `auto_publish_scheduled_articles()` function
4. Deploy and set up cron trigger

## Database Schema Overview

### Tables

- `admin_users`: Admin user management
- `site_config`: Global site configuration
- `hero_content`: Hero section content
- `news_articles`: News articles with SEO
- `game_categories`: Game category content
- `about_content`: About Us content
- `contact_info`: Contact information
- `content_versions`: Version history
- `activity_log`: Audit trail

### Key Features

- **Multi-language Support**: All content tables have `_id` and `_en` fields
- **Status Management**: draft, scheduled, published states
- **Version Control**: Automatic versioning on updates
- **SEO Fields**: Meta title, description, og:image for articles
- **Scheduled Publishing**: Auto-publish at specific datetime
- **Row Level Security**: Public can read published, admins can manage all

## Testing the Setup

Run this query to verify everything is set up:

```sql
SELECT 'admin_users' as table_name, COUNT(*) as count FROM admin_users
UNION ALL
SELECT 'hero_content', COUNT(*) FROM hero_content
UNION ALL
SELECT 'site_config', COUNT(*) FROM site_config
UNION ALL
SELECT 'contact_info', COUNT(*) FROM contact_info;
```

You should see:

- 0 admin_users (will be added after first registration)
- 1 hero_content
- 3 site_config
- 1 contact_info

## Troubleshooting

### RLS Errors

If you get permission errors:

1. Make sure your user is added to `admin_users` table
2. Check RLS policies are enabled
3. Verify your auth token is valid

### Storage Upload Fails

1. Check bucket policies are created
2. Verify bucket is set to public
3. Ensure user is authenticated

### Migration Fails

1. Check for syntax errors in SQL
2. Make sure you're using PostgreSQL 15+
3. Verify extensions are enabled

## Next Steps

- Configure `.env` file with your credentials
- Start the development server
- Register first admin user
- Begin adding content through CMS
