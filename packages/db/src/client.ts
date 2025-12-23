import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
  pool?: Pool;
};

// Check if we're using PgBouncer (port 6543)
const isPgBouncer = process.env.DATABASE_URL?.includes(':6543');

// Create pool for PgBouncer - use pg adapter which handles prepared statements differently
if (isPgBouncer && !globalForPrisma.pool && process.env.DATABASE_URL) {
  globalForPrisma.pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    max: 1, // Single connection for serverless
  });
}

// Create Prisma client with adapter for PgBouncer compatibility
export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter: isPgBouncer && globalForPrisma.pool
      ? new PrismaPg(globalForPrisma.pool)
      : undefined,
    datasourceUrl: process.env.DATABASE_URL,
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
