"use client"
import { useEffect } from 'react'
import { register } from './sw-register'

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  useEffect(() => {
    register()
  }, [])

  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}