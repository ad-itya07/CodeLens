import 'dotenv/config'
import { PrismaClient } from '../generated/prisma/client.ts'
import { PrismaNeon } from '@prisma/adapter-neon'
import { neonConfig } from '@neondatabase/serverless';
import ws from 'ws';

neonConfig.webSocketConstructor = ws;
// neonConfig.poolQueryViaFetch = true;

const adapter = new PrismaNeon({
  connectionString: process.env.DIRECT_URL,
  connectionTimeoutMillis: 30000,
  max: 5
})

export const prisma = new PrismaClient({ adapter })