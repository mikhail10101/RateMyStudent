import type { Metadata } from 'next'
import './globals.css'
import { poppins } from '@/lib/fonts'

export const metadata: Metadata = {
  title: 'Rate My Student',
  description: 'Hear from other professors!',
  keywords: "professor, student, rate",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.className} antialiased`}>{children}</body>
    </html>
  )
}
