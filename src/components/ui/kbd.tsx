import * as React from "react";
import { cn } from "@/lib/utils";

type KbdProps = React.HTMLAttributes<HTMLElement>;

const Kbd = React.forwardRef<HTMLElement, KbdProps>(
  ({ className, ...props }, ref) => {
    return (
      <kbd
        ref={ref}
        className={cn(
          "border-border bg-muted text-muted-foreground inline-flex items-center rounded border px-1.5 py-0.5 font-mono text-xs shadow-sm",
          className
        )}
        {...props}
      />
    );
  }
);
Kbd.displayName = "Kbd";

export { Kbd };
