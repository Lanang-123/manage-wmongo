import express from 'express';
import { getMahasiswa, createMahasiswa, updateMahasiswa, deleteMahasiswa } from '../controllers/MahasiswaController.js';

const router = express.Router();

router.get('/', getMahasiswa);
router.post('/', createMahasiswa);
router.post('/:id', updateMahasiswa);
router.get('/delete/:id', deleteMahasiswa);
export default router;