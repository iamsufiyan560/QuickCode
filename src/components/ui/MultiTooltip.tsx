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

type Position =
  | "top"
  | "top-right"
  | "right"
  | "bottom-right"
  | "bottom"
  | "bottom-left"
  | "left"
  | "top-left";

export interface MultiTooltipProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
  tooltips: Array<{
    content: string;
    position: Position;
  }>;
  gap?: number;
  hideDelay?: number;
  className?: string;
  tooltipClassName?: string;
}

export const MultiTooltip: React.FC<MultiTooltipProps> = ({
  children,
  tooltips,
  gap = 8,
  hideDelay = 100,
  className,
  tooltipClassName,
  ...props
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const [positions, setPositions] = useState<
    Array<{ left: number; top: number }>
  >([]);

  const triggerRef = useRef<HTMLDivElement | null>(null);
  const tooltipRefs = useRef<Array<HTMLDivElement | null>>([]);

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

  const computePositions = useCallback(() => {
    const trigger = triggerRef.current;
    if (!trigger) return;

    const t = trigger.getBoundingClientRect();
    const newPositions: Array<{ left: number; top: number }> = [];

    tooltips.forEach((tooltip, index) => {
      const tooltipEl = tooltipRefs.current[index];
      if (!tooltipEl) return;

      const tt = tooltipEl.getBoundingClientRect();
      let left = 0;
      let top = 0;

      switch (tooltip.position) {
        case "top":
          left = t.left + t.width / 2 - tt.width / 2;
          top = t.top - tt.height - gap;
          break;
        case "top-right":
          left = t.right - tt.width / 2;
          top = t.top - tt.height - gap;
          break;
        case "right":
          left = t.right + gap;
          top = t.top + t.height / 2 - tt.height / 2;
          break;
        case "bottom-right":
          left = t.right - tt.width / 2;
          top = t.bottom + gap;
          break;
        case "bottom":
          left = t.left + t.width / 2 - tt.width / 2;
          top = t.bottom + gap;
          break;
        case "bottom-left":
          left = t.left - tt.width / 2;
          top = t.bottom + gap;
          break;
        case "left":
          left = t.left - tt.width - gap;
          top = t.top + t.height / 2 - tt.height / 2;
          break;
        case "top-left":
          left = t.left - tt.width / 2;
          top = t.top - tt.height - gap;
          break;
      }

      const padding = 8;
      left = Math.max(
        padding,
        Math.min(left, window.innerWidth - tt.width - padding)
      );
      top = Math.max(
        padding,
        Math.min(top, window.innerHeight - tt.height - padding)
      );

      newPositions.push({ left, top });
    });

    setPositions(newPositions);
  }, [gap, tooltips]);

  useLayoutEffect(() => {
    if (!isVisible) return;
    computePositions();
    const raf = requestAnimationFrame(() => computePositions());
    return () => cancelAnimationFrame(raf);
  }, [isVisible, computePositions]);

  useEffect(() => {
    if (!isVisible) return;
    const handle = () => computePositions();

    const hideOnScroll = () => setIsVisible(false);

    window.addEventListener("resize", handle);
    window.addEventListener("scroll", handle, true);

    window.addEventListener("touchmove", hideOnScroll, { passive: true });
    document.addEventListener("touchmove", hideOnScroll, { passive: true });

    return () => {
      window.removeEventListener("resize", handle);
      window.removeEventListener("scroll", handle, true);

      window.removeEventListener("touchmove", hideOnScroll);
      document.removeEventListener("touchmove", hideOnScroll);
    };
  }, [isVisible, computePositions]);

  useEffect(() => {
    return () => {
      clearHide();
    };
  }, []);

  const canPortal = typeof document !== "undefined";

  const onTriggerEnter = () => {
    hoverTriggerRef.current = true;
    show();
  };

  const onTriggerLeave = () => {
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
        {...props}
        ref={triggerRef}
        className={cn("relative inline-block w-fit", className)}
        onMouseEnter={onTriggerEnter}
        onMouseLeave={onTriggerLeave}
        onFocus={onTriggerEnter}
        onBlur={onTriggerLeave}
      >
        {children}
      </div>

      {canPortal &&
        createPortal(
          <AnimatePresence>
            {isVisible &&
              tooltips.map((tooltip, index) => (
                <motion.div
                  key={index}
                  ref={(el) => {
                    tooltipRefs.current[index] = el;
                  }}
                  role="tooltip"
                  initial={{ opacity: 0, y: -6, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.98 }}
                  transition={{ duration: 0.14, delay: index * 0.05 }}
                  onMouseEnter={onTooltipEnter}
                  onMouseLeave={onTooltipLeave}
                  className={cn(
                    "fixed bg-popover text-popover-foreground rounded-lg shadow-xl border border-border z-[99999] pointer-events-auto",
                    tooltip.content.length < 20
                      ? "px-2 py-1 text-xs whitespace-nowrap"
                      : tooltip.content.length < 100
                      ? "px-3 py-2 text-sm whitespace-nowrap"
                      : "px-4 py-3 text-sm max-w-72 leading-relaxed whitespace-normal",
                    tooltipClassName
                  )}
                  style={{
                    left: `${positions[index]?.left || 0}px`,
                    top: `${positions[index]?.top || 0}px`,
                  }}
                  aria-hidden={!isVisible}
                >
                  {tooltip.content}
                </motion.div>
              ))}
          </AnimatePresence>,
          document.body
        )}
    </>
  );
};
