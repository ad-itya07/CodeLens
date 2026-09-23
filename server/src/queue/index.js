import { Queue } from "bullmq";
import { redis } from "../lib/redis.js";

export const repoQueue = new Queue("repo-processing", {
  connection: redis,
  defaultJobOptions: {
    removeOnComplete: { count: 100 },
    removeOnFail: { count: 50 },
  },
});