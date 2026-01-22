import { authClient } from "@/libs/auth-client";
import { boolean, email } from "zod";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UseHover = {
  isHover: boolean;
  onHover: () => void;
  offHover: () => void;
};

export const useHover = create<UseHover>()(
  persist(
    (set, get) => ({
      isHover: false,

      onHover: () => {
        set({ isHover: true });
      },

      offHover: () => {
        set({ isHover: false });
      },
    }),
    {
      name: "use-hover",
      storage: createJSONStorage(() => sessionStorage),
    }
  )
);
