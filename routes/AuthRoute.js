import express from "express";
import { register, login, getUser, logout } from "../controllers/AuthController.js";
import { refreshToken } from "../controllers/RefreshTokenController.js";
import { verifyToken } from "../middleware/VerifyToken.js";



const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/token', verifyToken, refreshToken);
router.get('/user', verifyToken, getUser);
router.post('/logout', verifyToken, logout);

export default router;