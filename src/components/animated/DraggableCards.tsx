"use client";

import React, { useState } from "react";
import { HTMLMotionProps, Reorder, motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface Card {
  id: number;
  title: string;
  description: string;
}

export interface DraggableCardsProps extends HTMLMotionProps<"div"> {
  cards?: Card[];
  horizontal?: boolean;
  variant?: "default" | "bordered" | "filled";
  size?: "sm" | "md" | "lg";
  onReorder?: (newCards: Card[]) => void;
  className?: string;
  cardClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
  dragScale?: number;
  dragBoxShadow?: string;
  normalBoxShadow?: string;
  dragBackground?: string;
  normalBackground?: string;
}

export const DraggableCards: React.FC<DraggableCardsProps> = ({
  cards = [
    {
      id: 1,
      title: "Fast API Calls",
      description: "Optimized for speed and efficiency",
    },
    {
      id: 2,
      title: "Beautiful UI",
      description: "Tailwind + Framer Motion magic",
    },
  ],
  horizontal = false,
  variant = "default",
  size = "md",
  onReorder,
  className,
  cardClassName,
  titleClassName,
  descriptionClassName,
  dragScale,
  dragBoxShadow,
  normalBoxShadow,
  dragBackground,

  normalBackground,
  ...props
}) => {
  const [localCards, setLocalCards] = useState(cards);
  const [draggingId, setDraggingId] = useState<number | null>(null);

  const handleReorder = (newCards: Card[]) => {
    setLocalCards(newCards);
    onReorder?.(newCards);
  };

  const sizeClasses = {
    sm: "p-4 text-sm",
    md: "p-6 text-base",
    lg: "p-8 text-lg",
  };

  const titleSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
  };

  const variantClasses = {
    default: "bg-muted border-border",
    bordered: "bg-background border-2 border-border",
    filled: "bg-muted border border-border",
  };

  const containerClasses = horizontal
    ? "flex space-x-4 overflow-x-auto pb-4"
    : "space-y-4";

  const itemClasses = horizontal ? "flex-shrink-0 w-80" : "w-full";

  return (
    <div className={cn("w-full  max-w-5xl mx-auto  ", className)}>
      <Reorder.Group
        {...props}
        axis={horizontal ? "x" : "y"}
        values={localCards}
        onReorder={handleReorder}
        className={containerClasses}
      >
        {localCards.map((card) => {
          const isDragging = draggingId === card.id;

          return (
            <Reorder.Item
              key={card.id}
              value={card}
              onDragStart={() => setDraggingId(card.id)}
              onDragEnd={() => setDraggingId(null)}
              dragListener
              className={`cursor-grab active:cursor-grabbing ${itemClasses}`}
            >
              <motion.div
                animate={{
                  scale: isDragging ? dragScale ?? 1.02 : 1,
                  boxShadow: isDragging
                    ? dragBoxShadow ??
                      "0px 4px 8px -1px hsl(0 0% 0% / 0.1), 0px 4px 6px -2px hsl(0 0% 0% / 0.1)"
                    : normalBoxShadow ??
                      "0px 4px 6px -1px hsl(0 0% 0% / 0.1), 0px 2px 4px -2px hsl(0 0% 0% / 0.1)",
                  ...(dragBackground || normalBackground
                    ? {
                        background: isDragging
                          ? dragBackground ?? ""
                          : normalBackground ?? "",
                      }
                    : {}),
                }}
                whileHover={{
                  scale: 1.01,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 25,
                  duration: 0.2,
                }}
                className={cn(
                  `rounded-lg ${sizeClasses[size]} ${variantClasses[variant]} shadow-md transition-colors duration-200`,
                  cardClassName
                )}
              >
                <h3
                  className={cn(
                    `font-semibold mb-2 text-foreground ${titleSizeClasses[size]}`,
                    titleClassName
                  )}
                >
                  {card.title}
                </h3>
                <p
                  className={cn(
                    "text-muted-foreground leading-relaxed",
                    descriptionClassName
                  )}
                >
                  {card.description}
                </p>
              </motion.div>
            </Reorder.Item>
          );
        })}
      </Reorder.Group>
    </div>
  );
};
