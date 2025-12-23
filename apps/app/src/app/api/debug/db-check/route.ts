import { db } from '@db';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';
export const runtime = 'nodejs';

export async function GET() {
  try {
    // Test basic connection
    await db.$queryRaw`SELECT 1 as test`;

    // Get all tables
    const tables = await db.$queryRaw<any[]>`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      ORDER BY table_name;
    `;

    // Check auth tables specifically
    const authTables = ['User', 'Session', 'Account', 'Verification'];
    const authTablesStatus = authTables.map((table) => ({
      table,
      exists: tables.some(
        (t) => t.table_name.toLowerCase() === table.toLowerCase(),
      ),
    }));

    // Check migrations
    let migrations = [];
    try {
      migrations = await db.$queryRaw<any[]>`
        SELECT migration_name, finished_at
        FROM _prisma_migrations
        ORDER BY finished_at DESC
        LIMIT 10;
      `;
    } catch (e) {
      // Migration table doesn't exist
    }

    // Count records in key tables
    let userCount = 0;
    let sessionCount = 0;
    try {
      const users = await db.user.count();
      const sessions = await db.session.count();
      userCount = users;
      sessionCount = sessions;
    } catch (e) {
      // Tables might not exist
    }

    return NextResponse.json({
      status: 'ok',
      connection: 'success',
      database: {
        totalTables: tables.length,
        tableNames: tables.map((t) => t.table_name),
      },
      authTables: authTablesStatus,
      migrations: {
        total: migrations.length,
        latest: migrations.slice(0, 5),
      },
      counts: {
        users: userCount,
        sessions: sessionCount,
      },
      timestamp: new Date().toISOString(),
    });
  } catch (error: any) {
    return NextResponse.json(
      {
        status: 'error',
        error: error.message,
        code: error.code,
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    );
  }
}
