import * as React from "react";
import { cn } from "@/lib/utils";

interface AlertProps extends React.ComponentProps<"div"> {
  variant?: "default" | "destructive";
}

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(
  ({ className, variant = "default", ...props }, ref) => {
    return (
      <div
        ref={ref}
        role="alert"
        data-slot="alert"
        className={cn(
          "relative w-full rounded-lg border px-4 py-3 text-sm grid has-[>svg]:grid-cols-[calc(var(--spacing)*4)_1fr] grid-cols-[0_1fr] has-[>svg]:gap-x-3 gap-y-0.5 items-start [&>svg]:size-4 [&>svg]:translate-y-0.5 [&>svg]:text-current",
          variant === "default" && "bg-card text-card-foreground",
          variant === "destructive" &&
            "text-destructive bg-card [&>svg]:text-current *:data-[slot=alert-description]:text-destructive/90",
          className
        )}
        {...props}
      />
    );
  }
);
Alert.displayName = "Alert";

const AlertTitle = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="alert-title"
      className={cn(
        "col-start-2 line-clamp-2 min-h-4 font-medium tracking-tight",
        className
      )}
      {...props}
    />
  );
});
AlertTitle.displayName = "AlertTitle";

const AlertDescription = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="alert-description"
      className={cn(
        "text-muted-foreground col-start-2 grid justify-items-start gap-1 text-sm [&_p]:leading-relaxed",
        className
      )}
      {...props}
    />
  );
});
AlertDescription.displayName = "AlertDescription";

const AlertRoot = Alert as typeof Alert & {
  Title: typeof AlertTitle;
  Description: typeof AlertDescription;
};

AlertRoot.Title = AlertTitle;
AlertRoot.Description = AlertDescription;

export { AlertRoot as Alert, AlertTitle, AlertDescription };
export type { AlertProps };
