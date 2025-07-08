// src/components/layout/shell.tsx
'use client'

import { useState } from 'react'
import { Sidebar } from './sidebar'
import { Topbar } from './topbar'
import { cn } from '@/lib/utils'

interface ShellProps {
  children: React.ReactNode
  user: {
    email: string
    full_name?: string
  } | null
}

export function Shell({ children, user }: ShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed)
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <aside className={cn(
        "hidden md:flex transition-all duration-300",
        sidebarCollapsed ? "w-16" : "w-64"
      )}>
        <Sidebar 
          isCollapsed={sidebarCollapsed} 
          onToggle={toggleSidebar}
          user={user}
        />
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Topbar */}
        <Topbar 
          onMenuClick={toggleSidebar}
          showMenuButton={true}
          user={user}
        />

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-4 lg:p-6">
            {children}
          </div>
        </main>
      </div>

      {/* Mobile Sidebar Overlay */}
      {!sidebarCollapsed && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 md:hidden"
          onClick={toggleSidebar}
        >
          <aside className="absolute left-0 top-0 h-full w-64 bg-background">
            <Sidebar 
              isCollapsed={false} 
              onToggle={toggleSidebar}
              user={user}
            />
          </aside>
        </div>
      )}
    </div>
  )
}
