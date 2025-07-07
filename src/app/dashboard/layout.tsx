// src/app/dashboard/layout.tsx
import { Shell } from '@/components/layout/shell'
import { ThemeProvider } from '@/components/theme-provider'

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
    >
      <Shell>
        {children}
      </Shell>
    </ThemeProvider>
  )
}