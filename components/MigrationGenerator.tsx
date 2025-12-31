'use client';

import { useState } from 'react';
import { TableSchema } from '../lib/parsers/sql-parser';

interface MigrationGeneratorProps {
  tables: TableSchema[];
}

export default function MigrationGenerator({ tables }: MigrationGeneratorProps) {
  const [generatedSQL, setGeneratedSQL] = useState('');
  const [generatedPrisma, setGeneratedPrisma] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async () => {
    if (tables.length === 0) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/generate-migration', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ tables }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to generate migration');
      }

      setGeneratedSQL(data.sqlMigrations);
      setGeneratedPrisma(data.prismaSchema);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Generate Migration</h3>
      <button
        onClick={handleGenerate}
        disabled={isLoading || tables.length === 0}
        className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600 disabled:opacity-50"
      >
        {isLoading ? 'Generating...' : 'Generate Migration'}
      </button>

      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}

      {generatedSQL && (
        <div>
          <h4 className="font-semibold mb-2">SQL Migration:</h4>
          <textarea
            value={generatedSQL}
            readOnly
            className="w-full h-32 p-2 border rounded resize-none font-mono text-sm"
          />
        </div>
      )}

      {generatedPrisma && (
        <div>
          <h4 className="font-semibold mb-2">Prisma Schema:</h4>
          <textarea
            value={generatedPrisma}
            readOnly
            className="w-full h-32 p-2 border rounded resize-none font-mono text-sm"
          />
        </div>
      )}
    </div>
  );
}