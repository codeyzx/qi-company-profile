# Setup Instagram API untuk Jelajah Game

Panduan ini menjelaskan cara mengintegrasikan Instagram Basic Display API dengan website Jelajah Game.

## Prasyarat

- Akun Instagram (personal atau bisnis)
- Akun Facebook Developer

## Langkah-Langkah Setup

### 1. Buat Facebook App

1. Buka [Facebook Developers](https://developers.facebook.com/apps)
2. Klik **"Create App"**
3. Pilih tipe **"Consumer"** atau **"Business"**
4. Isi informasi aplikasi:
   - **App Name**: Jelajah Game
   - **App Contact Email**: email Anda
5. Klik **"Create App"**

### 2. Tambahkan Instagram Basic Display

1. Di dashboard aplikasi, scroll ke bawah dan cari **"Instagram Basic Display"**
2. Klik **"Set Up"**
3. Di bagian bawah halaman, klik **"Create New App"**
4. Isi informasi:
   - **Valid OAuth Redirect URIs**: `https://localhost/`
   - **Deauthorize Callback URL**: `https://localhost/`
   - **Data Deletion Request URL**: `https://localhost/`
5. Klik **"Save Changes"**

### 3. Tambahkan Instagram Test User

1. Scroll ke **"User Token Generator"**
2. Klik **"Add or Remove Instagram Testers"**
3. Masukkan username Instagram Anda
4. Buka Instagram → Settings → Apps and Websites → Tester Invites
5. Accept invitation

### 4. Generate Access Token

1. Kembali ke dashboard Facebook Developer
2. Di bagian **"User Token Generator"**, klik **"Generate Token"**
3. Login dengan akun Instagram Anda
4. Authorize aplikasi
5. Copy **Access Token** yang dihasilkan

### 5. Konfigurasi Environment Variable

1. Buka file `.env` di root project
2. Paste token yang sudah di-copy:

```env
INSTAGRAM_ACCESS_TOKEN=your_actual_token_here
```

3. Save file

### 6. Test Integrasi

1. Jalankan development server:
```bash
npm run dev
```

2. Buka browser ke `http://localhost:5173`
3. Scroll ke section **"Artikel Terbaru"**
4. Artikel seharusnya ter-load dari Instagram Anda

## Format Konten Instagram

Agar konten Instagram terdeteksi dengan benar, gunakan format caption berikut:

### Review Game
```
Judul Review Game

Deskripsi singkat review... 
Paragraph kedua sebagai excerpt...

#review #gaming #jelajahgame
```

### Berita
```
Judul Berita Gaming

Breaking news atau update terbaru...
Informasi detail...

#berita #news #gaming
```

### List Game
```
10 Game Terbaik 2025

Daftar game yang wajib kamu coba...
Game pertama adalah...

#list #topgames #gaming
```

### Fakta Menarik
```
Fakta Unik Tentang Minecraft

Tahukah kamu bahwa...
Minecraft memiliki...

#fact #trivia #gaming
```

### Clip Viral
```
Momen Epic di Tournament

Saksikan aksi luar biasa...
Pro player ini...

#viral #esports #gaming
```

## Troubleshooting

### Token Expired
- Access token Instagram memiliki masa berlaku 60 hari
- Untuk token jangka panjang, gunakan [Long-Lived Token](https://developers.facebook.com/docs/instagram-basic-display-api/guides/long-lived-access-tokens)

### Artikel Tidak Muncul
1. Pastikan token valid dan belum expired
2. Check console browser untuk error
3. Pastikan akun Instagram sudah ditambahkan sebagai Tester
4. Verifikasi format caption sesuai dengan panduan di atas

### Rate Limiting
- Instagram API memiliki rate limit 200 request/jam per user
- Website menggunakan cache 5 menit untuk mengurangi request

## Format Data yang Dikembalikan

API endpoint `/api/instagram` mengembalikan format:

```json
{
  "success": true,
  "articles": [
    {
      "id": "18123456789",
      "title": "Judul Artikel",
      "excerpt": "Deskripsi singkat...",
      "thumbnail": "https://...",
      "category": "Review",
      "date": "24 Okt 2025",
      "readTime": "5 min",
      "permalink": "https://instagram.com/p/...",
      "mediaType": "IMAGE"
    }
  ],
  "count": 6
}
```

## Best Practices

1. **Caching**: API sudah implement caching 5 menit untuk performa
2. **Fallback**: Ada fallback data static jika Instagram API gagal
3. **Security**: Token disimpan di environment variable, tidak di-commit ke Git
4. **Loading State**: UI menampilkan skeleton loader saat fetch data
5. **Error Handling**: Graceful degradation dengan fallback content

## Resources

- [Instagram Basic Display API Docs](https://developers.facebook.com/docs/instagram-basic-display-api)
- [Facebook Developer Dashboard](https://developers.facebook.com/apps)
- [Long-Lived Access Tokens](https://developers.facebook.com/docs/instagram-basic-display-api/guides/long-lived-access-tokens)

---

Dibuat untuk **Jelajah Game** - Explore the Game Universe 🎮
