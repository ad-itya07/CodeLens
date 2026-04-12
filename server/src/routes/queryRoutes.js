import express from "express";
import { handleQuery, saveQuery, getQueries } from "../controllers/queryController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

export const router = express.Router();

router.post("/", authMiddleware, handleQuery);
router.post("/save", authMiddleware, saveQuery);
router.get("/", authMiddleware, getQueries);