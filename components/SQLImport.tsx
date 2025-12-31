'use client';

import { useState } from 'react';
import { Node } from '../lib/graph/layout';

interface SQLImportProps {
  onTablesImported: (tables: Node[]) => void;
}

export default function SQLImport({ onTablesImported }: SQLImportProps) {
  const [sql, setSql] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleImport = async () => {
    if (!sql.trim()) return;

    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/parse-sql', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ sql }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to parse SQL');
      }

      // Convert tables to nodes
      const nodes: Node[] = data.tables.map((table: { name: string }, index: number) => ({
        id: table.name,
        x: 100 + (index * 150),
        y: 150 + (index * 100),
        width: 120,
        height: 80,
        data: { name: table.name }
      }));

      onTablesImported(nodes);
      setSql('');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold">Import SQL Schema</h3>
      <textarea
        value={sql}
        onChange={(e) => setSql(e.target.value)}
        placeholder="Paste your CREATE TABLE statements here..."
        className="w-full h-32 p-2 border rounded resize-none"
        disabled={isLoading}
      />
      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
      <button
        onClick={handleImport}
        disabled={isLoading || !sql.trim()}
        className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:opacity-50"
      >
        {isLoading ? 'Importing...' : 'Import SQL'}
      </button>
    </div>
  );
}