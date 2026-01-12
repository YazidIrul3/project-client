import { useAuthenticated } from "@/hooks/use-authenticated";
import { useLoading } from "@/hooks/use-loading";
import { authClient } from "@/libs/auth-client";
import { toast } from "sonner";

export const useLoginForm = () => {
  const { setIsLoading } = useLoading();
  const { setIsAuthenticated } = useAuthenticated();

  const onSubmit = async () => {
    try {
      setIsLoading(true);

      await authClient.signIn.social({
        provider: "google",
        callbackURL: "http://localhost:3000/account/profile",

        fetchOptions: {
          onSuccess: async () => {
            toast.success("Login successful!");
            setIsAuthenticated(true);
            setIsLoading(false);
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
