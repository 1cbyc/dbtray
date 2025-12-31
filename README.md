# Database Schema Visualizer & Migration Tool

A visual database designer that generates ER diagrams, creates migrations, validates schemas, and enables team collaboration. Think dbdiagram.io meets Prisma Studio.

## Features

- Visual ER diagram editor with drag-and-drop tables
- SQL schema import from existing databases
- Migration generator for Prisma and Drizzle
- Multi-database support (PostgreSQL, MySQL, SQLite)
- Team collaboration with comments and version history
- Schema validation and optimization suggestions

## Tech Stack

- Next.js 14+ with App Router
- TypeScript
- D3.js for interactive visualizations
- SQL parsers (node-sql-parser)
- Prisma/Drizzle for migration generation
- Monaco Editor for code editing
- NextAuth.js for authentication

## Getting Started

1. Install dependencies:
   ```bash
   npm install
   ```

2. Run the development server:
   ```bash
   npm run dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

- `/app` - Next.js pages and API routes
- `/components` - Reusable UI components
- `/lib/parsers` - SQL parsing utilities
- `/lib/generators` - Migration and code generation
- `/lib/graph` - Graph algorithms for layout and relationships