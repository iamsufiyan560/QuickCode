"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Github,
  Instagram,
  Linkedin,
  Twitter,
  Facebook,
  Youtube,
  Globe,
  Mail,
  Phone,
} from "lucide-react";
import { cn } from "@/lib/utils";

export interface ActionLink {
  icon: string;
  url: string;
  color: string;
}

export interface SocialCardProps extends React.ComponentProps<"div"> {
  actionLinks: [ActionLink, ActionLink, ...ActionLink[]];
  label?: string;
  className?: string;
  iconClassName?: string;
}

const iconMap = {
  github: Github,
  instagram: Instagram,
  linkedin: Linkedin,
  twitter: Twitter,
  facebook: Facebook,
  youtube: Youtube,
  globe: Globe,
  mail: Mail,
  phone: Phone,
};

export const SocialCard: React.FC<SocialCardProps> = ({
  actionLinks,
  label = "Social",
  className,
  iconClassName,
  ...props
}) => {
  const [open, setOpen] = useState(false);
  const [isHoverSupported, setIsHoverSupported] = useState(true);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const hoverMedia = window.matchMedia("(hover: hover)");
      setIsHoverSupported(hoverMedia.matches);

      const listener = (e: MediaQueryListEvent) =>
        setIsHoverSupported(e.matches);
      hoverMedia.addEventListener("change", listener);
      return () => hoverMedia.removeEventListener("change", listener);
    }
  }, []);

  const handleClick = (e: React.MouseEvent) => {
    if (!isHoverSupported) {
      e.stopPropagation();
      setOpen(!open);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    if (!isHoverSupported) {
      e.stopPropagation();
    }
  };

  return (
    <div
      {...props}
      onClick={handleClick}
      onTouchStart={handleTouchStart}
      className={cn(
        "group/social ease-[cubic-bezier(0.25,0.8,0.25,1)] relative flex h-[50px] w-[200px] items-center justify-center bg-muted shadow-md transition-all duration-300 overflow-hidden cursor-pointer",
        "before:absolute before:left-0 before:flex before:items-center before:justify-end before:w-1/2 before:h-full before:bg-primary before:transition-all before:duration-[250ms] before:z-[2] before:content-[''] before:ease-linear",
        "after:absolute after:right-0 after:flex after:items-center after:justify-start after:w-1/2 after:h-full after:bg-primary after:transition-all after:duration-[250ms] after:z-[2] after:content-[''] after:ease-linear",
        "hover:shadow-2xl hover:before:opacity-50 hover:before:-translate-y-full hover:after:opacity-50 hover:after:translate-y-full",
        !isHoverSupported && open
          ? "shadow-2xl before:opacity-50 before:-translate-y-full after:opacity-50 after:translate-y-full"
          : "",
        className
      )}
      style={{ touchAction: "manipulation" }}
    >
      <span
        className={cn(
          "absolute flex h-full w-full items-center justify-center font-mono text-[24px] font-bold text-primary-foreground transition-opacity duration-200 group-hover/social:opacity-0 z-[3]",
          !isHoverSupported && open
            ? "opacity-0 pointer-events-none"
            : "opacity-100 pointer-events-auto"
        )}
      >
        {label}
      </span>

      {actionLinks.map((action, index) => {
        const IconComponent = iconMap[action.icon as keyof typeof iconMap];
        const linkWidth = `${100 / actionLinks.length}%`;

        return (
          <Link
            key={index}
            href={action.url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "relative flex h-full items-center justify-center transition duration-300 hover:bg-accent cursor-pointer z-[1] group-hover/social:z-[4]",
              !isHoverSupported && !open
                ? "pointer-events-none"
                : "pointer-events-auto",
              iconClassName
            )}
            style={{
              width: linkWidth,
              touchAction: "manipulation",
            }}
            onClick={(e) => {
              e.stopPropagation();
              if (!isHoverSupported) {
                setOpen(false);
              }
            }}
            onTouchStart={(e) => {
              e.stopPropagation();
            }}
          >
            <motion.div
              whileHover={{
                scale: [1, 1.4, 0.8, 1.2, 1],
              }}
              transition={{
                duration: 0.4,
                ease: "linear",
              }}
              style={{ pointerEvents: "none" }}
            >
              <IconComponent
                className="h-[25px] w-[25px] drop-shadow-md cursor-pointer"
                style={{
                  color: action.color,
                  pointerEvents: "none",
                }}
              />
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
};
