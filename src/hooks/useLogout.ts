import { axiosInstance } from "@/lib/axios";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

export const useLogout = () => {
  const router = useRouter();

  const onClick = async () => {
    try {
      await authClient.signOut({
        fetchOptions: {
          onSuccess: () => {
            toast.success("Logout successful!");
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
