export const fileContents: Record<string, string> = {
  "globals.css": `@import "tailwindcss";

/* Base Theme Tokens (Light) */
@custom-variant dark (&:is(.dark *));

:root {
  --background: oklch(0.99 0 0);
  --foreground: oklch(0 0 0);
  --card: oklch(1 0 0);
  --card-foreground: oklch(0 0 0);
  --popover: oklch(0.99 0 0);
  --popover-foreground: oklch(0 0 0);
  --primary: oklch(0.15 0 0);
  --primary-foreground: oklch(1 0 0);
  --secondary: oklch(0.92 0 0);
  --secondary-foreground: oklch(0.15 0 0);
  --muted: oklch(0.96 0 0);
  --muted-foreground: oklch(0.45 0 0);
  --accent: oklch(0.9 0 0);
  --accent-foreground: oklch(0.15 0 0);
  --destructive: oklch(0.63 0.19 23.03);
  --destructive-foreground: oklch(1 0 0);
  --border: oklch(0.9 0 0);
  --input: oklch(0.94 0 0);
  --ring: oklch(0.15 0 0);
}

/* Dark Theme */
.dark {
  --background: oklch(0.13 0 0);
  --foreground: oklch(0.98 0 0);
  --card: oklch(0.16 0 0);
  --card-foreground: oklch(0.98 0 0);
  --popover: oklch(0.18 0 0);
  --popover-foreground: oklch(0.98 0 0);
  --primary: oklch(0.95 0 0);
  --primary-foreground: oklch(0.1 0 0);
  --secondary: oklch(0.25 0 0);
  --secondary-foreground: oklch(0.98 0 0);
  --muted: oklch(0.22 0 0);
  --muted-foreground: oklch(0.7 0 0);
  --accent: oklch(0.32 0 0);
  --accent-foreground: oklch(0.98 0 0);
  --destructive: oklch(0.69 0.2 23.91);
  --destructive-foreground: oklch(0.98 0 0);
  --border: oklch(0.28 0 0);
  --input: oklch(0.32 0 0);
  --ring: oklch(0.7 0 0);
}

body {
  background: var(--background);
  color: var(--foreground);
  font-family: Arial, Helvetica, sans-serif;
}`,

  "Tabs.tsx": `
  "use client";
  
  import React from "react";
  import { motion } from "framer-motion";
  import { cn } from "@/lib/utils";
  
  export interface TabsProps {
    defaultValue: string;
    children: React.ReactNode;
    className?: string;
  }
  
  export interface TabsListProps {
    children: React.ReactNode;
    className?: string;
  }
  
  export interface TabsTriggerProps {
    value: string;
    children: React.ReactNode;
    className?: string;
    activeColor?: string;
  }
  
  export interface TabsContentProps {
    value: string;
    children: React.ReactNode;
    className?: string;
  }
  
  const TabsContext = React.createContext<{
    activeTab: string;
    setActiveTab: (value: string) => void;
    registerContent?: (value: string) => void;
    unregisterContent?: (value: string) => void;
  } | null>(null);
  
  const useTabsContext = () => {
    const context = React.useContext(TabsContext);
    if (!context) {
      throw new Error("Tabs components must be used within a Tabs provider");
    }
    return context;
  };
  
  export const Tabs: React.FC<TabsProps> = ({
    defaultValue,
    children,
    className,
  }) => {
    const [activeTab, setActiveTab] = React.useState(defaultValue);
    const contentCounts = React.useRef<Map<string, number>>(new Map());
  
    const [mounted, setMounted] = React.useState(false);
    React.useEffect(() => {
      setMounted(true);
    }, []);
  
    const registerContent = React.useCallback((v: string) => {
      contentCounts.current.set(v, (contentCounts.current.get(v) || 0) + 1);
    }, []);
  
    const unregisterContent = React.useCallback((v: string) => {
      const n = (contentCounts.current.get(v) || 0) - 1;
      if (n <= 0) contentCounts.current.delete(v);
      else contentCounts.current.set(v, n);
    }, []);
  
    const hasContentForActive = contentCounts.current.has(activeTab);
  
    return (
      <TabsContext.Provider
        value={{ activeTab, setActiveTab, registerContent, unregisterContent }}
      >
        <div className={cn("w-full", className)}>
          {children}
          {mounted && !hasContentForActive && (
            <div className="h-[120px] mt-4 flex items-center justify-center p-6 border border-border rounded-lg bg-muted/50 text-muted-foreground">
              <div className="text-center">
                <p className="text-sm">
                  Hey! You forgot to add
                  <code className="bg-secondary text-secondary-foreground px-2 py-1 rounded font-mono text-xs ml-2">
                    TabsContent value="{activeTab}"
                  </code>
                </p>
              </div>
            </div>
          )}
        </div>
      </TabsContext.Provider>
    );
  };
  
  export const TabsList: React.FC<TabsListProps> = ({ children, className }) => {
    return (
      <div
        className={cn(
          "flex relative bg-muted/20 rounded-lg overflow-hidden border border-border/50 flex-row overflow-x-auto",
          "[&>*:last-child]:mr-0",
          className
        )}
        style={{ scrollbarWidth: "none" }}
      >
        {children}
      </div>
    );
  };
  
  export const TabsTrigger: React.FC<
    TabsTriggerProps & { ref?: React.Ref<HTMLButtonElement> }
  > = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
    ({ value, children, className, activeColor }, ref) => {
      const { activeTab, setActiveTab } = useTabsContext();
      const isActive = activeTab === value;
  
      return (
        <div className="relative flex-shrink-0 min-w-32">
          <button
            ref={ref}
            className={cn(
              "relative z-[2] text-center py-3 px-4 font-medium text-sm transition-colors cursor-pointer min-h-12 max-h-12",
              "whitespace-nowrap w-full",
              isActive
                ? "text-primary-foreground"
                : "text-muted-foreground hover:text-foreground",
              className
            )}
            onClick={() => setActiveTab(value)}
            role="tab"
            aria-selected={isActive}
            type="button"
          >
            {children}
          </button>
  
          {isActive && (
            <motion.div
              className="absolute inset-0 rounded-lg z-[1] "
              style={{ background: activeColor || "var(--primary)" }}
              transition={{
                duration: 0.35,
                ease: [0.37, 1.95, 0.66, 0.56],
              }}
            />
          )}
        </div>
      );
    }
  );
  
  TabsTrigger.displayName = "TabsTrigger";
  
  export const TabsContent: React.FC<TabsContentProps> = ({
    value,
    children,
    className,
  }) => {
    const { activeTab, registerContent, unregisterContent } = useTabsContext();
  
    React.useEffect(() => {
      registerContent?.(value);
      return () => unregisterContent?.(value);
    }, [value, registerContent, unregisterContent]);
  
    if (activeTab !== value) {
      return null;
    }
  
    return (
      <div className={cn("mt-4", className)} role="tabpanel">
        {children}
      </div>
    );
  };
  `,

  "Sheet.tsx": `export const ActionSheet = () => {
  return (
    <div>
      {/* Component code too powerful for this small window 💪 */}
      {/* Use: npx quickcode-ui add ActionSheet to see the real deal */}
    </div>
  );
};`,

  "Select.tsx": `
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
  
  export interface MultiSelectTriggerProps {
    className?: string;
    children: React.ReactNode;
  }
  
  export const MultiSelectTrigger: React.FC<MultiSelectTriggerProps> = ({
    className,
    children,
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
  
  `,

  "Date.tsx": `export const DatePicker = () => {
  return (
    <div>
      {/* Component code too powerful for this small window 💪 */}
      {/* Use: npx quickcode-ui add DatePicker to see the real deal */}
    </div>
  );
};`,

  "Form.tsx": `export const AdvancedForm = () => {
  return (
    <div>
      {/* Component code too powerful for this small window 💪 */}
      {/* Use: npx quickcode-ui add AdvancedForm to see the real deal */}
    </div>
  );
};`,

  "page.tsx": `
  import {
    Tabs,
    TabsList,
    TabsTrigger,
    TabsContent,
  } from "@/components/custom/Tabs";
  import { Copy, Zap } from "lucide-react";
  import { Edit3, Share2, Trash2 } from "lucide-react";
  import {
    ActionSheet,
    ActionSheetAction,
  } from "@/components/custom/ActionSheet";
  
  import {
    MultiSelect,
    MultiSelectTrigger,
    MultiSelectValue,
    MultiSelectContent,
    MultiSelectItem,
  } from "@/components/custom/MultiSelect";
  import React from "react";
  import { DatePicker } from "@/components/custom/DatePicker";
  import { AdvancedForm } from "@/components/custom/AdvancedForm";
  
  export const DefaultTabsExample = () => {
    const [selectedFrameworks, setSelectedFrameworks] = React.useState<string[]>(
      []
    );
  
    return (
      <Tabs defaultValue="MultiSelect">
        <TabsList>
          <TabsTrigger value="MultiSelect">Multi Select</TabsTrigger>
          <TabsTrigger value="DatePicker">DatePicker</TabsTrigger>
          <TabsTrigger value="ActionSheet">ActionSheet</TabsTrigger>
          <TabsTrigger value="AdvanceForm">AdvanceForm</TabsTrigger>
        </TabsList>
  
        <TabsContent value="MultiSelect">
          <div className="p-6 bg-secondary rounded-lg mx-auto flex justify-center w-full">
            <div className="w-full max-w-md space-y-4">
              <h3 className="text-lg font-semibold text-center">
                Select Your Tech Stack
              </h3>
              <MultiSelect
                values={selectedFrameworks}
                onValuesChange={setSelectedFrameworks}
              >
                <MultiSelectTrigger className="w-full">
                  <MultiSelectValue placeholder="Choose frontend frameworks" />
                </MultiSelectTrigger>
                <MultiSelectContent>
                  <MultiSelectItem value="React">React</MultiSelectItem>
                  <MultiSelectItem value="Vue.js">Vue.js</MultiSelectItem>
                  <MultiSelectItem value="Angular">Angular</MultiSelectItem>
                  <MultiSelectItem value="Svelte">Svelte</MultiSelectItem>
                  <MultiSelectItem value="Next.js">Next.js</MultiSelectItem>
                  <MultiSelectItem value="Nuxt.js">Nuxt.js</MultiSelectItem>
                  <MultiSelectItem value="Remix">Remix</MultiSelectItem>
                  <MultiSelectItem value="Astro">Astro</MultiSelectItem>
                  <MultiSelectItem value="SolidJS">SolidJS</MultiSelectItem>
                  <MultiSelectItem value="Qwik">Qwik</MultiSelectItem>
                </MultiSelectContent>
              </MultiSelect>
              <div className="text-sm text-muted-foreground text-center">
                Select multiple options, and see tags in action
              </div>
            </div>
          </div>
        </TabsContent>
  
        <TabsContent value="DatePicker">
          <div className="p-6 bg-secondary rounded-lg mx-auto flex justify-center w-full">
            <ProjectCalendarDemo />
          </div>
        </TabsContent>
  
        <TabsContent value="ActionSheet">
          <div className="p-6 bg-secondary rounded-lg mx-auto grid grid-cols-2 gap-4 w-full">
            <QuickActionsDemo />
            <FileOptionsDemo />
            <EditToolsDemo />
            <ShareOptionsDemo />
          </div>
        </TabsContent>
  
        <TabsContent value="AdvanceForm">
          <div className="pb-4">
            <CompactRegistrationForm />
          </div>
        </TabsContent>
      </Tabs>
    );
  };
  
  const ProjectCalendarDemo = () => {
    const [projectDeadline, setProjectDeadline] = React.useState<Date | null>(
      null
    );
  
    const holidays = [
      new Date("2025-09-02"), // Labor Day
      new Date("2025-09-15"), // Mid-Autumn Festival
      new Date("2025-09-22"), // Autumnal Equinox
    ];
  
    const specialDays = [
      {
        date: new Date("2025-09-05"),
        className: "bg-chart-1/20 text-chart-1 hover:bg-chart-1/30",
        label: "Sprint Planning",
      },
      {
        date: new Date("2025-09-12"),
        className: "bg-chart-2/20 text-chart-2 hover:bg-chart-2/30",
        label: "Product Demo",
      },
      {
        date: new Date("2025-09-19"),
        className: "bg-chart-3/20 text-chart-3 hover:bg-chart-3/30",
        label: "Code Review",
      },
      {
        date: new Date("2025-09-26"),
        className: "bg-chart-4/20 text-chart-4 hover:bg-chart-4/30",
        label: "Release Date",
      },
    ];
  
    return (
      <div className="w-full max-w-sm space-y-3">
        <h3 className="text-lg font-semibold text-center">Project Timeline</h3>
        <DatePicker
          value={projectDeadline}
          onChange={setProjectDeadline}
          minDate={new Date()}
          holidays={holidays}
          specialDays={specialDays}
          disableWeekends
          disableHolidays
          placeholder="Select project deadline"
        />
        <div className="text-xs text-muted-foreground space-y-1 px-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-destructive/20 rounded"></div>
            <span>Holidays (Labor Day, Mid-Autumn, Equinox)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-chart-1/20 rounded"></div>
            <span>Sprint Planning (Sep 5)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-chart-2/20 rounded"></div>
            <span>Product Demo (Sep 12)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-chart-3/20 rounded"></div>
            <span>Code Review (Sep 19)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-chart-4/20 rounded"></div>
            <span>Release Date (Sep 26)</span>
          </div>
          <div className="text-muted-foreground/80">
            • Weekends disabled • Holidays disabled
          </div>
        </div>
      </div>
    );
  };
  
  const quickActions: ActionSheetAction[] = [
    {
      label: "Quick Edit",
      onClick: () => console.log("Quick Edit clicked"),
      icon: <Edit3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
    },
    {
      label: "Share Link",
      onClick: () => console.log("Share Link clicked"),
      icon: <Share2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
    },
    {
      label: "Delete Item",
      onClick: () => console.log("Delete clicked"),
      variant: "destructive",
      icon: <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />,
    },
  ];
  
  export const QuickActionsDemo = () => {
    return (
      <ActionSheet position="bottom">
        <ActionSheet.Trigger>Quick Actions</ActionSheet.Trigger>
        <ActionSheet.Header>
          <ActionSheet.Title>Quick Actions</ActionSheet.Title>
          <ActionSheet.Description>
            Choose an action for this item.
          </ActionSheet.Description>
        </ActionSheet.Header>
        <ActionSheet.Content>
          <ActionSheet.Actions actions={quickActions} />
        </ActionSheet.Content>
        <ActionSheet.Footer />
      </ActionSheet>
    );
  };
  
  const fileActions: ActionSheetAction[] = [
    {
      label: "Copy Link",
      onClick: () => console.log("Copy clicked"),
      icon: <Copy className="w-4 h-4 text-green-600 dark:text-green-400" />,
    },
    {
      label: "Move to Trash",
      onClick: () => console.log("Remove clicked"),
      variant: "destructive",
      icon: <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />,
    },
  ];
  
  export const FileOptionsDemo = () => {
    return (
      <ActionSheet position="top">
        <ActionSheet.Trigger>File Options</ActionSheet.Trigger>
        <ActionSheet.Header>
          <ActionSheet.Title>File Options</ActionSheet.Title>
          <ActionSheet.Description>Manage your file.</ActionSheet.Description>
        </ActionSheet.Header>
        <ActionSheet.Content>
          <ActionSheet.Actions actions={fileActions} />
        </ActionSheet.Content>
        <ActionSheet.Footer />
      </ActionSheet>
    );
  };
  
  const editActions: ActionSheetAction[] = [
    {
      label: "Edit Content",
      onClick: () => console.log("Edit clicked"),
      icon: <Edit3 className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />,
    },
    {
      label: "Duplicate",
      onClick: () => console.log("Duplicate clicked"),
      icon: <Copy className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />,
    },
  ];
  
  export const EditToolsDemo = () => {
    return (
      <ActionSheet position="left">
        <ActionSheet.Trigger>Edit Tools</ActionSheet.Trigger>
        <ActionSheet.Header>
          <ActionSheet.Title>Edit Tools</ActionSheet.Title>
          <ActionSheet.Description>Modify your content.</ActionSheet.Description>
        </ActionSheet.Header>
        <ActionSheet.Content>
          <ActionSheet.Actions actions={editActions} />
        </ActionSheet.Content>
        <ActionSheet.Footer />
      </ActionSheet>
    );
  };
  
  const shareActions: ActionSheetAction[] = [
    {
      label: "Share Publicly",
      onClick: () => console.log("Share Public clicked"),
      icon: <Share2 className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
    },
    {
      label: "Remove Access",
      onClick: () => console.log("Remove Access clicked"),
      variant: "destructive",
      icon: <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />,
    },
  ];
  
  export const ShareOptionsDemo = () => {
    return (
      <ActionSheet position="right">
        <ActionSheet.Trigger>Share Options</ActionSheet.Trigger>
        <ActionSheet.Header>
          <ActionSheet.Title>Share Options</ActionSheet.Title>
          <ActionSheet.Description>
            Control access to your content.
          </ActionSheet.Description>
        </ActionSheet.Header>
        <ActionSheet.Content>
          <ActionSheet.Actions actions={shareActions} />
        </ActionSheet.Content>
        <ActionSheet.Footer />
      </ActionSheet>
    );
  };
  
  export const CompactRegistrationForm = () => {
    const handleSubmit = async (data: any) => {
      await new Promise((resolve) => setTimeout(resolve, 2000));
      console.log("Registration completed:", data);
    };
  
    const handleFormChange = (data: any) => {};
  
    const registrationSteps = {
      steps: [
        {
          id: "account",
          title: "Account Setup",
          description: "Create your account",
          fields: [
            {
              id: "fullName",
              label: "Full Name",
              type: "text" as const,
              placeholder: "John Doe",
              validation: {
                required: true,
                minLength: 2,
                minLengthError: "Name must be at least 2 characters",
              },
            },
            {
              id: "email",
              label: "Email Address",
              type: "email" as const,
              placeholder: "john@company.com",
              validation: { required: true },
            },
            {
              id: "password",
              label: "Password",
              type: "password" as const,
              placeholder: "Choose a strong password",
              validation: { required: true, minLength: 8 },
            },
          ],
        },
        {
          id: "profile",
          title: "Profile Info",
          description: "Tell us about yourself",
          fields: [
            {
              id: "role",
              label: "Your Role",
              type: "select" as const,
              options: [
                { label: "Developer", value: "developer" },
                { label: "Designer", value: "designer" },
                { label: "Product Manager", value: "pm" },
                { label: "Marketing", value: "marketing" },
              ],
              validation: { required: true },
            },
            {
              id: "company",
              label: "Company Name",
              type: "text" as const,
              placeholder: "Acme Corporation",
              validation: { required: true },
            },
            {
              id: "experience",
              label: "Years of Experience",
              type: "slider" as const,
              sliderProps: { min: 0, max: 20, step: 1 },
              validation: { required: true },
            },
          ],
        },
        {
          id: "preferences",
          title: "Preferences",
          description: "Customize your experience",
          fields: [
            {
              id: "notifications",
              label: "Enable Email Notifications",
              type: "switch" as const,
              validation: { required: false },
            },
            {
              id: "newsletter",
              label: "Subscribe to Product Updates",
              type: "checkbox" as const,
              validation: { required: false },
            },
            {
              id: "terms",
              label: "I agree to the Terms of Service",
              type: "checkbox" as const,
              validation: { required: true },
            },
          ],
        },
      ],
      header: {
        title: "Join QuickCode UI",
        description: "Get started with our component library",
      },
      submitText: "Create Account",
      showReset: true,
      autoSave: false,
    };
  
    return (
      <AdvancedForm
        steps={registrationSteps.steps}
        onSubmit={handleSubmit}
        onChange={handleFormChange}
        header={registrationSteps.header}
        submitText={registrationSteps.submitText}
        showReset={registrationSteps.showReset}
        autoSave={registrationSteps.autoSave}
        className="max-w-3xl mx-auto"
      />
    );
  };
  
  `,

  "layout.tsx": `import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'QuickCode UI Demo',
  description: 'Demonstrating QuickCode UI components',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}`,

  "package.json": `{
  "name": "my-app",
  "version": "0.1.0",
  "private": true,
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "next lint"
  },
  "dependencies": {
    "react": "^18",
    "react-dom": "^18",
    "next": "15.1.0",
    "quickcode-ui": "^1.0.0",
    "framer-motion": "^11.0.0",
    "lucide-react": "^0.263.1"
  },
  "devDependencies": {
    "typescript": "^5",
    "@types/node": "^20",
    "@types/react": "^18",
    "@types/react-dom": "^18",
    "eslint": "^8",
    "eslint-config-next": "15.1.0",
    "tailwindcss": "^3.4.1",
    "postcss": "^8",
    "autoprefixer": "^10.0.1"
  }
}`,

  "next.config.js": `/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
}

module.exports = nextConfig`,

  "tsconfig.json": `{
  "compilerOptions": {
    "target": "es5",
    "lib": ["dom", "dom.iterable", "es6"],
    "allowJs": true,
    "skipLibCheck": true,
    "strict": true,
    "noEmit": true,
    "esModuleInterop": true,
    "module": "esnext",
    "moduleResolution": "bundler",
    "resolveJsonModule": true,
    "isolatedModules": true,
    "jsx": "preserve",
    "incremental": true,
    "plugins": [
      {
        "name": "next"
      }
    ],
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["next-env.d.ts", "**/*.ts", "**/*.tsx", ".next/types/**/*.ts"],
  "exclude": ["node_modules"]
}`,
};

export const commands = [
  {
    command: "npx create-next-app@latest . --yes",
    output: `✔ Creating a new Next.js app in /my-app

Installing dependencies:
- react, react-dom, next
- typescript, @types/react, @types/node  
- tailwindcss, postcss, autoprefixer
- eslint, eslint-config-next

Installing devDependencies with npm...

Success! Created my-app at /my-app
Inside that directory, you can run several commands:

  npm run dev
    Starts the development server.

  npm run build
    Builds the app for production.

  npm start
    Runs the built app in production mode.

We suggest that you begin by typing:

  cd my-app
  npm run dev`,
  },
  {
    command: "npx quickcode-ui init",
    output: `added 1 package, and audited 329 packages in 3s
✅ Updated global.css with QuickCode UI theme 
120 packages are looking for funding
  run \`npm fund\` for details

found 0 vulnerabilities`,
  },
  {
    command:
      "npx quickcode-ui add Tabs ActionSheet MultiSelect DatePicker AdvancedForm",
    output: `✅ Installed Tabs → src/components/ui/Tabs.tsx
✅ Installed ActionSheet → src/components/ui/ActionSheet.tsx
✅ Installed MultiSelect → src/components/ui/MultiSelect.tsx
✅ Installed DatePicker → src/components/ui/DatePicker.tsx
✅ Installed AdvancedForm → src/components/ui/AdvancedForm.tsx
 
✅ Added component exports to index.ts

QuickCode UI components have been successfully added to your project!`,
  },
  {
    command: "npm run dev",
    output: `> my-app@0.1.0 dev
> next dev

   ▲ Next.js 15.1.0
   - Local:        http://localhost:3000
   - Environments: .env.local

 ✓ Starting...
 ✓ Ready in 2.3s
 ○ Compiling /page ...
 ✓ Compiled /page in 1.2s`,
  },
];
