import { authClient } from "@/lib/auth-client";
import { email } from "zod";
import { create } from "zustand";

interface AssignedUser {
  id: string;
  email: string;
  name: string;
}

type UseAssignedProps = {
  assigned: AssignedUser[];
  setAssigned: () => void;
};

export const useAssigned = create((set, get) => {
  const { data } = authClient.useSession();

  assigned: [
    {
      name: data?.user.name,
      email: data?.user.email,
      id: data?.user.id,
    },
  ];

  setAssigned: (data: AssignedUser) => {
    set({ assigned: [...data.email] });
  };
});
