import { repoQueue } from "../queue/index.js";
import { prisma } from "../lib/prisma.js";
import { getOneProject, getUserProjects } from "../db/database.js";
import { withRetry } from "../db/retryFunction.js";

export async function handleRepo(req, res) {
    // TODO: After auth, req.userId will give userId
    const { githubUrl, userId } = req.body;

    if (!githubUrl || !userId) {
        return res.status(400).json({ message: "Github URL is required!" });
    }

    try {
        let user;
        await withRetry(async () => {
            user = await prisma.user.findUnique({
                where: {
                    id: userId,
                }
            });
        })

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }

        let project;
        await withRetry(async () => {
            project = await prisma.project.create({
                data: {
                    userId,
                    repoUrl: githubUrl,
                    status: "PENDING",
                },
            });
        })

        await repoQueue.add("process-repo", {
            projectId: project.id,
            githubUrl,
        });
        return res.status(200).json({
            success: true,
            message: "Repo queued for processing",
            projectId: project.id,
        });
    } catch (err) {
        console.error("Prisma Error in handleRepo:", err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!",
            error: err
        });
    }
}

export async function getUserRepos(req, res) {
    // const { userId } = req.userId; 
    const userId = "1";
    try {
        const projects = await getUserProjects({ userId });
        return res.status(200).json({
            success: true,
            projects,
        });
    } catch (err) {
        console.error("Prisma Error in getUserRepos:", err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!",
            error: err
        });
    }
}

export async function getRepoStatus(req, res) {
    const { id } = req.params;
    try {
        const project = await getOneProject({ id });
        return res.status(200).json({
            success: true,
            project,
        });
    } catch (err) {
        console.error("Prisma Error in getRepoStatus:", err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!",
            error: err
        });
    }
}