"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionProps extends React.ComponentProps<"div"> {
  items: Array<{ title: string; content: string }>;
  allowMultiple?: boolean;
  variant?: "default" | "bordered" | "filled";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items = [],
  allowMultiple = false,
  variant = "default",
  size = "md",
  className,
  ...props
}) => {
  const sizeClasses = { sm: "text-sm", md: "text-base", lg: "text-lg" };
  const paddingClasses = { sm: "px-3 py-2", md: "px-4 py-3", lg: "px-6 py-4" };

  const variantClasses = {
    default: "border-b border-border", // token
    bordered: "border border-border rounded-lg mb-2", // token
    filled: "bg-muted text-foreground rounded-lg mb-2", // token
  };

  const [openItems, setOpenItems] = React.useState<Set<number>>(new Set());

  const toggleItem = (index: number) => {
    const newOpenItems = new Set(openItems);
    if (newOpenItems.has(index)) newOpenItems.delete(index);
    else {
      if (!allowMultiple) newOpenItems.clear();
      newOpenItems.add(index);
    }
    setOpenItems(newOpenItems);
  };

  return (
    <div
      {...props}
      className={cn("lg:max-w-3xl md:max-w-2xl w-full mx-auto", className)}
    >
      {items.map((item, index) => {
        const isOpen = openItems.has(index);
        return (
          <div
            key={index}
            className={`${variantClasses[variant]} overflow-hidden min-w-0`}
          >
            <button
              onClick={() => toggleItem(index)}
              className={`w-full flex items-center justify-between ${paddingClasses[size]} ${sizeClasses[size]} font-medium text-left text-foreground hover:text-primary  transition-colors duration-200 rounded-md cursor-pointer`}
            >
              <span>{item.title}</span>
              <ChevronDown
                className={`w-4 h-4 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: "auto" }}
                  exit={{ height: 0 }}
                  transition={{ duration: 0.2, ease: "easeInOut" }}
                  className="overflow-hidden w-full"
                >
                  <div
                    className={`${paddingClasses[size]} pt-0 text-muted-foreground  text-wrap ${sizeClasses[size]}`}
                  >
                    {item.content}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}
    </div>
  );
};
