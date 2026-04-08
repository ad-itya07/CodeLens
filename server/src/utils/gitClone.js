import { execSync } from "child_process";

export async function cloneRepo(repoUrl, targetPath) {
    try {
        execSync(`git clone ${repoUrl} ${targetPath}`, { stdio: "inherit" });
    } catch (err) {
        throw new Error("Failed to clone repo");
    }
}