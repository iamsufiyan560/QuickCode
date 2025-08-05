"use client";

import React from "react";
import { cn } from "@/lib/utils";
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
} from "@/components/custom/Avatar";

export interface AvatarData {
  src?: string;
  alt: string;
  fallback: string;
}

export interface AvatarGroupProps {
  avatars: AvatarData[];
  max?: number;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
}

export const AvatarGroup: React.FC<AvatarGroupProps> = ({
  avatars,
  max = 4,
  size = "md",
  className,
}) => {
  const visibleAvatars = avatars.slice(0, max);
  const remainingCount = avatars.length - max;

  return (
    <div className={cn("flex items-center", className)}>
      {visibleAvatars.map((avatar, index) => (
        <Avatar
          key={index}
          size={size}
          className={cn(
            "ring-2 ring-border hover:z-10 transition-all hover:scale-110",
            index !== 0 && "-ml-3"
          )}
        >
          {avatar.src ? (
            <>
              <AvatarImage src={avatar.src} alt={avatar.alt} />
              <AvatarFallback>{avatar.fallback}</AvatarFallback>
            </>
          ) : (
            <AvatarFallback>{avatar.fallback}</AvatarFallback>
          )}
        </Avatar>
      ))}
      {remainingCount > 0 && (
        <Avatar
          size={size}
          className={cn(
            "ring-2 ring-border hover:z-10 transition-all hover:scale-110 -ml-3"
          )}
        >
          <AvatarFallback className="bg-muted text-foreground font-bold">
            +{remainingCount}
          </AvatarFallback>
        </Avatar>
      )}
    </div>
  );
};
