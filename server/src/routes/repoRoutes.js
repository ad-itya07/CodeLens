import express from "express"
import { handleRepo } from "../controllers/repoController.js";

export const router = express.Router();

router.post("/", handleRepo);