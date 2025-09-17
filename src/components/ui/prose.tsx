import * as React from "react";
import { cn } from "@/lib/utils";

type ProseProps = React.HTMLAttributes<HTMLDivElement>;

const Prose = React.forwardRef<HTMLDivElement, ProseProps>(
  ({ className, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          "prose prose-neutral dark:prose-invert max-w-none",
          "prose-headings:text-foreground prose-headings:font-semibold",
          "prose-p:text-text-weak prose-p:leading-7",
          "prose-a:text-accent-primary prose-a:no-underline hover:prose-a:underline",
          "prose-strong:text-foreground prose-strong:font-semibold",
          "prose-code:bg-muted prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded-md prose-code:text-sm prose-code:font-mono prose-code:text-foreground",
          "prose-pre:bg-muted prose-pre:border prose-pre:border-border",
          "prose-blockquote:border-l-accent-primary prose-blockquote:text-text-weak",
          "prose-hr:border-border",
          "prose-li:text-text-weak",
          "prose-th:text-foreground prose-td:text-text-weak",
          className
        )}
        {...props}
      />
    );
  }
);
Prose.displayName = "Prose";

export { Prose };
