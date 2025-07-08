// src/app/dashboard/layout.tsx
import { createServerSupabaseClient } from "@/lib/supabase/server";
import { Shell } from "@/components/layout/shell";
import type { ReactNode } from "react";

export default async function DashboardLayout({
  children,
}: {
  children: ReactNode;
}) {
  const supabase = await createServerSupabaseClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile: { full_name?: string } | null = null;

  if (user?.id) {
    const { data } = await supabase
      .from("profiles")
      .select("full_name")
      .eq("id", user.id)
      .single();

    profile = {
      full_name: data?.full_name ?? undefined,
    };
  }

  return (
    <Shell
      user={
        user
          ? {
              email: user.email!,
              full_name: profile?.full_name,
            }
          : null
      }
    >
      {children}
    </Shell>
  );
}
