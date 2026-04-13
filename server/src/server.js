import 'dotenv/config';
import express from "express";
import cors from "cors";
import { router as QueryRoutes } from "./routes/queryRoutes.js"
import { router as RepoRoutes } from "./routes/repoRoutes.js"
import { router as AuthRoutes } from "./routes/authRoutes.js"

const PORT = process.env.PORT || 3000;

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/query", QueryRoutes);
app.use("/api/repo", RepoRoutes);
app.use("/api/auth", AuthRoutes);

app.get("/health", (req, res) => {
    res.send("Server is running!")
});

app.listen(PORT, () => {
    console.log("Server is up and running!");
});