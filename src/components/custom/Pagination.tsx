"use client";

import React from "react";
import { ChevronLeft, ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "./Button";

export interface PaginationProps extends React.ComponentProps<"div"> {
  children?: React.ReactNode;
}

export function Pagination({ className, children, ...props }: PaginationProps) {
  return (
    <div className={cn("w-full flex justify-center", className)} {...props}>
      {children}
    </div>
  );
}

export interface PaginationListProps extends React.ComponentProps<"div"> {
  children?: React.ReactNode;
}

export function PaginationList({
  className,
  children,
  ...props
}: PaginationListProps) {
  return (
    <div className={cn("flex items-center gap-1", className)} {...props}>
      {children}
    </div>
  );
}

export interface PaginationButtonProps extends ButtonProps {
  isActive?: boolean;
}

export function PaginationButton({
  className,
  isActive,
  children,
  ...props
}: PaginationButtonProps) {
  return (
    <Button
      size="sm"
      variant={isActive ? "default" : "ghost"}
      className={cn(
        "min-w-[36px] px-3",
        isActive && "pointer-events-none",
        className
      )}
      {...props}
    >
      {children}
    </Button>
  );
}

type PaginationIconButtonProps = Omit<ButtonProps, "children"> & {
  children?: React.ReactNode;
};

export function PaginationPrev({
  className,
  children,
  ...props
}: PaginationIconButtonProps) {
  return (
    <Button
      size="sm"
      variant="ghost"
      className={cn("px-3", className)}
      {...props}
    >
      <ChevronLeft className="w-4 h-4" />
      {children && <span className="hidden sm:inline">{children}</span>}
    </Button>
  );
}

export function PaginationNext({
  className,
  children,
  ...props
}: PaginationIconButtonProps) {
  return (
    <Button
      size="sm"
      variant="ghost"
      className={cn("px-3", className)}
      {...props}
    >
      {children && <span className="hidden sm:inline">{children}</span>}
      <ChevronRight className="w-4 h-4" />
    </Button>
  );
}

export function PaginationEllipsis({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center justify-center w-9 h-9",
        className
      )}
    >
      <MoreHorizontal className="w-4 h-4 opacity-60" />
    </span>
  );
}
