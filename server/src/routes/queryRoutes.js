import express from "express";
import { handleQuery, saveQuery, getQueries, getProjectQuestions } from "../controllers/queryController.js";

export const router = express.Router();

router.post("/", handleQuery);
router.post("/save", saveQuery);
router.get("/", getQueries);