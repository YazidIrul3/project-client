import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Props = {
  workspace: UseCurrentWorkspaceProps;
  setCurrentWorkspace: (data: UseCurrentWorkspaceProps) => void;
};

type UseCurrentWorkspaceProps = {
  userId: string;
  name: string;
};

export const useCurrentWorkspace = create<Props>()(
  persist(
    (set) => ({
      workspace: {
        name: "",
        userId: "",
      },
      setCurrentWorkspace: (data: UseCurrentWorkspaceProps) =>
        set({ workspace: data }),
    }),
    {
      name: "auth-sesion",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
