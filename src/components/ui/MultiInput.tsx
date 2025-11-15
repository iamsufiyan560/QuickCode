"use client";

import React, { useState, KeyboardEvent, useRef } from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";
import { Badge } from "@/components/ui/Badge";

export interface MultiInputProps
  extends Omit<React.ComponentProps<"input">, "value" | "onChange"> {
  value?: string[];
  onChange?: (values: string[]) => void;
  className?: string;
  placeholder?: string;
  separator?: "enter" | "comma" | "space" | Array<"enter" | "comma" | "space">;
  max?: number;
  onMaxReached?: () => void;
  disabled?: boolean;
  showMaxLabel?: boolean;
}

export const MultiInput: React.FC<MultiInputProps> = ({
  value = [],
  onChange,
  className,
  placeholder = "Type and press Enter...",
  separator = ["enter", "comma"],
  max,
  onMaxReached,
  disabled = false,
  showMaxLabel = true,
  ...props
}) => {
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const separators = Array.isArray(separator) ? separator : [separator];

  const handleAddValue = (newValue: string) => {
    const trimmedValue = newValue.trim();
    if (!trimmedValue) return;

    if (max && value.length >= max) {
      onMaxReached?.();
      return;
    }

    if (!value.includes(trimmedValue)) {
      onChange?.([...value, trimmedValue]);
    }
    setInputValue("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (
      (separators.includes("enter") && e.key === "Enter") ||
      (separators.includes("comma") && e.key === ",") ||
      (separators.includes("space") && e.key === " ")
    ) {
      e.preventDefault();
      handleAddValue(inputValue);
    } else if (e.key === "Backspace" && !inputValue && value.length > 0) {
      onChange?.(value.slice(0, -1));
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    if (separators.includes("comma") || separators.includes("space")) {
      const splitRegex = new RegExp(
        `[${separators.includes("comma") ? "," : ""}${
          separators.includes("space") ? " " : ""
        }]`
      );
      if (splitRegex.test(newValue)) {
        const parts = newValue.split(splitRegex);
        const valuesToAdd = parts
          .slice(0, -1)
          .map((v) => v.trim())
          .filter((v) => v);
        valuesToAdd.forEach((v) => {
          if (!value.includes(v) && (!max || value.length < max)) {
            onChange?.([...value, v]);
          }
        });
        setInputValue(parts[parts.length - 1]);
        return;
      }
    }
    setInputValue(newValue);
  };

  const handleRemoveValue = (index: number) => {
    onChange?.(value.filter((_, i) => i !== index));
  };

  const handleContainerClick = () => {
    inputRef.current?.focus();
  };

  const itemsLeft = max ? max - value.length : undefined;

  return (
    <div className="flex flex-col w-full">
      <div
        onClick={handleContainerClick}
        className={cn(
          "flex min-h-9 w-full flex-wrap gap-1.5 rounded-md border border-input bg-transparent px-3 py-1.5 shadow-xs transition-[color,box-shadow] outline-none",
          "focus-within:border-ring focus-within:ring-ring/50 focus-within:ring-[3px]",
          disabled && "pointer-events-none cursor-not-allowed opacity-50",
          className
        )}
      >
        {value.map((item, index) => (
          <Badge key={index} size="sm" className="gap-1 pr-1">
            {item}
            {!disabled && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  handleRemoveValue(index);
                }}
                className="inline-flex h-3.5 w-3.5 items-center justify-center rounded-sm hover:bg-primary-foreground/20 focus:outline-none focus:ring-1 focus:ring-primary-foreground/50"
                aria-label={`Remove ${item}`}
              >
                <X className="h-3 w-3 cursor-pointer disabled:cursor-not-allowed" />
              </button>
            )}
          </Badge>
        ))}
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={value.length === 0 ? placeholder : ""}
          className="placeholder:text-muted-foreground min-w-[60px] flex-1 bg-transparent text-sm outline-none disabled:cursor-not-allowed"
          {...props}
        />
      </div>
      {showMaxLabel && max && (
        <div className="mt-1 text-xs text-muted-foreground">
          {itemsLeft! > 0
            ? `You can add ${itemsLeft} more item${itemsLeft!! > 1 ? "s" : ""}.`
            : "Maximum items reached."}
        </div>
      )}
    </div>
  );
};
