"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface SkeletonProps extends React.ComponentProps<"div"> {
  className?: string;
  variant?: "text" | "circular" | "rectangular" | "rounded";
  width?: string | number;
  height?: string | number;
  animation?: "pulse" | "wave" | "none";
  lines?: number;
  children?: React.ReactNode;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  className,
  variant = "rectangular",
  width,
  height,
  animation = "pulse",
  lines = 1,
  children,
  ...props
}) => {
  const getVariantClasses = () => {
    switch (variant) {
      case "text":
        return "rounded-sm h-4";
      case "circular":
        return "rounded-full";
      case "rounded":
        return "rounded-lg";
      case "rectangular":
      default:
        return "rounded-sm";
    }
  };

  const getAnimationClasses = () => {
    switch (animation) {
      case "pulse":
        return "animate-pulse";
      case "wave":
        return "animate-shimmer";
      case "none":
      default:
        return "";
    }
  };

  const getSize = () => {
    const style: React.CSSProperties = {};
    if (width) style.width = typeof width === "number" ? `${width}px` : width;
    if (height)
      style.height = typeof height === "number" ? `${height}px` : height;
    return style;
  };

  if (variant === "text" && lines > 1) {
    return (
      <div className={cn("space-y-2", className)} {...props}>
        {Array.from({ length: lines }).map((_, index) => (
          <div
            key={index}
            className={cn(
              "bg-input",
              getVariantClasses(),
              getAnimationClasses(),

              index === lines - 1 && "w-3/4"
            )}
            style={getSize()}
          />
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn(
        "bg-input",
        getVariantClasses(),
        getAnimationClasses(),
        className
      )}
      style={getSize()}
      {...props}
    >
      {children}
    </div>
  );
};

export const SkeletonCard: React.FC<{ className?: string }> = ({
  className,
}) => (
  <div className={cn("p-4 space-y-3", className)}>
    <Skeleton variant="rectangular" height="200px" className="w-full" />
    <div className="space-y-2">
      <Skeleton variant="text" height="20px" className="w-3/4" />
      <Skeleton variant="text" lines={2} />
    </div>
  </div>
);

export const SkeletonAvatar: React.FC<
  React.ComponentProps<"div"> & { size?: "sm" | "md" | "lg" }
> = ({ size = "md", className, ...props }) => {
  const sizeClasses = {
    sm: "w-8 h-8",
    md: "w-12 h-12",
    lg: "w-16 h-16",
  };

  return (
    <Skeleton
      variant="circular"
      className={cn(sizeClasses[size], className)}
      {...props}
    />
  );
};
export const SkeletonButton: React.FC<
  React.ComponentProps<"div"> & { size?: "sm" | "md" | "lg" }
> = ({ size = "md", className, ...props }) => {
  const sizeClasses = {
    sm: "h-8 w-16",
    md: "h-9 w-20",
    lg: "h-11 w-24",
  };

  return (
    <Skeleton
      variant="rounded"
      className={cn(sizeClasses[size], className)}
      {...props}
    />
  );
};
