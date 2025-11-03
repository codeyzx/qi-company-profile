# 🎮 Jelajah Game - Portal Berita Game Indonesia

### Portal berita dan insight terbaru tentang game lokal dan global untuk gamer Indonesia

**"Explore the Game Universe."**

## 🛠️ Tech Stack

<a href="https://www.shadcn-svelte.com/" target="_blank">Shadcn-Svelte</a> + <a href="https://kit.svelte.dev/" target="_blank">SvelteKit</a> + <a href="https://www.typescriptlang.org/" target="_blank">TypeScript</a> + <a href="https://tailwindcss.com/" target="_blank">Tailwind CSS</a>

## 🎨 Design

- **Color Palette:**
  - Primary: `#F5CB3B` (Yellow/Gold)
  - Secondary: `#322F81` (Purple)
  - Background: `#FFFFFF`
- **Typography:** Poppins (Google Fonts)
- **Style:** Modern, dynamic, dan atraktif untuk Gen Z

## 📄 Sections

- [x] Navbar - Navigasi utama dengan menu gaming
- [x] Hero Section - Tagline "Jelajahi Dunia Game Bersama Kami"
- [x] News Articles - Daftar artikel berita game terkini
- [x] Popular Games - Game trending dan populer
- [x] Game Reviews - Review mendalam dengan rating system
- [x] About Us - Tentang Jelajah Game
- [x] Contact - Form kontak dan info sosial media
- [x] Footer - Copyright dan social media links

## ✨ Features

- [x] Fully Responsive Design
- [x] User Friendly Navigation
- [x] Dark Mode Support
- [x] Modern Gaming UI/UX
- [x] Animated Components
- [x] SEO Optimized with Meta Tags
- [x] Social Media Integration (Instagram, YouTube, TikTok)
- [x] **Dynamic Instagram Content Integration** - Artikel terbaru di-fetch langsung dari Instagram API
- [x] **Smart Content Categorization** - Otomatis mendeteksi kategori dari hashtag (#review, #berita, #list, #fact, #viral)
- [x] **Fallback Content System** - Tetap menampilkan konten jika Instagram API gagal
- [x] **Loading States & Error Handling** - UX yang smooth dengan skeleton loader dan error states

## 🚀 How to Run

1. Clone this repository:

```bash
git clone https://github.com/codeyzx/qi-company-profile.git
```

2. Go into project

```bash
cd qi-company-profile
```

3. Install dependencies

```bash
npm install
# or
pnpm install
# or
yarn install
```

4. **Setup Instagram API (Opsional)**

   Jika ingin menggunakan konten dinamis dari Instagram:

   1. Ikuti panduan di [`INSTAGRAM_SETUP.md`](./INSTAGRAM_SETUP.md)
   2. Buat file `.env` dan isi `INSTAGRAM_ACCESS_TOKEN`
   3. Restart development server

5. Run development server

```bash
npm run dev
# or
pnpm dev
# or
yarn dev
```

6. Open your browser and visit `http://localhost:5173`

## 📦 Building for Production

To create a production version of your app:

```bash
npm run build
```

You can preview the production build with:

```bash
npm run preview
```

> To deploy your app, you may need to install an [adapter](https://kit.svelte.dev/docs/adapters) for your target environment.

## 📱 Social Media

- Instagram: [@jelajahgame](https://instagram.com/jelajahgame)
- YouTube: [Jelajah Game](https://youtube.com/@jelajahgame)
- TikTok: [@jelajahgame](https://tiktok.com/@jelajahgame)

## 📝 License

This project is based on the original template by [leoMirandaa](https://github.com/leoMirandaa/shadcn-vue-landing-page) and converted to SvelteKit.

---

Made with ❤️ for Indonesian Gaming Community
