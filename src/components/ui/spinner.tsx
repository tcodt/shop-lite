// import { Loader2Icon } from "lucide-react"

import { cn } from "@/lib/utils";
import { LuLoader } from "react-icons/lu";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <LuLoader
      role="status"
      aria-label="Loading"
      className={cn("size-8 animate-spin", className)}
      {...props}
    />
  );
}

export { Spinner };
