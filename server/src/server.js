import express from "express";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json());

app.get("/health", (req, res) => {
    res.send("Server is running!")
});

app.listen(PORT, () => {
    console.log("Server is up and running!");
});