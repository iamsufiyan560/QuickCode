"use client";

import * as React from "react";
import { Tabs } from "nextra/components";
import { Copy, Check, Eye, Code2 } from "lucide-react";
import { LiveProvider, LivePreview, LiveEditor, LiveError } from "react-live";

interface PreviewProps {
  code?: string;
  children?: React.ReactNode;
  scope?: Record<string, any>;
  language?: string;
  title?: string;
}

export function Preview({
  code,
  children,
  scope = {},
  language = "jsx",
  title,
}: PreviewProps) {
  const [copied, setCopied] = React.useState(false);

  const finalCode = code || (children ? getCodeFromChildren(children) : "");

  const copyCode = async () => {
    await navigator.clipboard.writeText(finalCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group mt-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      {title && (
        <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
          <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
            {title}
          </h3>
        </div>
      )}

      <LiveProvider
        code={finalCode}
        scope={scope}
        noInline={false}
        theme={{
          plain: { backgroundColor: "transparent", color: "#f8fafc" },
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
        <Tabs
          items={["Preview", "Code"]}
          defaultIndex={0}
          className="
    !p-0 !m-0 
    [&_[role=tab]]:px-4 [&_[role=tab]]:py-2 
    [&_[role=tab]]:text-sm [&_[role=tab]]:font-medium
    [&_[role=tab][aria-selected=true]]:border-b-2 
    [&_[role=tab][aria-selected=true]]:border-blue-500 
    [&_[role=tab][aria-selected=true]]:text-blue-600 
    dark:[&_[role=tab][aria-selected=true]]:text-blue-400"
        >
          {/* Preview Tab */}
          <Tabs.Tab>
            <div className="relative">
              <div className="absolute top-4 right-4 z-10 flex items-center gap-2">
                {/* <div className="flex items-center gap-1 px-2 py-1 rounded-md bg-black/5 dark:bg-white/5 backdrop-blur-sm">
                  <Eye size={12} className="text-gray-500" />
                  <span className="text-xs text-gray-500">Preview</span>
                </div> */}
              </div>
              <div className="p-2 min-h-[200px] bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 flex items-center justify-center">
                {children || <LivePreview />}
                <LiveError className="text-red-500 text-sm mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800" />
              </div>
            </div>
          </Tabs.Tab>

          {/* Code (Live Editor) Tab */}
          <Tabs.Tab>
            <div className="relative">
              {/* Copy button inside editor */}
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

              <div className="bg-gray-900 dark:bg-black overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
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
                    whiteSpace: "pre-wrap", // ⬅ line wrapping
                    wordBreak: "break-word", // ⬅ break long tokens
                  }}
                />
              </div>

              <LiveError className="text-red-400 text-sm p-4 bg-red-900/20 border-t border-red-800" />
            </div>
          </Tabs.Tab>
        </Tabs>
      </LiveProvider>
    </div>
  );
}

// Helper: fallback for when only React children passed
function getCodeFromChildren(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  return "// Unable to extract code from React element";
}
