import { PrismaClient } from '@prisma/client';
import { PrismaNeon } from '@prisma/adapter-neon';
import { Pool } from '@neondatabase/serverless';

const globalForPrisma = global as unknown as {
  prisma: PrismaClient;
  pool?: Pool;
};

// Check if we're using PgBouncer (port 6543)
const isPgBouncer = process.env.DATABASE_URL?.includes(':6543');

// Create Neon serverless pool for PgBouncer - this driver doesn't use prepared statements
if (isPgBouncer && !globalForPrisma.pool && process.env.DATABASE_URL) {
  globalForPrisma.pool = new Pool({
    connectionString: process.env.DATABASE_URL
  });
}

// Create Prisma client with Neon adapter for PgBouncer compatibility
export const db =
  globalForPrisma.prisma ||
  new PrismaClient({
    adapter: isPgBouncer && globalForPrisma.pool
      ? new PrismaNeon(globalForPrisma.pool)
      : undefined,
    datasourceUrl: process.env.DATABASE_URL,
  });

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = db;
