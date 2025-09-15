"use client";

import React, {
  useState,
  useRef,
  useLayoutEffect,
  useEffect,
  useCallback,
} from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

export interface TooltipProps {
  children: React.ReactNode;
  content: string;
  side?: "top" | "bottom" | "left" | "right";
  className?: string;
  gap?: number;
  hideDelay?: number;
}

export const Tooltip: React.FC<TooltipProps> = ({
  children,
  content,
  side = "bottom",
  className,
  gap = 8,
  hideDelay = 100,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [pos, setPos] = useState({ left: 0, top: 0 });
  const [usedSide, setUsedSide] = useState<typeof side>(side);

  const triggerRef = useRef<HTMLDivElement | null>(null);
  const tooltipRef = useRef<HTMLDivElement | null>(null);

  const hoverTriggerRef = useRef(false);
  const hoverTooltipRef = useRef(false);
  const hideTimeoutRef = useRef<number | null>(null);

  const clearHide = () => {
    if (hideTimeoutRef.current) {
      window.clearTimeout(hideTimeoutRef.current);
      hideTimeoutRef.current = null;
    }
  };

  const show = useCallback(() => {
    clearHide();
    setIsVisible(true);
  }, []);

  const hideWithDelay = useCallback(() => {
    clearHide();
    hideTimeoutRef.current = window.setTimeout(() => {
      if (!hoverTriggerRef.current && !hoverTooltipRef.current) {
        setIsVisible(false);
      }
      hideTimeoutRef.current = null;
    }, hideDelay);
  }, [hideDelay]);

  const computePosition = useCallback(
    (preferredSide = side) => {
      const trigger = triggerRef.current;
      const tooltip = tooltipRef.current;
      if (!trigger || !tooltip) return;

      const t = trigger.getBoundingClientRect();
      const tt = tooltip.getBoundingClientRect();
      const padding = 8;
      let left = 0;
      let top = 0;
      let finalSide = preferredSide;

      const placeForSide = (s: typeof side) => {
        switch (s) {
          case "top":
            return {
              left: t.left + t.width / 2 - tt.width / 2,
              top: t.top - tt.height - gap,
            };
          case "bottom":
            return {
              left: t.left + t.width / 2 - tt.width / 2,
              top: t.bottom + gap,
            };
          case "left":
            return {
              left: t.left - tt.width - gap,
              top: t.top + t.height / 2 - tt.height / 2,
            };
          case "right":
            return {
              left: t.right + gap,
              top: t.top + t.height / 2 - tt.height / 2,
            };
          default:
            return {
              left: t.left + t.width / 2 - tt.width / 2,
              top: t.bottom + gap,
            };
        }
      };

      ({ left, top } = placeForSide(preferredSide));

      const fitsVertically =
        top >= padding && top + tt.height <= window.innerHeight - padding;
      const fitsHorizontally =
        left >= padding && left + tt.width <= window.innerWidth - padding;

      if (!fitsVertically) {
        if (preferredSide === "top") {
          // flip to bottom
          ({ left, top } = placeForSide("bottom"));
          finalSide = "bottom";
        } else if (preferredSide === "bottom") {
          ({ left, top } = placeForSide("top"));
          finalSide = "top";
        }
      }

      left = Math.max(
        padding,
        Math.min(left, window.innerWidth - tt.width - padding)
      );
      top = Math.max(
        padding,
        Math.min(top, window.innerHeight - tt.height - padding)
      );

      setUsedSide(finalSide);
      setPos({ left, top });
    },
    [gap, side]
  );

  useLayoutEffect(() => {
    if (!isVisible) return;
    computePosition(side);
    const raf = requestAnimationFrame(() => computePosition(side));
    return () => cancelAnimationFrame(raf);
  }, [isVisible, computePosition, side, content]);

  useEffect(() => {
    if (!isVisible) return;
    const handle = () => computePosition(usedSide);
    window.addEventListener("resize", handle);
    window.addEventListener("scroll", handle, true);
    return () => {
      window.removeEventListener("resize", handle);
      window.removeEventListener("scroll", handle, true);
    };
  }, [isVisible, computePosition, usedSide]);

  useEffect(() => {
    return () => {
      clearHide();
    };
  }, []);

  const canPortal = typeof document !== "undefined";

  const onTriggerEnter = (e: React.MouseEvent) => {
    hoverTriggerRef.current = true;
    show();
  };
  const onTriggerLeave = () => {
    hoverTriggerRef.current = false;
    hideWithDelay();
  };
  const onTriggerFocus = () => {
    hoverTriggerRef.current = true;
    show();
  };
  const onTriggerBlur = () => {
    hoverTriggerRef.current = false;
    hideWithDelay();
  };

  const onTooltipEnter = () => {
    hoverTooltipRef.current = true;
    clearHide();
  };
  const onTooltipLeave = () => {
    hoverTooltipRef.current = false;
    hideWithDelay();
  };

  return (
    <>
      <div
        ref={triggerRef}
        className="relative inline-block"
        onMouseEnter={onTriggerEnter}
        onMouseLeave={onTriggerLeave}
        onFocus={onTriggerFocus}
        onBlur={onTriggerBlur}
      >
        {children}
      </div>

      {canPortal &&
        createPortal(
          <AnimatePresence>
            {isVisible && (
              <motion.div
                ref={tooltipRef}
                role="tooltip"
                initial={{ opacity: 0, y: -6, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -6, scale: 0.98 }}
                transition={{ duration: 0.14 }}
                onMouseEnter={onTooltipEnter}
                onMouseLeave={onTooltipLeave}
                className={cn(
                  "fixed bg-popover text-popover-foreground rounded-lg shadow-xl border border-border z-[99999] pointer-events-auto",
                  content.length < 20
                    ? "px-2 py-1 text-xs whitespace-nowrap"
                    : content.length < 100
                    ? "px-3 py-2 text-sm whitespace-nowrap"
                    : "px-4 py-3 text-sm max-w-72 leading-relaxed whitespace-normal",
                  className
                )}
                style={{
                  left: `${pos.left}px`,
                  top: `${pos.top}px`,
                }}
                aria-hidden={!isVisible}
              >
                {content}
              </motion.div>
            )}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};
