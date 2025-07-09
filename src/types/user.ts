import type { Tables } from "@/types/supabase";

export type User = {
  id: string;
  email: string;
  full_name?: string;
  role?: string;
  is_active?: boolean;
  last_login?: string;
  created_at?: string;
  updated_at?: string;
};
