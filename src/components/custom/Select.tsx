"use client";

import React from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "@/lib/utils";

const SelectContext = React.createContext<{
  value?: string;
  onValueChange?: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef?: React.RefObject<HTMLButtonElement>;
}>({
  open: false,
  setOpen: () => {},
});

export interface SelectProps {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const Select: React.FC<SelectProps> = ({
  value,
  defaultValue,
  onValueChange,
  disabled = false,
  className,
  children,
}) => {
  const [selectedValue, setSelectedValue] = React.useState(
    value ?? defaultValue ?? ""
  );
  const [open, setOpen] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null!);

  const handleValueChange = (newValue: string) => {
    if (disabled) return;
    setSelectedValue(newValue);
    onValueChange?.(newValue);
    setOpen(false);
  };

  React.useEffect(() => {
    if (value !== undefined) setSelectedValue(value);
  }, [value]);

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
    <SelectContext.Provider
      value={{
        value: selectedValue,
        onValueChange: handleValueChange,
        open,
        setOpen: disabled ? () => {} : setOpen,
        triggerRef,
      }}
    >
      <div ref={containerRef} className={cn("relative", className)}>
        {children}
      </div>
    </SelectContext.Provider>
  );
};

export interface SelectTriggerProps {
  className?: string;
  children: React.ReactNode;
}

export const SelectTrigger: React.FC<SelectTriggerProps> = ({
  className,
  children,
}) => {
  const context = React.useContext(SelectContext);

  return (
    <button
      ref={context.triggerRef}
      type="button"
      onClick={() => context.setOpen(!context.open)}
      className={cn(
        "flex h-10 w-full items-center justify-between rounded-md border border-input hover:bg-input/30 bg-background px-3 py-2 text-sm",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    >
      {children}
      <ChevronDown
        className={cn(
          "h-4 w-4 transition-transform duration-200",
          context.open && "rotate-180"
        )}
      />
    </button>
  );
};

export interface SelectValueProps {
  placeholder?: string;
  className?: string;
}

export const SelectValue: React.FC<SelectValueProps> = ({
  placeholder = "Select an option",
  className,
}) => {
  const context = React.useContext(SelectContext);
  return (
    <span
      className={cn(
        !context.value ? "text-muted-foreground" : "text-foreground",
        className
      )}
    >
      {context.value && context.value.length > 0 ? context.value : placeholder}
    </span>
  );
};

export interface SelectContentProps {
  className?: string;
  children: React.ReactNode;
}

export const SelectContent: React.FC<SelectContentProps> = ({
  className,
  children,
}) => {
  const context = React.useContext(SelectContext);
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
          width: rect.width,
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
          "rounded-md border border-border bg-popover  max-h-60 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]",
          className
        )}
      >
        {children}
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export interface SelectGroupProps {
  className?: string;
  children: React.ReactNode;
}

export const SelectGroup: React.FC<SelectGroupProps> = ({
  className,
  children,
}) => {
  return <div className={cn("p-1", className)}>{children}</div>;
};

export interface SelectLabelProps {
  className?: string;
  children: React.ReactNode;
}

export const SelectLabel: React.FC<SelectLabelProps> = ({
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

export interface SelectItemProps {
  value: string;
  disabled?: boolean;
  className?: string;
  children: React.ReactNode;
}

export const SelectItem: React.FC<SelectItemProps> = ({
  value,
  disabled = false,
  className,
  children,
}) => {
  const context = React.useContext(SelectContext);
  const isSelected = context.value === value;

  return (
    <button
      type="button"
      disabled={disabled}
      onClick={() => !disabled && context.onValueChange?.(value)}
      className={cn(
        "relative flex mb-1 w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none",
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
