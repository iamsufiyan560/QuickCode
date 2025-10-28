"use client";

import React from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import { ChevronsUpDown, Check, Search } from "lucide-react";
import { cn } from "@/lib/utils";

const ComboBoxContext = React.createContext<{
  value?: string;
  onValueChange?: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef?: React.RefObject<HTMLButtonElement>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredCount: number;
  setFilteredCount: React.Dispatch<React.SetStateAction<number>>;
}>({
  open: false,
  setOpen: () => {},
  searchQuery: "",
  setSearchQuery: () => {},
  filteredCount: 0,
  setFilteredCount: () => {},
});

export interface ComboBoxProps extends React.ComponentProps<"div"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  disabled?: boolean;
}

export const ComboBox: React.FC<ComboBoxProps> = ({
  value,
  defaultValue,
  onValueChange,
  disabled = false,
  className,
  children,
  ...props
}) => {
  const [selectedValue, setSelectedValue] = React.useState(
    value ?? defaultValue ?? ""
  );
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredCount, setFilteredCount] = React.useState(0);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null!);

  const handleValueChange = (newValue: string) => {
    if (disabled) return;
    setSelectedValue(newValue);
    onValueChange?.(newValue);
    setOpen(false);
    setSearchQuery("");
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
        setSearchQuery("");
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
    <ComboBoxContext.Provider
      value={{
        value: selectedValue,
        onValueChange: handleValueChange,
        open,
        setOpen: disabled ? () => {} : setOpen,
        triggerRef,
        searchQuery,
        setSearchQuery,
        filteredCount,
        setFilteredCount,
      }}
    >
      <div {...props} ref={containerRef} className={cn("relative", className)}>
        {children}
      </div>
    </ComboBoxContext.Provider>
  );
};

export interface ComboBoxTriggerProps extends React.ComponentProps<"button"> {
  children: React.ReactNode;
}

export const ComboBoxTrigger: React.FC<ComboBoxTriggerProps> = ({
  className,
  children,
  ...props
}) => {
  const context = React.useContext(ComboBoxContext);

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
      {...props}
    >
      {children}
      <ChevronsUpDown className="h-4 w-4 text-muted-foreground" />
    </button>
  );
};

export interface ComboBoxValueProps {
  placeholder?: string;
  className?: string;
}

export const ComboBoxValue: React.FC<ComboBoxValueProps> = ({
  placeholder = "Select an option",
  className,
  ...props
}) => {
  const context = React.useContext(ComboBoxContext);
  return (
    <span
      {...props}
      className={cn(
        !context.value ? "text-muted-foreground" : "text-foreground",
        className
      )}
    >
      {context.value && context.value.length > 0 ? context.value : placeholder}
    </span>
  );
};

export interface ComboBoxContentProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  searchPlaceholder?: string;
  emptyMessage: string;
}

export const ComboBoxContent: React.FC<ComboBoxContentProps> = ({
  className,
  children,
  searchPlaceholder = "Search...",
  emptyMessage,
  ...props
}) => {
  const context = React.useContext(ComboBoxContext);
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
        const dropdownHeight = 300;
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
        {...props}
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
        className={cn("rounded-md border border-border bg-popover", className)}
      >
        <div className="flex items-center border-b border-border px-3 py-2">
          <Search className="h-4 w-4 text-muted-foreground mr-2" />
          <input
            autoFocus
            type="text"
            placeholder={searchPlaceholder}
            value={context.searchQuery}
            onChange={(e) => context.setSearchQuery(e.target.value)}
            className="flex-1 bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>
        <div className="max-h-60 overflow-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] p-1">
          {context.filteredCount === 0 && context.searchQuery ? (
            <div className="py-6 text-center text-sm text-muted-foreground">
              {emptyMessage}
            </div>
          ) : (
            children
          )}
        </div>
      </motion.div>
    </AnimatePresence>,
    document.body
  );
};

export interface ComboBoxGroupProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
}

export const ComboBoxGroup: React.FC<ComboBoxGroupProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div {...props} className={className}>
      {children}
    </div>
  );
};

export interface ComboBoxLabelProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
}

export const ComboBoxLabel: React.FC<ComboBoxLabelProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        "px-2 py-1.5 text-sm font-semibold text-muted-foreground",
        className
      )}
    >
      {children}
    </div>
  );
};

export interface ComboBoxItemProps extends React.ComponentProps<"button"> {
  value: string;
  disabled?: boolean;
  keywords?: string[];
  children: React.ReactNode;
}

export const ComboBoxItem: React.FC<ComboBoxItemProps> = ({
  value,
  disabled = false,
  keywords = [],
  className,
  children,
  ...props
}) => {
  const context = React.useContext(ComboBoxContext);
  const isSelected = context.value === value;
  const [isVisible, setIsVisible] = React.useState(true);

  React.useEffect(() => {
    const searchLower = context.searchQuery.toLowerCase();
    const valueMatch = value.toLowerCase().includes(searchLower);
    const childrenMatch =
      typeof children === "string" &&
      children.toLowerCase().includes(searchLower);
    const keywordMatch = keywords.some((keyword) =>
      keyword.toLowerCase().includes(searchLower)
    );

    const shouldShow =
      !context.searchQuery || valueMatch || childrenMatch || keywordMatch;
    setIsVisible(shouldShow);

    return () => {};
  }, [context.searchQuery, value, children, keywords]);

  React.useEffect(() => {
    if (isVisible) {
      context.setFilteredCount((prev) => prev + 1);
    }
    return () => {
      if (isVisible) {
        context.setFilteredCount((prev) => Math.max(0, prev - 1));
      }
    };
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <button
      {...props}
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
