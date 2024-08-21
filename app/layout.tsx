import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

import { Footer } from './_components/footer'
import { Toaster } from './_components/ui/sonner'
import { AuthProvider } from './_providers/auth'

import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'FSW Barber',
  description: 'Aplicação intuitiva para agendamentos de barbearias.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <AuthProvider>
          <div className="flex h-full flex-col">
            <div className="flex-1">{children}</div>

            <Footer />
          </div>
        </AuthProvider>
        <Toaster />
      </body>
    </html>
  )
}
