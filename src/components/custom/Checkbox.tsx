"use client";

import React from "react";
import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Label } from "./Label"; // Adjust import path as needed

export interface CheckboxProps {
  checked?: boolean;
  onChange: (checked: boolean) => void;
  disabled?: boolean;
  size?: "sm" | "md" | "lg";
  label?: string;
  className?: string;
  id: string;
}

export const Checkbox: React.FC<CheckboxProps> = ({
  checked = false,
  onChange,
  disabled = false,
  size = "md",
  label,
  className,
  id,
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-5 h-5",
    lg: "w-6 h-6",
  };

  const iconSizes = {
    sm: "w-3 h-3",
    md: "w-3.5 h-3.5",
    lg: "w-4 h-4",
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!disabled && onChange) {
      onChange(e.target.checked);
    }
  };

  return (
    <div
      className={cn(
        "relative inline-flex items-center gap-2",
        disabled && "opacity-50",
        className
      )}
    >
      <motion.div
        className={cn(
          "relative flex items-center justify-center rounded-sm border-2 transition-all duration-200 ease-in-out cursor-pointer",
          sizeClasses[size],
          checked
            ? "bg-primary border-primary"
            : "bg-background border-border hover:border-primary/50",
          disabled && "cursor-not-allowed"
        )}
        whileHover={!disabled ? { scale: 1.05 } : {}}
        whileTap={!disabled ? { scale: 0.95 } : {}}
        animate={checked ? { scale: [1, 1.1, 1] } : { scale: 1 }}
        transition={{
          scale: { duration: 0.2, ease: "easeInOut" },
          default: { duration: 0.2 },
        }}
        onClick={() => !disabled && onChange(!checked)}
      >
        <input
          type="checkbox"
          id={id}
          checked={checked}
          onChange={handleChange}
          disabled={disabled}
          className={cn(
            "absolute inset-0 w-full h-full opacity-0 cursor-pointer",
            disabled && "cursor-not-allowed"
          )}
        />

        <motion.div
          className={cn(
            "absolute inset-0 rounded-sm",
            checked ? "bg-primary" : "bg-background"
          )}
          initial={false}
          animate={{
            backgroundColor: checked ? "var(--primary)" : "var(--background)",
          }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
        />

        <motion.div
          initial={false}
          animate={{
            scale: checked ? 1 : 0,
            opacity: checked ? 1 : 0,
          }}
          transition={{
            duration: 0.2,
            ease: "easeInOut",
            delay: checked ? 0.1 : 0,
          }}
          className="relative z-10"
        >
          <Check
            className={cn("text-primary-foreground", iconSizes[size])}
            strokeWidth={3}
          />
        </motion.div>
      </motion.div>

      {label && (
        <Label
          htmlFor={id}
          className={cn("cursor-pointer", disabled && "cursor-not-allowed")}
        >
          {label}
        </Label>
      )}
    </div>
  );
};
