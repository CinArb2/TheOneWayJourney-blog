import React from 'react'
import '../styles/globals.css'

export const metadata = {
  title: 'The One Way Journey - Tips',
  description: 'Welcome to The One Way Journey',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
