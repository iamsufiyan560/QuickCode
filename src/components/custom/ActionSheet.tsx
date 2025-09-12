"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";
import { Button, ButtonProps } from "./Button";

export interface ActionSheetAction {
  label: string;
  onClick: () => void;
  variant?: "default" | "destructive";
  disabled?: boolean;
  icon?: React.ReactNode;
}

export interface ActionSheetProps {
  isOpen: boolean;
  onClose: () => void;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  title?: string;
  description?: string;
  actions: ActionSheetAction[];
  variant?: "default" | "filled" | "bordered";
  size?: "sm" | "md" | "lg";
  showCloseButton?: boolean;
  cancelLabel?: string;
  triggerButtonLabel?: string;
  triggerButtonProps?: Omit<ButtonProps, "size"> & {
    size?: "default" | "sm" | "md" | "lg";
  };
  position?: "bottom" | "top" | "left" | "right"; // NEW
  showScroll?: boolean;
}

export const ActionSheet: React.FC<ActionSheetProps> = ({
  isOpen,
  onClose,
  setIsOpen,
  title = "Choose an action",
  description = "Select one of the options below to continue.",
  actions,
  variant = "default",
  size = "md",
  showCloseButton = true,
  cancelLabel = "Cancel",
  triggerButtonLabel = "Show Actions",
  triggerButtonProps = {},
  position = "bottom",
  showScroll = true,
}) => {
  const sizeClasses = {
    sm: { text: "text-sm", padding: "px-4 py-3", spacing: "space-y-1" },
    md: { text: "text-base", padding: "px-6 py-4", spacing: "space-y-2" },
    lg: { text: "text-lg", padding: "px-8 py-5", spacing: "space-y-3" },
  };

  const variantClasses = {
    default: "bg-background border-border",
    filled: "bg-muted border-border",
    bordered: "bg-background border-2 border-border",
  };

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
  }, [isOpen, onClose]);

  const handleActionClick = (action: ActionSheetAction) => {
    if (!action.disabled) {
      action.onClick();
      onClose();
    }
  };

  const handleOpen = () => {
    setIsOpen(true);
  };

  // 🟢 Motion variants by position
  const getMotionProps = () => {
    switch (position) {
      case "top":
        return {
          initial: { y: "-100%" },
          animate: { y: 0 },
          exit: { y: "-100%" },
          className: "fixed  inset-x-0 top-0 z-50 mx-auto max-w-lg",
        };
      case "left":
        return {
          initial: { x: "-100%" },
          animate: { x: 0 },
          exit: { x: "-100%" },
          className: "fixed  inset-y-0 left-0 z-[50] h-full w-80 max-w-[90%]",
        };
      case "right":
        return {
          initial: { x: "100%" },
          animate: { x: 0 },
          exit: { x: "100%" },
          className: "fixed inset-y-0 right-0 z-50 h-full w-80 max-w-[90%]",
        };
      default: // bottom
        return {
          initial: { y: "100%" },
          animate: { y: 0 },
          exit: { y: "100%" },
          className: "fixed  inset-x-0 bottom-0 z-50 mx-auto max-w-lg",
        };
    }
  };

  const motionProps = getMotionProps();

  return (
    <div>
      {/* Trigger Button */}
      <Button onClick={handleOpen} {...triggerButtonProps}>
        {triggerButtonLabel}
      </Button>
      <AnimatePresence mode="wait">
        {isOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed  inset-0 z-40 bg-black/50 h-full"
              onClick={onClose}
            />

            {/* Action Sheet */}
            <motion.div
              initial={motionProps.initial}
              animate={motionProps.animate}
              exit={motionProps.exit}
              transition={{
                type: "tween",
                duration: 0.25,
                ease: [0.25, 1, 0.5, 1],
              }}
              className={motionProps.className}
            >
              <div
                className={`${
                  position === "bottom"
                    ? "rounded-t-2xl border-t"
                    : position === "top"
                    ? "rounded-b-2xl border-b"
                    : "h-full border-l"
                } ${variantClasses[variant]} shadow-xl flex flex-col  ${
                  position === "left"
                    ? "border border-r-border"
                    : "border border-l-border"
                } `}
                style={{
                  maxHeight:
                    position === "bottom" || position === "top"
                      ? "24rem"
                      : "100%", // max-h-96 = 24rem
                }}
              >
                {/* Header */}
                <div
                  className={`border-b border-border ${sizeClasses[size].padding} flex-shrink-0`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h3
                        className={`font-semibold text-foreground ${sizeClasses[size].text}`}
                      >
                        {title}
                      </h3>
                      {description && (
                        <p className="mt-1 text-sm text-muted-foreground">
                          {description}
                        </p>
                      )}
                    </div>

                    {showCloseButton && (
                      <Button onClick={onClose} size="icon" variant="ghost">
                        <X className="w-5 h-5" />
                      </Button>
                    )}
                  </div>
                </div>

                <div
                  className={`flex-1 overflow-y-auto px-6 py-4 space-y-2 ${
                    showScroll
                      ? `[&::-webkit-scrollbar]:w-[8px] [&::-webkit-scrollbar-track]:${
                          variant === "filled"
                            ? "bg-muted"
                            : variant === "bordered"
                            ? "bg-background"
                            : "bg-background"
                        } [&::-webkit-scrollbar-thumb]:bg-gray-400/50 [&::-webkit-scrollbar-thumb]:rounded-[4px]`
                      : "[&::-webkit-scrollbar]:hidden"
                  }`}
                >
                  {actions.map((action, index) => (
                    <Button
                      key={index}
                      onClick={() => handleActionClick(action)}
                      disabled={action.disabled ?? false}
                      size="default"
                      variant="ghost"
                      className={`w-full flex items-center justify-start space-x-3 text-left ${
                        sizeClasses[size].text
                      }  ${
                        action.disabled
                          ? "cursor-not-allowed opacity-50"
                          : action.variant === "destructive"
                          ? "text-destructive hover:bg-destructive/10"
                          : variant === "filled"
                          ? "text-foreground hover:bg-secondary"
                          : "text-foreground hover:bg-muted"
                      } `}
                    >
                      {action.icon && (
                        <div className="flex-shrink-0">{action.icon}</div>
                      )}
                      <span className="font-medium">{action.label}</span>
                    </Button>
                  ))}
                </div>

                {(position === "bottom" || position === "top") && (
                  <div className="border-t border-border py-2 flex-shrink-0">
                    <Button
                      onClick={onClose}
                      size="default"
                      variant="ghost"
                      className={`inline-flex w-full ${sizeClasses[size].text} font-medium items-center justify-center py-4`}
                    >
                      {cancelLabel}
                    </Button>
                  </div>
                )}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};
