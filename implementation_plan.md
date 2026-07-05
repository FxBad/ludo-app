# Rencana Pengembangan Ludo Amore

Mengimplementasikan 4 fitur baru:
1. **Kartu Truth/Dare Custom**: UI/Input untuk mengedit/menambahkan pertanyaan Truth & Dare sendiri.
2. **Deck Pertanyaan**: Array pertanyaan bawaan yang bertema romantis (Ludo Amore), dipilih acak saat pion mendarat.
3. **Save State (localStorage)**: Game otomatis menyimpan posisi pion, skor, giliran, dan status dadu sehingga bisa dilanjutkan setelah refresh.
4. **Scoreboard Ronde**: Mencatat skor menang/kalah per ronde (Best of 3/5/Indefinite) dengan tombol "Ronde Berikutnya".

---

## Perubahan Kode

### 1. [index.html](file:///d:/Coding/Ludo/index.html)
- Tambah tampilan skor ronde di dalam/di atas info player.
- Tambah tombol "Mulai Ronde Berikutnya" di modal kemenangan (saat ronde selesai tetapi belum ada pemenang mutlak).
- Tambah panel lipat (collapsible/accordion) "Pengaturan Deck & Target Ronde" di bagian bawah dashboard untuk input pertanyaan custom dan memilih target ronde (Best of 3, Best of 5, Bebas).
- Update isi deskripsi modal Truth/Dare agar menampilkan pertanyaan yang terpilih secara dinamis.

### 2. [styles.css](file:///d:/Coding/Ludo/styles.css)
- Styling baru untuk panel pengaturan deck (textarea, summary/details tag).
- Styling visual scoreboard/indikator skor pada player card.
- Animasi/layout penyesuaian agar responsif di mobile & desktop.

### 3. [script.js](file:///d:/Coding/Ludo/script.js)
- Definisikan list default untuk `DEFAULT_TRUTHS` dan `DEFAULT_DARES`.
- Buat logic load/save deck kustom ke `localStorage`.
- Tambahkan variable state ronde: `scores = { p1: 0, p2: 0 }`, `targetRounds = 3` (atau bebas).
- Buat fungsi pembantu:
  - `saveGameState()`: Menyimpan semua status game (posisi pion, giliran, skor, dadu, tantangan aktif jika ada) ke `localStorage`.
  - `loadGameState()`: Memulihkan status game dan merender ulang pion/UI.
  - `resetGameState()`: Reset total game (termasuk skor).
  - `resetRoundOnly()`: Reset posisi pion saja untuk ronde baru, pertahankan skor.
- Update `handleSquareLanding`:
  - Jika tipe 'truth' atau 'dare', acak pertanyaan dari deck (kustom/bawaan), simpan ke state tantangan aktif, tampilkan di modal.
- Update `handleWin`:
  - Tambah poin ke pemenang.
  - Jika poin mencapai target (misal 2 kemenangan untuk Best of 3): nyatakan pemenang match akhir, berikan tombol reset total.
  - Jika belum mencapai target: tampilkan tombol "Mulai Ronde Berikutnya".
- Integrasikan `saveGameState()` di setiap aksi utama (kocok dadu, gerak pion selesai, selesaikan tantangan, menyerah, update deck).

---

## Rencana Verifikasi

### Verifikasi Manual
1. **Deck Kustom**: Buka panel pengaturan, ketik pertanyaan baru, mendarat di Truth/Dare, pastikan pertanyaan kustom muncul.
2. **Save/Load State**: Kocok dadu, jalankan pion ke indeks tengah, lalu refresh halaman. Pastikan pion tetap di tempatnya dan giliran/hasil dadu tidak berubah.
3. **Scoreboard Ronde**: Selesaikan 1 game sampai menang, pastikan skor bertambah 1. Tekan "Ronde Berikutnya", pastikan pion reset ke base tapi skor tetap tersimpan.
4. **Best of 3**: Atur ke Best of 3, menangkan 2 ronde, pastikan muncul deklarasi pemenang akhir dan tombol reset total.
