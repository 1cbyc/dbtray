import { TableSchema } from '../parsers/sql-parser';

export interface MigrationStep {
  type: 'CREATE_TABLE' | 'ALTER_TABLE' | 'DROP_TABLE';
  table: string;
  sql: string;
}

export class MigrationGenerator {
  generateCreateTable(table: TableSchema): string {
    const columns = table.columns.map(col => {
      let colDef = `${col.name} ${col.type}`;
      if (!col.nullable) colDef += ' NOT NULL';
      if (col.defaultValue) colDef += ` DEFAULT ${col.defaultValue}`;
      if (col.primaryKey) colDef += ' PRIMARY KEY';
      return colDef;
    }).join(',\n  ');

    return `CREATE TABLE ${table.name} (\n  ${columns}\n);`;
  }

  generatePrismaSchema(tables: TableSchema[]): string {
    let schema = 'generator client {\n  provider = "prisma-client-js"\n}\n\n';
    schema += 'datasource db {\n  provider = "postgresql"\n  url      = env("DATABASE_URL")\n}\n\n';

    for (const table of tables) {
      schema += `model ${this.capitalize(table.name)} {\n`;
      for (const column of table.columns) {
        const prismaType = this.sqlTypeToPrismaType(column.type);
        let field = `  ${column.name} ${prismaType}`;
        if (!column.nullable) field += '?';
        if (column.primaryKey) field += ' @id';
        schema += field + '\n';
      }
      schema += '}\n\n';
    }

    return schema;
  }

  private sqlTypeToPrismaType(sqlType: string): string {
    const typeMap: { [key: string]: string } = {
      'INTEGER': 'Int',
      'VARCHAR': 'String',
      'TEXT': 'String',
      'BOOLEAN': 'Boolean',
      'DATE': 'DateTime',
      'TIMESTAMP': 'DateTime',
    };
    return typeMap[sqlType.toUpperCase()] || 'String';
  }

  private capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1);
  }
}