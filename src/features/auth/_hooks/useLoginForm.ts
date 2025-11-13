import { authClient } from "@/lib/auth-client";
import { axiosInstance } from "@/lib/axios";
import { AxiosResponse } from "axios";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type AxiosResponseType = {
  url: string;
};

export const useLoginForm = () => {
  const onSubmit = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "http://localhost:3000/",

        fetchOptions: {
          onSuccess: () => {
            toast.success("Login successful!");
          },
          onError: (err) => {
            toast.error("Login failed. Please try again.");
            console.log(err);
          },
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  return { onSubmit };
};
