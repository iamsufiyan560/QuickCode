import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface AnimatedProgressProps extends React.ComponentProps<"div"> {
  value?: number;
  max?: number;
  min?: number;
  label?: string;
  showValue?: boolean;
  animated?: boolean;
  size?: "sm" | "md" | "lg";
  barClassName?: string;
}

export const AnimatedProgress: React.FC<AnimatedProgressProps> = ({
  value = 0,
  min = 0,
  max = 100,
  label,
  showValue = true,
  animated = true,
  size = "md",
  className,
  barClassName,
  ...props
}) => {
  const safeMin = Number.isFinite(min) ? min : 0;
  const safeMax = Number.isFinite(max) ? max : 100;

  const safeValue = Number.isFinite(value)
    ? Math.max(safeMin, Math.min(value, safeMax))
    : safeMin;

  const range = safeMax - safeMin;
  const percent = range === 0 ? 0 : ((safeValue - safeMin) / range) * 100;

  const sizes = {
    sm: "h-2 rounded-full",
    md: "h-3 rounded-full",
    lg: "h-4 rounded-full",
  } as const;

  return (
    <div
      role="group"
      aria-labelledby={
        label ? `${props.id ?? "animated-progress"}-label` : undefined
      }
      className={cn("w-full", className)}
      {...props}
    >
      {label && (
        <div
          id={`${props.id ?? "animated-progress"}-label`}
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
          "relative w-full h-full overflow-hidden bg-primary/20 rounded-md",
          sizes[size]
        )}
        aria-hidden
      >
        <motion.div
          aria-hidden
          initial={false}
          animate={{ width: `${percent}%` }}
          transition={
            animated
              ? { type: "spring", stiffness: 140, damping: 18 }
              : { duration: 0 }
          }
          className={cn(
            "absolute left-0 top-0 bottom-0 transform-gpu will-change-transform",
            "bg-primary",
            barClassName
          )}
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
};

export default AnimatedProgress;
