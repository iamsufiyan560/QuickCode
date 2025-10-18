"use client";
import { cn } from "@/lib/utils";
import { HTMLMotionProps, motion } from "framer-motion";

export const FloatingCode: React.FC<
  { code: string } & HTMLMotionProps<"div">
> = ({ code, className, ...props }) => {
  return (
    <motion.div
      className={cn("absolute font-mono text-xs  text-primary", className)}
      animate={{
        y: [-20, 20],
        opacity: [0.3, 0.7, 0.3],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        repeatType: "reverse",
      }}
    >
      {code}
    </motion.div>
  );
};
