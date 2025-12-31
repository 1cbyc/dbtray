import { NextRequest, NextResponse } from 'next/server';
import { SQLParser } from '../../../lib/parsers/sql-parser';

export async function POST(request: NextRequest) {
  try {
    const { sql } = await request.json();

    if (!sql || typeof sql !== 'string') {
      return NextResponse.json({ error: 'SQL string is required' }, { status: 400 });
    }

    const parser = new SQLParser();
    const tables = parser.parseSchema(sql);

    return NextResponse.json({ tables });
  } catch (error) {
    console.error('Error parsing SQL:', error);
    return NextResponse.json({ error: 'Failed to parse SQL' }, { status: 500 });
  }
}