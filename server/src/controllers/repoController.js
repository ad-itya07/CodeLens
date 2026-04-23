import { repoQueue } from "../queue/index.js";
import { prisma } from "../lib/prisma.js";
import { getOneProject, getUserProjects } from "../db/database.js";
import { withRetry } from "../db/retryFunction.js";

export async function handleRepo(req, res) {
    const { githubUrl } = req.body;
    const userId = req.user.id;

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
            const doesExist = await prisma.project.findFirst({
                where: {
                    userId,
                    repoUrl: githubUrl,
                }
            });
            if (doesExist && doesExist.status !== "FAILED") {
                return res.status(200).json({ message: "Project already exists!" });
            }
            project = await prisma.project.create({
                data: {
                    userId,
                    repoUrl: githubUrl,
                    status: "PENDING",
                    currentStep: "Queued for processing",
                    totalEntities: 0,
                    completedEntities: 0,
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
    const userId = req.user.id;
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
    const userId = req.user.id;

    try {
        const project = await prisma.project.findFirst({
            where: {
                id,
                userId
            },
            select: {
                id: true,
                status: true,
                currentStep: true,
                completedEntities: true,
                totalEntities: true,
                updatedAt: true
            }
        });

        if (!project) {
            return res.status(404).json({
                success: false,
                message: "Project not found"
            });
        }

        return res.status(200).json({
            success: true,
            project,
            percentage: project.totalEntities > 0 ? Math.round((project.completedEntities / project.totalEntities) * 100) : 0,
        });
    } catch (err) {
        console.error("Prisma Error in getRepoStatus:", err);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error!",
            error: err.message
        });
    }
}