"use client";

import { useState } from "react";
import { Tabs } from "nextra/components";
import { Check, Copy } from "lucide-react";
import { motion } from "framer-motion";

interface InstallTabsProps {
  components: string;
  title?: string;
}

export function InstallTabs({
  components,
  title = "Install Dependencies",
}: InstallTabsProps) {
  const commands = {
    npm: `npx quickcode-ui add ${components}`,
    pnpm: `pnpm dlx quickcode-ui add ${components}`,
    yarn: `yarn dlx quickcode-ui add ${components}`,
    bun: `bunx quickcode-ui add ${components}`,
  };

  const [copied, setCopied] = useState(false);

  const handleCopy = (cmd: string) => {
    navigator.clipboard.writeText(cmd);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="my-6">
      {/* Mimic ## heading from MDX */}
      <h2 className="text-2xl font-semibold tracking-tight mb-4">{title}</h2>

      <Tabs items={["npm", "pnpm", "yarn", "bun"]}>
        {Object.entries(commands).map(([manager, cmd]) => {
          const parts = cmd.split(" ");
          const first = parts.shift(); // "npx" or "pnpm" etc.
          const rest = parts.join(" ");

          return (
            <Tabs.Tab key={manager}>
              <div className="relative rounded-md border border-border bg-muted p-4 font-mono text-sm flex items-center">
                <code className="gap-2 overflow-x-auto whitespace-nowrap flex items-center justify-center">
                  <span className="text-primary">{first}</span>{" "}
                  <div className="inline-flex">
                    {/* typing text */}
                    <motion.span
                      className="overflow-hidden whitespace-nowrap"
                      initial={{ width: 0 }}
                      animate={{
                        width: [
                          "0ch",
                          rest.length + "ch",
                          rest.length + "ch",
                          "0ch",
                        ],
                      }}
                      transition={{
                        duration: 9,
                        times: [0, 0.6, 0.8, 1],
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    >
                      {rest}
                    </motion.span>

                    {/* blinking cursor */}
                    <motion.span
                      className="ml-2 border-r-2 border-[#e34ba9]"
                      animate={{ opacity: [1, 0, 1] }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        ease: "linear",
                      }}
                    />
                  </div>
                </code>

                <button
                  onClick={() => handleCopy(cmd)}
                  className="absolute right-3 top-3 flex items-center text-muted-foreground hover:text-foreground"
                >
                  {copied ? (
                    <Check className="h-5 w-5 text-green-500" />
                  ) : (
                    <Copy className="h-4 w-4" />
                  )}
                </button>
              </div>
            </Tabs.Tab>
          );
        })}
      </Tabs>
    </div>
  );
}
