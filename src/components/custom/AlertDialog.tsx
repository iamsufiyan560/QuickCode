"use client";

import React from "react";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "./Button";

interface AlertDialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isControlled: boolean;
  titleId: string;
  descriptionId: string;
}

const AlertDialogContext = React.createContext<AlertDialogContextValue | null>(
  null
);

const useAlertDialog = () => {
  const context = React.useContext(AlertDialogContext);
  if (!context) {
    throw new Error("AlertDialog components must be used within AlertDialog");
  }
  return context;
};

export interface AlertDialogProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const AlertDialogRoot: React.FC<AlertDialogProps> = ({
  children,
  open: controlledOpen,
  defaultOpen = false,
  onOpenChange,
}) => {
  const [internalOpen, setInternalOpen] = React.useState(defaultOpen);
  const isControlled = controlledOpen !== undefined;
  const open = isControlled ? controlledOpen : internalOpen;
  const titleId = React.useId();
  const descriptionId = React.useId();

  const handleOpenChange = React.useCallback(
    (newOpen: boolean) => {
      if (!isControlled) {
        setInternalOpen(newOpen);
      }
      onOpenChange?.(newOpen);
    },
    [isControlled, onOpenChange]
  );

  React.useEffect(() => {
    if (open) {
      document.documentElement.style.overflow = "hidden";
    } else {
      document.documentElement.style.overflow = "";
    }
    return () => {
      document.documentElement.style.overflow = "";
    };
  }, [open]);

  return (
    <AlertDialogContext.Provider
      value={{
        open,
        onOpenChange: handleOpenChange,
        isControlled,
        titleId,
        descriptionId,
      }}
    >
      {children}
    </AlertDialogContext.Provider>
  );
};

export interface AlertDialogTriggerProps
  extends React.ComponentProps<"button"> {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
}

const AlertDialogTrigger: React.FC<AlertDialogTriggerProps> = ({
  children,
  asChild = false,
  className,
  ...props
}) => {
  const { onOpenChange } = useAlertDialog();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpenChange(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onOpenChange(true);
    }
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: (e: React.MouseEvent) => {
        handleClick(e);
        (children as React.ReactElement<any>).props.onClick?.(e);
      },
      onKeyDown: (e: React.KeyboardEvent) => {
        handleKeyDown(e);
        (children as React.ReactElement<any>).props.onKeyDown?.(e);
      },
      className: cn(
        (children as React.ReactElement<any>).props.className,
        className
      ),
    });
  }

  return (
    <button
      {...props}
      type="button"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      className={className}
    >
      {children}
    </button>
  );
};

export interface AlertDialogContentProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

const AlertDialogContent: React.FC<AlertDialogContentProps> = ({
  children,
  className,
  ...props
}) => {
  const { open, onOpenChange, titleId, descriptionId } = useAlertDialog();
  const contentRef = React.useRef<HTMLDivElement>(null);
  const previousFocusRef = React.useRef<HTMLElement | null>(null);
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  React.useEffect(() => {
    if (open) {
      previousFocusRef.current = document.activeElement as HTMLElement;

      const focusableElements =
        contentRef.current?.querySelectorAll<HTMLElement>(
          'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
        );

      if (focusableElements && focusableElements.length > 0) {
        focusableElements[0].focus();
      }
    }

    return () => {
      if (previousFocusRef.current) {
        previousFocusRef.current.focus();
      }
    };
  }, [open]);

  React.useEffect(() => {
    if (!open) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onOpenChange(false);
      }

      if (e.key === "Tab" && contentRef.current) {
        const focusableElements =
          contentRef.current.querySelectorAll<HTMLElement>(
            'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
          );

        const firstElement = focusableElements[0];
        const lastElement = focusableElements[focusableElements.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstElement) {
            e.preventDefault();
            lastElement?.focus();
          }
        } else {
          if (document.activeElement === lastElement) {
            e.preventDefault();
            firstElement?.focus();
          }
        }
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [open, onOpenChange]);

  if (!mounted) return null;

  const dialogContent = (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            className="fixed inset-0 z-50 bg-black/50"
            onClick={() => onOpenChange(false)}
          />
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              {...props}
              ref={contentRef}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ type: "spring", stiffness: 300, damping: 25 }}
              role="alertdialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
              className={cn(
                "relative w-full max-w-lg bg-background rounded-lg border border-border shadow-lg p-6 grid gap-4",
                className
              )}
              onClick={(e) => e.stopPropagation()}
            >
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(dialogContent, document.body);
};

export interface AlertDialogHeaderProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

const AlertDialogHeader: React.FC<AlertDialogHeaderProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn("flex flex-col gap-2 text-center sm:text-left", className)}
    >
      {children}
    </div>
  );
};

export interface AlertDialogFooterProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

const AlertDialogFooter: React.FC<AlertDialogFooterProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end",
        className
      )}
    >
      {children}
    </div>
  );
};

export interface AlertDialogTitleProps extends React.ComponentProps<"h2"> {
  children: React.ReactNode;
  className?: string;
}

const AlertDialogTitle: React.FC<AlertDialogTitleProps> = ({
  children,
  className,
  ...props
}) => {
  const { titleId } = useAlertDialog();

  return (
    <h2
      {...props}
      id={titleId}
      className={cn("text-lg font-semibold", className)}
    >
      {children}
    </h2>
  );
};

export interface AlertDialogDescriptionProps extends React.ComponentProps<"p"> {
  children: React.ReactNode;
  className?: string;
}

const AlertDialogDescription: React.FC<AlertDialogDescriptionProps> = ({
  children,
  className,
  ...props
}) => {
  const { descriptionId } = useAlertDialog();

  return (
    <p
      {...props}
      id={descriptionId}
      className={cn("text-sm text-muted-foreground", className)}
    >
      {children}
    </p>
  );
};

const AlertDialogAction: React.FC<ButtonProps> = ({ onClick, ...props }) => {
  const { onOpenChange, isControlled } = useAlertDialog();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      await onClick(e);
    }

    if (!e.defaultPrevented && !isControlled) {
      onOpenChange(false);
    }
  };

  return <Button size="sm" onClick={handleClick} {...props} />;
};

const AlertDialogCancel: React.FC<ButtonProps> = ({
  onClick,
  variant = "outline",
  ...props
}) => {
  const { onOpenChange } = useAlertDialog();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    onClick?.(e);
    onOpenChange(false);
  };

  return (
    <Button size="sm" variant={variant} onClick={handleClick} {...props} />
  );
};

type AlertDialogCompound = React.FC<AlertDialogProps> & {
  Trigger: typeof AlertDialogTrigger;
  Content: typeof AlertDialogContent;
  Header: typeof AlertDialogHeader;
  Footer: typeof AlertDialogFooter;
  Title: typeof AlertDialogTitle;
  Description: typeof AlertDialogDescription;
  Action: typeof AlertDialogAction;
  Cancel: typeof AlertDialogCancel;
};

export const AlertDialog = AlertDialogRoot as AlertDialogCompound;
AlertDialog.Trigger = AlertDialogTrigger;
AlertDialog.Content = AlertDialogContent;
AlertDialog.Header = AlertDialogHeader;
AlertDialog.Footer = AlertDialogFooter;
AlertDialog.Title = AlertDialogTitle;
AlertDialog.Description = AlertDialogDescription;
AlertDialog.Action = AlertDialogAction;
AlertDialog.Cancel = AlertDialogCancel;

export {
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
};
