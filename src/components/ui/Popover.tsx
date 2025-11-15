"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

function computeVerticalPosition(
  triggerRect: DOMRect,
  contentHeight: number,
  offset: number = 8
): { top: number; placement: "top" | "bottom" } {
  const padding = 16;
  const spaceBelow = window.innerHeight - triggerRect.bottom - offset - padding;
  const spaceAbove = triggerRect.top - offset - padding;

  if (spaceBelow >= contentHeight) {
    return {
      top: triggerRect.bottom + offset,
      placement: "bottom",
    };
  }

  if (spaceAbove >= contentHeight) {
    return {
      top: triggerRect.top - contentHeight - offset - triggerRect.height / 2,
      placement: "top",
    };
  }

  if (spaceBelow > spaceAbove) {
    return {
      top: triggerRect.bottom + offset,
      placement: "bottom",
    };
  }

  return {
    top: triggerRect.top - contentHeight - offset - triggerRect.height / 2,
    placement: "top",
  };
}

interface PopoverContextType {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  triggerRef: React.RefObject<HTMLElement | null>;
}

const PopoverContext = createContext<PopoverContextType | undefined>(undefined);

const usePopover = () => {
  const context = useContext(PopoverContext);
  if (!context) {
    throw new Error("Popover components must be used within Popover");
  }
  return context;
};

interface PopoverProps extends React.ComponentProps<"div"> {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const PopoverRoot: React.FC<PopoverProps> = ({
  children,
  open,
  onOpenChange,
  ...props
}) => {
  const [internalOpen, setInternalOpen] = useState(false);
  const triggerRef = useRef<HTMLElement | null>(null);

  const isControlled = open !== undefined;
  const isOpen = isControlled ? open : internalOpen;

  const setIsOpen = (newOpen: boolean) => {
    if (!isControlled) {
      setInternalOpen(newOpen);
    }
    onOpenChange?.(newOpen);
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!isOpen) return;

      const target = e.target as Node;
      const contentElement = document.querySelector("[data-popover-content]");

      if (
        triggerRef.current &&
        !triggerRef.current.contains(target) &&
        contentElement &&
        !contentElement.contains(target)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [isOpen, setIsOpen]);

  return (
    <PopoverContext.Provider value={{ isOpen, setIsOpen, triggerRef }}>
      <div {...props} className="relative inline-block">
        {children}
      </div>
    </PopoverContext.Provider>
  );
};

interface PopoverTriggerProps extends React.ComponentProps<"button"> {
  asChild?: boolean;
}

const PopoverTrigger: React.FC<PopoverTriggerProps> = ({
  children,
  asChild,
  className,
  ...props
}) => {
  const { isOpen, setIsOpen, triggerRef } = usePopover();

  const handleClick = () => {
    setIsOpen(!isOpen);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      ref: triggerRef,
      onClick: (e: React.MouseEvent) => {
        handleClick();
        (children as React.ReactElement<any>).props?.onClick?.(e);
      },
      "aria-expanded": isOpen,
      "aria-haspopup": "dialog",
    });
  }

  return (
    <button
      ref={triggerRef as React.RefObject<HTMLButtonElement>}
      onClick={handleClick}
      aria-expanded={isOpen}
      aria-haspopup="dialog"
      className={cn(className)}
      {...props}
    >
      {children}
    </button>
  );
};

interface PopoverContentProps extends React.ComponentProps<"div"> {
  align?: "start" | "center" | "end";
  sideOffset?: number;
}

const PopoverContent: React.FC<PopoverContentProps> = ({
  children,
  className,
  align = "center",
  sideOffset = 8,
  ...props
}) => {
  const { isOpen, setIsOpen, triggerRef } = usePopover();
  const contentRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const [placement, setPlacement] = useState<"top" | "bottom">("bottom");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!isOpen || !triggerRef.current || !contentRef.current) return;

    const updatePosition = () => {
      if (!triggerRef.current || !contentRef.current) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const contentRect = contentRef.current.getBoundingClientRect();

      const { top, placement: newPlacement } = computeVerticalPosition(
        triggerRect,
        contentRect.height,
        sideOffset
      );

      let left = triggerRect.left;

      if (align === "center") {
        left = triggerRect.left + triggerRect.width / 2 - contentRect.width / 2;
      } else if (align === "end") {
        left = triggerRect.right - contentRect.width;
      }

      const padding = 8;
      if (left < padding) {
        left = padding;
      } else if (left + contentRect.width > window.innerWidth - padding) {
        left = window.innerWidth - contentRect.width - padding;
      }

      setPosition({ top, left });
      setPlacement(newPlacement);
    };

    updatePosition();

    const resizeObserver = new ResizeObserver(updatePosition);
    if (contentRef.current) {
      resizeObserver.observe(contentRef.current);
    }

    window.addEventListener("scroll", updatePosition, true);
    window.addEventListener("resize", updatePosition);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("scroll", updatePosition, true);
      window.removeEventListener("resize", updatePosition);
    };
  }, [isOpen, align, sideOffset]);

  useEffect(() => {
    if (!isOpen || !contentRef.current) return;

    const handleFocusTrap = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        const focusableElements = contentRef.current?.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])'
        );

        if (!focusableElements || focusableElements.length === 0) {
          e.preventDefault();
          return;
        }

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleFocusTrap);

    const firstFocusable = contentRef.current.querySelector(
      'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"]):not([disabled])'
    ) as HTMLElement;

    if (firstFocusable) {
      requestAnimationFrame(() => {
        firstFocusable.focus();
      });
    }

    return () => {
      document.removeEventListener("keydown", handleFocusTrap);
    };
  }, [isOpen]);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      ref={contentRef}
      data-popover-content
      role="dialog"
      aria-modal="true"
      className={cn(
        "fixed z-50 rounded-md border border-border bg-popover p-4 text-popover-foreground shadow-md outline-none",
        placement === "bottom" &&
          "animate-in fade-in-0 zoom-in-95 slide-in-from-top-2",
        placement === "top" &&
          "animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-2",
        className
      )}
      style={{
        top: `${position.top}px`,
        left: `${position.left}px`,
      }}
      {...props}
    >
      {children}
    </div>,
    document.body
  );
};

const PopoverClose: React.FC<
  React.ComponentProps<"button"> & { asChild?: boolean }
> = ({ children, onClick, className, asChild, ...props }) => {
  const { setIsOpen } = usePopover();

  const handleClick = (e: React.MouseEvent<HTMLElement>) => {
    setIsOpen(false);
    if (onClick) onClick(e as any);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: (e: React.MouseEvent<HTMLElement>) => {
        handleClick(e);
        (children as React.ReactElement<any>).props?.onClick?.(e);
      },
    });
  }

  return (
    <button
      type="button"
      onClick={handleClick}
      className={cn(className)}
      {...props}
    >
      {children}
    </button>
  );
};

export const Popover = PopoverRoot as React.FC<PopoverProps> & {
  Trigger: typeof PopoverTrigger;
  Content: typeof PopoverContent;
  Close: typeof PopoverClose;
};

Popover.Trigger = PopoverTrigger;
Popover.Content = PopoverContent;
Popover.Close = PopoverClose;

export { PopoverTrigger, PopoverContent, PopoverClose };
