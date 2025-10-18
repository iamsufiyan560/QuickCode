"use client";

import React from "react";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import { Loader2, Check, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MorphButtonProps extends HTMLMotionProps<"button"> {
  state?: "idle" | "loading" | "success" | "error";
  onStateChange?: (state: "idle" | "loading" | "success" | "error") => void;
  idleText?: string;
  loadingText?: string;
  successText?: string;
  errorText?: string;
  idleIcon?: React.ComponentType<{ className?: string }>;
  loadingIcon?: React.ComponentType<{ className?: string }>;
  successIcon?: React.ComponentType<{ className?: string }>;
  errorIcon?: React.ComponentType<{ className?: string }>;
  autoCallSuccess?: boolean;

  onClick: () => void | Promise<void>;
  onSuccess: () => void | Promise<void>;
  onError: () => void | Promise<void>;
  autoReset?: boolean;
  resetDelay?: number;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
}

export const MorphButton: React.FC<MorphButtonProps> = ({
  state = "idle",
  onStateChange,
  idleText = "Submit",
  loadingText = "Processing",
  successText = "Success",
  errorText = "Error",
  idleIcon = Send,
  loadingIcon = Loader2,
  successIcon = Check,
  errorIcon = X,
  autoCallSuccess = true,

  onClick,
  onSuccess,
  onError,
  autoReset = false,
  resetDelay = 5000,
  disabled = false,
  className,
  children,
  ...props
}) => {
  const [internalState, setInternalState] = React.useState<
    "idle" | "loading" | "success" | "error"
  >(state);

  React.useEffect(() => {
    setInternalState(state);
  }, [state]);

  const getCurrentState = () => internalState;

  const updateState = (newState: "idle" | "loading" | "success" | "error") => {
    setInternalState(newState);
    onStateChange?.(newState);
  };

  const handleClick = async () => {
    if (disabled || getCurrentState() === "loading") return;

    const currentState = getCurrentState();

    // Handle idle state with onClick
    if (currentState === "idle") {
      updateState("loading");
      try {
        await onClick();
        updateState("success");

        if (autoCallSuccess) {
          try {
            await onSuccess();
          } catch (error) {
            updateState("error");
            if (autoReset) {
              setTimeout(() => {
                updateState("idle");
              }, resetDelay + 1000);
            }
          }
        } else if (autoReset) {
          setTimeout(() => {
            updateState("idle");
          }, resetDelay);
        }

        if (autoReset && !autoCallSuccess) {
          setTimeout(() => {
            updateState("idle");
          }, resetDelay);
        }
      } catch (error) {
        updateState("error");
        if (autoReset) {
          setTimeout(() => {
            updateState("idle");
          }, resetDelay + 1000);
        }
      }
      return;
    }

    if (currentState === "success") {
      updateState("loading");
      try {
        await onSuccess();
        updateState("success");
        if (autoReset) {
          setTimeout(() => {
            updateState("idle");
          }, resetDelay);
        }
      } catch (error) {
        updateState("error");
        if (autoReset) {
          setTimeout(() => {
            updateState("idle");
          }, resetDelay + 1000);
        }
      }
      return;
    }

    if (currentState === "error") {
      updateState("loading");
      try {
        await onError();
        updateState("success");
        if (autoReset) {
          setTimeout(() => {
            updateState("idle");
          }, resetDelay);
        }
      } catch (error) {
        updateState("error");
        if (autoReset) {
          setTimeout(() => {
            updateState("idle");
          }, resetDelay + 1000);
        }
      }
      return;
    }
  };

  const getStateConfig = () => {
    switch (getCurrentState()) {
      case "loading":
        return {
          text: loadingText,
          icon: loadingIcon,
          bgColor: "bg-muted",
          textColor: "text-muted-foreground",
          animate: { rotate: 360 },
        };
      case "success":
        return {
          text: successText,
          icon: successIcon,
          bgColor: "bg-green-500",
          textColor: "text-white",
          animate: { scale: [1, 1.2, 1] },
        };
      case "error":
        return {
          text: errorText,
          icon: errorIcon,
          bgColor: "bg-red-500",
          textColor: "text-white",
          animate: { x: [-2, 2, -2, 2, 0] },
        };
      default:
        return {
          text: children || idleText,
          icon: idleIcon,
          bgColor: "bg-primary",
          textColor: "text-primary-foreground",
          animate: {},
        };
    }
  };

  const stateConfig = getStateConfig();
  const IconComponent = stateConfig.icon;

  return (
    <motion.button
      {...props}
      className={cn(
        "relative inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ease-in-out overflow-hidden w-auto",
        stateConfig.bgColor,
        stateConfig.textColor,
        disabled && "opacity-50 cursor-not-allowed",
        !disabled && "cursor-pointer",
        "hover:shadow-lg active:scale-95",
        className
      )}
      onClick={handleClick}
      disabled={disabled || getCurrentState() === "loading"}
      layout
      transition={{
        layout: { duration: 0.3, ease: "easeInOut" },
        backgroundColor: { duration: 0.3 },
        color: { duration: 0.3 },
      }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <AnimatePresence mode="wait">
        <motion.div
          key={getCurrentState()}
          className="flex items-center gap-2 relative z-10"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.2 }}
        >
          <motion.div
            animate={stateConfig.animate}
            transition={{
              duration: getCurrentState() === "loading" ? 1 : 0.3,
              repeat: getCurrentState() === "loading" ? Infinity : 0,
              ease: getCurrentState() === "loading" ? "linear" : "easeInOut",
            }}
          >
            <IconComponent className="w-4 h-4" />
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.span
              key={`${getCurrentState()}-text`}
              initial={{ opacity: 0, filter: "blur(4px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              exit={{ opacity: 0, filter: "blur(4px)" }}
              transition={{ duration: 0.2 }}
              className="whitespace-nowrap"
            >
              {typeof stateConfig.text === "string"
                ? stateConfig.text
                : stateConfig.text}
            </motion.span>
          </AnimatePresence>
        </motion.div>
      </AnimatePresence>

      <motion.div
        className="absolute inset-0 rounded-lg -z-10"
        style={{
          background:
            getCurrentState() === "success"
              ? "linear-gradient(45deg, #10b981, #059669)"
              : getCurrentState() === "error"
              ? "linear-gradient(45deg, #ef4444, #dc2626)"
              : undefined,
        }}
        initial={{ scale: 0, opacity: 0 }}
        animate={{
          scale:
            getCurrentState() !== "idle" && getCurrentState() !== "loading"
              ? 1
              : 0,
          opacity:
            getCurrentState() !== "idle" && getCurrentState() !== "loading"
              ? 1
              : 0,
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      />

      {getCurrentState() === "success" && (
        <motion.div
          className="absolute inset-0 rounded-lg border-2 border-green-400"
          initial={{ scale: 1, opacity: 0.8 }}
          animate={{ scale: 1.5, opacity: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        />
      )}
    </motion.button>
  );
};
