import 'dotenv/config';
import express from "express";
import cors from "cors";
import { router as QueryRoutes } from "./routes/queryRoutes.js"
import { router as RepoRoutes } from "./routes/repoRoutes.js"
import { router as AuthRoutes } from "./routes/authRoutes.js"
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// Serve static files from the React app
const clientDistPath = path.join(__dirname, '../../client/dist');
app.use(express.static(clientDistPath));

app.use((req, res) => {
    res.sendFile(path.join(clientDistPath, 'index.html'));
});

app.listen(PORT, '0.0.0.0',() => {
    console.log(`Server is up and running on port ${PORT}`);
});