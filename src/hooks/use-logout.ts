import { axiosInstance } from "@/libs/axios";
import { authClient } from "@/libs/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useAuthenticated } from "./use-authenticated";

export const useLogout = () => {
  const router = useRouter();
  const { onLogout } = useAuthenticated();

  const onClick = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logout successful!");

            onLogout();
            router.push("/login");
          },

          onError: (err) => {
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
