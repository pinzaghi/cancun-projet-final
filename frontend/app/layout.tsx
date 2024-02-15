import type { Metadata } from 'next'
 
// These styles apply to every route in the application
import './globals.css'
 
export const metadata: Metadata = {
  title: 'FreeNearMe App',
  description: 'Find and share free services in your neighborhood.',
}

export default function RootLayout({
    children,
  }: {
    children: React.ReactNode
  }) {
    return (
      <html lang="en">
        <head>
          <link rel="stylesheet" href="https://rsms.me/inter/inter.css" />
          <link rel="shortcut icon" href="/static/favicon.svg" />
        </head>
        <body>
          <main className="flex-1 space-y-4 p-8 pt-6">
          {children}
          </main>
        </body>
      </html>
    )
}