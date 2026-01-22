import { Loader2Icon } from "lucide-react";

import { cn } from "@/libs/utils";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={cn(
        "animate-spin size-8 mx-auto min-h-screen flex justify-center items-center",
        className
      )}
      {...props}
    />
  );
}

export { Spinner };
