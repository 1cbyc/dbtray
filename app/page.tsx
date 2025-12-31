'use client';

import { useState } from 'react';
import ERDiagram from '../components/ERDiagram';
import SQLImport from '../components/SQLImport';
import MigrationGenerator from '../components\MigrationGenerator';
import { Node, Edge } from '../lib/graph/layout';
import { TableSchema } from '../lib/parsers/sql-parser';

export default function Home() {
  const [nodes, setNodes] = useState<Node[]>([
    {
      id: 'users',
      x: 200,
      y: 200,
      width: 120,
      height: 80,
      data: { name: 'Users' }
    },
    {
      id: 'posts',
      x: 400,
      y: 200,
      width: 120,
      height: 80,
      data: { name: 'Posts' }
    }
  ]);

  const [edges, setEdges] = useState<Edge[]>([
    {
      id: 'users-posts',
      source: 'users',
      target: 'posts',
      data: { relationship: '1:N' }
    }
  ]);

  const addTable = () => {
    const newId = `table_${Date.now()}`;
    const newNode: Node = {
      id: newId,
      x: Math.random() * 400 + 100,
      y: Math.random() * 300 + 100,
      width: 120,
      height: 80,
      data: { name: `Table ${nodes.length + 1}` }
    };
    setNodes([...nodes, newNode]);
  };

  const handleTablesImported = (newTables: Node[]) => {
    setNodes([...nodes, ...newTables]);
  };

  const convertNodesToTables = (): TableSchema[] => {
    return nodes.map(node => ({
      name: node.data.name,
      columns: [
        { name: 'id', type: 'INTEGER', nullable: false, primaryKey: true }
      ],
      constraints: []
    }));
  };

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">DBTray - Database Schema Visualizer</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">ER Diagram</h2>
            <ERDiagram
              nodes={nodes}
              edges={edges}
              onNodesChange={setNodes}
              onEdgesChange={setEdges}
            />
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Tools</h2>
            <div className="space-y-4">
              <button
                onClick={addTable}
                className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Add Table
              </button>

              <SQLImport onTablesImported={handleTablesImported} />

              <MigrationGenerator tables={convertNodesToTables()} />

              <button className="w-full bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600">
                Export Prisma Schema
              </button>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold mb-2">Tables</h3>
              <div className="space-y-2">
                {nodes.map(node => (
                  <div key={node.id} className="p-2 bg-gray-100 rounded">
                    {node.data.name}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}