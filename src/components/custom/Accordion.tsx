"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface AccordionProps {
  items?: Array<{ title: string; content: string }>;
  allowMultiple?: boolean;
  variant?: "default" | "bordered" | "filled";
  size?: "sm" | "md" | "lg";
  className?: string;
}

export const Accordion: React.FC<AccordionProps> = ({
  items = [
    {
      title: "What is this component?",
      content:
        "This is a flexible accordion component built with React, Framer Motion, and Tailwind CSS.",
    },
    {
      title: "How do I use it?",
      content:
        "Simply pass an array of items with title and content properties. You can customize the appearance and behavior with various props.",
    },
    {
      title: "Can I open multiple items?",
      content:
        "Yes! Use the allowMultiple prop to enable multiple items to be open simultaneously.",
    },
  ],
  allowMultiple = false,
  variant = "default",
  size = "md",
  className, // ✅ added
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
    <div className={cn("lg:w-3xl md:w-2xl w-full mx-auto", className)}>
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
                    className={`${paddingClasses[size]} pt-0 text-muted-foreground ${sizeClasses[size]}`}
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
