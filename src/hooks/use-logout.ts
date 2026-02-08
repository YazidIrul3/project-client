import { axiosInstance } from "@/libs/axios";
import { authClient } from "@/libs/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthenticated } from "./use-authenticated";
import { useCurrentWorkspace } from "@/features/dashboard/_hooks/use-current-workspace";
import { set } from "zod";

export const useLogout = () => {
  const router = useRouter();
  const { onLogout } = useAuthenticated();
  const { setCurrentWorkspace } = useCurrentWorkspace();

  const onClick = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logout successful!");

            onLogout();
            router.replace("/login");

            window.location.reload();
          },

          onError: () => {
            toast.error("Logout Error!");
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { onClick: onClick };
};
