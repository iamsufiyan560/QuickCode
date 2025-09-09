// "use client";

// import { Tabs } from "nextra/components";
// import { Copy, Check } from "lucide-react";
// import jsxToString from "react-element-to-jsx-string";
// import React from "react";
// import { LiveProvider, LiveEditor, LiveError } from "react-live";

// interface ShowcaseProps {
//   children: React.ReactElement;
//   scope?: Record<string, any>;
//   title?: string;
//   imports?: string[];
// }

// export const Showcase: React.FC<ShowcaseProps> = ({
//   children,
//   scope = {},
//   title,
//   imports = [],
// }) => {
//   const [copied, setCopied] = React.useState(false);

//   const jsxCode = jsxToString(children, {
//     showFunctions: true,
//     sortProps: false,
//   });

//   // Only include the function body in finalCode, relying on scope for imports
//   const finalCode = `function ${
//     title ? title.replace(/\s+/g, "") : "Example"
//   }() {\n  return (\n    ${jsxCode.replace(/\n/g, "\n    ").trim()}\n  );\n}`;

//   const copyCode = async () => {
//     // Include imports in the copied code for reference
//     const codeToCopy = `${imports.join(";\n")}${
//       imports.length > 0 ? "\n\n" : ""
//     }${finalCode}`;
//     await navigator.clipboard.writeText(codeToCopy);
//     setCopied(true);
//     setTimeout(() => setCopied(false), 2000);
//   };

//   return (
//     <div className="group mt-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
//       {title && (
//         <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-800 bg-gray-50 dark:bg-gray-900/50">
//           <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">
//             {title}
//           </h3>
//         </div>
//       )}

//       <LiveProvider
//         code={finalCode}
//         scope={scope}
//         noInline={false}
//         theme={{
//           plain: { backgroundColor: "transparent", color: "#f8fafc" },
//           styles: [
//             {
//               types: ["comment"],
//               style: { color: "#64748b", fontStyle: "italic" },
//             },
//             {
//               types: ["keyword"],
//               style: { color: "#0ea5e9", fontWeight: "bold" },
//             },
//             { types: ["string"], style: { color: "#10b981" } },
//             { types: ["function"], style: { color: "#8b5cf6" } },
//             { types: ["tag"], style: { color: "#f59e0b" } },
//             { types: ["attr-name"], style: { color: "#06b6d4" } },
//           ],
//         }}
//       >
//         <Tabs
//           items={["Preview", "Code"]}
//           defaultIndex={0}
//           className="!p-0 !m-0 [&_[role=tab]]:px-4 [&_[role=tab]]:py-2 [&_[role=tab]]:text-sm [&_[role=tab]]:font-medium [&_[role=tab][aria-selected=true]]:border-b-2 [&_[role=tab][aria-selected=true]]:border-blue-500 [&_[role=tab][aria-selected=true]]:text-blue-600 dark:[&_[role=tab][aria-selected=true]]:text-blue-400"
//         >
//           <Tabs.Tab>
//             <div className="p-2 min-h-[200px] bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 flex items-center justify-center">
//               {children}
//               <LiveError className="text-red-500 text-sm mt-4 p-4 bg-red-50 dark:bg-red-900/20 rounded-md border border-red-200 dark:border-red-800" />
//             </div>
//           </Tabs.Tab>
//           <Tabs.Tab>
//             <div className="relative">
//               <button
//                 onClick={copyCode}
//                 className="absolute top-3 right-3 z-10 inline-flex items-center gap-1 rounded-md bg-gray-900 dark:bg-gray-800 px-3 py-1.5 text-xs text-white hover:bg-gray-800 dark:hover:bg-gray-700 transition-colors"
//               >
//                 {copied ? (
//                   <>
//                     <Check size={12} /> Copied!
//                   </>
//                 ) : (
//                   <>
//                     <Copy size={12} /> Copy
//                   </>
//                 )}
//               </button>
//               <div className="bg-gray-900 dark:bg-black overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
//                 <LiveEditor
//                   disabled
//                   style={{
//                     fontFamily:
//                       'ui-monospace, SFMono-Regular, "SF Mono", Consolas, "Liberation Mono", Menlo, monospace',
//                     fontSize: 14,
//                     padding: "1.5rem",
//                     minHeight: "300px",
//                     backgroundColor: "transparent",
//                     outline: "none",
//                     whiteSpace: "pre-wrap",
//                     wordBreak: "break-word",
//                   }}
//                 />
//               </div>
//               <LiveError className="text-red-400 text-sm p-4 bg-red-900/20 border-t border-red-800" />
//             </div>
//           </Tabs.Tab>
//         </Tabs>
//       </LiveProvider>
//     </div>
//   );
// };

"use client";

import { Tabs } from "nextra/components";
import { Copy, Check } from "lucide-react";
import jsxToString from "react-element-to-jsx-string";
import React from "react";
import { LiveProvider, LiveEditor } from "react-live";

interface ShowcaseProps {
  children: React.ReactElement;
  scope?: Record<string, any>;
  title?: string;
  imports?: string[];
}

export const Showcase: React.FC<ShowcaseProps> = ({
  children,
  scope = {},
  title,
  imports = [],
}) => {
  const [copied, setCopied] = React.useState(false);

  // Detect props starting with "set" to include state declarations in code tab if not provided
  const props = children.props || {};
  const setProps = Object.keys(props).filter((prop) => prop.startsWith("set"));
  const hasStateProps = setProps.length > 0;
  const stateProps = setProps.map(
    (setProp) =>
      setProp.replace(/^set/, "").slice(0, 1).toLowerCase() +
      setProp.replace(/^set/, "").slice(1)
  );

  // Generate JSX code for code tab, handling setProps
  const jsxCode = jsxToString(children, {
    showFunctions: true,
    sortProps: false,
    functionValue: (fn: any) => {
      if (fn.toString().includes("[native code]")) {
        const propName = setProps.find((prop) => props[prop] === fn);
        return propName ? propName : "() => {}";
      }
      return fn.toString();
    },
  });

  // Generate state declarations for setProps if they exist and aren't provided
  const stateDeclarations = setProps
    .filter((setProp) => !props[setProp]) // Only add state for missing setProps
    .map((setProp, index) => {
      const stateName = stateProps[index];
      return `const [${stateName}, ${setProp}] = React.useState(false);`;
    })
    .join("\n");

  // Generate code for code tab
  const finalCode =
    hasStateProps && stateDeclarations
      ? `function ${title ? title.replace(/\s+/g, "") : "Example"}() {
  ${stateDeclarations}
  return (
    ${jsxCode.replace(/\n/g, "\n    ").trim()}
  );
}`
      : `function ${title ? title.replace(/\s+/g, "") : "Example"}() {
  return (
    ${jsxCode.replace(/\n/g, "\n    ").trim()}
  );
}`;

  const copyCode = async () => {
    const codeToCopy = `${imports.join(";\n")}${
      imports.length > 0 ? "\n\n" : ""
    }${finalCode}`;
    await navigator.clipboard.writeText(codeToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group mt-4 rounded-xl border border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-950 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
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
        className="!p-0 !m-0 [&_[role=tab]]:px-4 [&_[role=tab]]:py-2 [&_[role=tab]]:text-sm [&_[role=tab]]:font-medium [&_[role=tab][aria-selected=true]]:border-b-2 [&_[role=tab][aria-selected=true]]:border-blue-500 [&_[role=tab][aria-selected=true]]:text-blue-600 dark:[&_[role=tab][aria-selected=true]]:text-blue-400"
      >
        <Tabs.Tab>
          <div className="p-2 min-h-[200px] bg-gradient-to-br from-gray-50 to-white dark:from-gray-900 dark:to-gray-950 flex items-center justify-center">
            {children}
          </div>
        </Tabs.Tab>
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
              code={finalCode}
              scope={{ React, ...scope }}
              noInline={true}
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
              <div className="bg-gray-900 dark:bg-black overflow-x-auto scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-transparent">
                <LiveEditor
                  disabled={true}
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
