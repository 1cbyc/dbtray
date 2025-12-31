# DBTray - Database Schema Visualizer & Migration Tool

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Next.js](https://img.shields.io/badge/Next.js-14.0+-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0+-blue)](https://www.typescriptlang.org/)
[![D3.js](https://img.shields.io/badge/D3.js-7.8+-orange)](https://d3js.org/)

A visual database designer that generates ER diagrams, creates migrations, validates schemas, and enables team collaboration. Think dbdiagram.io meets Prisma Studio.

## Features

- **Visual ER diagram editor** with drag-and-drop tables
- **SQL schema import** from existing databases
- **Migration generator** for Prisma and Drizzle
- **Multi-database support** (PostgreSQL, MySQL, SQLite)
- **Team collaboration** with comments and version history
- **Schema validation** and optimization suggestions

## Tech Stack

- **Next.js 14+** with App Router
- **TypeScript**
- **D3.js** for interactive visualizations
- **SQL parsers** (node-sql-parser)
- **Prisma/Drizzle** for migration generation
- **Monaco Editor** for code editing
- **NextAuth.js** for authentication

## Getting Started

### Prerequisites

- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/1cbyc/dbtray.git
   cd dbtray
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Run the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3001](http://localhost:3001) in your browser.

## Project Structure

```
├── app/                    # Next.js pages and API routes
│   ├── api/               # API endpoints
│   ├── globals.css        # Global styles
│   ├── layout.tsx         # Root layout
│   └── page.tsx          # Home page
├── components/            # Reusable UI components
│   ├── ERDiagram.tsx     # Main diagram component
│   ├── SQLImport.tsx     # SQL import functionality
│   └── MigrationGenerator.tsx
├── lib/                  # Utility libraries
│   ├── parsers/          # SQL parsing utilities
│   ├── generators/       # Migration generators
│   └── graph/           # Graph algorithms
└── public/              # Static assets
```

## Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Development

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/your-feature`
3. Make your changes and add tests
4. Run the build: `npm run build`
5. Commit your changes: `git commit -m 'Add some feature'`
6. Push to the branch: `git push origin feature/your-feature`
7. Open a Pull Request

### Code Quality

- Run linting: `npm run lint`
- Build before committing: `npm run build`
- Follow TypeScript best practices
- Write meaningful commit messages

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Roadmap

- [ ] Database connection integration
- [ ] Real-time collaboration
- [ ] Advanced schema validation
- [ ] Export to multiple formats
- [ ] Plugin system for custom generators
- [ ] Version control integration

## Support

If you find this project helpful, please give it a ⭐️ on GitHub!

For questions or issues, please open an [issue](https://github.com/1cbyc/dbtray/issues) on GitHub.