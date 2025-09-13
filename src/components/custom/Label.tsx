"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface LabelProps
  extends React.LabelHTMLAttributes<HTMLLabelElement> {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "muted" | "accent";
  required?: boolean;
}

export const Label: React.FC<LabelProps> = ({
  children,
  size = "md",
  variant = "default",
  required = false,
  className,
  ...props
}) => {
  const sizeClasses = {
    sm: "text-sm",
    md: "text-sm",
    lg: "text-base",
  };

  const variantClasses = {
    default: "text-foreground",
    muted: "text-muted-foreground",
    accent: "text-primary",
  };

  return (
    <label
      className={cn(
        "font-medium leading-none cursor-pointer select-none transition-colors",
        "peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
        sizeClasses[size],
        variantClasses[variant],
        className
      )}
      {...props}
    >
      {children}
      {required && (
        <span className="ml-1 text-destructive" aria-label="required">
          *
        </span>
      )}
    </label>
  );
};
