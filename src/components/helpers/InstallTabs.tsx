"use client";

import { useState } from "react";
import { Tabs } from "nextra/components";
import { Check, Copy } from "lucide-react";

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
        {Object.entries(commands).map(([manager, cmd]) => (
          <Tabs.Tab key={manager}>
            <div className="relative rounded-md border border-border bg-muted p-4 font-mono text-sm">
              <code className="block overflow-x-auto">{cmd}</code>

              <button
                onClick={() => handleCopy(cmd)}
                className=" absolute right-3 top-3 flex items-center text-muted-foreground hover:text-foreground"
              >
                {copied ? (
                  <Check className="h-5 w-5 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4 " />
                )}
              </button>
            </div>
          </Tabs.Tab>
        ))}
      </Tabs>
    </div>
  );
}
