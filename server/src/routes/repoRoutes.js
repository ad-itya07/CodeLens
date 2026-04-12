import express from "express"
import { handleRepo, getUserRepos, getRepoStatus } from "../controllers/repoController.js";

export const router = express.Router();

router.post("/", handleRepo);
router.get("/", getUserRepos);
router.get("/:id/status", getRepoStatus);