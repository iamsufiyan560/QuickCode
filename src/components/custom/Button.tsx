"use client";

import React from "react";
import { Loader2 } from "lucide-react";

export interface ButtonProps
  extends Omit<
    React.DetailedHTMLProps<
      React.ButtonHTMLAttributes<HTMLButtonElement>,
      HTMLButtonElement
    >,
    "children"
  > {
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
  size?: "default" | "sm" | "lg" | "icon";
  isLoading?: boolean;
  children: React.ReactNode; // <- make it required
}

export const Button: React.FC<ButtonProps> = ({
  className,
  variant = "default",
  size = "default",
  isLoading = false,
  disabled = false,
  children,
  type = "button",
  ...props
}) => {
  const baseClasses =
    "cursor-pointer     whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50";

  const sizeClasses = {
    default: "h-10 px-4 py-2",
    sm: "h-9 rounded-md px-3",
    md: "h-10 rounded-md px-5",
    lg: "h-11 rounded-md px-8",
    icon: "h-10 w-10 flex items-center justify-center",
  };

  const variantClasses = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    destructive:
      "bg-destructive text-destructive-foreground hover:bg-destructive/90",
    outline:
      "border border-border bg-background hover:bg-accent hover:text-accent-foreground",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary",
    ghost: "hover:bg-accent hover:text-accent-foreground",
    link: "text-primary underline-offset-4 hover:underline",
  };

  const combinedDisabled = disabled || isLoading;

  return (
    <button
      className={`${baseClasses} ${sizeClasses[size]} ${
        variantClasses[variant]
      }   ${isLoading ? "flex items-center justify-center" : ""} ${
        className || ""
      }`}
      type={type}
      disabled={combinedDisabled}
      {...props}
    >
      {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
      {children}
    </button>
  );
};
