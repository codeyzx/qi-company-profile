# 📮 Postman Collection - QI Company Profile Categories API

Panduan lengkap untuk testing REST API Categories menggunakan Postman.

## 📋 Daftar Isi

1. [Setup & Instalasi](#setup--instalasi)
2. [Import Collection ke Postman](#import-collection-ke-postman)
3. [Konfigurasi Environment](#konfigurasi-environment)
4. [Cara Testing](#cara-testing)
5. [Penjelasan Setiap Endpoint](#penjelasan-setiap-endpoint)
6. [Tips & Troubleshooting](#tips--troubleshooting)

---

## 🚀 Setup & Instalasi

### Prerequisites

1. **Postman Desktop App** (recommended) atau Postman Web
   - Download: https://www.postman.com/downloads/
2. **Development Server Running**

   ```bash
   npm run dev
   # atau
   pnpm dev
   ```

   Server harus berjalan di `http://localhost:5173`

3. **Admin Account**
   - Pastikan sudah punya akun admin untuk testing operasi CREATE/UPDATE/DELETE

---

## 📥 Import Collection ke Postman

### Method 1: Import File JSON

1. Buka Postman
2. Klik tombol **Import** di kiri atas
3. Pilih file `Categories_API_Collection.postman_collection.json`
4. Klik **Import**
5. Collection akan muncul di sidebar kiri dengan nama "QI Company Profile - Categories API v1"

### Method 2: Import via Drag & Drop

1. Buka Postman
2. Drag & drop file `Categories_API_Collection.postman_collection.json` ke window Postman
3. Collection otomatis ter-import

---

## ⚙️ Konfigurasi Environment

Collection ini sudah include default variables:

| Variable     | Default Value                  | Deskripsi                             |
| ------------ | ------------------------------ | ------------------------------------- |
| `baseUrl`    | `http://localhost:5173/api/v1` | Base URL untuk semua API endpoints    |
| `categoryId` | _(empty)_                      | ID category untuk operasi single item |

### Cara Edit Variables:

1. Klik collection "QI Company Profile - Categories API v1"
2. Pilih tab **Variables**
3. Edit nilai `baseUrl` jika server berjalan di port lain
4. Variable `categoryId` akan diisi manual saat testing

---

## 🧪 Cara Testing

### A. Testing Read Operations (GET) - Tidak Perlu Auth

#### 1️⃣ Get All Categories

**Endpoint:** `GET /api/v1/categories`

**Langkah-langkah:**

1. Buka request "1. Get All Categories"
2. Klik tombol **Send**
3. Lihat response di bawah

**Expected Response:**

```json
{
  "success": true,
  "data": {
    "categories": [
      {
        "id": "uuid-here",
        "title_id": "Berita",
        "title_en": "News",
        "description_id": "...",
        "description_en": "...",
        "icon": "Newspaper",
        "badge_id": "Breaking",
        "badge_en": "Breaking",
        "gradient_from": "#F5CB3B",
        "gradient_to": "#322F81",
        "status": "published",
        "sort_order": 0,
        ...
      }
    ],
    "count": 4
  }
}
```

**Status Code:** 200 OK

---

#### 2️⃣ Get Categories (Published Only)

**Endpoint:** `GET /api/v1/categories?status=published`

**Langkah-langkah:**

1. Buka request "2. Get Categories (Published Only)"
2. Perhatikan ada query parameter `status=published`
3. Klik **Send**

**Use Case:**

- Untuk menampilkan di halaman publik
- Filter hanya kategori yang sudah dipublish

**Variasi Testing:**

- Ganti `status=published` menjadi `status=draft` untuk melihat kategori draft
- Hapus query parameter untuk melihat semua kategori

---

#### 3️⃣ Get Categories (With Pagination)

**Endpoint:** `GET /api/v1/categories?limit=10&offset=0&sort=asc`

**Langkah-langkah:**

1. Buka request "3. Get Categories (With Pagination)"
2. Perhatikan query parameters:
   - `limit=10`: Ambil 10 item
   - `offset=0`: Mulai dari item pertama
   - `sort=asc`: Sort ascending berdasarkan `sort_order`
3. Klik **Send**

**Testing Pagination:**

| Halaman | offset | limit | URL                   |
| ------- | ------ | ----- | --------------------- |
| Page 1  | 0      | 10    | `?limit=10&offset=0`  |
| Page 2  | 10     | 10    | `?limit=10&offset=10` |
| Page 3  | 20     | 10    | `?limit=10&offset=20` |

**Variasi Testing:**

- Ubah `sort=desc` untuk reverse order
- Ubah `limit=2` untuk testing dengan data lebih sedikit

---

#### 4️⃣ Get Single Category

**Endpoint:** `GET /api/v1/categories/{id}`

**Langkah-langkah:**

1. Jalankan request "1. Get All Categories" terlebih dahulu
2. Copy salah satu `id` dari response (format: UUID)
3. Klik collection "QI Company Profile - Categories API v1"
4. Pilih tab **Variables**
5. Paste UUID ke kolom `categoryId` (CURRENT VALUE)
6. Buka request "4. Get Single Category"
7. Klik **Send**

**Expected Response:**

```json
{
  "success": true,
  "data": {
    "id": "uuid-yang-diminta",
    "title_id": "...",
    ...
  }
}
```

**Status Code:**

- 200 OK: Category found
- 404 Not Found: Category tidak ditemukan

---

### B. Testing Write Operations (POST/PUT/DELETE) - Perlu Auth

⚠️ **PENTING:** Operasi ini memerlukan autentikasi admin!

#### Setup Authentication

**Cara 1: Login via Browser (Recommended)**

1. Buka browser
2. Akses `http://localhost:5173/admin/login`
3. Login dengan credential admin Anda
4. Setelah login berhasil, cookie session akan tersimpan di browser
5. Postman Desktop App akan otomatis menggunakan cookie dari browser system

**Cara 2: Manual Cookie (Alternative)**

1. Login di browser dengan DevTools terbuka (F12)
2. Buka tab **Application** → **Cookies**
3. Copy cookie dengan nama `sb-access-token` atau sejenisnya
4. Di Postman, setiap request:
   - Buka tab **Headers**
   - Tambah header `Cookie` dengan value dari browser

---

#### 5️⃣ Create Category

**Endpoint:** `POST /api/v1/categories`

**Langkah-langkah:**

1. Pastikan sudah login sebagai admin (lihat Setup Authentication di atas)
2. Buka request "5. Create Category"
3. Review body request di tab **Body** → **raw** (JSON):

```json
{
  "title_id": "Kategori Baru",
  "title_en": "New Category",
  "description_id": "Ini adalah deskripsi kategori baru dalam bahasa Indonesia",
  "description_en": "This is a description for new category in English",
  "icon": "Star",
  "badge_id": "Terbaru",
  "badge_en": "New",
  "count_text_id": "artikel",
  "count_text_en": "articles",
  "gradient_from": "#FF6B6B",
  "gradient_to": "#4ECDC4",
  "border_color": "#FF6B6B",
  "sort_order": 99,
  "status": "draft"
}
```

4. **Edit body sesuai kebutuhan** (minimal harus ada: title_id, title_en, description_id, description_en)
5. Klik **Send**

**Expected Response:**

```json
{
  "success": true,
  "data": {
    "id": "new-uuid",
    "title_id": "Kategori Baru",
    ...
    "created_at": "2025-11-11T...",
    "updated_at": "2025-11-11T..."
  }
}
```

**Status Code:**

- 201 Created: Berhasil dibuat
- 400 Bad Request: Field required tidak lengkap
- 401 Unauthorized: Belum login sebagai admin
- 500 Server Error: Error database

**Field Reference:**

| Field            | Required | Type   | Default     | Contoh                |
| ---------------- | -------- | ------ | ----------- | --------------------- |
| `title_id`       | ✅ Yes   | string | -           | "Berita Gaming"       |
| `title_en`       | ✅ Yes   | string | -           | "Gaming News"         |
| `description_id` | ✅ Yes   | string | -           | "Berita terkini..."   |
| `description_en` | ✅ Yes   | string | -           | "Latest news..."      |
| `icon`           | ❌ No    | string | null        | "Newspaper"           |
| `badge_id`       | ❌ No    | string | null        | "Terbaru"             |
| `badge_en`       | ❌ No    | string | null        | "New"                 |
| `count_text_id`  | ❌ No    | string | null        | "artikel"             |
| `count_text_en`  | ❌ No    | string | null        | "articles"            |
| `gradient_from`  | ❌ No    | string | "#F5CB3B"   | "#FF6B6B"             |
| `gradient_to`    | ❌ No    | string | "#322F81"   | "#4ECDC4"             |
| `border_color`   | ❌ No    | string | null        | "#FF6B6B"             |
| `sort_order`     | ❌ No    | number | 0           | 99                    |
| `status`         | ❌ No    | enum   | "published" | "draft" / "published" |

**Icon Reference:**
Icon menggunakan Lucide icons. Contoh yang bisa digunakan:

- `Newspaper` (untuk News)
- `Gamepad2` (untuk Games)
- `Trophy` (untuk Achievements)
- `Star` (untuk Featured)
- `TrendingUp` (untuk Trending)
- Lihat semua icon di: https://lucide.dev/icons/

---

#### 6️⃣ Update Category

**Endpoint:** `PUT /api/v1/categories/{id}`

**Langkah-langkah:**

1. Pastikan sudah login sebagai admin
2. Jalankan "Get All Categories" untuk mendapatkan ID category yang ingin diupdate
3. Copy `id` category tersebut
4. Set variable `categoryId` dengan ID tersebut (lihat cara di "Get Single Category")
5. Buka request "6. Update Category"
6. Edit body request sesuai kebutuhan
7. Klik **Send**

**Example Body:**

```json
{
  "title_id": "Kategori Terupdate",
  "title_en": "Updated Category",
  "description_id": "Deskripsi yang sudah diperbarui",
  "description_en": "Updated description",
  "icon": "Trophy",
  "badge_id": "Populer",
  "badge_en": "Popular",
  "count_text_id": "konten",
  "count_text_en": "contents",
  "gradient_from": "#667EEA",
  "gradient_to": "#764BA2",
  "border_color": "#667EEA",
  "sort_order": 1,
  "status": "published"
}
```

**Expected Response:**

```json
{
  "success": true,
  "data": {
    "id": "same-uuid",
    "title_id": "Kategori Terupdate",
    ...
    "updated_at": "2025-11-11T..." // timestamp baru
  }
}
```

**Status Code:**

- 200 OK: Berhasil diupdate
- 400 Bad Request: Field required tidak lengkap
- 401 Unauthorized: Belum login sebagai admin
- 404 Not Found: Category tidak ditemukan
- 500 Server Error: Error database

---

#### 7️⃣ Delete Category

**Endpoint:** `DELETE /api/v1/categories/{id}`

⚠️ **PERINGATAN:** Operasi ini bersifat **PERMANENT** (hard delete)!

**Langkah-langkah:**

1. Pastikan sudah login sebagai admin
2. Jalankan "Get All Categories" untuk mendapatkan ID category yang ingin dihapus
3. **PENTING:** Pastikan ID yang akan dihapus adalah kategori yang BENAR!
4. Copy `id` category tersebut
5. Set variable `categoryId` dengan ID tersebut
6. Buka request "7. Delete Category"
7. **Double check ID sekali lagi!**
8. Klik **Send**

**Expected Response:**

```json
{
  "success": true,
  "data": {
    "message": "Category deleted successfully"
  }
}
```

**Status Code:**

- 200 OK: Berhasil dihapus
- 401 Unauthorized: Belum login sebagai admin
- 404 Not Found: Category tidak ditemukan (sudah dihapus sebelumnya)
- 500 Server Error: Error database

**Safety Tips:**

- Jangan hapus kategori yang sedang digunakan oleh artikel/konten lain
- Backup database sebelum testing delete operations
- Untuk testing, buat kategori dummy terlebih dahulu

---

## 📚 Penjelasan Setiap Endpoint

### Overview Endpoints

| Method | Endpoint                  | Auth Required | Description                                      |
| ------ | ------------------------- | ------------- | ------------------------------------------------ |
| GET    | `/api/v1/categories`      | ❌ No         | List semua categories dengan filter & pagination |
| GET    | `/api/v1/categories/{id}` | ❌ No         | Get detail single category                       |
| POST   | `/api/v1/categories`      | ✅ Yes        | Create category baru                             |
| PUT    | `/api/v1/categories/{id}` | ✅ Yes        | Update category existing                         |
| DELETE | `/api/v1/categories/{id}` | ✅ Yes        | Delete category (permanent)                      |

---

### Response Format

Semua endpoint menggunakan format response yang konsisten:

#### Success Response:

```json
{
  "success": true,
  "data": {
    // Data yang diminta (object atau array)
  }
}
```

#### Error Response:

```json
{
  "success": false,
  "error": "Error message here"
}
```

#### HTTP Status Codes:

| Code | Meaning      | Kapan Muncul                             |
| ---- | ------------ | ---------------------------------------- |
| 200  | OK           | Request berhasil (GET, PUT, DELETE)      |
| 201  | Created      | Resource berhasil dibuat (POST)          |
| 400  | Bad Request  | Input tidak valid, field required kosong |
| 401  | Unauthorized | Belum login atau session expired         |
| 404  | Not Found    | Resource tidak ditemukan                 |
| 500  | Server Error | Error di server/database                 |

---

## 🔍 Tips & Troubleshooting

### Tips Testing

1. **Gunakan Postman Desktop App**

   - Lebih mudah untuk handling cookies
   - Cookie browser otomatis tersinkron

2. **Testing Flow yang Disarankan:**

   ```
   GET All → GET Single → CREATE → GET Single (verify) → UPDATE → GET Single (verify) → DELETE
   ```

3. **Simpan Response ID**

   - Setelah CREATE, save ID untuk testing UPDATE/DELETE
   - Gunakan Postman Tests untuk auto-save:

   ```javascript
   // Di tab Tests pada request Create Category
   var jsonData = pm.response.json();
   if (jsonData.success && jsonData.data.id) {
     pm.collectionVariables.set("categoryId", jsonData.data.id);
   }
   ```

4. **Testing Error Cases**
   - Coba hapus field required dari body
   - Coba gunakan ID yang tidak valid
   - Coba akses tanpa login

---

### Common Issues & Solutions

#### ❌ Error: "Unauthorized" (401)

**Penyebab:**

- Belum login sebagai admin
- Session expired
- Cookie tidak tersinkron

**Solusi:**

1. Login ulang di browser `http://localhost:5173/admin/login`
2. Restart Postman Desktop App
3. Check cookie di DevTools browser
4. Pastikan menggunakan Postman Desktop, bukan Web

---

#### ❌ Error: "Missing required fields" (400)

**Penyebab:**

- Field wajib tidak diisi: `title_id`, `title_en`, `description_id`, `description_en`

**Solusi:**

1. Check body request
2. Pastikan semua field required ada
3. Pastikan format JSON valid (gunakan JSON validator)

---

#### ❌ Error: "Category not found" (404)

**Penyebab:**

- ID category salah
- Category sudah dihapus
- Typo di UUID

**Solusi:**

1. Jalankan GET All Categories untuk mendapat ID yang valid
2. Check variable `categoryId` sudah diset dengan benar
3. Pastikan UUID format valid

---

#### ❌ Error: Connection refused

**Penyebab:**

- Development server tidak jalan
- Port salah

**Solusi:**

1. Pastikan server running: `npm run dev`
2. Check `baseUrl` di collection variables
3. Pastikan tidak ada firewall blocking localhost

---

#### ❌ Error: "Internal server error" (500)

**Penyebab:**

- Database connection issue
- Supabase credentials salah
- Bug di server code

**Solusi:**

1. Check terminal/console untuk error logs
2. Verify `.env` file dengan Supabase credentials
3. Check database connection
4. Restart development server

---

### Debugging Tips

1. **Enable Postman Console**

   - View → Show Postman Console (Alt+Ctrl+C)
   - Lihat raw request/response

2. **Check Server Logs**

   - Lihat terminal tempat `npm run dev` berjalan
   - Error details akan muncul di sana

3. **Validate JSON Body**

   - Gunakan https://jsonlint.com/
   - Pastikan tidak ada trailing comma
   - Pastikan quotes menggunakan double quotes

4. **Test di Browser DevTools**
   - Buka Network tab
   - Lihat request/response actual
   - Compare dengan Postman

---

## 🎯 Testing Scenarios

### Scenario 1: Full CRUD Flow

1. ✅ GET All Categories (verify data exists)
2. ✅ CREATE new category "Test Category"
3. ✅ GET Single by ID (verify creation)
4. ✅ UPDATE category title
5. ✅ GET Single by ID (verify update)
6. ✅ DELETE category
7. ✅ GET Single by ID (expect 404)

### Scenario 2: Filtering & Pagination

1. ✅ GET all with status=published
2. ✅ GET all with status=draft
3. ✅ GET with limit=2 offset=0 (page 1)
4. ✅ GET with limit=2 offset=2 (page 2)
5. ✅ GET with sort=desc

### Scenario 3: Error Handling

1. ❌ CREATE without auth (expect 401)
2. ❌ CREATE without title_id (expect 400)
3. ❌ GET invalid UUID (expect 404)
4. ❌ UPDATE non-existent category (expect 404)
5. ❌ DELETE non-existent category (expect 404)

---

## 📖 Additional Resources

- **Lucide Icons:** https://lucide.dev/icons/
- **Supabase Docs:** https://supabase.com/docs
- **SvelteKit Docs:** https://kit.svelte.dev/docs
- **Postman Learning:** https://learning.postman.com/

---

## 🆘 Need Help?

Jika menemui issue:

1. Check troubleshooting section di atas
2. Check server logs di terminal
3. Verify environment variables di `.env`
4. Restart development server

---

**Happy Testing! 🚀**
