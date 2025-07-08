import { create } from "zustand";
import { supabase } from "../lib/supabase/client";
import { Session, User } from "@supabase/supabase-js";

interface AuthState {
  user: User | null;
  session: Session | null;
  loading: boolean;
  setUser: (user: User | null) => void;
  fetchSession: () => Promise<void>;
  signOut: () => Promise<void>;
}

export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  session: null,
  loading: true,

  setUser: (user) => set({ user }),

  fetchSession: async () => {
    set({ loading: true });
    const { data, error } = await supabase.auth.getSession();
    if (!error) {
      set({
        user: data.session?.user ?? null,
        session: data.session ?? null,
        loading: false,
      });
    } else {
      set({ user: null, session: null, loading: false });
    }
  },

  signOut: async () => {
    await supabase.auth.signOut();
    set({ user: null, session: null });
  },
}));
