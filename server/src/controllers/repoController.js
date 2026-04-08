import path from "path";
import fs from "fs";
import { cloneRepo } from "../utils/gitClone.js";
import { setDatabase } from "../db/database.js";
import { parseRepo } from "../parser/parser.js";

export async function handleRepo(req, res) {
    const { githubUrl } = req.body;

    if (!githubUrl) {
        res.status(400).json({ message: "Github URL is required!" });
    }

    const repoName = `repo-${Date.now()}`
    const repoPath = path.join("repos", repoName);

    let DATABASE = null;
    let success = false;

    try {
        if (!fs.existsSync("repos")) {
            fs.mkdirSync("repos");
        }

        await cloneRepo(githubUrl, repoPath);

        DATABASE = parseRepo(repoPath);

        if (!DATABASE || DATABASE.length == 0) {
            throw new Error("Parsing failed or empty dataset!");
        }

        setDatabase(DATABASE);

        success = true;

        return res.status(200).json({
            success: true,
            message: "Repo processed successfully!",
            entries: DATABASE.length,
        });

    } catch (err) {
        console.error("Error parsing the repo!", err)
        res.status(500).json({ success: false, message: "Internal Server Error"});
    } finally {
        try {
            if (fs.existsSync(repoPath)) {
                // delete repo after parsing
                fs.rmSync(repoPath, { recursive: true, force: true});
            } 
        } catch (cleanupErr) {
            console.error("🚩 Clean up failed: ", cleanupErr);
        }
    }
}