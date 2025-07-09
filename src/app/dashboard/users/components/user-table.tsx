'use client'

import { useState } from 'react'
import { Card } from '@/components/ui/card'
import { ScrollArea } from '@/components/ui/scroll-area'
import type { User } from '@/types/user'
import { UserRow } from './user-row'

interface UserTableProps {
  users: User[]
}

export function UserTable({ users: initialUsers }: UserTableProps) {
  const [users, setUsers] = useState<User[]>(initialUsers)

  const handleUserUpdate = (updatedUser: User) => {
    setUsers((prev) =>
      prev.map((u) => (u.id === updatedUser.id ? updatedUser : u))
    )
  }

  const handleUserDelete = (userId: string) => {
    setUsers((prev) => prev.filter((u) => u.id !== userId))
  }

  return (
    <Card className="p-4 shadow-sm border">
      <div className="mb-4">
        <h2 className="text-lg font-semibold">All Users</h2>
        <p className="text-sm text-muted-foreground">
          List of admins in their respective domains
        </p>
      </div>

      <ScrollArea className="w-full">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm border-collapse">
            <thead>
              <tr className="border-b bg-muted text-left">
                <th className="py-2 px-4">Name</th>
                <th className="py-2 px-4">Email</th>
                <th className="py-2 px-4">Role</th>
                <th className="py-2 px-4">Status</th>
                <th className="py-2 px-4">Last Login</th>
                <th className="py-2 px-4">Created At</th>
                <th className="py-2 px-4 text-right">Actions</th>
              </tr>
            </thead>

            <tbody>
              {users.length === 0 ? (
                <tr>
                  <td
                    colSpan={7}
                    className="py-4 px-4 text-center text-muted-foreground"
                  >
                    No users found.
                  </td>
                </tr>
              ) : (
                users.map((user) => (
                  <UserRow
                    key={user.id}
                    user={user}
                    onUpdate={handleUserUpdate}
                    onDelete={handleUserDelete}
                  />
                ))
              )}
            </tbody>
          </table>
        </div>
      </ScrollArea>
    </Card>
  )
}
