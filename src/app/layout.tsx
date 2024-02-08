export const metadata = {
  title: 'Эй, красавица!',
  description: 'Моему котику со всей любовью',
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
