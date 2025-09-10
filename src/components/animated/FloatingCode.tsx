import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

const FloatingCode = ({
  code,
  className = "",
}: {
  code: string;
  className?: string;
}) => {
  return (
    <motion.div
      className={cn("absolute font-mono text-xs text-primary", className)}
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

export default FloatingCode;
