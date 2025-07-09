// src/app/dashboard/users/actions/deactivate-user.ts
"use server";

import { createServerSupabaseClient } from "@/lib/supabase/server";

export async function deactivateUser(id: string, is_active: boolean) {
  const supabase = await createServerSupabaseClient();

  const { error } = await supabase
    .from("profiles")
    .update({ is_active })
    .eq("id", id);

  return { error: error?.message ?? null };
}
