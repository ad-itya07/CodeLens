import "dotenv/config";
import { Worker } from "bullmq";
import { redis } from "../lib/redis.js";
import path from "path";
import fs from "fs";

import { cloneRepo } from "../utils/gitClone.js";
import { parseRepo } from "../parser/parser.js";
import { embed } from "../embeddings/embedder.js";
import { prisma } from "../lib/prisma.js";

const worker = new Worker(
  "repo-processing",
  async (job) => {
    const { projectId, githubUrl } = job.data;

    const repoName = `repo-${Date.now()}`;
    const repoPath = path.join("repos", repoName);

    try {
      await prisma.project.update({
        where: { id: projectId },
        data: { status: "PARSING" },
      });

      if (!fs.existsSync("repos")) {
        fs.mkdirSync("repos");
      }

      await cloneRepo(githubUrl, repoPath);

      const entries = parseRepo(repoPath);

      if (!entries || entries.length === 0) {
        throw new Error("Parsing failed or empty dataset!");
      }

      console.log("Updating Entries in DB...");

      for (const entry of entries) {
        await prisma.entry.create({
          data: {
            projectId,
            name: entry.name,
            type: entry.type,
            filePath: entry.filePath,
            code: entry.code,
            // meta: entry,
            nameTokens: entry.nameTokens,
            normalizedNameTokens: entry.normalizedNameTokens,
            fileTokens: entry.fileTokens,
            embeddingText: entry.embeddingText,
          },
        });
      }

      await prisma.project.update({
        where: { id: projectId },
        data: { status: "EMBEDDING" },
      });

      // EMBEDDING UPDATE
      console.log("Starting embeddings...");

      await prisma.project.update({
        where: { id: projectId },
        data: { status: "EMBEDDING" },
      });

      const dbEntries = await prisma.entry.findMany({
        where: { projectId },
      });

      for (const entry of dbEntries) {
        if (!entry.embeddingText) continue;

        console.log("Processing embeddings for: ", entry.name);

        const vector = await embed(entry.embeddingText);

        // Raw SQL: vector field
        await prisma.$executeRaw`
          UPDATE "Entry"
          SET embedding = (${JSON.stringify(vector)})::vector
          WHERE id = ${entry.id}
        `;
      }

      console.log("Repo parsing done successfully!");
      await prisma.project.update({
        where: { id: projectId },
        data: { status: "READY" },
      });
    } catch (err) {
      console.error(err);

      await prisma.project.update({
        where: { id: projectId },
        data: { status: "FAILED" },
      });

      throw err;
    } finally {
      if (fs.existsSync(repoPath)) {
        fs.rmSync(repoPath, { recursive: true, force: true });
      }
    }
  },
  {
    connection: redis,
    stalledInterval: 60000,
    lockDuration: 120000,
    lockRenewTime: 60000,
  },
);

export default worker;
