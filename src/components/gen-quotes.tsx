import { cn } from "@/lib/utils";
import type { ProposalStep } from "@/types/proposal";
import { useEffect, useRef } from "react";

export const GenQuotes = ({
  className = "",
  steps = [],
}: {
  className?: string;
  steps: ProposalStep[];
}) => {
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (steps.length) scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [steps]);

  return (
    <div className={cn("flex flex-col gap-3", className)}>
      {steps.map((step) => (
        <div
          key={step.id}
          className={cn(
            "rounded-lg border p-4 shadow-sm",
            step.id === "finished"
              ? "bg-destructive text-destructive-foreground"
              : "bg-card",
          )}
        >
          <p className="mb-0">{step.text}</p>
        </div>
      ))}
      <div ref={scrollRef} />
    </div>
  );
};
