# Portofolio Zulkarnaen Ramdhani

Portofolio satu halaman dengan Next.js App Router, TypeScript, dan CSS Modules. Layout responsif berangkat dari pratinjau Figma dengan tema galaksi dan animasi yang mengikuti preferensi pengurangan gerak perangkat. [Desain Figma](https://www.figma.com/design/xOWPme4U2yZDGg1Ehsbk4I/Zulkarnaen-Ramdhani-%C2%B7-Portfolio?node-id=0-1)

## Menjalankan proyek

Gunakan Node.js 20.9 atau lebih baru.

```powershell
npm.cmd ci
npm.cmd run dev
```

Buka `http://localhost:3000`. Jalankan `npm.cmd run build` untuk membuat build produksi atau `npm.cmd run typecheck` untuk memeriksa tipe TypeScript.

## Struktur direktori

```text
public/
└── images/              Potret, galeri proyek, dan logo
src/
├── app/                 Halaman utama, rute /projects/[slug], dan layout
├── assets/
│   └── fonts/           Font lokal dan lisensinya
├── components/
│   ├── layout/          Header, footer, dan latar bintang
│   ├── contact/         Formulir kontak
│   ├── projects/        Tampilan detail dan galeri proyek
│   ├── sections/        Hero, Profile, Work, Experience, dan Activities
│   └── ui/              Tautan dan animasi saat menggulir
└── content/             Profil, proyek, pengalaman, dan aktivitas
```

## Menyesuaikan konten

- Ubah profil, spesialisasi, dan URL LinkedIn di `src/content/site.ts`.
- Ubah `site.portrait` untuk Hero, `site.profilePhoto` untuk Profile, dan `site.mascot` untuk aksesori Rimuru di `src/content/site.ts`.
- Edit deskripsi, thumbnail, dan galeri di `src/content/projects.ts`. Halaman detail memakai slug yang sama dengan kartu dan asetnya berada di `public/images/projects/`.
- Edit organisasi dan logo teknologi di `src/content/organizations.ts` dan `src/content/technologies.ts`.
- Ubah pengalaman di `src/content/experience.ts`.
- Tambah atau edit aktivitas dan keterangan galeri di `src/content/activities.ts`. Foto galeri ada di `public/images/activities/`.
- Atur warna, tipografi, dan lebar halaman di `src/app/globals.css`. Setiap bagian punya CSS Module sendiri untuk pengaturan layout khusus.

## Formulir kontak

Isi `PORTFOLIO_CONTACT_EMAIL` di `.env.local` dengan alamat penerima. Tombol **Open email app** menyiapkan draf dengan isi formulir agar bisa dikirim dari aplikasi email pengunjung.

Untuk mengaktifkan **Send message** langsung dari web, tambahkan `PORTFOLIO_CONTACT_FROM` dengan alamat pengirim terverifikasi dan `RESEND_API_KEY` pada konfigurasi server. Jalankan ulang server dev atau buat ulang build produksi setelah mengubah pengaturan. [Dokumentasi API Resend](https://resend.com/docs/api-reference/emails/send-email)
