import express from 'express';
import { register, login, getMe } from '../controllers/authController.js';
import { authMiddleware } from '../middleware/authMiddleware.js';

export const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.get("/me", authMiddleware, getMe);