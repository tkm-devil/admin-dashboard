// src/app/dashboard/users/components/user-actions.tsx
"use client"

import { MoreHorizontal, Pencil, Shield, Trash2, UserX } from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import type { User } from "@/types/user"
import { updateUser } from "../actions/update-user"
import { deactivateUser } from "../actions/deactivate-user"
import { deleteUser } from "../actions/delete-user"
import { useTransition } from "react"
import { toast } from "sonner"

interface UserActionsProps {
  user: User
  onUpdate?: (user: User) => void
  onDelete?: (userId: string) => void
}

export function UserActions({ user, onUpdate, onDelete }: UserActionsProps) {
  const [isPending, startTransition] = useTransition()

  const handlePromote = () => {
    startTransition(async () => {
      const { error } = await updateUser(user.id, { role: "admin" })

      if (error) {
        toast.error(`Failed to promote user: ${error}`)
      } else {
        toast.success("User promoted to admin")
        if (onUpdate) {
          onUpdate({ ...user, role: "admin" })
        }
      }
    })
  }

  const handleDeactivate = () => {
    startTransition(async () => {
      const { error } = await deactivateUser(user.id, false)

      if (error) {
        toast.error(`Failed to deactivate user: ${error}`)
      } else {
        toast.success("User deactivated")
        if (onUpdate) {
          onUpdate({ ...user, is_active: false })
        }
      }
    })
  }

  const handleDelete = () => {
    startTransition(async () => {
      const { error } = await deleteUser(user.id)

      if (error) {
        toast.error(`Failed to delete user: ${error}`)
      } else {
        toast.success("User deleted")
        if (onDelete) {
          onDelete(user.id)
        }
      }
    })
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          disabled={isPending}
        >
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-40">
        <DropdownMenuItem
          onClick={handlePromote}
          disabled={isPending || user.role === "admin"}
        >
          <Shield className="mr-2 h-4 w-4" /> Promote
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleDeactivate}
          disabled={isPending || !user.is_active}
        >
          <UserX className="mr-2 h-4 w-4" /> Deactivate
        </DropdownMenuItem>
        <DropdownMenuItem disabled>
          <Pencil className="mr-2 h-4 w-4" /> Edit (soon)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleDelete} disabled={isPending}>
          <Trash2 className="mr-2 h-4 w-4 text-red-500" /> Delete
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
