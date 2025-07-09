// src/app/dashboard/users/page.tsx
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { UserTable } from "./components/user-table";
import type { Database } from "@/types/supabase";
import type { User } from "@/types/user";

export default async function UsersPage() {
  const supabase = await createServerSupabaseClient();

  const { data, error } = await supabase
    .from("profiles")
    .select(
      "id, email, full_name, role, is_active, last_login, created_at, updated_at"
    )
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching users:", error.message);
    return <div className="text-red-500">Failed to load users.</div>;
  }

  // Cast Supabase data into your strict User type (null → undefined)
  const users: User[] = (data ?? []).map((u) => ({
    id: u.id,
    email: u.email,
    full_name: u.full_name ?? undefined,
    role: u.role ?? undefined,
    is_active: u.is_active ?? undefined,
    last_login: u.last_login ?? undefined,
    created_at: u.created_at ?? undefined,
    updated_at: u.updated_at ?? undefined,
  }));

  return <UserTable users={users} />;
}
