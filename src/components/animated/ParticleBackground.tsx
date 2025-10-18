"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export interface ParticleBackgroundProps {
  particleCount?: number;
  colors?: string[];
  speed?: "slow" | "medium" | "fast";
  size?: "sm" | "md" | "lg";
  blur?: boolean;
  className?: string;
}

export const ParticleBackground: React.FC<
  ParticleBackgroundProps & React.ComponentProps<"div">
> = ({
  particleCount = 50,
  colors = ["#06b6d4", "#a855f7", "#ec4899"],
  speed = "medium",
  size = "md",
  blur = true,
  className,
  ...props
}) => {
  const speedMultipliers = {
    slow: { min: 8, max: 15 },
    medium: { min: 5, max: 10 },
    fast: { min: 2, max: 6 },
  };

  const sizeClasses = {
    sm: "w-1 h-1",
    md: "w-2 h-2",
    lg: "w-3 h-3",
  };

  const { min, max } = speedMultipliers[speed];

  return (
    <div className={` inset-0 z-[10] overflow-hidden absolute`}>
      <div
        {...props}
        className={cn("absolute inset-0 bg-gray-100 dark:bg-black", className)}
      />

      {/* <div className={cn("group/cardstack flex flex-col gap-4", className)}> */}

      {[...Array(particleCount)].map((_, i) => (
        <motion.div
          key={i}
          className={`absolute ${sizeClasses[size]} rounded-full ${
            blur ? "blur-[2px]" : ""
          }`}
          style={{
            backgroundColor: colors[Math.floor(Math.random() * colors.length)],
            left: Math.random() * 100 + "%",
            top: Math.random() * 100 + "%",
          }}
          animate={{
            x: [0, Math.random() * 600 - 300],
            y: [0, Math.random() * 600 - 300],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: Math.random() * max + min,
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      ))}
    </div>
  );
};
