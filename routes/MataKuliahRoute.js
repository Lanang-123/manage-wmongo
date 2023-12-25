import express from "express";
import { getMataKuliah, createMataKuliah, updateMataKuliah, deleteMataKuliah } from "../controllers/MataKuliahController.js";

const router = express.Router();

router.get('/', getMataKuliah);
router.post('/', createMataKuliah);
router.post('/:id', updateMataKuliah);
router.get('/delete/:id', deleteMataKuliah);

export default router;