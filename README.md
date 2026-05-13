# 📓 Di Catet - Premium Expense Tracker

![Di Catet Banner](https://via.placeholder.com/1200x400/0f172a/ffffff?text=Di+Catet+-+Financial+Expense+Tracker)

**Di Catet** adalah aplikasi pencatatan keuangan (*Expense Tracker*) modern yang dirancang dengan pendekatan *mobile-first* dan estetika "Midnight Navy" premium. Aplikasi ini membantu pengguna melacak pemasukan dan pengeluaran harian, memberikan visualisasi laporan, serta mengelola kategori transaksi dengan antarmuka yang interaktif (Bento-grid UI).

Aplikasi ini dibangun menggunakan perpaduan teknologi tangguh: **Laravel 11+** untuk backend (API & Otentikasi) dan **Vue 3** + **Tailwind CSS 4** untuk frontend (Single Page Application).

---

## ✨ Fitur Utama (Features)

1. **🔒 Autentikasi Google (OAuth 2.0)**
   Login yang aman, cepat, dan mulus menggunakan akun Google berkat integrasi Laravel Socialite dan Laravel Sanctum (SPA Authentication).
2. **📱 Mobile-First & Premium UI/UX**
   Desain responsif yang terasa seperti aplikasi *native* di perangkat seluler dengan Navigasi Bawah (*Bottom Navbar*), efek *glassmorphism*, tipografi modern, dan tema gelap (*Dark Mode*).
3. **📊 Dashboard Interaktif**
   Ringkasan komprehensif dari total saldo, pengeluaran bulan ini, dan pemasukan bulan ini dengan tampilan kartu informasi yang memanjakan mata.
4. **💸 Manajemen Transaksi**
   Catat pemasukan dan pengeluaran dengan mudah. Menampilkan daftar riwayat transaksi yang dilengkapi dengan fitur filter canggih menggunakan *pill navigation* horizontal.
5. **🗂️ Custom Category Picker**
   Pemilihan kategori transaksi menggunakan komponen interaktif *Bento-grid* yang elegan dengan integrasi *Lucide Icons* yang dinamis.
6. **📈 Laporan Keuangan (Reports)**
   Analisis pengeluaran dan pemasukan untuk memonitor kesehatan finansial Anda dengan lebih terstruktur.

---

## 🛠️ Tech Stack (Teknologi yang Digunakan)

### Backend:
- **Framework:** Laravel 11 (PHP 8.3+)
- **Autentikasi:** Laravel Sanctum (SPA Token Auth) & Laravel Socialite (Google Login)
- **Database:** SQLite / MySQL (Dapat disesuaikan)

### Frontend:
- **Framework:** Vue 3 (Composition API)
- **Routing:** Vue Router 4
- **Styling:** Tailwind CSS 4 & CSS Vanilla
- **Ikon:** Lucide Vue Next
- **Build Tool:** Vite

---

## 🚀 Cara Instalasi (Getting Started)

Ikuti langkah-langkah di bawah ini untuk menjalankan proyek secara lokal di komputermu.

### Persyaratan Sistem (Prerequisites)
- **PHP** >= 8.3
- **Composer** (untuk dependensi PHP)
- **Node.js** & **NPM** (untuk dependensi frontend)
- **Database Server** (Opsional jika ingin pakai MySQL. Secara default bisa memakai SQLite)

### Langkah Instalasi (Installation Steps)

**1. Clone Repositori**
```bash
git clone https://github.com/username/di-catet.git
cd di-catet
```

**2. Install Dependensi Backend (PHP)**
```bash
composer install
```

**3. Install Dependensi Frontend (Node.js)**
```bash
npm install
```

**4. Konfigurasi Environment (`.env`)**
Salin file `.env.example` menjadi `.env`.
```bash
cp .env.example .env
```
Lalu *generate application key*:
```bash
php artisan key:generate
```

**5. Konfigurasi Database & Auth**
Buka file `.env`. Secara default Laravel akan menggunakan SQLite dan otomatis membuat file databasenya. Jika Anda ingin menggunakan MySQL, atur *DB_* variabel di file tersebut.

**Penting untuk Google Auth:**
Pastikan menambahkan kredensial OAuth dari Google Cloud Console di file `.env`:
```env
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret
GOOGLE_REDIRECT_URI=http://localhost:8000/api/auth/google/callback
```

**6. Jalankan Migrasi Database**
```bash
php artisan migrate
```

**7. Jalankan Server Development**
Proyek ini sudah dikonfigurasi agar Vite dan Laravel berjalan bersamaan hanya dengan satu perintah:
```bash
npm run dev
```
*(Perintah ini akan menjalankan `php artisan serve`, antrian/queue, serta `vite` secara paralel).*

Aplikasi sekarang dapat diakses melalui browser di: `http://localhost:8000`

---

## 📖 Cara Penggunaan (How to Use)

1. **Akses Aplikasi:** Buka `http://localhost:8000` di browser komputer atau di perangkat seluler Anda.
2. **Login:** Gunakan tombol "Sign In With Google" pada halaman Login untuk masuk secara aman ke dalam sistem.
3. **Dashboard:** Setelah berhasil login, Anda berada di halaman utama. Anda bisa melihat ringkasan keuangan dan sisa saldo.
4. **Tambah Transaksi:** Klik tombol bulat di tengah pada Navigasi Bawah (atau di Dashboard) untuk mencatat aktivitas keuangan baru. 
   - Pilih jenis (Pemasukan/Pengeluaran).
   - Masukkan nilai nominal.
   - Pilih ikon kategori yang relevan melalui *Category Picker*.
   - Simpan.
5. **Daftar Transaksi:** Navigasi ke tab **Transactions** (ikon list) untuk meninjau semua pemasukan dan pengeluaran. Geser tombol navigasi kategori di atas (*pill filters*) untuk menyortir data.
6. **Laporan & Profil:** Gunakan tab **Reports** (ikon grafik) untuk melihat analisis bulanan dan tab **Profile** (ikon orang) untuk melakukan log out.

---

## 📂 Struktur Direktori Penting

Jika Anda ingin berkontribusi atau memodifikasi kode, berikut struktur utamanya:
- `app/Http/Controllers/`: Logika sistem backend (seperti `TransactionController`, `AuthController`).
- `routes/api.php` & `routes/web.php`: Titik keluar/masuk URL aplikasi dan API.
- `resources/js/`: Direktori *source code* utama antarmuka (Vue 3).
  - `components/`: Komponen UI yang bisa digunakan kembali (`BottomNavbar.vue`, `CategoryPicker.vue`, `TransactionModal.vue`).
  - `pages/`: Tampilan layar utama (`Dashboard.vue`, `Transactions.vue`, dll).
- `resources/css/app.css`: Konfigurasi warna premium dan styling khusus tambahan untuk Tailwind.

---

<p align="center"><i>Di Catet - Pencatatan Keuangan Tanpa Ribet</i></p>
