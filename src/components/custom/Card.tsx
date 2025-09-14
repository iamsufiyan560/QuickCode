"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardHeaderProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardContentProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardFooterProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardTitleProps {
  children: React.ReactNode;
  className?: string;
}

export interface CardDescriptionProps {
  children: React.ReactNode;
  className?: string;
}

export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div
      className={cn(
        "rounded-xl border border-border py-6 bg-card text-card-foreground shadow-sm hover:bg-card/80 hover:cursor-pointer flex flex-col gap-6 ",

        className
      )}
    >
      {children}
    </div>
  );
};

export const CardHeader: React.FC<CardHeaderProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("flex flex-col space-y-1.5 px-6", className)}>
      {children}
    </div>
  );
};

export const CardContent: React.FC<CardContentProps> = ({
  children,
  className,
}) => {
  return <div className={cn("px-6", className)}>{children}</div>;
};

export const CardFooter: React.FC<CardFooterProps> = ({
  children,
  className,
}) => {
  return (
    <div className={cn("flex items-center px-6 ", className)}>{children}</div>
  );
};

export const CardTitle: React.FC<CardTitleProps> = ({
  children,
  className,
}) => {
  return (
    <h3
      className={cn(
        "text-2xl font-semibold leading-none tracking-tight text-foreground",
        className
      )}
    >
      {children}
    </h3>
  );
};

export const CardDescription: React.FC<CardDescriptionProps> = ({
  children,
  className,
}) => {
  return (
    <p className={cn("text-sm text-muted-foreground", className)}>{children}</p>
  );
};
