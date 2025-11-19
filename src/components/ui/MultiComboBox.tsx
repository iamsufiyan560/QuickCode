"use client";
import React from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import { ChevronsUpDown, Check, Search, X } from "lucide-react";
import { cn } from "@/lib/utils";
const MultiComboBoxContext = React.createContext<{
  values: string[];
  onValueToggle?: (value: string) => void;
  onValueRemove?: (value: string) => void;
  open: boolean;
  setOpen: (open: boolean) => void;
  triggerRef?: React.RefObject<HTMLButtonElement>;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  filteredCount: number;
  setFilteredCount: React.Dispatch<React.SetStateAction<number>>;
  disabled?: boolean;
}>({
  values: [],
  open: false,
  setOpen: () => {},
  searchQuery: "",
  setSearchQuery: () => {},
  filteredCount: 0,
  setFilteredCount: () => {},
});
export interface MultiComboBoxProps extends React.ComponentProps<"div"> {
  values?: string[];
  defaultValues?: string[];
  onValuesChange?: (values: string[]) => void;
  disabled?: boolean;
}
export const MultiComboBox: React.FC<MultiComboBoxProps> = ({
  values,
  defaultValues = [],
  onValuesChange,
  disabled = false,
  className,
  children,
  ...props
}) => {
  const [selectedValues, setSelectedValues] = React.useState<string[]>(
    values ?? defaultValues
  );
  const [open, setOpen] = React.useState(false);
  const [searchQuery, setSearchQuery] = React.useState("");
  const [filteredCount, setFilteredCount] = React.useState(0);
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
    <MultiComboBoxContext.Provider
      value={{
        values: selectedValues,
        onValueToggle: handleValueToggle,
        onValueRemove: handleValueRemove,
        open,
        setOpen: disabled ? () => {} : setOpen,
        triggerRef,
        searchQuery,
        setSearchQuery,
        filteredCount,
        setFilteredCount,
        disabled,
      }}
    >
      <div {...props} ref={containerRef} className={cn("relative", className)}>
        {children}
      </div>
    </MultiComboBoxContext.Provider>
  );
};
export interface MultiComboBoxTriggerProps
  extends React.ComponentProps<"button"> {
  children: React.ReactNode;
  className?: string;
}
export const MultiComboBoxTrigger: React.FC<MultiComboBoxTriggerProps> = ({
  className,
  children,
  ...props
}) => {
  const context = React.useContext(MultiComboBoxContext);
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
      <ChevronsUpDown className="h-4 w-4 text-muted-foreground ml-2 flex-shrink-0" />
    </button>
  );
};
export interface MultiComboBoxValueProps extends React.ComponentProps<"span"> {
  placeholder?: string;
  className?: string;
  maxDisplay?: number;
}
export const MultiComboBoxValue: React.FC<MultiComboBoxValueProps> = ({
  placeholder = "Select options",
  className,
  maxDisplay = 3,
  ...props
}) => {
  const context = React.useContext(MultiComboBoxContext);
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
            {...props}
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
            {...props}
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
export interface MultiComboBoxContentProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  searchPlaceholder?: string;
  emptyMessage: string;
}
export const MultiComboBoxContent: React.FC<MultiComboBoxContentProps> = ({
  className,
  children,
  searchPlaceholder = "Search...",
  emptyMessage,
  ...props
}) => {
  const context = React.useContext(MultiComboBoxContext);
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
export interface MultiComboBoxGroupProps extends React.ComponentProps<"div"> {
  className?: string;
  children: React.ReactNode;
}
export const MultiComboBoxGroup: React.FC<MultiComboBoxGroupProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <div {...props} className={cn("p-1", className)}>
      {children}
    </div>
  );
};
export interface MultiComboBoxLabelProps extends React.ComponentProps<"div"> {
  className?: string;
  children: React.ReactNode;
}
export const MultiComboBoxLabel: React.FC<MultiComboBoxLabelProps> = ({
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
export interface MultiComboBoxItemProps extends React.ComponentProps<"button"> {
  value: string;
  disabled?: boolean;
  keywords?: string[];
  children: React.ReactNode;
}
export const MultiComboBoxItem: React.FC<MultiComboBoxItemProps> = ({
  value,
  disabled = false,
  keywords = [],
  className,
  children,
  ...props
}) => {
  const context = React.useContext(MultiComboBoxContext);
  const isSelected = context.values.includes(value);
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
      onClick={() => !disabled && context.onValueToggle?.(value)}
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
