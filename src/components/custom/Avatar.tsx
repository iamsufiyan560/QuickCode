"use client";

import React from "react";
import { cn } from "@/lib/utils";

const AvatarContext = React.createContext<{
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  imageStatus: "idle" | "loading" | "loaded" | "error";
  setImageStatus: (status: "idle" | "loading" | "loaded" | "error") => void;
}>({
  imageStatus: "idle",
  setImageStatus: () => {},
});

export interface AvatarProps {
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  children: React.ReactNode;
}

const sizeClasses = {
  xs: "w-6 h-6 text-xs",
  sm: "w-8 h-8 text-sm",
  md: "w-10 h-10 text-base",
  lg: "w-12 h-12 text-lg",
  xl: "w-16 h-16 text-xl",
};

export const Avatar: React.FC<AvatarProps> = ({
  size = "md",
  className,
  children,
}) => {
  const [imageStatus, setImageStatus] = React.useState<
    "idle" | "loading" | "loaded" | "error"
  >("idle");

  return (
    <AvatarContext.Provider value={{ size, imageStatus, setImageStatus }}>
      <span
        className={cn(
          "relative inline-flex items-center justify-center overflow-hidden rounded-full shrink-0",
          sizeClasses[size],
          className
        )}
      >
        {children}
      </span>
    </AvatarContext.Provider>
  );
};

export interface AvatarImageProps
  extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
}

export const AvatarImage: React.FC<AvatarImageProps> = ({
  src,
  alt,
  className,
  ...props
}) => {
  const { imageStatus, setImageStatus } = React.useContext(AvatarContext);

  React.useEffect(() => {
    if (!src) {
      setImageStatus("error");
      return;
    }

    setImageStatus("loading");
    const img = new Image();
    img.src = src;

    img.onload = () => {
      setImageStatus("loaded");
    };

    img.onerror = () => {
      setImageStatus("error");
    };

    return () => {
      img.onload = null;
      img.onerror = null;
    };
  }, [src, setImageStatus]);

  if (imageStatus === "loading") {
    return <div className="absolute inset-0 bg-muted animate-pulse" />;
  }

  if (imageStatus !== "loaded") {
    return null;
  }

  return (
    <img
      src={src}
      alt={alt}
      className={cn("aspect-square h-full w-full object-cover", className)}
      {...props}
    />
  );
};

export interface AvatarFallbackProps {
  children: React.ReactNode;
  className?: string;
}

export const AvatarFallback: React.FC<AvatarFallbackProps> = ({
  children,
  className,
}) => {
  const { imageStatus } = React.useContext(AvatarContext);

  if (imageStatus === "loaded") {
    return null;
  }

  if (imageStatus === "loading") {
    return null;
  }

  return (
    <span
      className={cn(
        "flex h-full w-full items-center justify-center bg-secondary text-secondary-foreground font-semibold uppercase select-none",
        className
      )}
    >
      {children}
    </span>
  );
};
