import { Queue } from "bullmq";
import { redis } from "../lib/redis.js";

export const repoQueue = new Queue("repo-processing", {
  connection: redis,
});