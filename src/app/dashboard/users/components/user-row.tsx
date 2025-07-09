// src/app/dashboard/users/components/user-row.tsx

import { format } from "date-fns"
import { Badge } from "@/components/ui/badge"
import { UserActions } from "./user-actions"
import type { User } from "@/types/user"

interface UserRowProps {
  user: User
  onUpdate?: (user: User) => void
  onDelete?: (userId: string) => void
}

export function UserRow({ user, onUpdate, onDelete }: UserRowProps) {
  return (
    <tr className="border-b hover:bg-muted/50">
      <td className="p-3 text-sm font-medium">{user.full_name || "-"}</td>
      <td className="p-3 text-sm">{user.email}</td>
      <td className="p-3 text-sm">
        <Badge variant="outline" className="capitalize">
          {user.role || "user"}
        </Badge>
      </td>
      <td className="p-3 text-sm">
        {user.is_active ? (
          <Badge className="bg-green-500 text-white">Active</Badge>
        ) : (
          <Badge variant="destructive">Inactive</Badge>
        )}
      </td>
      <td className="p-3 text-sm">
        {user.last_login
          ? format(new Date(user.last_login), "dd MMM yyyy, hh:mm a")
          : "-"}
      </td>
      <td className="p-3 text-sm">
        {user.created_at
          ? format(new Date(user.created_at), "dd MMM yyyy")
          : "-"}
      </td>
      <td className="p-3 text-sm text-right">
        <UserActions user={user} onUpdate={onUpdate} onDelete={onDelete} />
      </td>
    </tr>
  )
}
