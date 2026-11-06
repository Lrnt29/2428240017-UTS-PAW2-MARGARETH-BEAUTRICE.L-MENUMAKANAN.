# Kuis 1 PAW II 2026/2027 - Manajemen Jadwal Kuliah

NPM **2428240017** | Studi kasus: **Manajemen Jadwal Kuliah**
Stack: Express.js (ESM) + MongoDB (Mongoose)

## Field
| Field | Tipe | Ketentuan |
|---|---|---|
| mata_kuliah | String | Wajib, tidak boleh kosong |
| dosen | String | Wajib, tidak boleh kosong |
| jam_mulai | String | Wajib, format `HH:mm` (contoh `08:00`) |

Database: `nama_lengkap_jadwal_kuliah` (ganti `nama_lengkap` di `.env`) | Collection: `jadwal_kuliah`

## Menjalankan
```bash
npm install
cp .env.example .env     # lalu edit MONGODB_URI dengan nama lengkap Anda
npm run dev              # atau npm start
```

## Endpoint
| Method | Endpoint | Keterangan |
|---|---|---|
| POST | /api/jadwal-kuliah | Tambah data |
| GET | /api/jadwal-kuliah | Semua data (filter, sorting, pagination) |
| GET | /api/jadwal-kuliah/:id | Detail berdasarkan ID |
| PUT | /api/jadwal-kuliah/:id | Perbarui berdasarkan ID |
| DELETE | /api/jadwal-kuliah/:id | Hapus berdasarkan ID |

### Filter (GET semua)
- `mata_kuliah=web` : mengandung kata (tidak case-sensitive)
- `dosen=johannes` : mengandung kata
- `jam_mulai=08:00` : persis
- `jam_dari=08:00&jam_sampai=12:00` : rentang jam
- `q=kata` : cari di mata_kuliah atau dosen

### Sorting
- `sort=jam_mulai` (naik), `sort=-jam_mulai` (turun), `sort=dosen,-jam_mulai` (multi field)
- `sort=jam_mulai&order=desc` (alternatif)
- Field yang boleh: `mata_kuliah, dosen, jam_mulai, createdAt, updatedAt`

### Pagination
`page=1&limit=10` (limit maksimal 100)

Contoh: `GET /api/jadwal-kuliah?dosen=a&sort=dosen,-jam_mulai&page=1&limit=5`

## Middleware
- `requestLogger` : log method, url, status, durasi
- `validateObjectId` : validasi `:id` (400 jika tidak valid)
- `validateJadwal` : validasi body POST/PUT
- `notFound` dan `errorHandler` : 404 dan penanganan error global (JSON)

## Status code
200 OK, 201 Created, 400 Bad Request (input/ID tidak valid), 404 Not Found, 500 Server Error

## Postman
Import `collection-api/jadwal-kuliah.postman_collection.json`. Setelah POST, salin `_id` ke variable `id`.
Setelah menguji, export ulang collection dari Postman ke folder `collection-api` (sesuai soal).
