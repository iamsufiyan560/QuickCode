"use client";

import { createContext, useContext } from "react";
import { motion, AnimatePresence, MotionProps } from "motion/react";
import { ChevronDown } from "lucide-react";
import { Separator } from "@/components/ui/Separator";
import React from "react";

type ExpandableCardContextType = {
  open: boolean;
  onToggle: () => void;
};

const ExpandableCardContext = createContext<ExpandableCardContextType | null>(
  null
);

function useExpandableCard() {
  const ctx = useContext(ExpandableCardContext);
  if (!ctx)
    throw new Error(
      "ExpandableCard compound components must be used inside <ExpandableCard>"
    );
  return ctx;
}

export type ExpandableCardProps = MotionProps &
  React.ComponentProps<"div"> & {
    value: string;
    open: boolean;
    onToggle: () => void;
    children: React.ReactNode;
  };

export function ExpandableCard({
  value,
  open,
  onToggle,
  children,
  className = "",
  ...props
}: ExpandableCardProps) {
  return (
    <ExpandableCardContext.Provider value={{ open, onToggle }}>
      <motion.div
        key={value}
        layout
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className={`rounded-lg border border-border bg-card overflow-hidden ${className}`}
        {...props}
      >
        {children}
      </motion.div>
    </ExpandableCardContext.Provider>
  );
}

export type ExpandableCardItemProps = MotionProps &
  React.ComponentProps<"div"> & {
    children: React.ReactNode;
  };

ExpandableCard.Item = function ExpandableCardItem({
  children,
  className = "",
  ...props
}: ExpandableCardItemProps) {
  const { open, onToggle } = useExpandableCard();

  return (
    <motion.div
      layout="position"
      className={`flex items-center justify-between cursor-pointer p-4 hover:bg-muted/50 transition-colors gap-2 ${className}`}
      onClick={onToggle}
      {...props}
    >
      <div className="flex items-center gap-4 flex-1 min-w-0">{children}</div>

      <div className="flex items-center">
        <motion.div
          animate={{ rotate: open ? 180 : 0 }}
          transition={{ duration: 0.3, ease: "easeInOut" }}
        >
          <ChevronDown className="size-5 text-muted-foreground" />
        </motion.div>
      </div>
    </motion.div>
  );
};

export type ExpandableCardContentProps = MotionProps &
  React.ComponentProps<"div"> & {
    children: React.ReactNode;
  };

ExpandableCard.Content = function ExpandableCardContent({
  children,
  className = "",
  ...props
}: ExpandableCardContentProps) {
  const { open } = useExpandableCard();

  return (
    <AnimatePresence initial={false}>
      {open && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{
            height: "auto",
            opacity: 1,
            transition: {
              height: { duration: 0.3, ease: "easeInOut" },
              opacity: { duration: 0.2, delay: 0.1 },
            },
          }}
          exit={{
            height: 0,
            opacity: 0,
            transition: {
              height: { duration: 0.3, ease: "easeInOut" },
              opacity: { duration: 0.15 },
            },
          }}
          className={`overflow-hidden ${className}`}
          {...props}
        >
          <Separator />
          <div className="px-4 py-4 bg-muted/30">{children}</div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
