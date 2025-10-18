"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TabsProps extends React.ComponentProps<"div"> {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}

export interface TabsListProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

export interface TabsTriggerProps
  extends Omit<React.ComponentProps<"button">, "children"> {
  value: string;
  children: React.ReactNode;
  className?: string;
  activeColor?: string;
}

export interface TabsContentProps extends React.ComponentProps<"div"> {
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
  ...props
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
      <div {...props} className={cn("w-full", className)}>
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

export const TabsList: React.FC<TabsListProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      {...props}
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
  ({ value, children, className, activeColor, ...props }, ref) => {
    const { activeTab, setActiveTab } = useTabsContext();
    const isActive = activeTab === value;

    return (
      <div className="relative flex-shrink-0 min-w-32">
        <button
          {...props}
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
  ...props
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
    <div {...props} className={cn("mt-4", className)} role="tabpanel">
      {children}
    </div>
  );
};
