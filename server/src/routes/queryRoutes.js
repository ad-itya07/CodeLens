import express from "express";
import { handleQuery } from "../controllers/queryController.js";

export const router = express.Router();

router.post("/", handleQuery);