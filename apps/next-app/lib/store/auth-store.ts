import { create } from "zustand";
import { persist } from "zustand/middleware";

type Session = {
  token: string;
  user: { id: string; name?: string; email: string };
  expiresAt: number;
} | null;

type AuthState = {
  session: Session;
  setSession: (s: Session) => void;
  clearSession: () => void;
  isAuthenticated: () => boolean;
  hasHydrated: boolean;
  setHasHydrated: (v: boolean) => void;
};

export const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      session: null,
      hasHydrated: false,

      setSession: (s) => {
        set({ session: s });
      },

      clearSession: () => {
        set({ session: null });
      },

      isAuthenticated: () => {
        const s = get().session;

        if (!s) return false;
        return s.expiresAt > Date.now();
      },

      setHasHydrated: (v) => set({ hasHydrated: v }),
    }),

    {
      name: "ticketapp_auth",
      onRehydrateStorage: () => (state, error) => {
        if (error) console.error("Auth rehydration failed:", error);

        if (state?.setHasHydrated) state.setHasHydrated(true);
      },
    }
  )
);
