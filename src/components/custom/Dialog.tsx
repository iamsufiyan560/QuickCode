"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "./Button";

export interface DialogProps {
  children?: React.ReactNode;
  isOpen?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
  showCloseButton?: boolean;
  closeOnOverlayClick?: boolean;
  closeOnEscapeKey?: boolean;
  title?: string;
  description?: string;
  className?: string;
  overlayClassName?: string;
  contentClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
}

export interface DialogTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
}

interface ClickableElement {
  onClick?: (e: React.MouseEvent) => void;
  className?: string;
  [key: string]: any;
}

// Context for compound component pattern
const DialogContext = React.createContext<{
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  showCloseButton: boolean;
  closeOnOverlayClick: boolean;
  closeOnEscapeKey: boolean;
  title?: string;
  description?: string;
  overlayClassName?: string;
  contentClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
  titleClassName?: string;
  descriptionClassName?: string;
} | null>(null);

// Helper to check if component is being used in compound pattern
const isCompoundPattern = (children: React.ReactNode): boolean => {
  let hasTrigger = false;
  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child) && child.type === DialogTrigger) {
      hasTrigger = true;
    }
  });
  return hasTrigger;
};

// Original Dialog component logic
const DialogComponent: React.FC<DialogProps> = ({
  children,
  isOpen: controlledOpen,
  defaultOpen = false,
  onOpenChange,
  showCloseButton = true,
  closeOnOverlayClick = true,
  closeOnEscapeKey = true,
  title,
  description,
  className,
  overlayClassName,
  contentClassName,
  headerClassName,
  bodyClassName,
  titleClassName,
  descriptionClassName,
}) => {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const isOpen = isControlled ? controlledOpen : internalOpen;

  const handleOpenChange = (open: boolean) => {
    if (!isControlled) {
      setInternalOpen(open);
    }
    onOpenChange?.(open);
  };

  const closeDialog = () => handleOpenChange(false);

  // Handle escape key
  React.useEffect(() => {
    if (!closeOnEscapeKey || !isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDialog();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [closeOnEscapeKey, isOpen]);

  // Prevent body scroll when dialog is open
  React.useEffect(() => {
    if (isOpen) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "unset";
    }

    return () => {
      document.documentElement.style.overflow = "unset";
    };
  }, [isOpen]);

  // Focus management
  const dialogRef = React.useRef<HTMLDivElement>(null);
  React.useEffect(() => {
    if (isOpen && dialogRef.current) {
      const focusableElements = dialogRef.current.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const firstElement = focusableElements[0] as HTMLElement;
      if (firstElement) {
        firstElement.focus();
      }
    }
  }, [isOpen]);

  return (
    <div className={cn("", className)}>
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className={cn(
                "fixed inset-0 z-50 bg-background/80",
                overlayClassName
              )}
              onClick={closeOnOverlayClick ? closeDialog : undefined}
              style={{ pointerEvents: "auto" }}
            />

            {/* Dialog Content */}
            <div
              className="fixed inset-0 z-50 flex items-center justify-center p-4"
              style={{ pointerEvents: "none" }}
            >
              <motion.div
                ref={dialogRef}
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                transition={{ duration: 0.2, ease: "easeOut" }}
                className={cn(
                  "relative w-full max-w-md max-h-[90vh] overflow-auto bg-card text-card-foreground rounded-lg border border-border shadow-lg",
                  contentClassName
                )}
                onClick={(e) => e.stopPropagation()}
                style={{ pointerEvents: "auto" }}
              >
                {/* Close Button - Positioned absolutely */}
                {showCloseButton && (
                  <Button
                    onClick={closeDialog}
                    size="icon"
                    variant="ghost"
                    className="absolute top-4 right-4 z-10 h-6 w-6 text-muted-foreground hover:text-foreground"
                    aria-label="Close dialog"
                  >
                    <X className="w-4 h-4" />
                  </Button>
                )}

                {/* Header */}
                {(title || description) && (
                  <div
                    className={cn(
                      "p-6 pb-4",
                      showCloseButton && "pr-12", // Add right padding when close button is present
                      headerClassName
                    )}
                  >
                    {title && (
                      <h2
                        className={cn(
                          "text-lg font-semibold text-foreground mb-1",
                          titleClassName
                        )}
                      >
                        {title}
                      </h2>
                    )}
                    {description && (
                      <p
                        className={cn(
                          "text-sm text-muted-foreground",
                          descriptionClassName
                        )}
                      >
                        {description}
                      </p>
                    )}
                  </div>
                )}

                {/* Body */}
                <div
                  className={cn(
                    "px-6",
                    title || description ? "pb-6" : "py-6",
                    showCloseButton && !title && !description && "pt-12", // Add top padding if no header but has close button
                    bodyClassName
                  )}
                >
                  {children}
                </div>
              </motion.div>
            </div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

// DialogTrigger Component
export const DialogTrigger: React.FC<DialogTriggerProps> = ({
  children,
  asChild = false,
  className,
}) => {
  const context = React.useContext(DialogContext);

  if (!context) {
    console.warn("DialogTrigger must be used within a Dialog component");
    return <>{children}</>;
  }

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    context.onOpenChange(true);
  };

  if (asChild && React.isValidElement(children)) {
    const element = children as React.ReactElement<ClickableElement>;
    const originalOnClick = element.props.onClick;

    return React.cloneElement(element, {
      ...element.props,
      onClick: (e: React.MouseEvent) => {
        handleClick(e);
        originalOnClick?.(e);
      },
      className: cn(element.props.className, className),
    });
  }

  return (
    <button onClick={handleClick} className={className}>
      {children}
    </button>
  );
};

// Main Dialog wrapper that handles both patterns
export const Dialog: React.FC<DialogProps> = (props) => {
  const { children, ...restProps } = props;

  // Check if this is compound pattern usage
  if (isCompoundPattern(children)) {
    // Compound pattern - use context
    const [internalOpen, setInternalOpen] = React.useState(
      props.defaultOpen || false
    );
    const isControlled = props.isOpen !== undefined;
    const isOpen = isControlled ? props.isOpen! : internalOpen;

    const handleOpenChange = (open: boolean) => {
      if (!isControlled) {
        setInternalOpen(open);
      }
      props.onOpenChange?.(open);
    };

    const contextValue = {
      isOpen,
      onOpenChange: handleOpenChange,
      showCloseButton: props.showCloseButton ?? true,
      closeOnOverlayClick: props.closeOnOverlayClick ?? true,
      closeOnEscapeKey: props.closeOnEscapeKey ?? true,
      title: props.title,
      description: props.description,
      overlayClassName: props.overlayClassName,
      contentClassName: props.contentClassName,
      headerClassName: props.headerClassName,
      bodyClassName: props.bodyClassName,
      titleClassName: props.titleClassName,
      descriptionClassName: props.descriptionClassName,
    };

    // Separate trigger from content
    const triggerElements: React.ReactNode[] = [];
    const contentElements: React.ReactNode[] = [];

    React.Children.forEach(children, (child) => {
      if (React.isValidElement(child) && child.type === DialogTrigger) {
        triggerElements.push(child);
      } else {
        contentElements.push(child);
      }
    });

    return (
      <DialogContext.Provider value={contextValue}>
        <div className={props.className}>
          {/* Render triggers */}
          {triggerElements}

          {/* Render dialog with content */}
          <DialogComponent
            {...restProps}
            isOpen={isOpen}
            onOpenChange={handleOpenChange}
          >
            {contentElements}
          </DialogComponent>
        </div>
      </DialogContext.Provider>
    );
  }

  // Original pattern - render as before
  return <DialogComponent {...props}>{children}</DialogComponent>;
};
