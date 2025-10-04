"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { createPortal } from "react-dom";
import { Check, Circle } from "lucide-react";
import { cn } from "@/lib/utils";

function computeAnchoredTop(
  requestedY: number,
  menuHeight: number,
  padding = 16,
  extraNudge = 8
) {
  const maxTop = window.innerHeight - menuHeight - padding;
  if (requestedY <= maxTop) return requestedY;
  const overflow = requestedY + menuHeight - (window.innerHeight - padding);
  return Math.max(padding, requestedY - overflow - extraNudge);
}

function computeAnchoredLeft(
  requestedX: number,
  menuWidth: number,
  padding = 8,
  extraNudge = 8
) {
  const maxLeft = window.innerWidth - menuWidth - padding;
  if (requestedX <= maxLeft) return requestedX;
  const overflow = requestedX + menuWidth - (window.innerWidth - padding);
  return Math.max(padding, requestedX - overflow - extraNudge);
}

function isPointInTriangle(
  px: number,
  py: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  x3: number,
  y3: number
): boolean {
  const area = Math.abs((x2 - x1) * (y3 - y1) - (x3 - x1) * (y2 - y1));
  const a1 = Math.abs((x1 - px) * (y2 - py) - (x2 - px) * (y1 - py));
  const a2 = Math.abs((x2 - px) * (y3 - py) - (x3 - px) * (y2 - py));
  const a3 = Math.abs((x3 - px) * (y1 - py) - (x1 - px) * (y3 - py));
  return Math.abs(area - (a1 + a2 + a3)) < 1;
}

interface ContextMenuContextType {
  isOpen: boolean;
  position: { x: number; y: number };
  requestedPosition: { x: number; y: number };
  openMenu: (x: number, y: number) => void;
  closeMenu: () => void;
  triggerRef: React.RefObject<HTMLElement | null>;
  adjustPosition: (measuredWidth: number, measuredHeight: number) => void;
}

const ContextMenuContext = createContext<ContextMenuContextType | undefined>(
  undefined
);

const useContextMenu = () => {
  const context = useContext(ContextMenuContext);
  if (!context) {
    throw new Error("ContextMenu components must be used within ContextMenu");
  }
  return context;
};

interface ContextMenuProps {
  children: React.ReactNode;
}

const ContextMenuRoot: React.FC<ContextMenuProps> = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [requestedPosition, setRequestedPosition] = useState({ x: 0, y: 0 });
  const triggerRef = useRef<HTMLElement | null>(null);

  const openMenu = (x: number, y: number) => {
    setRequestedPosition({ x, y });
    setPosition({ x, y });
    setIsOpen(true);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  const adjustPosition = (measuredWidth: number, measuredHeight: number) => {
    const adjustedX = computeAnchoredLeft(requestedPosition.x, measuredWidth);
    const adjustedY = computeAnchoredTop(requestedPosition.y, measuredHeight);
    setPosition({ x: adjustedX, y: adjustedY });
  };

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        isOpen &&
        triggerRef.current &&
        !triggerRef.current.contains(e.target as Node)
      ) {
        const menuElement = document.querySelector(
          "[data-context-menu-content]"
        );
        if (menuElement && !menuElement.contains(e.target as Node)) {
          closeMenu();
        }
      }
    };

    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        closeMenu();
      }
    };

    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "unset";
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
      document.documentElement.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <ContextMenuContext.Provider
      value={{
        isOpen,
        position,
        requestedPosition,
        openMenu,
        closeMenu,
        triggerRef,
        adjustPosition,
      }}
    >
      {children}
    </ContextMenuContext.Provider>
  );
};

interface ContextMenuTriggerProps {
  children: React.ReactNode;
  triggerOn?: "contextmenu" | "click" | "hover";
  className?: string;
}

const ContextMenuTrigger: React.FC<ContextMenuTriggerProps> = ({
  children,
  triggerOn = "contextmenu",
  className,
}) => {
  const { openMenu, closeMenu, triggerRef } = useContextMenu();
  const hoverTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleContextMenu = (e: React.MouseEvent) => {
    if (triggerOn === "contextmenu") {
      e.preventDefault();
      const padding = 8;
      let x = e.clientX;
      let y = e.clientY;

      if (x < padding) x = padding;
      if (y < padding) y = padding;

      openMenu(x, y);
    }
  };

  const handleClick = (e: React.MouseEvent) => {
    if (triggerOn === "click") {
      e.preventDefault();

      const element = e.currentTarget as HTMLElement;
      const rect = element.getBoundingClientRect();
      const padding = 8;

      let x = rect.right + padding;
      let y = rect.top;

      if (x < padding) x = padding;
      if (y < padding) y = padding;

      openMenu(x, y);
    }
  };

  const handleMouseEnter = (e: React.MouseEvent<HTMLDivElement>) => {
    if (triggerOn === "hover") {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
        closeTimeoutRef.current = null;
      }
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }

      const element = e.currentTarget;
      const rect = element.getBoundingClientRect();
      const padding = 16;

      let x = rect.right + padding;
      let y = rect.top;

      if (x < padding) x = padding;
      if (y < padding) y = padding;

      hoverTimeoutRef.current = setTimeout(() => {
        openMenu(x, y);
      }, 150);
    }
  };

  const handleMouseLeave = () => {
    if (triggerOn === "hover") {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
        hoverTimeoutRef.current = null;
      }
      closeTimeoutRef.current = setTimeout(() => {
        const menuElement = document.querySelector(
          "[data-context-menu-content]"
        );
        if (menuElement && !menuElement.matches(":hover")) {
          closeMenu();
        }
      }, 300);
    }
  };

  useEffect(() => {
    return () => {
      if (hoverTimeoutRef.current) {
        clearTimeout(hoverTimeoutRef.current);
      }
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div
      ref={triggerRef as React.RefObject<HTMLDivElement>}
      onContextMenu={handleContextMenu}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      className={cn("inline-block", className)}
    >
      {children}
    </div>
  );
};

interface ContextMenuContentProps {
  children: React.ReactNode;
  className?: string;
}

const ContextMenuContent: React.FC<ContextMenuContentProps> = ({
  children,
  className,
}) => {
  const { isOpen, position, closeMenu, triggerRef, adjustPosition } =
    useContextMenu();
  const contentRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const hasAdjusted = useRef(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (isOpen) {
      hasAdjusted.current = false;
      requestAnimationFrame(() => {
        if (contentRef.current && !hasAdjusted.current) {
          const rect = contentRef.current.getBoundingClientRect();
          adjustPosition(rect.width, rect.height);
          hasAdjusted.current = true;
        }
      });
    }
  }, [isOpen, adjustPosition]);

  useEffect(() => {
    if (!isOpen || !contentRef.current) return;

    const handleFocusTrap = (e: KeyboardEvent) => {
      if (e.key === "Tab") {
        e.preventDefault();
        const focusableElements = contentRef.current?.querySelectorAll(
          'button:not([disabled]), [role="menuitem"]:not([disabled])'
        );
        if (!focusableElements || focusableElements.length === 0) return;

        const firstElement = focusableElements[0] as HTMLElement;
        const lastElement = focusableElements[
          focusableElements.length - 1
        ] as HTMLElement;
        const activeElement = document.activeElement;

        if (e.shiftKey) {
          if (activeElement === firstElement) {
            lastElement.focus();
          } else {
            const currentIndex = Array.from(focusableElements).indexOf(
              activeElement as HTMLElement
            );
            if (currentIndex > 0) {
              (focusableElements[currentIndex - 1] as HTMLElement).focus();
            }
          }
        } else {
          if (activeElement === lastElement) {
            firstElement.focus();
          } else {
            const currentIndex = Array.from(focusableElements).indexOf(
              activeElement as HTMLElement
            );
            if (currentIndex < focusableElements.length - 1) {
              (focusableElements[currentIndex + 1] as HTMLElement).focus();
            }
          }
        }
      }
    };

    document.addEventListener("keydown", handleFocusTrap);
    return () => document.removeEventListener("keydown", handleFocusTrap);
  }, [isOpen]);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    if (triggerRef.current) {
      const triggerElement = triggerRef.current;
      closeTimeoutRef.current = setTimeout(() => {
        if (
          !triggerElement.matches(":hover") &&
          contentRef.current &&
          !contentRef.current.matches(":hover")
        ) {
          closeMenu();
        }
      }, 300);
    }
  };

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div
      ref={contentRef}
      data-context-menu-content
      className={cn(
        "fixed z-50 min-w-[220px] rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-lg",
        "animate-in fade-in-0 zoom-in-95",
        className
      )}
      style={{
        left: `${position.x}px`,
        top: `${position.y}px`,
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>,
    document.body
  );
};

interface ContextMenuItemProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  inset?: boolean;
  disabled?: boolean;
  variant?: "default" | "destructive";
}

const ContextMenuItem: React.FC<ContextMenuItemProps> = ({
  className,
  inset,
  disabled,
  variant = "default",
  children,
  onClick,
  ...props
}) => {
  const { closeMenu } = useContextMenu();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (!disabled) {
      onClick?.(e);
      closeMenu();
    }
  };

  return (
    <button
      role="menuitem"
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
        "focus:bg-accent focus:text-accent-foreground",
        "disabled:pointer-events-none disabled:opacity-50",
        variant === "default" && "hover:bg-accent hover:text-accent-foreground",
        variant === "destructive" &&
          "text-destructive focus:bg-destructive focus:text-destructive-foreground hover:bg-destructive hover:text-destructive-foreground",
        inset && "pl-8",
        className
      )}
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      {children}
    </button>
  );
};

interface ContextMenuCheckboxItemProps
  extends Omit<ContextMenuItemProps, "onChange"> {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
}

const ContextMenuCheckboxItem: React.FC<ContextMenuCheckboxItemProps> = ({
  checked,
  onCheckedChange,
  children,
  className,
  ...props
}) => {
  const handleClick = () => {
    onCheckedChange?.(!checked);
  };

  return (
    <ContextMenuItem
      className={cn("pl-8", className)}
      onClick={handleClick}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {checked && <Check className="h-4 w-4" />}
      </span>
      {children}
    </ContextMenuItem>
  );
};

interface ContextMenuRadioGroupProps {
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
}

const ContextMenuRadioGroup: React.FC<ContextMenuRadioGroupProps> = ({
  value,
  onValueChange,
  children,
}) => {
  return (
    <div role="radiogroup">
      {React.Children.map(children, (child) => {
        if (
          React.isValidElement(child) &&
          child.type === ContextMenuRadioItem
        ) {
          return React.cloneElement(
            child as React.ReactElement<ContextMenuRadioItemProps>,
            {
              checked:
                (child.props as ContextMenuRadioItemProps).value === value,
              onSelect: () =>
                onValueChange?.(
                  (child.props as ContextMenuRadioItemProps).value
                ),
            }
          );
        }
        return child;
      })}
    </div>
  );
};

interface ContextMenuRadioItemProps
  extends Omit<ContextMenuItemProps, "onChange"> {
  value: string;
  checked?: boolean;
  onSelect?: () => void;
}

const ContextMenuRadioItem: React.FC<ContextMenuRadioItemProps> = ({
  value,
  checked,
  onSelect,
  children,
  className,
  ...props
}) => {
  return (
    <ContextMenuItem
      className={cn("pl-8", className)}
      onClick={onSelect}
      {...props}
    >
      <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
        {checked && <Circle className="h-2 w-2 fill-current" />}
      </span>
      {children}
    </ContextMenuItem>
  );
};

const ContextMenuSeparator: React.FC<{ className?: string }> = ({
  className,
}) => {
  return <div className={cn("-mx-1 my-1 h-px bg-border", className)} />;
};

interface ContextMenuLabelProps {
  inset?: boolean;
  children: React.ReactNode;
  className?: string;
}

const ContextMenuLabel: React.FC<ContextMenuLabelProps> = ({
  inset,
  children,
  className,
}) => {
  return (
    <div
      className={cn(
        "px-2 py-1.5 text-sm font-semibold text-foreground",
        inset && "pl-8",
        className
      )}
    >
      {children}
    </div>
  );
};

const ContextMenuShortcut: React.FC<{
  children: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <span
      className={cn(
        "ml-auto text-xs tracking-widest text-muted-foreground",
        className
      )}
    >
      {children}
    </span>
  );
};

interface SubMenuContextType {
  isSubOpen: boolean;
  openSub: () => void;
  closeSub: () => void;
  setSubmenuRect: (rect: DOMRect | null) => void;
  submenuRect: DOMRect | null;
}

const SubMenuContext = createContext<SubMenuContextType | undefined>(undefined);

const useSubMenu = () => {
  const context = useContext(SubMenuContext);
  if (!context) {
    throw new Error("SubMenu components must be used within ContextMenuSub");
  }
  return context;
};

const ContextMenuSub: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isSubOpen, setIsSubOpen] = useState(false);
  const [submenuRect, setSubmenuRect] = useState<DOMRect | null>(null);

  return (
    <SubMenuContext.Provider
      value={{
        isSubOpen,
        openSub: () => setIsSubOpen(true),
        closeSub: () => setIsSubOpen(false),
        setSubmenuRect,
        submenuRect,
      }}
    >
      <div className="relative">{children}</div>
    </SubMenuContext.Provider>
  );
};

const ContextMenuSubTrigger: React.FC<ContextMenuItemProps> = ({
  children,
  className,
  inset,
  ...props
}) => {
  const { openSub, closeSub, submenuRect } = useSubMenu();
  const triggerRef = useRef<HTMLButtonElement>(null);
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const mouseLeaveTimeRef = useRef<number>(0);

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
    openSub();
  };

  const handleMouseLeave = (e: React.MouseEvent) => {
    mouseLeaveTimeRef.current = Date.now();
    const relatedTarget = e.relatedTarget as HTMLElement;

    if (relatedTarget?.closest("[data-submenu-content]")) {
      return;
    }

    if (submenuRect && triggerRef.current) {
      const triggerRect = triggerRef.current.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const submenuOnRight = submenuRect.left >= triggerRect.right;

      const submenuX = submenuOnRight ? submenuRect.left : submenuRect.right;
      const submenuTopY = submenuRect.top - 5;
      const submenuBottomY = submenuRect.bottom + 5;

      const inTriangle = isPointInTriangle(
        mouseX,
        mouseY,
        mouseX,
        mouseY,
        submenuX,
        submenuTopY,
        submenuX,
        submenuBottomY
      );

      if (inTriangle) {
        closeTimeoutRef.current = setTimeout(() => {
          closeSub();
        }, 350);
        return;
      }
    }

    closeTimeoutRef.current = setTimeout(() => {
      closeSub();
    }, 100);
  };

  useEffect(() => {
    const handleGlobalMouseMove = (e: MouseEvent) => {
      if (!submenuRect || !triggerRef.current || !closeTimeoutRef.current)
        return;

      const timeSinceLeave = Date.now() - mouseLeaveTimeRef.current;
      if (timeSinceLeave > 400) return;

      const triggerRect = triggerRef.current.getBoundingClientRect();
      const mouseX = e.clientX;
      const mouseY = e.clientY;

      const submenuOnRight = submenuRect.left >= triggerRect.right;
      const submenuX = submenuOnRight ? submenuRect.left : submenuRect.right;

      const inTriangle = isPointInTriangle(
        mouseX,
        mouseY,
        triggerRect.right,
        triggerRect.top + triggerRect.height / 2,
        submenuX,
        submenuRect.top - 5,
        submenuX,
        submenuRect.bottom + 5
      );

      const mouseInSubmenu =
        mouseX >= submenuRect.left &&
        mouseX <= submenuRect.right &&
        mouseY >= submenuRect.top &&
        mouseY <= submenuRect.bottom;

      if (mouseInSubmenu || inTriangle) {
        if (closeTimeoutRef.current) {
          clearTimeout(closeTimeoutRef.current);
          closeTimeoutRef.current = null;
        }
      }
    };

    document.addEventListener("mousemove", handleGlobalMouseMove);
    return () => {
      document.removeEventListener("mousemove", handleGlobalMouseMove);
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, [submenuRect, closeSub]);

  return (
    <button
      ref={triggerRef}
      role="menuitem"
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-sm px-2 py-1.5 text-sm outline-none transition-colors",
        "focus:bg-accent focus:text-accent-foreground hover:bg-accent hover:text-accent-foreground",
        inset && "pl-8",
        className
      )}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      {...props}
    >
      {children}
      <svg
        className="ml-auto h-4 w-4"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M9 5l7 7-7 7"
        />
      </svg>
    </button>
  );
};

const ContextMenuSubContent: React.FC<ContextMenuContentProps> = ({
  children,
  className,
}) => {
  const { isSubOpen, closeSub, setSubmenuRect } = useSubMenu();
  const closeTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const subContentRef = useRef<HTMLDivElement>(null);
  const [submenuPosition, setSubmenuPosition] = useState({
    shouldFlipLeft: false,
    top: 0,
  });

  const handleMouseEnter = () => {
    if (closeTimeoutRef.current) {
      clearTimeout(closeTimeoutRef.current);
      closeTimeoutRef.current = null;
    }
  };

  const handleMouseLeave = () => {
    closeTimeoutRef.current = setTimeout(() => {
      closeSub();
    }, 150);
  };

  useEffect(() => {
    if (isSubOpen && subContentRef.current) {
      requestAnimationFrame(() => {
        if (!subContentRef.current) return;

        const rect = subContentRef.current.getBoundingClientRect();
        setSubmenuRect(rect);

        const parentMenu = subContentRef.current.parentElement;
        if (parentMenu) {
          const parentRect = parentMenu.getBoundingClientRect();
          const padding = 16;

          let shouldFlipLeft = false;
          let adjustedTop = 0;

          if (parentRect.right + rect.width > window.innerWidth - padding) {
            if (parentRect.left - rect.width >= padding) {
              shouldFlipLeft = true;
            } else {
              shouldFlipLeft =
                parentRect.left > window.innerWidth - parentRect.right;
            }
          }

          const requestedTop = 0;
          const absoluteTop = parentRect.top + requestedTop;
          const overflow =
            absoluteTop + rect.height - (window.innerHeight - padding);

          if (overflow > 0) {
            adjustedTop = Math.max(
              -parentRect.top + padding,
              requestedTop - overflow - padding
            );
          }

          setSubmenuPosition({ shouldFlipLeft, top: adjustedTop });
        }
      });
    } else {
      setSubmenuRect(null);
    }
  }, [isSubOpen, setSubmenuRect]);

  useEffect(() => {
    return () => {
      if (closeTimeoutRef.current) {
        clearTimeout(closeTimeoutRef.current);
      }
    };
  }, []);

  if (!isSubOpen) return null;

  return (
    <div
      ref={subContentRef}
      data-submenu-content
      className={cn(
        "absolute z-50 min-w-[180px] rounded-md border border-border bg-popover p-1 text-popover-foreground shadow-lg",
        "animate-in fade-in-0 zoom-in-95",
        submenuPosition.shouldFlipLeft ? "right-full mr-2" : "left-full ml-2",
        className
      )}
      style={{
        top: submenuPosition.top !== 0 ? `${submenuPosition.top}px` : "0",
      }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </div>
  );
};

export const ContextMenu = ContextMenuRoot as React.FC<ContextMenuProps> & {
  Trigger: typeof ContextMenuTrigger;
  Content: typeof ContextMenuContent;
  Item: typeof ContextMenuItem;
  CheckboxItem: typeof ContextMenuCheckboxItem;
  RadioGroup: typeof ContextMenuRadioGroup;
  RadioItem: typeof ContextMenuRadioItem;
  Separator: typeof ContextMenuSeparator;
  Label: typeof ContextMenuLabel;
  Shortcut: typeof ContextMenuShortcut;
  Sub: typeof ContextMenuSub;
  SubTrigger: typeof ContextMenuSubTrigger;
  SubContent: typeof ContextMenuSubContent;
};

ContextMenu.Trigger = ContextMenuTrigger;
ContextMenu.Content = ContextMenuContent;
ContextMenu.Item = ContextMenuItem;
ContextMenu.CheckboxItem = ContextMenuCheckboxItem;
ContextMenu.RadioGroup = ContextMenuRadioGroup;
ContextMenu.RadioItem = ContextMenuRadioItem;
ContextMenu.Separator = ContextMenuSeparator;
ContextMenu.Label = ContextMenuLabel;
ContextMenu.Shortcut = ContextMenuShortcut;
ContextMenu.Sub = ContextMenuSub;
ContextMenu.SubTrigger = ContextMenuSubTrigger;
ContextMenu.SubContent = ContextMenuSubContent;

export {
  ContextMenuTrigger,
  ContextMenuContent,
  ContextMenuItem,
  ContextMenuCheckboxItem,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuLabel,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubTrigger,
  ContextMenuSubContent,
};
