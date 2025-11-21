import { ChevronRight, MoreHorizontal } from "lucide-react";
import { cn } from "@/lib/utils";

export interface BreadcrumbProps extends React.ComponentProps<"nav"> {}
export const Breadcrumb = ({ className, ...props }: BreadcrumbProps) => (
  <nav aria-label="breadcrumb" className={cn("w-full", className)} {...props} />
);

export interface BreadcrumbListProps extends React.ComponentProps<"ol"> {}
export const BreadcrumbList = ({
  className,
  ...props
}: BreadcrumbListProps) => (
  <ol
    className={cn(
      "flex flex-wrap items-center gap-1.5 text-sm text-muted-foreground break-words sm:gap-2.5",
      className
    )}
    {...props}
  />
);

export interface BreadcrumbItemProps extends React.ComponentProps<"li"> {}
export const BreadcrumbItem = ({
  className,
  ...props
}: BreadcrumbItemProps) => (
  <li
    className={cn("inline-flex items-center gap-1.5", className)}
    {...props}
  />
);

export interface BreadcrumbLinkProps extends React.ComponentProps<"a"> {}
export const BreadcrumbLink = ({
  className,
  ...props
}: BreadcrumbLinkProps) => (
  <a
    className={cn("hover:text-foreground transition-colors", className)}
    {...props}
  />
);

export interface BreadcrumbPageProps extends React.ComponentProps<"span"> {}
export const BreadcrumbPage = ({
  className,
  ...props
}: BreadcrumbPageProps) => (
  <span
    aria-current="page"
    className={cn("font-normal text-foreground", className)}
    {...props}
  />
);

export interface BreadcrumbSeparatorProps extends React.ComponentProps<"li"> {}
export const BreadcrumbSeparator = ({
  children,
  className,
  ...props
}: BreadcrumbSeparatorProps) => (
  <li
    aria-hidden="true"
    className={cn("[&>svg]:size-3.5", className)}
    {...props}
  >
    {children ?? <ChevronRight />}
  </li>
);

export interface BreadcrumbEllipsisProps extends React.ComponentProps<"span"> {}
export const BreadcrumbEllipsis = ({
  className,
  ...props
}: BreadcrumbEllipsisProps) => (
  <span
    aria-hidden="true"
    className={cn("flex size-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="size-4" />
    <span className="sr-only">More</span>
  </span>
);

Breadcrumb.List = BreadcrumbList;
Breadcrumb.Item = BreadcrumbItem;
Breadcrumb.Link = BreadcrumbLink;
Breadcrumb.Page = BreadcrumbPage;
Breadcrumb.Separator = BreadcrumbSeparator;
Breadcrumb.Ellipsis = BreadcrumbEllipsis;
