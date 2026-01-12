import { create } from "zustand";

type UseLoading = {
  isLoading: boolean;
  setIsLoading: (isLoading: boolean) => void;
};

export const useLoading = create<UseLoading>((set) => ({
  isLoading: false,
  setIsLoading: (isLoading) => set({ isLoading }),
}));
