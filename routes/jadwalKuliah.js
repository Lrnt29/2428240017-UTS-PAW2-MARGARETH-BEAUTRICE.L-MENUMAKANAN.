// =====================================================================
// routes/jadwalKuliah.js
// Fungsi: mendaftarkan 5 endpoint CRUD dan menentukan middleware apa saja
// yang harus dilewati sebelum masuk ke controller.
// Prefix /api/jadwal-kuliah sudah dipasang di app.js, jadi di sini
// cukup "/" dan "/:id".
//
// Urutan pada setiap route: middleware validasi -> controller
// =====================================================================

import { Router } from 'express';
import {
  createJadwal,
  getAllJadwal,
  getJadwalById,
  updateJadwal,
  deleteJadwal,
} from '../controllers/jadwalKuliahController.js';
import validateObjectId from '../middleware/validateObjectId.js';
import validateJadwal from '../middleware/validateJadwal.js';

const router = Router();

// CREATE  : tambah data baru. Body divalidasi dulu.
router.post('/', validateJadwal, createJadwal);

// READ    : ambil semua data. Mendukung filter, sorting, pagination via query string.
router.get('/', getAllJadwal);

// READ    : detail 1 data. ID dicek dulu apakah valid.
router.get('/:id', validateObjectId, getJadwalById);

// UPDATE  : ubah data. Cek ID dulu, lalu cek body, baru update.
router.put('/:id', validateObjectId, validateJadwal, updateJadwal);

// DELETE  : hapus data. Cek ID dulu.
router.delete('/:id', validateObjectId, deleteJadwal);

export default router;
