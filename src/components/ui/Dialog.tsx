"use client";

import React from "react";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button, ButtonProps } from "@/components/ui/Button";

interface DialogContextValue {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  isControlled: boolean;
  titleId: string;
  descriptionId: string;
}

const DialogContext = React.createContext<DialogContextValue | null>(null);

const useDialog = () => {
  const context = React.useContext(DialogContext);
  if (!context) {
    throw new Error("Dialog components must be used within Dialog");
  }
  return context;
};

export interface DialogProps {
  children: React.ReactNode;
  open?: boolean;
  defaultOpen?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const DialogRoot: React.FC<DialogProps> = ({
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
    <DialogContext.Provider
      value={{
        open,
        onOpenChange: handleOpenChange,
        isControlled,
        titleId,
        descriptionId,
      }}
    >
      {children}
    </DialogContext.Provider>
  );
};

export interface DialogTriggerProps extends React.ComponentProps<"button"> {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
}

const DialogTrigger: React.FC<DialogTriggerProps> = ({
  children,
  asChild = false,
  className,
  ...props
}) => {
  const { onOpenChange } = useDialog();

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

export interface DialogContentProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  className?: string;
  showCloseButton?: boolean;
}

const DialogContent: React.FC<DialogContentProps> = ({
  children,
  className,
  showCloseButton = true,
  ...props
}) => {
  const { open, onOpenChange, titleId, descriptionId } = useDialog();
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
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              aria-describedby={descriptionId}
              className={cn(
                "relative w-full max-w-lg bg-background rounded-lg border border-border shadow-lg grid  p-6",
                className
              )}
              onClick={(e) => e.stopPropagation()}
            >
              {showCloseButton && (
                <Button
                  onClick={() => onOpenChange(false)}
                  size="icon"
                  variant="ghost"
                  className="absolute top-4 right-4 h-8 w-8 text-muted-foreground hover:text-foreground"
                  aria-label="Close dialog"
                >
                  <X className="w-4 h-4" />
                </Button>
              )}
              {children}
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );

  return createPortal(dialogContent, document.body);
};

export interface DialogHeaderProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

const DialogHeader: React.FC<DialogHeaderProps> = ({
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

export interface DialogFooterProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

const DialogFooter: React.FC<DialogFooterProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <div
      {...props}
      className={cn(
        "flex flex-col-reverse gap-2 sm:flex-row sm:justify-end sm:space-x-2",
        className
      )}
    >
      {children}
    </div>
  );
};

export interface DialogTitleProps extends React.ComponentProps<"h2"> {
  children: React.ReactNode;
  className?: string;
}

const DialogTitle: React.FC<DialogTitleProps> = ({
  children,
  className,
  ...props
}) => {
  const { titleId } = useDialog();

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

export interface DialogDescriptionProps extends React.ComponentProps<"p"> {
  children: React.ReactNode;
  className?: string;
}

const DialogDescription: React.FC<DialogDescriptionProps> = ({
  children,
  className,
  ...props
}) => {
  const { descriptionId } = useDialog();

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

export interface DialogCloseProps extends React.ComponentProps<"button"> {
  children: React.ReactNode;
  asChild?: boolean;
  className?: string;
}

const DialogClose: React.FC<DialogCloseProps> = ({
  children,
  asChild = false,
  className,
  ...props
}) => {
  const { onOpenChange } = useDialog();

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpenChange(false);
  };

  if (asChild && React.isValidElement(children)) {
    return React.cloneElement(children as React.ReactElement<any>, {
      onClick: (e: React.MouseEvent) => {
        handleClick(e);
        (children as React.ReactElement<any>).props.onClick?.(e);
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
      className={className}
    >
      {children}
    </button>
  );
};

const DialogAction: React.FC<ButtonProps> = ({ onClick, ...props }) => {
  const { onOpenChange, isControlled } = useDialog();

  const handleClick = async (e: React.MouseEvent<HTMLButtonElement>) => {
    if (onClick) {
      await onClick(e);
    }

    if (!e.defaultPrevented && !isControlled) {
      onOpenChange(false);
    }
  };

  return <Button onClick={handleClick} {...props} />;
};

type DialogCompound = React.FC<DialogProps> & {
  Trigger: typeof DialogTrigger;
  Content: typeof DialogContent;
  Header: typeof DialogHeader;
  Footer: typeof DialogFooter;
  Title: typeof DialogTitle;
  Description: typeof DialogDescription;
  Close: typeof DialogClose;
  Action: typeof DialogAction;
};

export const Dialog = DialogRoot as DialogCompound;
Dialog.Trigger = DialogTrigger;
Dialog.Content = DialogContent;
Dialog.Header = DialogHeader;
Dialog.Footer = DialogFooter;
Dialog.Title = DialogTitle;
Dialog.Description = DialogDescription;
Dialog.Close = DialogClose;
Dialog.Action = DialogAction;

export {
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogFooter,
  DialogTitle,
  DialogDescription,
  DialogClose,
  DialogAction,
};
