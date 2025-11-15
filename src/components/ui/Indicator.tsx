import { cn } from "@/lib/utils";
import React from "react";

export interface IndicatorProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
  label?: React.ReactNode;
  showZero?: boolean;
  dot?: boolean;
  inline?: boolean;
  size?: number | string;
  radius?: "none" | "sm" | "md" | "lg" | "full";
  color?: string;
  position?:
    | "top-start"
    | "top-center"
    | "top-end"
    | "middle-start"
    | "middle-center"
    | "middle-end"
    | "bottom-start"
    | "bottom-center"
    | "bottom-end";
  offset?: number;
  disabled?: boolean;
  processing?: boolean;
  withBorder?: boolean;
  zIndex?: number;
}

const positionStyles = {
  "top-start": "top-0 left-0 -translate-x-1/2 -translate-y-1/2",
  "top-center": "top-0 left-1/2 -translate-x-1/2 -translate-y-1/2",
  "top-end": "top-0 right-0 translate-x-1/2 -translate-y-1/2",
  "middle-start": "top-1/2 left-0 -translate-x-1/2 -translate-y-1/2",
  "middle-center": "top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
  "middle-end": "top-1/2 right-0 translate-x-1/2 -translate-y-1/2",
  "bottom-start": "bottom-0 left-0 -translate-x-1/2 translate-y-1/2",
  "bottom-center": "bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2",
  "bottom-end": "bottom-0 right-0 translate-x-1/2 translate-y-1/2",
};

const radiusStyles = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
};

export const Indicator: React.FC<IndicatorProps> = ({
  children,
  label,
  showZero = false,
  dot = false,
  inline = false,
  size = 16,
  radius = "full",
  color = "bg-destructive",
  position = "top-end",
  offset = 0,
  disabled = false,
  processing = false,
  withBorder = false,
  zIndex = 200,
  className,
  ...props
}) => {
  const shouldShow =
    !disabled && (showZero || label !== 0 || dot || label === undefined);

  const sizeValue = typeof size === "number" ? `${size}px` : size;
  const minWidth = dot ? sizeValue : undefined;
  const height = sizeValue;

  const offsetStyle =
    offset !== 0
      ? {
          transform: `translate(calc(-50% + ${offset}px), calc(-50% + ${offset}px))`,
        }
      : undefined;

  return (
    <div
      className={cn(inline ? "inline-flex" : "flex", "relative", className)}
      {...props}
    >
      {children}
      {shouldShow && (
        <span
          className={cn(
            "absolute flex items-center justify-center",
            "text-destructive-foreground text-xs font-medium",
            positionStyles[position],
            radiusStyles[radius],
            color,
            withBorder && "ring-2 ring-background",
            !dot && "px-1.5",
            processing && "animate-pulse"
          )}
          style={{
            minWidth,
            height,
            zIndex,
            ...(offsetStyle || {}),
          }}
        >
          {!dot && label}
        </span>
      )}
    </div>
  );
};
