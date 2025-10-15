"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

export interface BaseDivProps extends React.HTMLAttributes<HTMLDivElement> {}

export const Card: React.FC<BaseDivProps> = ({ className, ...props }) => (
  <div
    data-slot="card"
    className={cn(
      "rounded-xl  bg-card text-card-foreground border border-border  shadow-sm",
      className
    )}
    {...props}
  />
);

export const CardHeader: React.FC<BaseDivProps> = ({ className, ...props }) => (
  <div
    data-slot="card-header"
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
);

export const CardTitle: React.FC<BaseDivProps> = ({ className, ...props }) => (
  <h3
    data-slot="card-title"
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
);

export const CardDescription: React.FC<BaseDivProps> = ({
  className,
  ...props
}) => (
  <p
    data-slot="card-description"
    className={cn("text-sm text-muted-foreground", className)}
    {...props}
  />
);

export const CardContent: React.FC<BaseDivProps> = ({
  className,
  ...props
}) => (
  <div
    data-slot="card-content"
    className={cn("p-6 pt-0", className)}
    {...props}
  />
);

export const CardFooter: React.FC<BaseDivProps> = ({ className, ...props }) => (
  <div
    data-slot="card-footer"
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
);
