"use client";

import * as React from "react";
import { motion, HTMLMotionProps, Variants } from "framer-motion";
import { cn } from "@/lib/utils";

// Hover scale + rotate
const hoverVariants: Variants = {
  hover: { scale: 0.95, rotate: "-1deg" },
};

export interface BouncyCardProps extends HTMLMotionProps<"div"> {}

export const BouncyCard = React.forwardRef<HTMLDivElement, BouncyCardProps>(
  ({ className, children, ...props }, ref) => (
    <motion.div
      ref={ref}
      initial="rest"
      whileHover="hover"
      animate="rest"
      variants={hoverVariants}
      className={cn(
        "relative cursor-pointer overflow-hidden rounded-2xl bg-card text-card-foreground shadow-md border border-border",
        "p-8 min-h-[300px] min-w-[280px]",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  )
);

BouncyCard.displayName = "BouncyCard";

export const BouncyCardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn(
      "relative z-10 mb-4 text-center text-3xl font-semibold text-foreground",
      className
    )}
    {...props}
  />
));

BouncyCardHeader.displayName = "BouncyCardHeader";

export const BouncyCardContent = React.forwardRef<
  HTMLDivElement,
  HTMLMotionProps<"div">
>(({ className, ...props }, ref) => (
  <motion.div
    ref={ref}
    variants={{
      rest: { y: 32, rotate: 0 },
      hover: { y: 16, rotate: 2 },
    }}
    transition={{ duration: 0.25 }}
    className={cn(
      "absolute left-4 right-4 top-32 bottom-0 rounded-t-2xl",
      "bg-primary text-primary-foreground p-4",
      className
    )}
    {...props}
  />
));

BouncyCardContent.displayName = "BouncyCardContent";
