"use client";

import React, { createContext, useContext } from "react";
import { cn } from "@/lib/utils";
import { Checkbox, CheckboxProps } from "@/components/custom/Checkbox";

interface CheckboxGroupContextValue {
  value: string[];
  onChange: (itemValue: string, checked: boolean) => void;
  disabled?: boolean;
}

const CheckboxGroupContext = createContext<
  CheckboxGroupContextValue | undefined
>(undefined);

export interface CheckboxGroupProps extends React.ComponentProps<"fieldset"> {
  value?: string[];
  onValueChange?: (value: string[]) => void;
  defaultValue?: string[];
  disabled?: boolean;
  label?: string;
  description?: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}

const CheckboxGroupRoot: React.FC<CheckboxGroupProps> = ({
  value: controlledValue,
  onValueChange,
  defaultValue = [],
  disabled = false,
  label,
  description,
  error,
  className,
  children,
  ...props
}) => {
  const [uncontrolledValue, setUncontrolledValue] =
    React.useState<string[]>(defaultValue);

  const isControlled = controlledValue !== undefined;
  const value = isControlled ? controlledValue : uncontrolledValue;

  const handleChange = (itemValue: string, checked: boolean) => {
    const newValue = checked
      ? [...value, itemValue]
      : value.filter((v) => v !== itemValue);

    if (!isControlled) {
      setUncontrolledValue(newValue);
    }

    onValueChange?.(newValue);
  };

  return (
    <CheckboxGroupContext.Provider
      value={{ value, onChange: handleChange, disabled }}
    >
      <fieldset
        {...props}
        className={cn("space-y-3", disabled && "opacity-50", className)}
        disabled={disabled}
      >
        {label && (
          <legend className="text-sm font-medium text-foreground mb-3">
            {label}
          </legend>
        )}
        {description && (
          <p className="text-sm text-muted-foreground mb-3">{description}</p>
        )}
        <div className="flex flex-wrap gap-2">{children}</div>
        {error && <p className="text-sm text-destructive mt-2">{error}</p>}
      </fieldset>
    </CheckboxGroupContext.Provider>
  );
};

interface CheckboxGroupItemProps
  extends Omit<CheckboxProps, "checked" | "onChange" | "id"> {
  value: string;
}

const CheckboxGroupItem: React.FC<CheckboxGroupItemProps> = ({
  value: itemValue,
  disabled: itemDisabled,
  ...props
}) => {
  const context = useContext(CheckboxGroupContext);

  if (!context) {
    throw new Error("CheckboxGroup.Item must be used within CheckboxGroup");
  }

  const { value, onChange, disabled: groupDisabled } = context;
  const isChecked = value.includes(itemValue);
  const isDisabled = groupDisabled || itemDisabled;

  return (
    <Checkbox
      id={itemValue}
      checked={isChecked}
      onChange={(checked) => onChange(itemValue, checked)}
      disabled={isDisabled}
      {...props}
    />
  );
};

export const CheckboxGroup = Object.assign(CheckboxGroupRoot, {
  Item: CheckboxGroupItem,
});
