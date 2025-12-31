import { NextRequest, NextResponse } from 'next/server';
import { MigrationGenerator } from '../../../lib/generators/migration-generator';
import { TableSchema } from '../../../lib/parsers/sql-parser';

export async function POST(request: NextRequest) {
  try {
    const { tables }: { tables: TableSchema[] } = await request.json();

    if (!tables || !Array.isArray(tables)) {
      return NextResponse.json({ error: 'Tables array is required' }, { status: 400 });
    }

    const generator = new MigrationGenerator();

    const sqlMigrations = tables.map(table => generator.generateCreateTable(table)).join('\n\n');
    const prismaSchema = generator.generatePrismaSchema(tables);

    return NextResponse.json({
      sqlMigrations,
      prismaSchema
    });
  } catch (error) {
    console.error('Error generating migration:', error);
    return NextResponse.json({ error: 'Failed to generate migration' }, { status: 500 });
  }
}