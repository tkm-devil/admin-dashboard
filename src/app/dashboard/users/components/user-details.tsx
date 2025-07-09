// src/app/dashboard/users/components/user-details.tsx

"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { User } from "@/types/user";

interface UserDetailsProps {
  user: User | null;
  open: boolean;
  onClose: () => void;
}

export function UserDetails({ user, open, onClose }: UserDetailsProps) {
  if (!user) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>User Details</DialogTitle>
        </DialogHeader>
        <div className="space-y-2 text-sm">
          <p>
            <strong>Name:</strong> {user.full_name || "N/A"}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Role:</strong> {user.role || "user"}
          </p>
          <p>
            <strong>Status:</strong> {user.is_active ? "Active" : "Inactive"}
          </p>
          <p>
            <strong>Last Login:</strong> {user.last_login || "N/A"}
          </p>
          <p>
            <strong>Created At:</strong> {user.created_at || "N/A"}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
