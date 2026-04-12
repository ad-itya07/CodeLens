import express from "express"
import { handleRepo, getUserRepos, getRepoStatus } from "../controllers/repoController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

export const router = express.Router();

router.post("/", authMiddleware, handleRepo);
router.get("/", authMiddleware, getUserRepos);
router.get("/:id/status", authMiddleware, getRepoStatus);