import express from "express"
import { handleRepo, getUserRepos } from "../controllers/repoController.js";

export const router = express.Router();

router.post("/", handleRepo);
router.get("/", getUserRepos);