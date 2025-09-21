// app/not-found.tsx
"use client";

import { motion } from "framer-motion";
import { AlertCircle } from "lucide-react";
import Link from "next/link";

export default function NotFoundPage() {
  return (
    <html>
      <body>
        <div className="relative flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 via-gray-800 to-gray-900 text-white overflow-hidden px-4">
          {/* Particle background */}
          <div className="absolute inset-0">
            <div className="w-full h-full">
              {[...Array(40)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute bg-red-500 rounded-full opacity-50"
                  style={{
                    width: `${Math.random() * 6 + 4}px`,
                    height: `${Math.random() * 6 + 4}px`,
                    top: `${Math.random() * 100}%`,
                    left: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, 20, 0],
                    x: [0, 10, -10, 0],
                    opacity: [0.5, 1, 0.5],
                  }}
                  transition={{
                    duration: Math.random() * 4 + 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                />
              ))}
            </div>
          </div>

          {/* Main content */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className="z-10 mb-6"
          >
            <AlertCircle size={100} className="text-red-500 animate-pulse" />
          </motion.div>

          <motion.h1
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-6xl font-extrabold mb-4 text-center"
          >
            404 – Whoops!
          </motion.h1>

          <motion.p
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-xl text-gray-300 mb-6 text-center max-w-xl"
          >
            Looks like you wandered into a corner of QuickCode that doesn’t
            exist. Don’t worry, it happens to the best of us. Go back and grab
            some 🔥 components!
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="flex gap-4 flex-wrap justify-center z-10"
          >
            <Link
              href="/docs"
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors"
            >
              Go to Docs
            </Link>
            <Link
              href="/"
              className="bg-gray-700 hover:bg-gray-600 text-white font-bold py-3 px-6 rounded-lg shadow-lg transition-colors"
            >
              Back Home
            </Link>
          </motion.div>
        </div>
      </body>
    </html>
  );
}
