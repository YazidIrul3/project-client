import { UserEntity } from "@/types/api/user";
import { is } from "date-fns/locale";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UseAuthenticated = {
  isAuthenticated: boolean;
  user: {
    id: string;
    email: string;
    name: string;
  };
  setIsAuthenticated: (isAuthenticated: boolean) => void;
  token: string;
  expiresAt: Date;
  onLogin: (
    token: string,
    user: UseAuthenticated["user"],
    expiresAt: Date
  ) => void;
  onLogout: () => void;
};

export const useAuthenticated = create<UseAuthenticated>()(
  persist(
    (set, get) => ({
      isAuthenticated: false,
      setIsAuthenticated: (isAuthenticated: boolean) =>
        set({ isAuthenticated }),
      token: "",
      user: {} as UseAuthenticated["user"],
      expiresAt: new Date(),
      onLogin: (
        token: string,
        user: UseAuthenticated["user"],
        expiresAt: Date
      ) => {
        set({ token, user, expiresAt });
      },
      onLogout: () => {
        set({
          token: undefined,
          user: undefined,
          expiresAt: undefined,
          isAuthenticated: false,
        });
      },
    }),
    {
      name: "authenticated-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
