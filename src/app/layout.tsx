import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Tic Tac Toe',
  description: 'A fun Tic Tac Toe game built with Next.js',
  icons: {
    icon: '/favicon.ico',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800">
        {children}
      </body>
    </html>
  )
}
