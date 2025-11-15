"use client";

import React, { createContext, useContext, forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/Label";

interface FormContextValue {
  errors?: Record<string, { message?: string }>;
}

const FormContext = createContext<FormContextValue | undefined>(undefined);

const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error("Form compound components must be used within Form");
  }
  return context;
};

interface FormFieldContextValue {
  name: string;
  error?: boolean;
}

const FormFieldContext = createContext<FormFieldContextValue | undefined>(
  undefined
);

const useFormField = () => {
  const context = useContext(FormFieldContext);
  if (!context) {
    throw new Error(
      "Form.Label, Form.Control, Form.Message must be used within Form.Field"
    );
  }
  return context;
};

export interface FormProps extends React.FormHTMLAttributes<HTMLFormElement> {
  errors?: Record<string, { message?: string }>;
}

const FormRoot = forwardRef<HTMLFormElement, FormProps>(
  ({ children, errors, className, ...props }, ref) => {
    return (
      <FormContext.Provider value={{ errors }}>
        <form ref={ref} className={cn("space-y-6", className)} {...props}>
          {children}
        </form>
      </FormContext.Provider>
    );
  }
);
FormRoot.displayName = "Form";

export interface FormFieldProps extends React.HTMLAttributes<HTMLDivElement> {
  name: string;
}

const FormField = forwardRef<HTMLDivElement, FormFieldProps>(
  ({ children, className, name, ...props }, ref) => {
    const { errors } = useFormContext();
    const hasError = !!errors?.[name]?.message;

    return (
      <FormFieldContext.Provider value={{ name, error: hasError }}>
        <div ref={ref} className={cn("space-y-2", className)} {...props}>
          {children}
        </div>
      </FormFieldContext.Provider>
    );
  }
);
FormField.displayName = "FormField";

export interface FormLabelProps
  extends React.ComponentPropsWithoutRef<typeof Label> {}

const FormLabel: React.FC<FormLabelProps> = ({ className, ...props }) => {
  const { error } = useFormField();

  return (
    <Label className={cn(error && "text-destructive", className)} {...props} />
  );
};
FormLabel.displayName = "FormLabel";

export interface FormControlProps
  extends React.HTMLAttributes<HTMLDivElement> {}

const FormControl = forwardRef<HTMLDivElement, FormControlProps>(
  ({ children, className, ...props }, ref) => {
    const { error } = useFormField();

    return (
      <div ref={ref} className={className} {...props}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              "aria-invalid": error || undefined,
            } as React.Attributes);
          }
          return child;
        })}
      </div>
    );
  }
);
FormControl.displayName = "FormControl";

export interface FormDescriptionProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const FormDescription = forwardRef<HTMLParagraphElement, FormDescriptionProps>(
  ({ children, className, ...props }, ref) => {
    return (
      <p
        ref={ref}
        className={cn("text-sm text-muted-foreground", className)}
        {...props}
      >
        {children}
      </p>
    );
  }
);
FormDescription.displayName = "FormDescription";

export interface FormMessageProps
  extends React.HTMLAttributes<HTMLParagraphElement> {}

const FormMessage = forwardRef<HTMLParagraphElement, FormMessageProps>(
  ({ className, ...props }, ref) => {
    const { name, error } = useFormField();
    const { errors } = useFormContext();
    const errorMessage = errors?.[name]?.message;

    if (!error || !errorMessage) return null;

    return (
      <p
        ref={ref}
        className={cn("text-sm text-destructive font-medium", className)}
        role="alert"
        aria-live="polite"
        {...props}
      >
        {errorMessage}
      </p>
    );
  }
);
FormMessage.displayName = "FormMessage";

export const Form = Object.assign(FormRoot, {
  Field: FormField,
  Label: FormLabel,
  Control: FormControl,
  Description: FormDescription,
  Message: FormMessage,
});

export { FormField, FormLabel, FormControl, FormDescription, FormMessage };
