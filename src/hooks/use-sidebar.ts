import { create } from "zustand";

type AppSidebarType = {
  isOpen: boolean | any;
  setIsOpen: () => void;
};

export const useAppSidebarToogle = create<AppSidebarType>((set) => ({
  isOpen: true,
  setIsOpen: () => {
    set((state) => ({ isOpen: !state.isOpen }));
  },
}));
