import React from "react";
import { cn } from "@/lib/utils";

export interface ProgressProps extends React.ComponentProps<"div"> {
  value?: number;
  max?: number;
  min?: number;
  label?: string;
  showValue?: boolean;
  size?: "sm" | "md" | "lg";
  barClassName?: string;
}

export const Progress = ({
  value = 0,
  min = 0,
  max = 100,
  label,
  showValue = true,
  size = "md",
  className,
  barClassName,
  ...props
}: ProgressProps) => {
  const safeMin = Number.isFinite(min) ? min : 0;
  const safeMax = Number.isFinite(max) ? max : 100;

  const safeValue = Number.isFinite(value)
    ? Math.max(safeMin, Math.min(value, safeMax))
    : safeMin;

  const range = safeMax - safeMin;
  const percent = range === 0 ? 0 : ((safeValue - safeMin) / range) * 100;

  const sizes = {
    sm: "h-2",
    md: "h-3",
    lg: "h-4",
  } as const;

  return (
    <div
      role="group"
      aria-labelledby={label ? `${props.id ?? "progress"}-label` : undefined}
      className={cn("w-full", className)}
      {...props}
    >
      {label && (
        <div
          id={`${props.id ?? "progress"}-label`}
          className="mb-2 flex items-baseline justify-between"
        >
          <span className="text-sm font-medium text-foreground">{label}</span>
          {showValue && (
            <span className="text-xs tabular-nums text-muted-foreground">
              {Math.round((percent + Number.EPSILON) * 100) / 100}%
            </span>
          )}
        </div>
      )}

      <div
        className={cn(
          "relative w-full overflow-hidden rounded-full bg-primary/20",
          sizes[size]
        )}
        aria-hidden="true"
      >
        <div
          className={cn(
            "absolute left-0 top-0 bottom-0 h-full bg-primary transition-all duration-500 ease-out",
            barClassName
          )}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default Progress;
