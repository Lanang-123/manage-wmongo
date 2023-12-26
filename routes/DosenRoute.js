import express from "express";
import { getDosen } from "../controllers/DosenController.js";

const router = express.Router();


router.get("/", getDosen)


export default router;