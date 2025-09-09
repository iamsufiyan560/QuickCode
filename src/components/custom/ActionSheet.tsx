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
  triggerButtonProps?: Omit<ButtonProps, "children">;
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
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
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

  return (
    <>
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
              className="fixed inset-0 z-50 bg-black/50 h-full"
              onClick={onClose}
            />

            {/* Action Sheet */}
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{
                type: "tween",
                duration: 0.25,
                ease: [0.25, 1, 0.5, 1],
              }}
              className="fixed inset-x-0 bottom-0 z-50 mx-auto max-w-lg"
            >
              <div
                className={`rounded-t-2xl border-t ${variantClasses[variant]} shadow-xl`}
              >
                {/* Header */}
                <div
                  className={`border-b border-border ${sizeClasses[size].padding}`}
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
                  className={`${sizeClasses[size].spacing} ${sizeClasses[size].padding}`}
                >
                  {actions.map((action, index) => (
                    <Button
                      key={index}
                      onClick={() => handleActionClick(action)}
                      disabled={action.disabled ?? false}
                      size="default" // always default, padding/text from sizeClasses
                      variant="ghost"
                      className={`w-full flex items-center space-x-3 text-left ${
                        sizeClasses[size].text
                      }  ${
                        action.disabled
                          ? "cursor-not-allowed opacity-50"
                          : action.variant === "destructive"
                          ? "text-destructive hover:bg-destructive/10"
                          : "text-foreground hover:bg-muted"
                      } `}
                    >
                      {action.icon && (
                        <div className="flex-shrink-0">{action.icon}</div>
                      )}
                      <span className="font-medium">{action.label}</span>
                    </Button>
                  ))}

                  {/* Cancel Button */}
                  <div className="pt-2 border-t border-border">
                    <Button
                      onClick={onClose}
                      size="default"
                      variant="ghost"
                      className={` inline-flex  w-full ${sizeClasses[size].text} font-medium items-center justify-center`}
                    >
                      {cancelLabel}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
};
