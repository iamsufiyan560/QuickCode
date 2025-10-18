"use client";

import React, { createContext, useContext, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button, ButtonProps } from "./Button";
import { cn } from "@/lib/utils";

interface ActionSheetContextValue {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  onClose: () => void;
  position: "bottom" | "top" | "left" | "right";
  variant: "default" | "filled" | "bordered";
  size: "sm" | "md" | "lg";
}

const ActionSheetContext = createContext<ActionSheetContextValue | undefined>(
  undefined
);

function useActionSheet() {
  const context = useContext(ActionSheetContext);
  if (!context) {
    throw new Error("ActionSheet components must be used within ActionSheet");
  }
  return context;
}

interface ActionSheetProps {
  children: React.ReactNode;
  position?: "bottom" | "top" | "left" | "right";
  variant?: "default" | "filled" | "bordered";
  size?: "sm" | "md" | "lg";
  className?: string;
}

function ActionSheetProvider({
  children,
  position = "bottom",
  variant = "default",
  size = "md",
  className,
}: ActionSheetProps) {
  const [isOpen, setIsOpen] = useState(false);
  const onClose = () => setIsOpen(false);

  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape" && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.documentElement.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.documentElement.style.overflow = "";
    };
  }, [isOpen]);

  const getMotionProps = () => {
    switch (position) {
      case "top":
        return {
          initial: { y: "-100%" },
          animate: { y: 0 },
          exit: { y: "-100%" },
          className: "fixed inset-x-0 top-0 z-50 mx-auto max-w-lg",
        };
      case "left":
        return {
          initial: { x: "-100%" },
          animate: { x: 0 },
          exit: { x: "-100%" },
          className: "fixed inset-y-0 left-0 z-50 h-full w-80 max-w-[90%]",
        };
      case "right":
        return {
          initial: { x: "100%" },
          animate: { x: 0 },
          exit: { x: "100%" },
          className: "fixed inset-y-0 right-0 z-50 h-full w-80 max-w-[90%]",
        };
      default:
        return {
          initial: { y: "100%" },
          animate: { y: 0 },
          exit: { y: "100%" },
          className: "fixed inset-x-0 bottom-0 z-50 mx-auto max-w-lg",
        };
    }
  };

  const variantClasses = {
    default: "bg-background border-border",
    filled: "bg-muted border-border",
    bordered: "bg-background border-2 border-border",
  };

  const motionProps = getMotionProps();

  let headerContent = null;
  let mainContent = null;
  let footerContent = null;
  let triggerContent = null;

  React.Children.forEach(children, (child) => {
    if (React.isValidElement(child)) {
      const childType =
        (child.type as any).displayName || (child.type as any).name;

      if (childType === "ActionSheetTrigger") {
        triggerContent = child;
      } else if (childType === "ActionSheetHeader") {
        headerContent = child;
      } else if (childType === "ActionSheetContent") {
        mainContent = child;
      } else if (childType === "ActionSheetFooter") {
        footerContent = child;
      }
    }
  });

  return (
    <ActionSheetContext.Provider
      value={{ isOpen, setIsOpen, onClose, position, variant, size }}
    >
      {triggerContent}
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-40 bg-black/50"
              onClick={onClose}
            />

            <motion.div
              initial={motionProps.initial}
              animate={motionProps.animate}
              exit={motionProps.exit}
              transition={{
                type: "tween",
                duration: 0.25,
                ease: [0.25, 1, 0.5, 1],
              }}
              className={cn(motionProps.className, className)}
            >
              <div
                className={cn(
                  "shadow-xl flex flex-col",
                  position === "bottom"
                    ? "rounded-t-2xl border-t"
                    : position === "top"
                    ? "rounded-b-2xl border-b"
                    : "h-full border-l",
                  variantClasses[variant],
                  position === "left"
                    ? "border border-r-border"
                    : "border border-l-border"
                )}
                style={{
                  maxHeight:
                    position === "bottom" || position === "top"
                      ? "24rem"
                      : "100%",
                }}
              >
                {headerContent}
                {mainContent}
                {footerContent}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </ActionSheetContext.Provider>
  );
}

interface ActionSheetTriggerProps extends ButtonProps {
  children: React.ReactNode;
  className?: string;
}

function ActionSheetTrigger({
  children,
  className,
  ...props
}: ActionSheetTriggerProps) {
  const { setIsOpen } = useActionSheet();

  return (
    <Button {...props} onClick={() => setIsOpen(true)} className={className}>
      {children}
    </Button>
  );
}
ActionSheetTrigger.displayName = "ActionSheetTrigger";

interface ActionSheetHeaderProps extends ButtonProps {
  children: React.ReactNode;
  showCloseButton?: boolean;
  className?: string;
}

function ActionSheetHeader({
  children,
  showCloseButton = true,
  className,
  ...props
}: ActionSheetHeaderProps) {
  const { onClose, size } = useActionSheet();

  const sizeClasses = {
    sm: "px-4 py-3",
    md: "px-6 py-4",
    lg: "px-8 py-5",
  };

  return (
    <div
      className={cn(
        "border-b border-border flex-shrink-0",
        sizeClasses[size],
        className
      )}
    >
      <div className="flex items-center justify-between">
        <div className="flex-1">{children}</div>
        {showCloseButton && (
          <Button
            {...props}
            onClick={onClose}
            size="icon"
            variant="ghost"
            className="ml-4"
          >
            <X className="w-5 h-5" />
          </Button>
        )}
      </div>
    </div>
  );
}
ActionSheetHeader.displayName = "ActionSheetHeader";

interface ActionSheetTitleProps extends React.ComponentProps<"h3"> {
  children: React.ReactNode;
  className?: string;
}

function ActionSheetTitle({
  children,
  className,
  ...props
}: ActionSheetTitleProps) {
  const { size } = useActionSheet();

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  return (
    <h3
      {...props}
      className={cn(
        "font-semibold text-foreground",
        sizeClasses[size],
        className
      )}
    >
      {children}
    </h3>
  );
}

interface ActionSheetDescriptionProps extends React.ComponentProps<"p"> {
  children: React.ReactNode;
  className?: string;
}

function ActionSheetDescription({
  children,
  className,
  ...props
}: ActionSheetDescriptionProps) {
  return (
    <p
      {...props}
      className={cn("mt-1 text-sm text-muted-foreground", className)}
    >
      {children}
    </p>
  );
}

interface ActionSheetContentProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
  showScroll?: boolean;
  className?: string;
}

function ActionSheetContent({
  children,
  showScroll = true,
  className,
  ...props
}: ActionSheetContentProps) {
  const { variant } = useActionSheet();

  const scrollClasses = showScroll
    ? `[&::-webkit-scrollbar]:w-[8px] [&::-webkit-scrollbar-track]:${
        variant === "filled" ? "bg-muted" : "bg-background"
      } [&::-webkit-scrollbar-thumb]:bg-gray-400/50 [&::-webkit-scrollbar-thumb]:rounded-[4px]`
    : "[&::-webkit-scrollbar]:hidden";

  return (
    <div
      {...props}
      className={cn(
        "flex-1 overflow-y-auto px-6 py-4",
        scrollClasses,
        className
      )}
    >
      {children}
    </div>
  );
}
ActionSheetContent.displayName = "ActionSheetContent";

export interface ActionSheetAction {
  label: string;
  onClick: () => void;
  variant?: "default" | "destructive";
  disabled?: boolean;
  icon?: React.ReactNode;
}

interface ActionSheetActionsProps extends React.ComponentProps<"div"> {
  actions: ActionSheetAction[];
  className?: string;
}

function ActionSheetActions({
  actions,
  className,
  ...props
}: ActionSheetActionsProps) {
  const { onClose, size, variant } = useActionSheet();

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  const handleActionClick = (action: ActionSheetAction) => {
    if (!action.disabled) {
      action.onClick();
      onClose();
    }
  };

  return (
    <div {...props} className={cn("space-y-2", className)}>
      {actions.map((action, index) => (
        <Button
          key={index}
          onClick={() => handleActionClick(action)}
          disabled={action.disabled ?? false}
          size="default"
          variant="ghost"
          className={cn(
            "w-full flex items-center justify-start space-x-3 text-left",
            sizeClasses[size],
            action.disabled
              ? "cursor-not-allowed opacity-50"
              : action.variant === "destructive"
              ? "text-destructive hover:bg-destructive/10"
              : variant === "filled"
              ? "text-foreground hover:bg-secondary"
              : "text-foreground hover:bg-muted"
          )}
        >
          {action.icon && <div className="flex-shrink-0">{action.icon}</div>}
          <span className="font-medium">{action.label}</span>
        </Button>
      ))}
    </div>
  );
}

interface ActionSheetFooterProps
  extends Omit<React.ComponentProps<typeof Button>, "children"> {
  children?: React.ReactNode;
  cancelLabel?: string;
  className?: string;
}

function ActionSheetFooter({
  children,
  cancelLabel = "Cancel",
  className,
  ...props
}: ActionSheetFooterProps) {
  const { onClose, position, size } = useActionSheet();

  const sizeClasses = {
    sm: "text-sm",
    md: "text-base",
    lg: "text-lg",
  };

  if (!children && (position === "left" || position === "right")) {
    return null;
  }

  return (
    <div
      className={cn(
        "border-t border-border py-2 px-4 flex-shrink-0",
        className
      )}
    >
      {children || (
        <Button
          {...props}
          onClick={onClose}
          size="default"
          variant="ghost"
          className={cn(
            "inline-flex w-full font-medium items-center justify-center py-4",
            sizeClasses[size]
          )}
        >
          {cancelLabel}
        </Button>
      )}
    </div>
  );
}
ActionSheetFooter.displayName = "ActionSheetFooter";

interface ActionSheetComposition {
  Trigger: typeof ActionSheetTrigger;
  Header: typeof ActionSheetHeader;
  Title: typeof ActionSheetTitle;
  Description: typeof ActionSheetDescription;
  Content: typeof ActionSheetContent;
  Actions: typeof ActionSheetActions;
  Footer: typeof ActionSheetFooter;
}

const ActionSheet = ActionSheetProvider as React.FC<ActionSheetProps> &
  ActionSheetComposition;

ActionSheet.Trigger = ActionSheetTrigger;
ActionSheet.Header = ActionSheetHeader;
ActionSheet.Title = ActionSheetTitle;
ActionSheet.Description = ActionSheetDescription;
ActionSheet.Content = ActionSheetContent;
ActionSheet.Actions = ActionSheetActions;
ActionSheet.Footer = ActionSheetFooter;

export { ActionSheet };
