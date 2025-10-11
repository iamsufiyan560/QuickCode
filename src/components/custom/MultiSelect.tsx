"use client";

import React from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";

const MultiSelectContext = React.createContext<{
  values: string[];
  onValueToggle?: (value: string) => void;
  onValueRemove?: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef?: React.RefObject<HTMLButtonElement>;
  disabled?: boolean;
}>({
  values: [],
  open: false,
  setOpen: () => {},
});

export interface MultiSelectProps {
  values?: string[];
  defaultValues?: string[];
  onValuesChange?: (values: string[]) => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const MultiSelect: React.FC<MultiSelectProps> = ({
  values,
  defaultValues = [],
  onValuesChange,
  disabled = false,
  className,
  children,
}) => {
  const [selectedValues, setSelectedValues] = React.useState<string[]>(
    values ?? defaultValues
  );
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null!);

  const handleValuesChange = (newValues: string[]) => {
    if (disabled) return;
    setSelectedValues(newValues);
    onValuesChange?.(newValues);
  };

  const handleValueToggle = (value: string) => {
    if (disabled) return;
    const newValues = selectedValues.includes(value)
      ? selectedValues.filter((v) => v !== value)
      : [...selectedValues, value];
    handleValuesChange(newValues);
  };

  const handleValueRemove = (valueToRemove: string) => {
    if (disabled) return;
    const newValues = selectedValues.filter((v) => v !== valueToRemove);
    handleValuesChange(newValues);
  };

  React.useEffect(() => {
    if (values !== undefined) setSelectedValues(values);
  }, [values]);

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <MultiSelectContext.Provider
      value={{
        values: selectedValues,
        onValueToggle: handleValueToggle,
        onValueRemove: handleValueRemove,
        open,
        setOpen: disabled ? () => {} : setOpen,
        triggerRef,
        disabled,
      }}
    >
      <div ref={containerRef} className={cn("relative", className)}>
        {children}
      </div>
    </MultiSelectContext.Provider>
  );
};

export interface MultiSelectTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  children: React.ReactNode;
}

export const MultiSelectTrigger: React.FC<MultiSelectTriggerProps> = ({
  className,
  children,
  ...props
}) => {
  const context = React.useContext(MultiSelectContext);

  return (
    <button
      ref={context.triggerRef}
      type="button"
      onClick={() => context.setOpen(!context.open)}
      className={cn(
        "flex min-h-10 min-w-[200px] max-w-[400px] w-full items-center justify-between rounded-md border border-input hover:bg-input/30 bg-background px-3 py-2 text-sm",
        "disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-background",
        className
      )}
      disabled={context.disabled || false}
      {...props}
    >
      <div className="flex-1 flex flex-col items-start gap-2 overflow-hidden">
        {children}
      </div>
      <ChevronDown
        className={cn(
          "h-4 w-4 transition-transform duration-200 ml-2 flex-shrink-0",
          context.open && "rotate-180"
        )}
      />
    </button>
  );
};

export interface MultiSelectValueProps {
  placeholder?: string;
  className?: string;
  maxDisplay?: number;
}

export const MultiSelectValue: React.FC<MultiSelectValueProps> = ({
  placeholder = "Select options",
  className,
  maxDisplay = 3,
}) => {
  const context = React.useContext(MultiSelectContext);

  if (!context.values || context.values.length === 0) {
    return (
      <span className={cn("text-muted-foreground", className)}>
        {placeholder}
      </span>
    );
  }

  const displayValues = context.values.slice(0, maxDisplay);
  const remainingValues = context.values.slice(maxDisplay);

  return (
    <div className="w-full">
      <div className="flex items-center gap-1 flex-wrap max-h-20 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
        {displayValues.map((value) => (
          <span
            key={value}
            className="inline-flex items-center gap-1 rounded-md bg-primary/10 hover:bg-primary/15 border border-primary/20 px-2 py-1 text-xs text-primary"
          >
            <span className="max-w-[100px] truncate">{value}</span>
            <X
              className={cn(
                "h-3 w-3 hover:text-primary/80 transition-colors",
                context.disabled ? "cursor-not-allowed" : "cursor-pointer"
              )}
              onClick={(e) => {
                e.stopPropagation();
                context.onValueRemove?.(value);
              }}
            />
          </span>
        ))}
        {remainingValues.map((value) => (
          <span
            key={value}
            className="inline-flex items-center gap-1 rounded-md bg-primary/10 hover:bg-primary/15 border border-primary/20 px-2 py-1 text-xs text-primary"
          >
            <span className="max-w-[100px] truncate">{value}</span>
            <X
              className={cn(
                "h-3 w-3 hover:text-primary/80 transition-colors",
                context.disabled ? "cursor-not-allowed" : "cursor-pointer"
              )}
              onClick={(e) => {
                e.stopPropagation();
                context.onValueRemove?.(value);
              }}
            />
          </span>
        ))}
      </div>
    </div>
  );
};

export interface MultiSelectContentProps {
  className?: string;
  children: React.ReactNode;
}

export const MultiSelectContent: React.FC<MultiSelectContentProps> = ({
  className,
  children,
}) => {
  const context = React.useContext(MultiSelectContext);
  const [position, setPosition] = React.useState({
    top: 0,
    left: 0,
    width: 0,
    placement: "bottom",
  });
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    if (context.open && context.triggerRef?.current) {
      const updatePosition = () => {
        const trigger = context?.triggerRef?.current!;
        const rect = trigger.getBoundingClientRect();
        const dropdownHeight = 240;
        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        const placement =
          spaceBelow < dropdownHeight && spaceAbove > spaceBelow
            ? "top"
            : "bottom";

        setPosition({
          top:
            placement === "bottom"
              ? rect.bottom + 4
              : rect.top - dropdownHeight - 4,
          left: rect.left,
          width: Math.max(rect.width, 200),
          placement,
        });
        setIsReady(true);
      };

      updatePosition();
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);

      return () => {
        window.removeEventListener("scroll", updatePosition, true);
        window.removeEventListener("resize", updatePosition);
      };
    } else {
      setIsReady(false);
    }
  }, [context.open, context.triggerRef]);

  if (!context.open || !isReady || typeof document === "undefined") return null;

  return ReactDOM.createPortal(
    <AnimatePresence>
      <motion.div
        onMouseDown={(e) => e.stopPropagation()}
        initial={{ opacity: 0, y: position.placement === "bottom" ? -10 : 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: position.placement === "bottom" ? -10 : 10 }}
        transition={{ duration: 0.15 }}
        style={{
          position: "fixed",
          top: position.top,
          left: position.left,
          width: position.width,
          zIndex: 9999,
        }}
        className={cn(
          "rounded-md px-2 py-1 space-y-2 border border-border bg-popover max-h-60 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
          className
        )}
      >
        {children}
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export interface MultiSelectGroupProps {
  className?: string;
  children: React.ReactNode;
}

export const MultiSelectGroup: React.FC<MultiSelectGroupProps> = ({
  className,
  children,
}) => {
  return <div className={cn("p-1", className)}>{children}</div>;
};

export interface MultiSelectLabelProps {
  className?: string;
  children: React.ReactNode;
}

export const MultiSelectLabel: React.FC<MultiSelectLabelProps> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        "px-2 py-1.5 text-sm font-semibold text-muted-foreground",
        className
      )}
    >
      {children}
    </div>
  );
};

export interface MultiSelectItemProps {
  value: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const MultiSelectItem: React.FC<MultiSelectItemProps> = ({
  value,
  disabled = false,
  className,
  children,
}) => {
  const context = React.useContext(MultiSelectContext);
  const isSelected = context.values.includes(value);

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => !disabled && context.onValueToggle?.(value)}
      className={cn(
        "relative flex  w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
        "hover:bg-accent hover:text-accent-foreground",
        isSelected && "bg-accent text-accent-foreground",
        disabled && "opacity-50 cursor-not-allowed",
        className
      )}
    >
      <span className="flex-1 text-left">{children}</span>
      {isSelected && <Check className="h-4 w-4 ml-2" />}
    </button>
  );
};
