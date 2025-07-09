// src/app/dashboard/users/actions/delete-user.ts
"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function deleteUser(id: string) {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase.from("profiles").delete().eq("id", id);

  return { error: error?.message ?? null };
}
