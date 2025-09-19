"use client";

import React, { useState, useEffect, Dispatch, SetStateAction } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Folder,
  File,
  ChevronRight,
  ChevronDown,
  Terminal as TerminalIcon,
  X,
  Minus,
  Maximize2,
  RefreshCw,
  Info,
  GitGraph,
  Cog,
  FileJson,
  Github,
  Code2,
} from "lucide-react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { dark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Button } from "@/components/custom/Button";
import { ThemeToggle } from "./ThemeToggle";
import { Tooltip } from "@/components/custom/Tooltip";
import { DefaultTabsExample } from "./Example";
import { commands, fileContents } from "./fileContents";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface FileItem {
  name: string;
  type: "file" | "folder";
  children?: FileItem[];
}

const useTypingAnimation = (
  text: string,
  speed: number = 30,
  startDelay: number = 0
) => {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayText("");
    setIsComplete(false);

    const timeout = setTimeout(() => {
      let currentIndex = 0;
      const interval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          setIsComplete(true);
          clearInterval(interval);
        }
      }, speed);
      return () => clearInterval(interval);
    }, startDelay);

    return () => clearTimeout(timeout);
  }, [text, speed, startDelay]);

  return { displayText, isComplete };
};

const VSCodeWindow = ({ children }: { children: React.ReactNode }) => (
  <div className="bg-[#1e1e1e] rounded-lg shadow-2xl border border-gray-700 overflow-hidden h-full">
    <div className="bg-[#2d2d30] px-4 py-2 flex items-center justify-between border-b border-gray-600 overflow-visible">
      <div className="flex items-center space-x-2">
        <div className="flex items-center space-x-2">
          <Tooltip content="Sorry, I can't allow this - my UI would break! 😅">
            <div className="w-3 h-3 rounded-full bg-[#ff5f57] cursor-pointer hover:brightness-110 transition-all"></div>
          </Tooltip>
          <Tooltip content="Nope! My layout needs to stay perfect 🎨">
            <div className="w-3 h-3 rounded-full bg-[#ffbd2e] cursor-pointer hover:brightness-110 transition-all"></div>
          </Tooltip>
          <Tooltip content="Trust me, you don't want to mess with perfection! ✨">
            <div className="w-3 h-3 rounded-full bg-[#28ca42] cursor-pointer hover:brightness-110 transition-all"></div>
          </Tooltip>
        </div>
        <span className="text-sm text-gray-300 ml-4">Visual Studio Code</span>
      </div>
      <div className="flex items-center space-x-2">
        <Tooltip
          side="left"
          content="I'm just a demo - these don't actually work! 🚫"
        >
          <Minus className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-300 transition-colors" />
        </Tooltip>
        <Tooltip
          side="left"
          content="Sorry, no maximizing this masterpiece! 📐"
        >
          <Maximize2 className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-300 transition-colors" />
        </Tooltip>
        <Tooltip side="left" content="Nice try, but I'm staying right here! 😄">
          <X className="w-4 h-4 text-gray-400 cursor-pointer hover:text-gray-300 transition-colors" />
        </Tooltip>
      </div>
    </div>
    {children}
  </div>
);

const IntegratedTerminal = ({
  command,
  output,
  isVisible,
}: {
  command: string;
  output?: string;
  isVisible: boolean;
}) => {
  const [showOutput, setShowOutput] = useState(false);

  const { displayText: commandText, isComplete: commandComplete } =
    useTypingAnimation(command, 50, 500);

  useEffect(() => {
    if (commandComplete && output) {
      setTimeout(() => {
        setShowOutput(true);
      }, 1000);
    }
  }, [commandComplete, output]);

  useEffect(() => {
    setShowOutput(false);
  }, [command]);

  if (!isVisible) return null;

  return (
    <motion.div
      initial={{ height: 0 }}
      animate={{ height: 250 }}
      exit={{ height: 0 }}
      className="bg-[#0c0c0c] border-t border-gray-600 overflow-auto hide-scrollbar"
    >
      <div className="text-green-400 font-mono text-sm p-4">
        <div className="flex items-center space-x-2 mb-2">
          <TerminalIcon className="w-4 h-4" />
          <span className="text-gray-300">Terminal</span>
        </div>
        <div className="mb-2">
          <div className="flex items-center">
            <span className="text-blue-400">➜</span>
            <span className="text-cyan-400 ml-2">my-app</span>
            <span className="text-white ml-2">
              {commandText}
              {!commandComplete && (
                <motion.span
                  animate={{ opacity: [1, 0] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="text-white"
                >
                  |
                </motion.span>
              )}
            </span>
          </div>
          {showOutput && output && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-gray-300 ml-4 mt-2 whitespace-pre-line text-xs"
            >
              {output}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

const FileExplorer = ({
  step,
  openFiles,
  onFileClick,
  isCollapsed,
  onToggleCollapse,
}: {
  step: number;
  openFiles: Set<string>;
  onFileClick: (fileName: string) => void;
  isCollapsed: boolean;
  onToggleCollapse: () => void;
}) => {
  const [expandedFolders, setExpandedFolders] = useState<Set<string>>(
    new Set(["src", "app", "components", "ui"])
  );

  const toggleFolder = (folderName: string) => {
    const newExpanded = new Set(expandedFolders);
    if (newExpanded.has(folderName)) {
      newExpanded.delete(folderName);
    } else {
      newExpanded.add(folderName);
    }
    setExpandedFolders(newExpanded);
  };

  const getFileStructure = (): FileItem[] => {
    if (step < 1) return [];

    const base: FileItem[] = [
      { name: "package.json", type: "file" },
      { name: "next.config.js", type: "file" },
      { name: ".gitignore", type: "file" },
      { name: "README.md", type: "file" },
    ];

    if (step >= 1) {
      base.unshift({
        name: "src",
        type: "folder",
        children: [
          {
            name: "app",
            type: "folder",
            children: [
              { name: "globals.css", type: "file" },
              { name: "layout.tsx", type: "file" },
              { name: "page.tsx", type: "file" },
              { name: "favicon.ico", type: "file" },
            ],
          },
        ],
      });
    }

    if (step >= 3) {
      const srcFolder = base.find((item) => item.name === "src");
      if (srcFolder && srcFolder.children) {
        srcFolder.children.push({
          name: "components",
          type: "folder",
          children: [
            {
              name: "ui",
              type: "folder",
              children: [{ name: "Tabs.tsx", type: "file" }],
            },
          ],
        });
      }
    }

    if (step >= 4) {
      const srcFolder = base.find((item) => item.name === "src");
      if (srcFolder && srcFolder.children) {
        const componentsFolder = srcFolder.children.find(
          (item) => item.name === "components"
        );
        if (componentsFolder && componentsFolder.children) {
          const uiFolder = componentsFolder.children.find(
            (item) => item.name === "ui"
          );
          if (uiFolder && uiFolder.children) {
            uiFolder.children.push({ name: "Sheet.tsx", type: "file" });
          }
        }
      }
    }

    if (step >= 5) {
      const srcFolder = base.find((item) => item.name === "src");
      if (srcFolder && srcFolder.children) {
        const componentsFolder = srcFolder.children.find(
          (item) => item.name === "components"
        );
        if (componentsFolder && componentsFolder.children) {
          const uiFolder = componentsFolder.children.find(
            (item) => item.name === "ui"
          );
          if (uiFolder && uiFolder.children) {
            uiFolder.children.push({ name: "Select.tsx", type: "file" });
          }
        }
      }
    }

    if (step >= 6) {
      const srcFolder = base.find((item) => item.name === "src");
      if (srcFolder && srcFolder.children) {
        const componentsFolder = srcFolder.children.find(
          (item) => item.name === "components"
        );
        if (componentsFolder && componentsFolder.children) {
          const uiFolder = componentsFolder.children.find(
            (item) => item.name === "ui"
          );
          if (uiFolder && uiFolder.children) {
            uiFolder.children.push({ name: "Date.tsx", type: "file" });
          }
        }
      }
    }

    if (step >= 7) {
      const srcFolder = base.find((item) => item.name === "src");
      if (srcFolder && srcFolder.children) {
        const componentsFolder = srcFolder.children.find(
          (item) => item.name === "components"
        );
        if (componentsFolder && componentsFolder.children) {
          const uiFolder = componentsFolder.children.find(
            (item) => item.name === "ui"
          );
          if (uiFolder && uiFolder.children) {
            uiFolder.children.push({ name: "Form.tsx", type: "file" });
          }
        }
      }
    }

    return base;
  };

  const renderFileTree = (items: FileItem[], level = 0) => {
    return items.map((item, index) => (
      <motion.div
        key={`${item.name}-${step}`}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 + level * 0.02 }}
        className="select-none"
      >
        <div
          className={`flex items-center py-1 px-4 hover:bg-[#2a2d2e] cursor-pointer text-sm ${
            openFiles.has(item.name) ? "bg-[#37373d]" : ""
          }`}
          style={{ marginLeft: level * 8 }}
          onClick={() => {
            if (item.type === "folder") {
              toggleFolder(item.name);
            } else {
              onFileClick(item.name);
            }
          }}
        >
          {item.type === "folder" ? (
            <>
              {expandedFolders.has(item.name) ? (
                <ChevronDown className="w-4 h-4 text-gray-400" />
              ) : (
                <ChevronRight className="w-4 h-4 text-gray-400" />
              )}
              <Folder className="w-4 h-4 text-blue-400 ml-1" />
            </>
          ) : (
            <>
              <span className="w-2 h-2 ml-1" />
              {item.name.endsWith(".md") ? (
                <Info className="w-4 h-4 ml-1 text-blue-500 rounded-sm p-0.5" />
              ) : item.name.includes("ignore") ? (
                <GitGraph className="w-4 h-4 ml-1 text-red-400" />
              ) : item.name === "package.json" ? (
                <FileJson className="w-4 h-4 ml-1 text-green-400" />
              ) : item.name === "next.config.js" ? (
                <Cog className="text-gray-400 w-4 h-4 ml-1" />
              ) : (
                <File
                  className={`w-4 h-4 ml-1 ${
                    item.name.endsWith(".tsx")
                      ? "text-blue-400"
                      : item.name.endsWith(".css")
                      ? "text-yellow-400"
                      : item.name.endsWith(".json")
                      ? "text-orange-400"
                      : "text-gray-400"
                  }`}
                />
              )}
            </>
          )}
          <span className="ml-2 text-gray-200">{item.name}</span>
        </div>
        {item.children && expandedFolders.has(item.name) && (
          <div>{renderFileTree(item.children, level + 1)}</div>
        )}
      </motion.div>
    ));
  };

  const fileStructure = getFileStructure();

  if (step < 1) {
    return (
      <div className="w-64 bg-[#252526] border-r border-gray-600 p-2">
        <div className="text-sm text-gray-300 font-semibold mb-4 px-2">
          EXPLORER
        </div>
        <div className="text-xs text-gray-500 px-2 text-center py-8">
          No folder opened
        </div>
      </div>
    );
  }

  return (
    <motion.div
      animate={{
        width: isCollapsed ? 40 : 190,
        minWidth: isCollapsed ? 40 : 190,
        maxWidth: isCollapsed ? 40 : 190,
      }}
      transition={{ duration: 0.3, ease: "easeInOut" }}
      className="bg-[#252526] border-r border-gray-600 overflow-hidden relative"
    >
      <motion.button
        onClick={onToggleCollapse}
        className="absolute top-2 right-2 z-10 w-6 h-6 bg-[#3c3c3c] hover:bg-[#4c4c4c] rounded flex items-center justify-center transition-colors duration-200"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.div
          animate={{ rotate: isCollapsed ? 0 : 180 }}
          transition={{ duration: 0.3 }}
        >
          <ChevronRight className="w-3 h-3 cursor-pointer text-gray-300" />
        </motion.div>
      </motion.button>

      {!isCollapsed && (
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.2, delay: 0.1 }}
          className="p-2 overflow-auto"
        >
          <div className="text-sm text-gray-300 font-semibold mb-4 px-2">
            EXPLORER
          </div>
          {step >= 1 ? (
            <>
              <div className="text-xs text-gray-400 px-2 mb-2">MY-APP</div>
              {renderFileTree(fileStructure)}
            </>
          ) : (
            <div className="text-xs text-gray-500 px-2 text-center py-8">
              No folder opened
            </div>
          )}
        </motion.div>
      )}

      {isCollapsed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex flex-col mt-4 items-center pt-8 space-y-2"
        >
          <Folder className="w-5 h-5 text-gray-400" />
        </motion.div>
      )}
    </motion.div>
  );
};

const CodeEditor = ({
  activeFile,
  step,
  openFiles,
  onCloseFile,
  setActiveFile,
}: {
  activeFile: string;
  step: number;
  openFiles: Set<string>;
  onCloseFile: (fileName: string) => void;
  setActiveFile: Dispatch<SetStateAction<string>>;
}) => {
  const getFileContent = (fileName: string) => {
    return (
      fileContents[fileName] ||
      `// ${fileName}\n\n// File content for ${fileName}`
    );
  };

  const content = getFileContent(activeFile);

  if (!activeFile || openFiles.size === 0) {
    return (
      <div className="flex-1 bg-[#1e1e1e] p-4 flex items-center justify-center">
        <div className="text-center text-gray-500">
          <File className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p>Select a file to start editing</p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 bg-[#1e1e1e] flex flex-col hide-scrollbar overflow-auto">
      <div className="flex border-b border-gray-600 bg-[#2d2d30] overflow-x-auto hide-scrollbar whitespace-nowrap min-w-0 max-w-full">
        {Array.from(openFiles).map((fileName) => (
          <div
            key={fileName}
            onClick={() => setActiveFile(fileName)}
            className={`flex items-center px-3 py-2 text-sm border-r border-gray-600 cursor-pointer flex-shrink-0 ${
              fileName === activeFile
                ? "bg-[#1e1e1e] text-gray-200"
                : "text-gray-400 hover:text-gray-200"
            }`}
          >
            <File className="w-4 h-4 mr-2" />
            <span>{fileName}</span>
            <X
              className="w-4 h-4 ml-2 hover:text-white"
              onClick={(e) => {
                e.stopPropagation();
                onCloseFile(fileName);
              }}
            />
          </div>
        ))}
      </div>
      <div className="flex-1 overflow-auto hide-scrollbar">
        <div className="font-mono text-sm min-w-max">
          <SyntaxHighlighter
            language="typescript"
            style={dark}
            wrapLongLines={false}
            customStyle={{
              background: "transparent",
              fontSize: "14px",
              margin: 0,
              paddingTop: 8,
              paddingLeft: 16,
              paddingRight: 16,
              paddingBottom: 80,
              border: 0,
              width: "max-content",
              minWidth: "100%",
              boxShadow: "none",
            }}
          >
            {content}
          </SyntaxHighlighter>
        </div>
      </div>
    </div>
  );
};

const BrowserWindow = ({ isVisible }: { isVisible: boolean }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
    transition={{ duration: 0.5 }}
    className="bg-background rounded-lg shadow-2xl border border-gray-300 h-full overflow-auto hide-scrollbar"
  >
    <div className="bg-gray-100 px-4 py-3 flex items-center border-b">
      <div className="flex items-center space-x-2">
        <Tooltip content="Oops! This browser is just for show! 🎭">
          <div className="w-3 h-3 rounded-full bg-[#ff5f57] cursor-pointer hover:brightness-110 transition-all"></div>
        </Tooltip>
        <Tooltip content="Minimize? But then you'd miss the magic! ✨">
          <div className="w-3 h-3 rounded-full bg-[#ffbd2e] cursor-pointer hover:brightness-110 transition-all"></div>
        </Tooltip>
        <Tooltip content="This demo is already at maximum awesomeness! 🚀">
          <div className="w-3 h-3 rounded-full bg-[#28ca42] cursor-pointer hover:brightness-110 transition-all"></div>
        </Tooltip>
      </div>
      <div className="flex-1 mx-4">
        <div className="bg-white rounded-full px-4 py-1 text-sm text-gray-600 border">
          localhost:3000
        </div>
      </div>
      <Tooltip
        side="left"
        content="Refresh? But everything is already perfect! 🔄✨"
      >
        <RefreshCw className="w-4 h-4 text-gray-500 cursor-pointer hover:text-gray-400 hover:rotate-180 transition-all duration-300" />
      </Tooltip>
    </div>

    <div className=" bg-background h-full ">
      {/* <div className="absolute top-0 right-0">
        <ThemeToggle />
      </div> */}
      <motion.nav
        className="w-full z-50 bg-background/80 backdrop-blur-sm border-b border-border px-4"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <div className=" ">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center cursor-pointer">
              <Image
                src="/logo-light.svg"
                alt="Logo"
                width={130}
                height={80}
                className={cn(
                  "object-contain dark:hidden",
                  "hover:transition-all hover:duration-1000 motion-reduce:hover:transition-none",
                  "[mask-image:linear-gradient(60deg,#000_25%,rgba(0,0,0,.2)_50%,#000_75%)] [mask-position:0] [mask-size:400%]",
                  "hover:[mask-position:100%]"
                )}
              />
              <Image
                src="/logo-dark.svg"
                alt="Logo White"
                width={130}
                height={80}
                className={cn(
                  "object-contain hidden dark:block",
                  "hover:transition-all hover:duration-1000 motion-reduce:hover:transition-none",
                  "[mask-image:linear-gradient(60deg,#000_25%,rgba(0,0,0,.2)_50%,#000_75%)] [mask-position:0] [mask-size:400%]",
                  "hover:[mask-position:100%]"
                )}
              />
            </div>
            <div className="flex items-center space-x-4">
              <ThemeToggle />
              <Link
                href="https://github.com/iamsufiyan560/QuickCode"
                target="_blank"
              >
                <Button variant="ghost" size="sm" className="cursor-pointer">
                  <Github className="w-4 h-4 mr-2" />
                  Star us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </motion.nav>

      <div className="p-8">
        <h1 className="text-3xl font-bold text-primary mb-4">
          Welcome to Next.js with QuickCode UI
        </h1>
        <h2 className="text-xl text-muted-foreground mb-8">
          Your component library is ready to use!
        </h2>
        <div className="space-y-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1 }}
            className="flex flex-col gap-4 items-center justify-center"
          >
            <DefaultTabsExample />
          </motion.div>
        </div>
      </div>
    </div>
  </motion.div>
);

export default function QuickCodePromoPage({
  onClose,
}: {
  onClose: () => void;
}) {
  const [currentStep, setCurrentStep] = useState(0);
  const [showTerminal, setShowTerminal] = useState(false);
  const [activeFile, setActiveFile] = useState("");
  const [openFiles, setOpenFiles] = useState<Set<string>>(new Set());
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    if (typeof window !== "undefined") {
      return window.innerWidth < 768;
    }
    return false;
  });

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) {
        setIsSidebarCollapsed(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleFileClick = (fileName: string) => {
    setOpenFiles((prev) => new Set([...prev, fileName]));
    setActiveFile(fileName);
  };

  const handleCloseFile = (fileName: string) => {
    setOpenFiles((prev) => {
      const newSet = new Set(prev);
      newSet.delete(fileName);
      if (activeFile === fileName && newSet.size > 0) {
        setActiveFile(Array.from(newSet)[0]);
      } else if (newSet.size === 0) {
        setActiveFile("");
      }
      return newSet;
    });
  };

  useEffect(() => {
    const runDemo = () => {
      setCurrentStep(0);
      setActiveFile("");
      setOpenFiles(new Set());
      setShowTerminal(true);

      setTimeout(() => {
        setCurrentStep(1);
      }, 3000);

      setTimeout(() => {
        setCurrentStep(2);
        setTimeout(() => {
          handleFileClick("globals.css");
        }, 3500);
      }, 6000);

      setTimeout(() => {
        setCurrentStep(3);
      }, 12000);

      setTimeout(() => {
        setCurrentStep(4);
        handleFileClick("Tabs.tsx");
      }, 20000);

      setTimeout(() => {
        setCurrentStep(5);
        handleFileClick("ActionSheet.tsx");
      }, 21500);

      setTimeout(() => {
        setCurrentStep(6);
        handleFileClick("MultiSelect.tsx");
      }, 23000);

      setTimeout(() => {
        setCurrentStep(7);
        handleFileClick("DatePicker.tsx");
      }, 24500);

      setTimeout(() => {
        setCurrentStep(8);
        handleFileClick("AdvancedForm.tsx");
      }, 26000);

      setTimeout(() => {
        setShowTerminal(false);
        setCurrentStep(9);
        handleFileClick("page.tsx");
      }, 28000);

      setTimeout(() => {
        setCurrentStep(10);
        setShowTerminal(true);
      }, 30000);

      setTimeout(() => {
        setCurrentStep(11);
        setShowTerminal(false);
      }, 37000);
    };

    runDemo();

    return () => {};
  }, []);

  return (
    <div className="lg:h-screen h-full p-4 pb-8">
      <div className="h-full max-w-7xl mx-auto">
        {currentStep < 12 && (
          <motion.div
            className="flex justify-center mb-4"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, delay: 0.1 }}
              className="bg-accent border border-accent rounded-lg px-6 py-3 shadow-sm max-w-2xl relative"
            >
              <TypedMessage step={currentStep} />
            </motion.div>

            <div className="absolute right-4 cursor-pointer z-10">
              <Tooltip content="Close Demo ❌">
                <Button
                  variant="ghost"
                  size="icon"
                  className=""
                  onClick={onClose}
                >
                  <X className="w-6 h-6" />
                </Button>
              </Tooltip>
            </div>
          </motion.div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 lg:h-[calc(100%-3rem)] pb-8 lg:pb-0">
          <VSCodeWindow>
            <div className="flex h-full flex-col">
              <div className="flex flex-1 overflow-hidden max-h-screen">
                <FileExplorer
                  step={currentStep}
                  openFiles={openFiles}
                  onFileClick={handleFileClick}
                  isCollapsed={isSidebarCollapsed}
                  onToggleCollapse={() =>
                    setIsSidebarCollapsed(!isSidebarCollapsed)
                  }
                />
                <CodeEditor
                  activeFile={activeFile}
                  step={currentStep}
                  openFiles={openFiles}
                  onCloseFile={handleCloseFile}
                  setActiveFile={setActiveFile}
                />
              </div>
              <AnimatePresence>
                {showTerminal && (
                  <IntegratedTerminal
                    command={
                      commands[
                        currentStep === 0
                          ? 0
                          : currentStep === 2
                          ? 1
                          : currentStep === 3
                          ? 2
                          : currentStep === 10
                          ? 3
                          : currentStep >= 4 && currentStep <= 9
                          ? 2
                          : 0
                      ]?.command || ""
                    }
                    output={
                      commands[
                        currentStep === 0
                          ? 0
                          : currentStep === 2
                          ? 1
                          : currentStep === 3
                          ? 2
                          : currentStep === 10
                          ? 3
                          : currentStep >= 4 && currentStep <= 9
                          ? 2
                          : 0
                      ]?.output
                    }
                    isVisible={showTerminal}
                  />
                )}
              </AnimatePresence>
            </div>
          </VSCodeWindow>
          <BrowserWindow isVisible={currentStep >= 11} />
        </div>
      </div>
    </div>
  );
}

const TypedMessage = ({ step }: { step: number }) => {
  const messages = [
    "🚀 Creating a new Next.js application with QuickCode UI...",
    "📁 Project structure created! Your Next.js app is ready.",
    "📦 Installing QuickCode UI component library...",
    "🎨 Adding all QuickCode UI components to your project...",
    "✅ Tabs component added !",
    "✅ ActionSheet component added !",
    "✅ MultiSelect component added !",
    "✅ DatePicker component added !",
    "✅ AdvancedForm component added !",
    "✏️ Writing code to use your new components...",
    "⚡ Starting development server...",
    "🎉 Your QuickCode UI app is now live! Check out your beautiful components.",
  ];

  const { displayText } = useTypingAnimation(messages[step] || "", 40, 200);

  return (
    <div className="text-sm font-medium text-foreground min-h-[20px]">
      {displayText}
    </div>
  );
};
