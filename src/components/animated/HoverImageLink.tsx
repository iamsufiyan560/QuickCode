"use client";
import {
  useMotionValue,
  motion,
  useSpring,
  useTransform,
  MotionProps,
} from "framer-motion";
import React, { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface HoverImageLinkRootProps extends React.ComponentProps<"nav"> {
  children: React.ReactNode;
}

const HoverImageLinkRoot = ({
  children,
  className,
  ...props
}: HoverImageLinkRootProps) => {
  return (
    <nav className={cn("mx-auto w-full ", className)} {...props}>
      {children}
    </nav>
  );
};

interface HoverImageLinkItemProps
  extends Omit<React.ComponentProps<"a">, keyof MotionProps> {
  heading: string;
  subheading?: string;
  imageSrc: string;
  imageAlt?: string;
}

const HoverImageLinkItem = ({
  heading,
  subheading,
  imageSrc,
  imageAlt,
  className,
  href = "#",
  ...props
}: HoverImageLinkItemProps) => {
  const linkRef = useRef<HTMLAnchorElement>(null);

  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);

  const springX = useSpring(cursorX, { stiffness: 300, damping: 30 });
  const springY = useSpring(cursorY, { stiffness: 300, damping: 30 });

  const imageTop = useTransform(springY, [0.5, -0.5], ["40%", "60%"]);
  const imageLeft = useTransform(springX, [0.5, -0.5], ["60%", "70%"]);

  const trackCursor = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!linkRef.current) return;

    const bounds = linkRef.current.getBoundingClientRect();
    const normalizedX = (e.clientX - bounds.left) / bounds.width - 0.5;
    const normalizedY = (e.clientY - bounds.top) / bounds.height - 0.5;

    cursorX.set(normalizedX);
    cursorY.set(normalizedY);
  };

  const characters = heading.split("");

  return (
    <motion.a
      href={href}
      ref={linkRef}
      onMouseMove={trackCursor}
      initial="rest"
      whileHover="hover"
      className={cn(
        "group relative flex items-center justify-between border-b-2 border-border py-4 transition-colors duration-500 hover:border-foreground md:py-8",
        className
      )}
      {...props}
    >
      <div className="relative z-10">
        <motion.div
          variants={{
            rest: { x: 0 },
            hover: { x: -16 },
          }}
          transition={{
            type: "spring",
            stiffness: 400,
            damping: 25,
            staggerChildren: 0.075,
            delayChildren: 0.25,
          }}
          className="block text-4xl font-bold text-muted-foreground transition-colors duration-500 group-hover:text-foreground md:text-6xl"
        >
          {characters.map((char, idx) => (
            <motion.span
              key={`${char}-${idx}`}
              variants={{
                rest: { x: 0 },
                hover: { x: 16 },
              }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
              className="inline-block"
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
        {subheading && (
          <p className="mt-2 text-base text-muted-foreground transition-colors duration-500 group-hover:text-foreground">
            {subheading}
          </p>
        )}
      </div>

      <motion.img
        src={imageSrc}
        alt={imageAlt || `Preview for ${heading}`}
        style={{
          top: imageTop,
          left: imageLeft,
          translateX: "-50%",
          translateY: "-50%",
        }}
        variants={{
          rest: { scale: 0, rotate: "-12.5deg" },
          hover: { scale: 1, rotate: "12.5deg" },
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="absolute z-0 h-24 w-32 rounded-lg object-cover md:h-48 md:w-64"
      />

      <motion.div
        variants={{
          rest: { x: "25%", opacity: 0 },
          hover: { x: "0%", opacity: 1 },
        }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className="relative z-10 p-4"
        aria-hidden="true"
      >
        <ArrowRight className="h-12 w-12 text-foreground" />
      </motion.div>
    </motion.a>
  );
};

export const HoverImageLink = Object.assign(HoverImageLinkRoot, {
  Item: HoverImageLinkItem,
});

export { HoverImageLinkRoot, HoverImageLinkItem };
