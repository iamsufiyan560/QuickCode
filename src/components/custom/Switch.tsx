"use client";
import React from "react";
import { cn } from "@/lib/utils";

export interface SwitchProps {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  disabled?: boolean;
  id?: string;
  className?: string;
  size?: "sm" | "default" | "md" | "lg";
}

export const Switch: React.FC<SwitchProps> = ({
  checked = false,
  onCheckedChange,
  disabled = false,
  id,
  className,
  size = "default",
}) => {
  const [isChecked, setIsChecked] = React.useState(checked);

  React.useEffect(() => {
    setIsChecked(checked);
  }, [checked]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;
    const newChecked = event.target.checked;
    setIsChecked(newChecked);
    onCheckedChange?.(newChecked);
  };

  const sizeVariants = {
    sm: {
      switch: "h-4 w-8",
      thumb:
        "before:h-[1.1rem] before:w-[1.1rem] before:left-[-0.05rem] before:top-[-0.05rem]",
    },
    default: {
      switch: "h-6 w-12",
      thumb:
        "before:h-[1.6rem] before:w-[1.6rem] before:left-[-0.1rem] before:top-[-0.1rem]",
    },
    md: {
      switch: "h-7 w-14",
      thumb:
        "before:h-[1.8rem] before:w-[1.8rem] before:left-[-0.1rem] before:top-[-0.1rem]",
    },
    lg: {
      switch: "h-8 w-16",
      thumb:
        "before:h-[2rem] before:w-[2rem] before:left-[-0.1rem] before:top-[-0.1rem]",
    },
  };

  const currentSize = sizeVariants[size];

  return (
    <label className="inline-block">
      <input
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        disabled={disabled}
        id={id}
        className={cn(
          "relative cursor-pointer appearance-none rounded-full transition-all duration-300 ease-in-out",
          "bg-slate-400/40 checked:bg-primary",
          "before:absolute before:block before:rounded-full before:border before:border-slate-400/50 before:bg-white before:shadow-md before:transition-all before:duration-300 before:ease-in-out before:content-['']",
          "checked:before:translate-x-full checked:before:border-primary",
          "hover:before:shadow-[0_0_0_8px_rgba(0,0,0,0.15)]",
          "checked:hover:before:shadow-[0_0_0_8px_rgba(139,92,246,0.15)]",
          "disabled:cursor-not-allowed disabled:opacity-50",
          currentSize.switch,
          currentSize.thumb,
          className
        )}
      />
    </label>
  );
};
