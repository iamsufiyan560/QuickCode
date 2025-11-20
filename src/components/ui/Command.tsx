"use client";
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";
import { Search, X } from "lucide-react";

interface CommandContextValue {
  search: string;
  setSearch: (search: string) => void;
  filtered: Set<string>;
  selectedIndex: number;
  setSelectedIndex: (index: number) => void;
  itemsCount: number;

  setItemsCount: React.Dispatch<React.SetStateAction<number>>;
}

const CommandContext = createContext<CommandContextValue | undefined>(
  undefined
);

const useCommandContext = () => {
  const context = useContext(CommandContext);
  if (!context) {
    throw new Error("Command components must be used within Command");
  }
  return context;
};

interface CommandProps extends React.ComponentProps<"div"> {
  value?: string;
  onValueChange?: (value: string) => void;
  filter?: (value: string, search: string) => number;
  shouldFilter?: boolean;
  loop?: boolean;
}

const CommandRoot = React.forwardRef<HTMLDivElement, CommandProps>(
  (
    {
      className,
      value,
      onValueChange,
      filter,
      shouldFilter = true,
      loop = false,
      children,
      ...props
    },
    ref
  ) => {
    const [search, setSearch] = useState(value || "");
    const [selectedIndex, setSelectedIndex] = useState(-1);
    const [itemsCount, setItemsCount] = useState(0);
    const [filtered, setFiltered] = useState<Set<string>>(new Set());

    useEffect(() => {
      if (value !== undefined) {
        setSearch(value);
      }
    }, [value]);

    useEffect(() => {
      onValueChange?.(search);
    }, [search, onValueChange]);

    const contextValue: CommandContextValue = {
      search,
      setSearch,
      filtered,
      selectedIndex,
      setSelectedIndex,
      itemsCount,
      setItemsCount,
    };

    return (
      <CommandContext.Provider value={contextValue}>
        <div
          ref={ref}
          className={cn(
            "flex h-full w-full flex-col overflow-hidden rounded-md bg-popover text-popover-foreground",
            className
          )}
          cmdk-root=""
          {...props}
        >
          {children}
        </div>
      </CommandContext.Provider>
    );
  }
);
CommandRoot.displayName = "Command";

interface CommandDialogProps extends React.ComponentProps<"div"> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  children?: React.ReactNode;
}

const CommandDialog = React.forwardRef<HTMLDivElement, CommandDialogProps>(
  ({ open, onOpenChange, children, className, ...props }, ref) => {
    const dialogRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      if (!open) return;

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          e.preventDefault();
          onOpenChange?.(false);
        }
      };

      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }, [open, onOpenChange]);

    useEffect(() => {
      if (open) {
        document.documentElement.style.overflow = "hidden";
        const firstInput = dialogRef.current?.querySelector("input");
        firstInput?.focus();
      } else {
        document.documentElement.style.overflow = "";
      }

      return () => {
        document.documentElement.style.overflow = "";
      };
    }, [open]);

    if (!open) return null;

    return (
      <div
        className="fixed px-4 inset-0 z-50 flex items-start justify-center  bg-black/50 "
        onClick={(e) => {
          if (e.target === e.currentTarget) {
            onOpenChange?.(false);
          }
        }}
      >
        <div
          ref={dialogRef}
          className={cn(
            "relative mt-[20vh] w-full max-w-lg overflow-hidden rounded-lg  bg-popover text-popover-foreground shadow-lg",
            className
          )}
          role="dialog"
          aria-modal="true"
          {...props}
        >
          {children}
        </div>
      </div>
    );
  }
);
CommandDialog.displayName = "CommandDialog";

interface CommandInputProps extends React.ComponentProps<"input"> {}

const CommandInput = React.forwardRef<HTMLInputElement, CommandInputProps>(
  ({ className, ...props }, ref) => {
    const { search, setSearch } = useCommandContext();

    return (
      <div
        className="flex items-center border-b border-border px-3"
        cmdk-input-wrapper=""
      >
        <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
        <input
          ref={ref}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={cn(
            "flex h-10 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-muted-foreground disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          {...props}
        />
        {search && (
          <button
            type="button"
            onClick={() => setSearch("")}
            className="rounded-sm opacity-50 cursor-pointer hover:opacity-100"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>
    );
  }
);
CommandInput.displayName = "CommandInput";

interface CommandListProps extends React.ComponentProps<"div"> {}

const CommandList = React.forwardRef<HTMLDivElement, CommandListProps>(
  ({ className, children, ...props }, ref) => {
    const { selectedIndex } = useCommandContext();
    const listRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
      const selectedItem = listRef.current?.querySelector(
        `[data-index="${selectedIndex}"]`
      );
      selectedItem?.scrollIntoView({ block: "nearest" });
    }, [selectedIndex]);

    return (
      <div
        ref={listRef}
        className={cn(
          "max-h-[300px] overflow-y-auto overflow-x-hidden",
          className
        )}
        cmdk-list=""
        role="listbox"
        {...props}
      >
        {children}
      </div>
    );
  }
);
CommandList.displayName = "CommandList";

interface CommandEmptyProps extends React.ComponentProps<"div"> {}

const CommandEmpty = React.forwardRef<HTMLDivElement, CommandEmptyProps>(
  ({ className, children = "No results found.", ...props }, ref) => {
    const { search, itemsCount } = useCommandContext();

    if (!search || itemsCount > 0) return null;

    return (
      <div
        ref={ref}
        className={cn(
          "py-6 text-center text-sm text-muted-foreground",
          className
        )}
        cmdk-empty=""
        role="status"
        {...props}
      >
        {children}
      </div>
    );
  }
);
CommandEmpty.displayName = "CommandEmpty";

interface CommandGroupProps extends React.ComponentProps<"div"> {
  heading?: React.ReactNode;
}

const CommandGroup = React.forwardRef<HTMLDivElement, CommandGroupProps>(
  ({ className, heading, children, ...props }, ref) => {
    const { search } = useCommandContext();

    const hasVisibleChildren = React.Children.toArray(children).some(
      (child) => {
        if (React.isValidElement(child)) {
          const childProps = (child as React.ReactElement<{ value?: string }>)
            .props;
          if (childProps && typeof childProps.value === "string") {
            return (
              !search ||
              childProps.value.toLowerCase().includes(search.toLowerCase())
            );
          }
        }
        return true;
      }
    );

    if (!hasVisibleChildren && search) return null;

    return (
      <div
        ref={ref}
        className={cn("overflow-hidden p-1", className)}
        cmdk-group=""
        role="group"
        {...props}
      >
        {heading && (
          <div
            className="px-2 py-1.5 text-xs font-medium text-muted-foreground"
            cmdk-group-heading=""
          >
            {heading}
          </div>
        )}
        {children}
      </div>
    );
  }
);
CommandGroup.displayName = "CommandGroup";

interface CommandItemProps
  extends Omit<React.ComponentProps<"div">, "onSelect"> {
  disabled?: boolean;
  onSelect?: (value: string) => void;
  value?: string;
}

const CommandItem = React.forwardRef<HTMLDivElement, CommandItemProps>(
  ({ className, disabled, onSelect, value, children, ...props }, ref) => {
    const { search, selectedIndex, setSelectedIndex, setItemsCount } =
      useCommandContext();
    const itemRef = useRef<HTMLDivElement>(null);
    const [index, setIndex] = useState(-1);

    useEffect(() => {
      setItemsCount((prev) => prev + 1);
      setIndex((prev) => prev + 1);

      return () => {
        setItemsCount((prev) => Math.max(0, prev - 1));
      };
    }, [setItemsCount]);

    const isSelected = selectedIndex === index;

    const handleClick = () => {
      if (disabled) return;
      onSelect?.(value || "");
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (disabled) return;
      if (e.key === "Enter") {
        e.preventDefault();
        onSelect?.(value || "");
      }
    };

    const shouldShow =
      !search || (value && value.toLowerCase().includes(search.toLowerCase()));

    if (!shouldShow) return null;

    return (
      <div
        ref={itemRef}
        data-index={index}
        role="option"
        aria-selected={isSelected}
        aria-disabled={disabled}
        className={cn(
          "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-2 text-sm outline-none ",
          !disabled && "hover:bg-accent hover:text-accent-foreground",
          isSelected && !disabled && "bg-accent text-accent-foreground",
          disabled && " opacity-50 cursor-not-allowed",
          "[&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
          className
        )}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        cmdk-item=""
        {...props}
      >
        {children}
      </div>
    );
  }
);
CommandItem.displayName = "CommandItem";

interface CommandShortcutProps extends React.ComponentProps<"span"> {}

const CommandShortcut = React.forwardRef<HTMLSpanElement, CommandShortcutProps>(
  ({ className, ...props }, ref) => {
    return (
      <span
        ref={ref}
        className={cn(
          "ml-auto text-xs tracking-widest text-muted-foreground",
          className
        )}
        {...props}
      />
    );
  }
);
CommandShortcut.displayName = "CommandShortcut";

interface CommandSeparatorProps extends React.ComponentProps<"div"> {}

const CommandSeparator = React.forwardRef<
  HTMLDivElement,
  CommandSeparatorProps
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn("-mx-1 h-px bg-border", className)}
      cmdk-separator=""
      role="separator"
      {...props}
    />
  );
});
CommandSeparator.displayName = "CommandSeparator";

const Command = CommandRoot as typeof CommandRoot & {
  Dialog: typeof CommandDialog;
  Input: typeof CommandInput;
  List: typeof CommandList;
  Empty: typeof CommandEmpty;
  Group: typeof CommandGroup;
  Item: typeof CommandItem;
  Shortcut: typeof CommandShortcut;
  Separator: typeof CommandSeparator;
};

Command.Dialog = CommandDialog;
Command.Input = CommandInput;
Command.List = CommandList;
Command.Empty = CommandEmpty;
Command.Group = CommandGroup;
Command.Item = CommandItem;
Command.Shortcut = CommandShortcut;
Command.Separator = CommandSeparator;

export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
};
export type {
  CommandProps,
  CommandDialogProps,
  CommandInputProps,
  CommandListProps,
  CommandEmptyProps,
  CommandGroupProps,
  CommandItemProps,
  CommandShortcutProps,
  CommandSeparatorProps,
};
