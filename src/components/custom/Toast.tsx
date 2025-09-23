import React, { createContext, useContext, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { X, CheckCircle, AlertCircle, AlertTriangle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

export type ToastType = "success" | "error" | "warning" | "info";
export type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right";

export interface ToastConfig {
  success?: {
    icon?: React.ComponentType<{ className?: string }>;
    className?: string;
  };
  error?: {
    icon?: React.ComponentType<{ className?: string }>;
    className?: string;
  };
  warning?: {
    icon?: React.ComponentType<{ className?: string }>;
    className?: string;
  };
  info?: {
    icon?: React.ComponentType<{ className?: string }>;
    className?: string;
  };
}

export interface ToastData {
  id: string;
  type: ToastType;
  title: string;
  description?: string;
  duration?: number;
  showCloseButton?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
  position?: ToastPosition;
}

interface ToastContextValue {
  toasts: ToastData[];
  show: (toast: Omit<ToastData, "id">) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

export const ToastContext = createContext<ToastContextValue | null>(null);

const defaultIcons = {
  success: CheckCircle,
  error: AlertCircle,
  warning: AlertTriangle,
  info: Info,
};

const defaultStyles = {
  success:
    "bg-toast-success border-toast-success-border text-toast-success-text",
  error: "bg-toast-error border-toast-error-border text-toast-error-text",
  warning:
    "bg-toast-warning border-toast-warning-border text-toast-warning-text",
  info: "bg-toast-info border-toast-info-border text-toast-info-text",
};

const positionStyles = {
  "top-left": "top-4 left-4",
  "top-center": "top-4 left-1/2 -translate-x-1/2",
  "top-right": "top-4 right-4",
  "bottom-left": "bottom-4 left-4",
  "bottom-center": "bottom-4 left-1/2 -translate-x-1/2",
  "bottom-right": "bottom-4 right-4",
};

const animationClasses = {
  "top-left": "animate-in slide-in-from-left-full",
  "top-center": "animate-in slide-in-from-top-full",
  "top-right": "animate-in slide-in-from-right-full",
  "bottom-left": "animate-in slide-in-from-left-full",
  "bottom-center": "animate-in slide-in-from-bottom-full",
  "bottom-right": "animate-in slide-in-from-right-full",
};

interface ToastProviderProps {
  children: React.ReactNode;
  position?: ToastPosition;
  config?: ToastConfig;
  maxToasts?: number;
}

export function ToastProvider({
  children,
  position = "top-right",
  config = {},
  maxToasts = 10,
}: ToastProviderProps) {
  const [toasts, setToasts] = useState<ToastData[]>([]);

  const show = useCallback(
    (toast: Omit<ToastData, "id">) => {
      const id = Math.random().toString(36).substring(2, 15);
      const toastWithId = {
        ...toast,
        id,
        duration: toast.duration ?? 4000,
        showCloseButton: toast.showCloseButton ?? true,
        position: toast.position ?? position,
      };

      setToasts((prev) => {
        const newToasts = [toastWithId, ...prev];
        return newToasts.slice(0, maxToasts);
      });

      if (toastWithId.duration > 0) {
        setTimeout(() => {
          dismiss(id);
        }, toastWithId.duration);
      }

      return id;
    },
    [maxToasts, position]
  );

  const dismiss = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const dismissAll = useCallback(() => {
    setToasts([]);
  }, []);

  const value: ToastContextValue = {
    toasts,
    show,
    dismiss,
    dismissAll,
  };

  const toastsByPosition = toasts.reduce((acc, toast) => {
    const pos = toast.position || position;
    if (!acc[pos]) acc[pos] = [];
    acc[pos].push(toast);
    return acc;
  }, {} as Record<ToastPosition, ToastData[]>);

  return (
    <ToastContext.Provider value={value}>
      {children}
      {typeof document !== "undefined" &&
        Object.entries(toastsByPosition).map(([pos, positionToasts]) =>
          createPortal(
            <div
              key={pos}
              className={cn(
                "fixed z-50 pointer-events-none",
                positionStyles[pos as ToastPosition]
              )}
            >
              <div className="flex flex-col gap-2 w-80 max-w-[calc(100vw-2rem)]">
                {positionToasts.map((toast, index) => (
                  <ToastItem
                    index={index}
                    key={toast.id}
                    toast={toast}
                    onDismiss={() => dismiss(toast.id)}
                    position={pos as ToastPosition}
                    config={config}
                    style={{
                      zIndex: positionToasts.length - index,
                    }}
                  />
                ))}
              </div>
            </div>,
            document.body
          )
        )}
    </ToastContext.Provider>
  );
}

interface ToastItemProps {
  toast: ToastData;
  onDismiss: () => void;
  position: ToastPosition;
  config: ToastConfig;
  style?: React.CSSProperties;
  index?: Number;
}

function ToastItem({
  toast,
  onDismiss,
  position,
  config,
  style,
  index,
}: ToastItemProps) {
  const typeConfig = config[toast.type] || {};
  const Icon = toast.icon || typeConfig.icon || defaultIcons[toast.type];

  const toastClassName =
    toast.className || typeConfig.className || defaultStyles[toast.type];

  return (
    <div
      className={cn(
        "pointer-events-auto relative flex items-start gap-3 p-4 rounded-md border shadow-lg transition-all duration-200 hover:shadow-xl",
        toastClassName,
        index === 0 && animationClasses[position]
      )}
      style={style}
      role="alert"
      aria-live="assertive"
    >
      <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />

      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm">{toast.title}</div>
        {toast.description && (
          <div className="text-sm opacity-90 mt-1">{toast.description}</div>
        )}
      </div>

      {toast.showCloseButton && (
        <button
          onClick={onDismiss}
          className="flex-shrink-0 p-1 rounded-sm hover:bg-black/10 transition-colors cursor-pointer"
          aria-label="Close notification"
        >
          <X className="w-4 h-4" />
        </button>
      )}
    </div>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
}
