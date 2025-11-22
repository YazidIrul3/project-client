import { User } from "@/types/api";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Props = {
  user: User | {};
  setSession: (data: User) => void;
};

export const useSession = create<Props>()(
  persist(
    (set, get) => ({
      user: {},
      setSession: (data: User) => {
        set({ user: data });
      },
    }),
    {
      name: "auth-sesion",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
