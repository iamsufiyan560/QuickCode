"use client";

import React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StepperStep {
  id: string;
  title: string;
  description?: string;
}

export interface StepperProps extends React.ComponentProps<"div"> {
  steps: StepperStep[];
  currentStep: number;
  className?: string;
  showLabels?: boolean;
  size?: "sm" | "md" | "lg";
  vertical?: boolean;
}

export const Stepper: React.FC<StepperProps> = ({
  steps,
  currentStep,
  className,
  showLabels = true,
  size = "md",
  vertical = false,
  ...props
}) => {
  const sizeConfig = {
    sm: { circle: "w-6 h-6 text-xs", title: "text-xs", description: "text-xs" },
    md: { circle: "w-8 h-8 text-sm", title: "text-sm", description: "text-xs" },
    lg: {
      circle: "w-10 h-10 text-base",
      title: "text-base",
      description: "text-sm",
    },
  };

  const config = sizeConfig[size];

  if (vertical) {
    return (
      <div className={cn("w-full", className)}>
        <div className="relative">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="flex items-start space-x-4  last:pb-0"
            >
              <div className="relative flex flex-col items-center">
                <div
                  className={cn(
                    "flex items-center justify-center rounded-full border-2 font-medium transition-all duration-200 bg-background relative z-10",
                    config.circle,
                    index < currentStep
                      ? "bg-primary border-primary text-primary-foreground shadow-sm"
                      : index === currentStep
                      ? "border-primary text-primary bg-background shadow-sm scale-105"
                      : "border-muted text-muted-foreground bg-background"
                  )}
                >
                  {index < currentStep ? (
                    <Check
                      className={
                        size === "sm"
                          ? "w-3 h-3"
                          : size === "lg"
                          ? "w-5 h-5"
                          : "w-4 h-4"
                      }
                    />
                  ) : (
                    index + 1
                  )}
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={cn(
                      "w-0.5 h-16 mt-2 transition-colors duration-300",
                      index < currentStep ? "bg-primary" : "bg-border"
                    )}
                  />
                )}
              </div>
              {showLabels && (
                <div className="flex-1 min-w-0 pt-1">
                  <h3
                    className={cn(
                      "font-medium leading-tight",
                      config.title,
                      index <= currentStep
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                  >
                    {step.title}
                  </h3>
                  {step.description && (
                    <p
                      className={cn(
                        "text-muted-foreground leading-tight mt-1",
                        config.description
                      )}
                    >
                      {step.description}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div {...props} className={cn("w-full", className)}>
      <div className="hidden md:block">
        <div className="flex items-start justify-between w-full flex-wrap gap-4">
          {steps.map((step, index) => (
            <div
              key={step.id}
              className="flex flex-col items-center relative flex-1 min-w-[120px]"
            >
              {index > 0 && (
                <div className="absolute top-4 right-1/2 w-full h-0.5 z-[9]">
                  <div
                    className={cn(
                      "h-full transition-colors duration-300",
                      index - 1 < currentStep ? "bg-primary" : "bg-border"
                    )}
                  />
                </div>
              )}

              <div
                className={cn(
                  "flex items-center justify-center rounded-full border-2 font-medium transition-all duration-200 bg-background relative z-10",
                  config.circle,
                  index < currentStep
                    ? "bg-primary border-primary text-primary-foreground shadow-sm"
                    : index === currentStep
                    ? "border-primary text-primary bg-background shadow-sm scale-105"
                    : "border-muted text-muted-foreground bg-background"
                )}
              >
                {index < currentStep ? (
                  <Check
                    className={
                      size === "sm"
                        ? "w-3 h-3"
                        : size === "lg"
                        ? "w-5 h-5"
                        : "w-4 h-4"
                    }
                  />
                ) : (
                  index + 1
                )}
              </div>

              {showLabels && (
                <div className="text-center space-y-1 mt-3 max-w-[120px]">
                  <h3
                    className={cn(
                      "font-medium leading-tight",
                      config.title,
                      index <= currentStep
                        ? "text-foreground"
                        : "text-muted-foreground"
                    )}
                    title={step.title}
                  >
                    {step.title}
                  </h3>
                  {step.description && (
                    <p
                      className={cn(
                        "text-muted-foreground leading-tight line-clamp-2",
                        config.description
                      )}
                      title={step.description}
                    >
                      {step.description}
                    </p>
                  )}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="md:hidden">
        <div className="flex items-center justify-center flex-wrap gap-2">
          {steps.map((step, index) => (
            <React.Fragment key={step.id}>
              <div
                className={cn(
                  "flex items-center justify-center rounded-full border-2 font-medium transition-all duration-200",
                  config.circle,
                  index < currentStep
                    ? "bg-primary border-primary text-primary-foreground shadow-sm"
                    : index === currentStep
                    ? "border-primary text-primary bg-background shadow-sm scale-105"
                    : "border-muted text-muted-foreground bg-background"
                )}
              >
                {index < currentStep ? (
                  <Check
                    className={
                      size === "sm"
                        ? "w-3 h-3"
                        : size === "lg"
                        ? "w-5 h-5"
                        : "w-4 h-4"
                    }
                  />
                ) : (
                  index + 1
                )}
              </div>

              {index < steps.length - 1 && (
                <div
                  className={cn(
                    "w-4 h-0.5 transition-colors duration-200",
                    index < currentStep ? "bg-primary" : "bg-muted"
                  )}
                />
              )}
            </React.Fragment>
          ))}
        </div>

        {showLabels && (
          <div className="text-center mt-4 space-y-1">
            <h3 className={cn("font-medium", config.title, "text-foreground")}>
              {steps[currentStep]?.title}
            </h3>
            {steps[currentStep]?.description && (
              <p className={cn("text-muted-foreground", config.description)}>
                {steps[currentStep].description}
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
