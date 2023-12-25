import express from 'express';
import { getMahasiswa, createMahasiswa } from '../controllers/MahasiswaController.js';

const router = express.Router();

router.get('/', getMahasiswa);
router.post('/', createMahasiswa);
export default router;