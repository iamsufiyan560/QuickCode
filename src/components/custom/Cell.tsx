import * as React from "react";
import { cn } from "@/lib/utils";

interface CellGroupProps extends React.ComponentProps<"div"> {}

function CellGroup({ className, ...props }: CellGroupProps) {
  return (
    <div role="list" className={cn("flex flex-col", className)} {...props} />
  );
}

interface CellDividerProps extends React.ComponentProps<"hr"> {}

function CellDivider({ className, ...props }: CellDividerProps) {
  return (
    <hr
      className={cn("my-0 border-0 border-t border-border", className)}
      {...props}
    />
  );
}

interface CellProps extends React.ComponentProps<"div"> {
  variant?: "default" | "outline" | "muted";
  size?: "default" | "sm";
  asChild?: boolean;
}

function Cell({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  children,
  ...props
}: CellProps) {
  const variantStyles = {
    default: "bg-transparent",
    outline: "border-border",
    muted: "bg-muted/50",
  };

  const sizeStyles = {
    default: "p-4 gap-4",
    sm: "py-3 px-4 gap-2.5",
  };

  const mergedClassName = cn(
    "flex items-center border border-transparent text-sm rounded-md transition-colors flex-wrap outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] [a]:hover:bg-accent/50 [a]:transition-colors duration-100",
    variantStyles[variant],
    sizeStyles[size],
    className
  );

  if (asChild && React.isValidElement(children)) {
    const child = children as React.ReactElement<{ className?: string }>;
    return React.cloneElement(child, {
      ...props,
      className: cn(child.props.className, mergedClassName),
    });
  }

  return (
    <div className={mergedClassName} {...props}>
      {children}
    </div>
  );
}

interface CellMediaProps extends React.ComponentProps<"div"> {
  variant?: "default" | "icon" | "image";
}

function CellMedia({
  className,
  variant = "default",
  ...props
}: CellMediaProps) {
  const variantStyles = {
    default: "bg-transparent",
    icon: "size-8 border rounded-sm bg-muted [&_svg:not([class*='size-'])]:size-4",
    image:
      "size-10 rounded-sm overflow-hidden [&_img]:size-full [&_img]:object-cover",
  };

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center gap-2",
        variantStyles[variant],
        className
      )}
      {...props}
    />
  );
}

interface CellContentProps extends React.ComponentProps<"div"> {}

function CellContent({ className, ...props }: CellContentProps) {
  return (
    <div className={cn("flex flex-1 flex-col gap-1", className)} {...props} />
  );
}

interface CellTitleProps extends React.ComponentProps<"div"> {}

function CellTitle({ className, ...props }: CellTitleProps) {
  return (
    <div
      className={cn(
        "flex w-fit items-center gap-2 text-sm leading-snug font-medium",
        className
      )}
      {...props}
    />
  );
}

interface CellDescriptionProps extends React.ComponentProps<"p"> {}

function CellDescription({ className, ...props }: CellDescriptionProps) {
  return (
    <p
      className={cn(
        "text-muted-foreground line-clamp-2 text-sm leading-normal font-normal text-balance [&>a:hover]:text-primary [&>a]:underline [&>a]:underline-offset-4",
        className
      )}
      {...props}
    />
  );
}

interface CellActionsProps extends React.ComponentProps<"div"> {}

function CellActions({ className, ...props }: CellActionsProps) {
  return (
    <div className={cn("flex items-center gap-2", className)} {...props} />
  );
}

interface CellHeaderProps extends React.ComponentProps<"div"> {}

function CellHeader({ className, ...props }: CellHeaderProps) {
  return (
    <div
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className
      )}
      {...props}
    />
  );
}

interface CellFooterProps extends React.ComponentProps<"div"> {}

function CellFooter({ className, ...props }: CellFooterProps) {
  return (
    <div
      className={cn(
        "flex basis-full items-center justify-between gap-2",
        className
      )}
      {...props}
    />
  );
}

export {
  Cell,
  CellMedia,
  CellContent,
  CellActions,
  CellGroup,
  CellDivider,
  CellTitle,
  CellDescription,
  CellHeader,
  CellFooter,
};
