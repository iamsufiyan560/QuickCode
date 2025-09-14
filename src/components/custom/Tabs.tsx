"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface TabsProps {
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export interface TabsListProps {
  children: React.ReactNode;
  className?: string;
  orientation?: "horizontal" | "vertical";
}

export interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
  activeColor?: string; // Supports hex, rgb, gradients, etc.
}

export interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

// Context for managing tab state
const TabsContext = React.createContext<{
  activeTab: string;
  setActiveTab: (value: string) => void;
  orientation: "horizontal" | "vertical";
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
  orientation = "horizontal",
}) => {
  const [activeTab, setActiveTab] = React.useState(defaultValue);

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab, orientation }}>
      <div
        className={cn(
          "w-full",
          orientation === "vertical" && "flex gap-4",
          className
        )}
      >
        {children}
      </div>
    </TabsContext.Provider>
  );
};
export const TabsList: React.FC<TabsListProps> = ({
  children,
  className,
  orientation,
}) => {
  const { activeTab, orientation: contextOrientation } = useTabsContext();
  const finalOrientation = orientation || contextOrientation;
  const triggerCount = React.Children.count(children);

  let activeIndex = -1;
  let activeColor = "var(--primary)";

  React.Children.forEach(children, (child, index) => {
    if (
      React.isValidElement<TabsTriggerProps>(child) &&
      child.props.value === activeTab
    ) {
      activeIndex = index;
      if (child.props.activeColor) {
        activeColor = child.props.activeColor;
      }
    }
  });

  const isVertical = finalOrientation === "vertical";

  return (
    <div
      className={cn(
        "flex relative bg-muted/20 rounded-lg overflow-hidden border border-border/50",
        isVertical ? "flex-col w-48" : "flex-row",
        className
      )}
    >
      {children}

      {/* Gliding background */}
      <motion.div
        className="absolute rounded-lg z-[1] shadow-sm min-h-12 max-h-12"
        style={{
          ...(isVertical
            ? {
                height: `${100 / triggerCount}%`,
                left: 0,
                right: 0,
              }
            : {
                width: `${100 / triggerCount}%`,
                top: 0,
                bottom: 0,
              }),
          background: activeColor,
        }}
        animate={{
          ...(isVertical
            ? { y: activeIndex !== -1 ? `${activeIndex * 100}%` : "0%" }
            : { x: activeIndex !== -1 ? `${activeIndex * 100}%` : "0%" }),
        }}
        transition={{
          duration: 0.5,
          ease: [0.37, 1.95, 0.66, 0.56],
        }}
      />
    </div>
  );
};

export const TabsTrigger: React.FC<TabsTriggerProps> = ({
  value,
  children,
  className,
}) => {
  const { activeTab, setActiveTab } = useTabsContext();
  const isActive = activeTab === value;

  return (
    <button
      className={cn(
        "flex-1 text-center py-3 px-4 font-medium text-sm transition-colors z-[2] cursor-pointer relative min-h-12 max-h-12",
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
  );
};

export const TabsContent: React.FC<TabsContentProps> = ({
  value,
  children,
  className,
}) => {
  const { activeTab, orientation } = useTabsContext();

  if (activeTab !== value) {
    return null;
  }

  return (
    <div
      className={cn(orientation === "vertical" ? "flex-1" : "mt-4", className)}
      role="tabpanel"
    >
      {children}
    </div>
  );
};
