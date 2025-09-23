import {
  ToastContext,
  ToastPosition,
  ToastType,
} from "@/components/custom/Toast";
import { useContext } from "react";

interface ShowToastOptions {
  title: string;
  description?: string;
  duration?: number;
  showCloseButton?: boolean;
  icon?: React.ComponentType<{ className?: string }>;
  className?: string;
  position?: ToastPosition;
}

interface ToastHelpers {
  show: (options: ShowToastOptions & { type: ToastType }) => string;
  success: (options: ShowToastOptions) => string;
  error: (options: ShowToastOptions) => string;
  warning: (options: ShowToastOptions) => string;
  info: (options: ShowToastOptions) => string;
  dismiss: (id: string) => void;
  dismissAll: () => void;
}

export function useToast(): ToastHelpers {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  const { show: contextShow, dismiss, dismissAll } = context;

  const show = (options: ShowToastOptions & { type: ToastType }) => {
    return contextShow(options);
  };

  const success = (options: ShowToastOptions) => {
    return contextShow({ ...options, type: "success" });
  };

  const error = (options: ShowToastOptions) => {
    return contextShow({ ...options, type: "error" });
  };

  const warning = (options: ShowToastOptions) => {
    return contextShow({ ...options, type: "warning" });
  };

  const info = (options: ShowToastOptions) => {
    return contextShow({ ...options, type: "info" });
  };

  return {
    show,
    success,
    error,
    warning,
    info,
    dismiss,
    dismissAll,
  };
}
