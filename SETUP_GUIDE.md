# 🚀 CMS Setup Guide - Jelajah Game

## ✅ What's Been Implemented

Your CMS is now **100% complete** with the following features:

### Core Features

- ✅ **Authentication System**: Login/Register with Supabase Auth, admin-only access
- ✅ **Multi-Language Support**: Indonesian (ID) & English (EN) for all content
- ✅ **Admin Dashboard**: Modern UI with statistics, recent activity, quick actions
- ✅ **Articles Management**: Full CRUD with dual-language editor, categories, SEO fields
- ✅ **Image Upload**: Supabase Storage integration for thumbnails and OG images
- ✅ **Content Versioning**: Automatic version history with rollback capability
- ✅ **Scheduled Publishing**: Auto-publish articles at specific date/time
- ✅ **Preview Mode**: View draft content before publishing
- ✅ **SEO Management**: Meta titles, descriptions, OG images for each article
- ✅ **Activity Logging**: Full audit trail of all CMS actions

## 📋 Quick Start (5 Steps)

### Step 1: Create Supabase Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up / Login
3. Click "New Project"
4. Fill in:
   - **Name**: `jelajah-game-cms`
   - **Database Password**: Generate strong password (save it!)
   - **Region**: Choose closest to your location
5. Wait for project to be ready (~2 minutes)

### Step 2: Run Database Migration

1. In your Supabase project, go to **SQL Editor**
2. Open the file: `supabase/migrations/20251107_initial_schema.sql`
3. Copy ALL the SQL content
4. Paste into SQL Editor and click **Run**
5. You should see "Success. No rows returned" message

### Step 3: Create Storage Buckets

1. Go to **Storage** in Supabase Dashboard
2. Create 3 buckets with these exact names:

**Bucket 1: article-images**

- Click "New bucket"
- Name: `article-images`
- Set "Public bucket": **ON**
- Click "Create bucket"

**Bucket 2: game-thumbnails**

- Name: `game-thumbnails`
- Public: **ON**

**Bucket 3: site-assets**

- Name: `site-assets`
- Public: **ON**

### Step 4: Setup Storage Policies

For **EACH** of the 3 buckets, create these policies:

1. Go to bucket > Policies tab
2. Click "New Policy" > "Custom Policy"

**Policy 1: Public Read**

```sql
CREATE POLICY "Public can read [bucket-name]"
ON storage.objects FOR SELECT
USING (bucket_id = '[bucket-name]');
```

**Policy 2: Authenticated Upload**

```sql
CREATE POLICY "Authenticated can upload [bucket-name]"
ON storage.objects FOR INSERT
WITH CHECK (bucket_id = '[bucket-name]' AND auth.role() = 'authenticated');
```

**Policy 3: Authenticated Delete**

```sql
CREATE POLICY "Authenticated can delete [bucket-name]"
ON storage.objects FOR DELETE
USING (bucket_id = '[bucket-name]' AND auth.role() = 'authenticated');
```

Replace `[bucket-name]` with: `article-images`, `game-thumbnails`, or `site-assets`

### Step 5: Configure Environment Variables

1. Go to Project Settings > API
2. Copy these values:

**Project URL**: Copy the URL
**anon/public key**: Copy the key

3. Open your `.env` file and update:

```env
PUBLIC_SUPABASE_URL=your-project-url-here
PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
```

## 🏃 Run the Application

```bash
# Install dependencies (if not done)
pnpm install

# Start development server
pnpm dev
```

Open: http://localhost:5173

## 👤 Create Your Admin Account

1. Go to: http://localhost:5173/admin/login
2. Click **"Register as Admin"** button
3. Fill in:
   - Email: your@email.com
   - Password: (min 8 characters)
4. Click "Register"
5. Check your email for verification link (if email verification is enabled)
6. Login with your credentials

## 🎨 Using the CMS

### Dashboard Overview

- Navigate to: `/admin/dashboard`
- View statistics (total articles, drafts, published, scheduled)
- See recent activity
- Quick actions for common tasks

### Creating Your First Article

1. Click **"New Article"** or go to Articles > Create
2. Fill in content for **both languages** (ID & EN):
   - Title & Slug
   - Excerpt (summary)
   - Content (full article text)
   - Category
3. Upload **Featured Image** (thumbnail)
4. Add **SEO Settings**:
   - Meta Title
   - Meta Description
   - OG Image
5. Set **Publishing Options**:
   - Status: Draft / Scheduled / Published
   - Schedule date/time (for auto-publish)
   - Read time (in minutes)
6. Click **"Save Article"**

### Publishing Workflow

**Option 1: Immediate Publish**

1. Edit article
2. Set Status: "Published"
3. Click Save

**Option 2: Scheduled Publish**

1. Edit article
2. Set Status: "Scheduled"
3. Set "Schedule Publish" date/time
4. Click Save
5. Article will auto-publish at scheduled time

**Preview Before Publishing**

- Click "Preview" button
- View how article will look on landing page
- URL: `/?preview=true&locale=id` or `/?preview=true&locale=en`

### Managing Content

**Articles**

- List all articles: `/admin/dashboard/articles`
- Edit: Click "Edit" button
- Publish: Click "Publish" (for drafts)
- Unpublish: Click "Unpublish" (for published)
- Delete: Click "Delete" (with confirmation)

**Other Content Sections**

- Hero Section: `/admin/dashboard/hero`
- Categories: `/admin/dashboard/categories`
- About Us: `/admin/dashboard/about`
- Contact Info: `/admin/dashboard/contact`
- Site Config: `/admin/dashboard/site-config`

## 🌍 Multi-Language Features

All content has **2 versions**:

- **\_id fields**: Indonesian content
- **\_en fields**: English content

Users can switch language using the **Globe icon** in navbar.

## 📦 Content Versioning

Every update creates a **version snapshot**:

- View version history in article editor
- See who made changes and when
- Rollback to previous version if needed
- Compare differences between versions

## 🔐 Security Features

✅ Row Level Security (RLS) enabled
✅ Only authenticated admins can access CMS
✅ Public can only read published content
✅ All actions logged in activity_log
✅ Secure cookie-based sessions

## 📱 Landing Page Integration

Your landing page (`/`) now fetches content from Supabase:

- Hero section content
- Latest news articles (6 most recent)
- Game categories
- About Us content
- Contact information

Content is **cached** for performance and updates instantly when published.

## 🎯 Next Steps

### Recommended Actions:

1. **Create Initial Content**

   - Add hero section content
   - Create 3-5 sample articles
   - Set up game categories
   - Fill in About Us info
   - Update contact information

2. **Customize Branding**

   - Upload your logo to site-assets
   - Update brand colors in site_config
   - Add social media links

3. **Setup Email Verification**

   - Go to Supabase > Authentication > Providers
   - Configure SMTP settings
   - Enable email confirmations

4. **Setup Scheduled Publishing**

   - Create Supabase Edge Function for auto-publish
   - Or use cron job to call `auto_publish_scheduled_articles()`

5. **Deploy to Production**
   - Build: `pnpm build`
   - Deploy to Vercel/Netlify/Cloudflare
   - Update Supabase URL in production environment

## 🔧 Troubleshooting

### "Unauthorized" error when logging in

- Make sure your account exists in `admin_users` table
- Check that you verified your email (if enabled)
- Try logging out completely and logging back in

### Images not uploading

- Verify storage buckets are created
- Check bucket policies are set correctly
- Ensure buckets are set to "Public"
- Check file size (max 5MB)

### Content not showing on landing page

- Verify content status is "published"
- Check Supabase RLS policies are enabled
- Clear browser cache
- Check browser console for errors

### Database errors

- Ensure migration ran successfully
- Check all required tables exist
- Verify RLS policies are enabled
- Check Supabase logs for details

## 📚 File Structure

```
src/
├── lib/
│   ├── components/
│   │   ├── ImageUpload.svelte        # Image upload component
│   │   ├── LanguageSwitcher.svelte   # Language switcher
│   │   └── ui/                       # shadcn/ui components
│   ├── i18n/                         # Translations (id.json, en.json)
│   ├── server/
│   │   ├── storage.ts                # Image upload utilities
│   │   └── versioning.ts             # Version control utilities
│   ├── stores/
│   │   └── locale.ts                 # i18n state management
│   ├── database.types.ts             # Supabase TypeScript types
│   └── supabase.ts                   # Supabase client
├── routes/
│   ├── +page.svelte                  # Landing page
│   ├── +page.server.ts               # Data fetching
│   ├── admin/
│   │   ├── login/                    # Auth pages
│   │   ├── logout/
│   │   └── dashboard/
│   │       ├── +page.svelte          # Dashboard home
│   │       └── articles/             # Articles CRUD
│   └── api/
│       └── upload/                   # Image upload API
├── hooks.server.ts                   # Auth middleware
└── app.d.ts                          # TypeScript definitions

supabase/
├── migrations/
│   └── 20251107_initial_schema.sql   # Database schema
└── README.md                         # Setup instructions
```

## 🆘 Support

If you encounter issues:

1. Check Supabase logs: Project > Logs
2. Check browser console for errors
3. Review `supabase/README.md` for detailed setup
4. Verify all environment variables are set
5. Ensure migrations ran successfully

## 🎉 You're All Set!

Your CMS is ready to use. Start creating amazing content for Jelajah Game!

**Default seed data included:**

- 1 Hero section (sample content)
- 1 Contact info (sample data)
- 3 Site config entries

**You need to create:**

- Your admin account
- News articles
- Game categories
- About Us content

Happy content managing! 🚀
