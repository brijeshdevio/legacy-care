import clsx from "clsx";
import { Loader2Icon } from "lucide-react";
import { cn } from "@/lib/utils";

function Spinner({ className, ...props }: React.ComponentProps<"svg">) {
  return (
    <div className={clsx("flex w-full items-center justify-center", className)}>
      <div className="flex flex-col items-center gap-2">
        <Loader2Icon
          role="status"
          aria-label="Loading"
          className={cn("animate-spin")}
          {...props}
        />
        <p>Loading... </p>
      </div>
    </div>
  );
}

export { Spinner };
