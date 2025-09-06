"use client";

import { motion } from "framer-motion";
import { Preview } from "../ui/Preview";

export function CopyButton() {
  return <Preview code={`
function CopyButton() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="flex flex-col items-center justify-center p-8 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-lg bg-gray-50 dark:bg-gray-900/20 text-gray-700 dark:text-gray-200 space-y-4"
    >
      <div className="text-4xl">🚧</div>
      <div className="text-xl font-semibold">Component Under Construction</div>
      <div className="text-sm text-gray-500 dark:text-gray-400 text-center">
        This component is not ready yet. Check back later!
      </div>
    </motion.div>
  );
}`} scope={{ motion }} title="CopyButton" language="jsx" />;
}
