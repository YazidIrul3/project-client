import { authClient } from "@/lib/auth-client";
import { toast } from "sonner";

export const useLoginForm = () => {
  const onSubmit = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "http://localhost:3000/profile",

        fetchOptions: {
          onSuccess: async () => {
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
