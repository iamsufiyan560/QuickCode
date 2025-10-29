import React from "react";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

interface SpinnerProps extends React.ComponentProps<"svg"> {
  size?: "sm" | "md" | "lg" | "xl";
}

const sizeClasses = {
  sm: "size-4",
  md: "size-6",
  lg: "size-8",
  xl: "size-12",
};

const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  className,
  ...props
}) => {
  return (
    <Loader2
      role="status"
      aria-label="Loading"
      className={cn("animate-spin text-primary", sizeClasses[size], className)}
      {...props}
    />
  );
};

export { Spinner };
export type { SpinnerProps };
