import express from "express";
import { getNilai, createNilai, updateNilai, deleteNilai } from "../controllers/NilaiController.js";


const router = express.Router();

router.get('/', getNilai);
router.post('/', createNilai);
router.post('/:id', updateNilai);
router.get('/delete/:id', deleteNilai);

export default router;