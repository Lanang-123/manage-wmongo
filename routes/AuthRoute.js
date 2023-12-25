import express from "express";
import { register, login,getUser } from "../controllers/AuthController.js";
import { refreshToken } from "../controllers/RefreshTokenController.js";
import { verifyToken } from "../middleware/VerifyToken.js";



const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/token',verifyToken,refreshToken);
router.get('/user',verifyToken,getUser);

export default router;