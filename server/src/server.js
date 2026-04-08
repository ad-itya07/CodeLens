import express from "express";
import dotenv from "dotenv";
import { router as QueryRoutes } from "./routes/queryRoutes.js"
import { router as RepoRoutes } from "./routes/repoRoutes.js"

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.use("/api/query", QueryRoutes);
app.use("/api/repo", RepoRoutes);

app.get("/health", (req, res) => {
    res.send("Server is running!")
});

app.listen(PORT, () => {
    console.log("Server is up and running!");
});