'use client';

import ERDiagram from '../components/ERDiagram';
import { Node, Edge } from '../lib/graph/layout';

export default function Home() {
  // Sample data for demonstration
  const sampleNodes: Node[] = [
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
  ];

  const sampleEdges: Edge[] = [
    {
      id: 'users-posts',
      source: 'users',
      target: 'posts',
      data: { relationship: '1:N' }
    }
  ];

  return (
    <main className="min-h-screen p-8">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-4xl font-bold mb-8">DBTray - Database Schema Visualizer</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-semibold mb-4">ER Diagram</h2>
            <ERDiagram nodes={sampleNodes} edges={sampleEdges} />
          </div>

          <div>
            <h2 className="text-2xl font-semibold mb-4">Tools</h2>
            <div className="space-y-4">
              <button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                Import SQL Schema
              </button>
              <button className="w-full bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                Generate Migration
              </button>
              <button className="w-full bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
                Export Prisma Schema
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}