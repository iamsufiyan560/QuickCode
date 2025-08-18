"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const RadioGroupContext = React.createContext<{
  value?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
}>({});

export interface RadioGroupProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  name?: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const RadioGroup: React.FC<RadioGroupProps> = ({
  value,
  defaultValue,
  onValueChange,
  name = "radio-group",
  disabled = false,
  className,
  children,
}) => {
  const [selectedValue, setSelectedValue] = React.useState(
    value ?? defaultValue ?? ""
  );

  const handleValueChange = (newValue: string) => {
    if (disabled) return;
    setSelectedValue(newValue);
    onValueChange?.(newValue);
  };

  React.useEffect(() => {
    if (value !== undefined) {
      setSelectedValue(value);
    }
  }, [value]);

  return (
    <RadioGroupContext.Provider
      value={{
        value: selectedValue,
        onValueChange: handleValueChange,
        name,
        disabled,
      }}
    >
      <div className={cn("grid gap-2", className)} role="radiogroup">
        {children}
      </div>
    </RadioGroupContext.Provider>
  );
};

export interface RadioGroupItemProps {
  value: string;
  id?: string;
  disabled?: boolean;
  className?: string;
}

export const RadioGroupItem: React.FC<RadioGroupItemProps> = ({
  value,
  id,
  disabled: itemDisabled = false,
  className,
}) => {
  const context = React.useContext(RadioGroupContext);
  const isSelected = context.value === value;
  const isDisabled = context.disabled || itemDisabled;
  const [hasAnimated, setHasAnimated] = React.useState(false);

  const handleClick = () => {
    if (!isDisabled) {
      setHasAnimated(true);
      context.onValueChange?.(value);
    }
  };

  React.useEffect(() => {
    if (isSelected && !hasAnimated) {
      setHasAnimated(true);
    }
  }, [isSelected, hasAnimated]);

  return (
    <button
      type="button"
      role="radio"
      aria-checked={isSelected}
      onClick={handleClick}
      disabled={isDisabled}
      id={id}
      className={cn(
        "relative w-6 h-6  border-[3px] rounded-full overflow-hidden",
        "disabled:opacity-50 disabled:cursor-not-allowed ",
        isSelected ? "border-input" : "border-border bg-transparent",
        !isDisabled && !isSelected && "hover:border-primary",
        className
      )}
    >
      <input
        type="radio"
        name={context.name}
        value={value}
        checked={isSelected}
        onChange={() => {}}
        className="absolute  opacity-0 w-full h-full cursor-pointer"
        disabled={isDisabled}
      />

      <motion.div
        className="absolute w-10 h-10   bg-primary rotate-45"
        initial={false}
        animate={{
          left: isSelected ? "-8px" : "-30px",
          top: isSelected ? "-8px" : "20px",
        }}
        transition={{
          duration: hasAnimated ? 0.3 : 0,
          ease: "easeInOut",
        }}
      />
    </button>
  );
};
