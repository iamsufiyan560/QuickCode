"use client";

import { Tabs } from "nextra/components";
import { Copy, Check } from "lucide-react";
import React from "react";
import { LiveProvider, LiveEditor, LiveError } from "react-live";

interface ShowcaseProps {
  children: React.ReactElement;
  code: string; // full code in backticks
  title?: string;
}

export const SnippetPreview: React.FC<ShowcaseProps> = ({
  children,
  code,
  title,
}) => {
  const [copied, setCopied] = React.useState(false);

  const copyCode = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group mt-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 overflow-hidden shadow-sm hover:shadow-md transition-shadow ">
      {title && (
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {title}
          </h3>
        </div>
      )}

      <Tabs
        items={["Preview", "Code"]}
        defaultIndex={0}
        className="!p-0 !m-0 [&_[role=tab]]:px-4 [&_[role=tab]]:py-2 [&_[role=tab]]:text-sm [&_[role=tab]]:font-medium [&_[role=tab][aria-selected=true]]:border-b-2 [&_[role=tab][aria-selected=true]]:border-blue-500 [&_[role=tab][aria-selected=true]]:text-blue-600 dark:[&_[role=tab][aria-selected=true]]:text-blue-400 "
      >
        {/* Preview tab */}
        <Tabs.Tab>
          <div
            className="p-2 min-h-[200px] bg-gradient-to-br 
          bg-background
          flex items-center justify-center "
          >
            {children}
          </div>
        </Tabs.Tab>

        {/* Code tab */}
        <Tabs.Tab>
          <div className="relative">
            <button
              onClick={copyCode}
              className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 rounded-md bg-gray-900 dark:bg-gray-800 px-3 py-1.5 text-xs text-white hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
            >
              {copied ? (
                <>
                  <Check size={12} /> Copied!
                </>
              ) : (
                <>
                  <Copy size={12} /> Copy
                </>
              )}
            </button>

            <LiveProvider
              code={code}
              disabled
              theme={{
                plain: {
                  backgroundColor: "transparent",
                  color: "var(--code-plain)", // ✅ correct string syntax
                },
                styles: [
                  {
                    types: ["comment"],
                    style: { color: "#64748b", fontStyle: "italic" },
                  },
                  {
                    types: ["keyword"],
                    style: { color: "#0ea5e9", fontWeight: "bold" },
                  },
                  { types: ["string"], style: { color: "#10b981" } },
                  { types: ["function"], style: { color: "#8b5cf6" } },
                  { types: ["tag"], style: { color: "#f59e0b" } },
                  { types: ["attr-name"], style: { color: "#06b6d4" } },
                ],
              }}
            >
              <div className="bg-white dark:bg-[#0f172a] overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                <LiveEditor
                  disabled
                  style={{
                    fontFamily:
                      'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
                    fontSize: 14,
                    padding: "1.5rem",
                    minHeight: "300px",
                    backgroundColor: "transparent",
                    outline: "none",
                    whiteSpace: "pre-wrap",
                    wordBreak: "break-word",
                  }}
                />
              </div>
            </LiveProvider>
          </div>
        </Tabs.Tab>
      </Tabs>
    </div>
  );
};
