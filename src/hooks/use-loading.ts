import { set } from "zod";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type UseLoading = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export const useLoading = create<UseLoading>()(
  persist(
    (set) => ({
      isLoading: false,
      setIsLoading: (isLoading) => set({ isLoading }),
    }),
    {
      name: "loading-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
