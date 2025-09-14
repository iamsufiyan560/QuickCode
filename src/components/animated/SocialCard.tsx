"use client";

import React from "react";
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

export interface SocialCardProps {
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
}) => {
  return (
    <div
      className={cn(
        "group/social ease-[cubic-bezier(0.25,0.8,0.25,1)]  relative flex h-[50px] w-[200px] items-center justify-center bg-muted shadow-md transition-all duration-300 overflow-hidden hover:shadow-2xl cursor-pointer",
        "before:absolute before:left-0 before:flex before:items-center before:justify-end before:w-1/2 before:h-full before:bg-primary before:transition-all before:duration-[250ms] before:z-[2] before:content-[''] before:ease-linear",
        "after:absolute after:right-0 after:flex after:items-center after:justify-start after:w-1/2 after:h-full after:bg-primary after:transition-all after:duration-[250ms] after:z-[2] after:content-[''] after:ease-linear",
        "hover:before:opacity-50 hover:before:-translate-y-full",
        "hover:after:opacity-50 hover:after:translate-y-full",
        className
      )}
    >
      <span className="absolute flex h-full w-full items-center justify-center font-mono text-[24px] font-bold text-primary-foreground transition-opacity duration-200 group-hover/social:opacity-0 z-[3]">
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
              iconClassName
            )}
            style={{ width: linkWidth }}
          >
            <motion.div
              whileHover={{
                scale: [1, 1.4, 0.8, 1.2, 1],
              }}
              transition={{
                duration: 0.4,
                ease: "linear",
              }}
            >
              <IconComponent
                className="h-[25px] w-[25px] drop-shadow-md cursor-pointer"
                style={{ color: action.color }}
              />
            </motion.div>
          </Link>
        );
      })}
    </div>
  );
};
