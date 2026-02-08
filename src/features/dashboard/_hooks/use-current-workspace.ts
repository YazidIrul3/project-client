import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";

type Props = {
  workspace: UseCurrentWorkspaceProps;
  workspaceId: string;
  setCurrentWorkspace: (data: UseCurrentWorkspaceProps) => void;
  setCurrentWorkspaceId: (id: string) => void;
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
      workspaceId: "",
      setCurrentWorkspace: (data: UseCurrentWorkspaceProps) =>
        set({ workspace: data }),
      setCurrentWorkspaceId: (id: string) => set({ workspaceId: id }),
    }),

    {
      name: "auth-sesion",
      storage: createJSONStorage(() => localStorage),
    },
  ),
);
