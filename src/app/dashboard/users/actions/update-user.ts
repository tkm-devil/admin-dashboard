// src/app/dashboard/users/actions/update-user.ts
"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function updateUser(
  id: string,
  updates: {
    full_name?: string;
    role?: string;
  }
) {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase
    .from("profiles")
    .update({ ...updates })
    .eq("id", id);

  return { error: error?.message ?? null };
}
