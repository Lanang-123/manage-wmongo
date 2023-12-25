import express from "express";
import { getKhs, getKhsByNim, createKhs, updateKhs, deleteKhs } from "../controllers/KHSController.js";

const router = express.Router();

router.get("/", getKhs);
router.get("/:nim", getKhsByNim);
router.post("/", createKhs);
router.post("/:id", updateKhs);
router.get("/:id", deleteKhs);


export default router;