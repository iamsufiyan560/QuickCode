"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface SeparatorProps extends React.HTMLAttributes<HTMLDivElement> {
  className?: string;
  orientation?: "horizontal" | "vertical";
  decorative?: boolean;
}

export const Separator: React.FC<SeparatorProps> = ({
  className,
  orientation = "horizontal",
  decorative = false,
  ...props
}) => {
  return (
    <div
      className={cn(
        "bg-border shrink-0",
        orientation === "horizontal" ? "h-px w-full" : "h-full w-px",
        className
      )}
      role={decorative ? "none" : "separator"}
      aria-orientation={orientation}
      {...props}
    />
  );
};
