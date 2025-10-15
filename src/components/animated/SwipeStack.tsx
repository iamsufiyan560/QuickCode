"use client";

import React from "react";
import { motion, useMotionValue, useTransform } from "framer-motion";
import { cn } from "@/lib/utils";

interface SwipeStackProps {
  children: React.ReactNode;
  className?: string;
}

function SwipeStackRoot({ children, className }: SwipeStackProps) {
  const hasItems = React.Children.count(children) > 0;

  return (
    <div
      className={cn(
        "relative flex items-center justify-center min-h-[400px]  ",
        className
      )}
    >
      {hasItems ? (
        children
      ) : (
        <div className="flex flex-col items-center justify-center text-center text-muted-foreground min-h-[400px] bg-secondary rounded-md px-16">
          <p>No more cards</p>
        </div>
      )}
    </div>
  );
}

interface SwipeStackItemProps {
  id: string;
  isActive?: boolean;
  index?: number;
  totalItems?: number;
  onSwipe?: (id: string, direction: "left" | "right") => void;
  onSwipeComplete?: (id: string) => void;
  children?: React.ReactNode;
  className?: string;
}

function SwipeStackItem({
  id,
  isActive = false,
  index = 0,
  totalItems = 1,
  onSwipe,
  onSwipeComplete,
  children,
  className,
  ...props
}: SwipeStackItemProps) {
  const xPosition = useMotionValue(0);
  const rotation = useTransform(xPosition, [-150, 150], [-18, 18]);
  const fadeOut = useTransform(xPosition, [-150, 0, 150], [0, 1, 0]);

  const calculateRotation = useTransform(() => {
    const baseRotation = isActive ? 0 : index % 2 ? 6 : -6;
    return `${rotation.get() + baseRotation}deg`;
  });

  const handleDragEnd = () => {
    const swipeThreshold = 100;
    const currentX = xPosition.get();

    if (Math.abs(currentX) > swipeThreshold) {
      const direction = currentX > 0 ? "right" : "left";
      onSwipe?.(id, direction);
      onSwipeComplete?.(id);
    }
  };

  return (
    <motion.div
      data-swipe-item={id}
      style={{
        position: "absolute",
        x: xPosition,
        opacity: fadeOut,
        rotate: calculateRotation,
        transition: "0.125s transform",
        boxShadow: isActive ? "var(--shadow-xl)" : "var(--shadow-md)",
      }}
      animate={{
        scale: isActive ? 1 : 0.98,
      }}
      drag={isActive ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className={cn(
        "origin-bottom rounded-lg bg-card border border-border overflow-hidden",
        isActive ? "cursor-grab active:cursor-grabbing" : "cursor-default",
        className
      )}
      {...props}
    >
      {children}
    </motion.div>
  );
}

interface SwipeStackImageProps {
  src: string;
  alt?: string;
  className?: string;
}

function SwipeStackImage({ src, alt = "", className }: SwipeStackImageProps) {
  return (
    <img
      src={src}
      alt={alt}
      className={cn(
        "absolute inset-0 h-full w-full object-cover pointer-events-none",
        className
      )}
    />
  );
}

interface SwipeStackOverlayProps {
  children: React.ReactNode;
  className?: string;
}

function SwipeStackOverlay({ children, className }: SwipeStackOverlayProps) {
  return (
    <div
      className={cn(
        "absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-6",

        className
      )}
    >
      {children}
    </div>
  );
}

const SwipeStack = Object.assign(SwipeStackRoot, {
  Item: SwipeStackItem,
  Image: SwipeStackImage,
  Overlay: SwipeStackOverlay,
});

export { SwipeStack };
