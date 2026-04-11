import { embed } from '../embeddings/embedder.js';
import { repoQueue } from "../queue/index.js";
import { prisma } from "../lib/prisma.js";

async function indexEntries(entries) {
  for (const entry of entries) {
    if (!entry.embeddingText) continue;

    const vector = await embed(entry.embeddingText);
    entry.embedding = vector;
  }
}

export async function handleRepo(req, res) {
    const { githubUrl, userId } = req.body;

    if (!githubUrl || !userId) {
        return res.status(400).json({ message: "Github URL is required!" });
    }

    try {
        const user = await prisma.user.findUniqueOrThrow({
            where: {
                id: userId,
            }
        });

        if (!user) {
            return res.status(404).json({ message: "User not found!" });
        }
        const project = await prisma.project.create({
            data: {
                userId,
                repoUrl: githubUrl,
                status: "PENDING",
            },
        });

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