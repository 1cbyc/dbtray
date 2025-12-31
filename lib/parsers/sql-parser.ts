import { Parser } from 'node-sql-parser';

export interface TableSchema {
  name: string;
  columns: ColumnSchema[];
  constraints: Constraint[];
}

export interface ColumnSchema {
  name: string;
  type: string;
  nullable: boolean;
  defaultValue?: string;
  primaryKey?: boolean;
}

export interface Constraint {
  type: 'PRIMARY KEY' | 'FOREIGN KEY' | 'UNIQUE' | 'CHECK';
  columns: string[];
  references?: {
    table: string;
    columns: string[];
  };
}

export class SQLParser {
  private parser: Parser;

  constructor() {
    this.parser = new Parser();
  }

  parseCreateTable(sql: string): TableSchema | null {
    try {
      const ast = this.parser.astify(sql);
      // Simplified parsing - in a real implementation, you'd traverse the AST
      // For now, return a mock table
      if (sql.toUpperCase().includes('CREATE TABLE')) {
        const tableName = sql.match(/CREATE TABLE (\w+)/i)?.[1] || 'unknown';
        return {
          name: tableName,
          columns: [
            { name: 'id', type: 'INTEGER', nullable: false, primaryKey: true }
          ],
          constraints: []
        };
      }
      return null;
    } catch (error) {
      console.error('Failed to parse SQL:', error);
      return null;
    }
  }

  parseSchema(sql: string): TableSchema[] {
    // Split SQL into individual CREATE TABLE statements
    const statements = sql.split(';').filter(stmt => stmt.trim());
    const tables: TableSchema[] = [];

    for (const statement of statements) {
      const table = this.parseCreateTable(statement);
      if (table) {
        tables.push(table);
      }
    }

    return tables;
  }
}