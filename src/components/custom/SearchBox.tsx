"use client";

import React, { useEffect, useState, useRef } from "react";
import { Search, X, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "@/components/custom/Input";

export interface SearchBoxProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
  onSearch?: (value: string) => void;
  loading?: boolean;
  debounceMs?: number;
  showClearButton?: boolean;
}

export const SearchBox: React.FC<SearchBoxProps> = ({
  value: controlledValue,
  onChange,
  onSearch,
  loading = false,
  debounceMs = 300,
  showClearButton = true,
  placeholder = "Search...",
  className,
  disabled,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState("");
  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : internalValue;
  const onSearchRef = useRef(onSearch);

  useEffect(() => {
    onSearchRef.current = onSearch;
  }, [onSearch]);

  useEffect(() => {
    if (!onSearchRef.current) return;

    const timer = setTimeout(() => {
      if (value) {
        onSearchRef.current?.(value);
      }
    }, debounceMs);

    return () => clearTimeout(timer);
  }, [value, debounceMs]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;

    if (!isControlled) {
      setInternalValue(newValue);
    }

    onChange?.(newValue);
  };

  const handleClear = () => {
    if (!isControlled) {
      setInternalValue("");
    }
    onChange?.("");
  };

  return (
    <div className={cn("relative w-full", className)}>
      <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground pointer-events-none" />

      <Input
        type="text"
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "pl-9",
          (showClearButton && value) || loading ? "pr-9" : ""
        )}
        {...props}
      />

      {loading && (
        <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground animate-spin" />
      )}

      {!loading && showClearButton && value && (
        <button
          type="button"
          onClick={handleClear}
          disabled={disabled}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors disabled:pointer-events-none disabled:opacity-50"
          aria-label="Clear search"
        >
          <X className="h-4 w-4" />
        </button>
      )}
    </div>
  );
};
