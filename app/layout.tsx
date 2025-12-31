import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'DBTray - Database Schema Visualizer',
  description: 'Visual database designer with ER diagrams, migrations, and team collaboration',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}