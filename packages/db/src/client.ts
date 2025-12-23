import { PrismaClient } from '@prisma/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
  pool: Pool;
};

// Create connection pool for PgBouncer
if (!globalForPrisma.pool && process.env.DATABASE_URL) {
  globalForPrisma.pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    // PgBouncer compatibility settings
    max: 1, // Single connection for serverless
  });
}

// Create Prisma client with pg adapter (disables prepared statements)
export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter: globalForPrisma.pool ? new PrismaPg(globalForPrisma.pool) : undefined,
    datasourceUrl: process.env.DATABASE_URL,
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
