"use client";

import React, { createContext, useContext, useState } from "react";
import { Button } from "@/components/custom/Button";
import { Menu, ChevronsLeft, ChevronsRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SidebarContextValue {
  collapsed: boolean;
  setCollapsed: (collapsed: boolean) => void;
}

const SidebarContext = createContext<SidebarContextValue | undefined>(
  undefined
);

export function useSidebar() {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("Sidebar components must be used within Sidebar");
  }
  return context;
}

interface SidebarProps extends React.ComponentProps<"aside"> {
  children: React.ReactNode;
  defaultCollapsed?: boolean;
  className?: string;
}

function SidebarProvider({
  children,
  defaultCollapsed = false,
  className,
}: SidebarProps) {
  const [collapsed, setCollapsed] = useState(defaultCollapsed);

  return (
    <SidebarContext.Provider value={{ collapsed, setCollapsed }}>
      <div className={cn("flex  h-full overflow-hidden gap-4", className)}>
        {children}
      </div>
    </SidebarContext.Provider>
  );
}

function SidebarRoot({
  children,
  className,
  ...props
}: React.ComponentProps<"aside">) {
  const { collapsed } = useSidebar();
  return (
    <aside
      {...props}
      className={cn(
        "hidden md:flex md:flex-col bg-sidebar transition-all duration-300 h-full border-r border-r-sidebar-border",
        collapsed ? "w-16" : "w-64",
        className
      )}
    >
      <div className="flex h-full flex-col">{children}</div>
    </aside>
  );
}

function SidebarHeader({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        "flex-shrink-0 bg-sidebar p-4 border-b border-sidebar-border",
        className
      )}
    >
      {children}
    </div>
  );
}

function SidebarContent({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        "flex-1 overflow-y-auto min-h-0 p-2 [&::-webkit-scrollbar]:w-0 [&::-webkit-scrollbar]:bg-transparent",
        className
      )}
    >
      {children}
    </div>
  );
}

function SidebarGroup({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div {...props} className={cn("space-y-1", className)}>
      {children}
    </div>
  );
}

function SidebarFooter({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        "flex-shrink-0 p-4 bg-sidebar border-t border-sidebar-border",
        className
      )}
    >
      {children}
    </div>
  );
}

function SidebarTrigger() {
  const { collapsed, setCollapsed } = useSidebar();
  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setCollapsed(!collapsed)}
      className="hidden md:flex"
      aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
    >
      {collapsed ? (
        <ChevronsRight className="h-4 w-4" />
      ) : (
        <ChevronsLeft className="h-4 w-4" />
      )}
    </Button>
  );
}

function SidebarMobile({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setOpen(true)}
        aria-label="Open sidebar menu"
      >
        <Menu className="h-4 w-4" />
      </Button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/50"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          <div
            className={`fixed inset-y-0 left-0 z-50 w-64 bg-sidebar h-full border-r border-sidebar-border ${
              open
                ? "animate-in slide-in-from-left duration-300"
                : "animate-out slide-out-to-left duration-300"
            }`}
            role="dialog"
            aria-modal="true"
            aria-label="Sidebar menu"
          >
            <div className="flex h-full  flex-col">
              <div className="flex-shrink-0 flex items-center justify-between p-4">
                <span className="font-semibold">Menu</span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setOpen(false)}
                  aria-label="Close sidebar menu"
                >
                  <ChevronsLeft className="h-4 w-4" />
                </Button>
              </div>

              {children}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function SidebarMain({
  children,
  className,
  ...props
}: React.ComponentProps<"div">) {
  return (
    <div
      {...props}
      className={cn(
        "flex flex-1 flex-col overflow-hidden h-full  rounded-lg",
        className
      )}
    >
      {children}
    </div>
  );
}

const Sidebar = Object.assign(SidebarProvider, {
  Root: SidebarRoot,
  Header: SidebarHeader,
  Content: SidebarContent,
  Group: SidebarGroup,
  Footer: SidebarFooter,
  Trigger: SidebarTrigger,
  Mobile: SidebarMobile,
  Main: SidebarMain,
});

export { Sidebar };
