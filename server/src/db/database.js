import { prisma } from "../lib/prisma";
import { withRetry } from "./retryFunction";

export async function getProject({ userId, projectId }) {
    return withRetry(async () => {
        const project = await prisma.project.findUnique({
            where: { id: projectId, userId },
            include: { entries: true },
        });

        if (!project) return null;

        const embeddings = await prisma.$queryRaw`
            SELECT id, embedding::text FROM "Entry"
            WHERE "projectId" = ${projectId}
        `;

        // embeddings comes out as a string, hence parsing it before processing
        const embeddingMap = {};
        for (const row of embeddings) {
            embeddingMap[row.id] = JSON.parse(row.embedding);
        }

        project.entries = project.entries.map(entry => ({
            ...entry,
            embedding: embeddingMap[entry.id] ?? null,
        }));

        return project;
    })
}

export async function getUserProjects({ userId }) {
    return withRetry(async () => {
        const projects = await prisma.project.findMany({
            where: {
                userId,
            },
        });
        return projects;
    })
}