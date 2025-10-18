"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { X, Search, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";
import { Input } from "./Input";
import { Checkbox } from "./Checkbox";
import { CheckboxGroup } from "./CheckboxGroup";
import { RadioGroup } from "./RadioGroup";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectTrigger,
  SelectValue,
} from "./Select";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectTrigger,
  MultiSelectValue,
} from "./MultiSelect";
import { MultiInput } from "./MultiInput";
import { Slider } from "./Slider";
import { RangeSlider } from "./RangeSlider";
import { Switch } from "./Switch";
import { DatePicker } from "./DatePicker";
import { DateRangePicker, DateRange } from "./DateRangePicker";
import { Textarea } from "./TextArea";
import { Button } from "./Button";
import { Badge } from "./Badge";
import { Separator } from "./Separator";
import { Label } from "./Label";

interface FilterContextValue {
  activeFilters: Set<string>;
  setFilterActive: (id: string, active: boolean) => void;
  incrementFilters: () => void;
  decrementFilters: () => void;
  resetFilters: () => void;
  onClear?: () => void;
  onApply?: () => void;
}

const FilterContext = createContext<FilterContextValue | undefined>(undefined);

const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("Filter components must be used within Filter");
  }
  return context;
};

export interface FilterProps extends React.ComponentProps<"div"> {
  onClear?: () => void;
  onApply?: () => void;
  className?: string;
  children: React.ReactNode;
}

const FilterRoot: React.FC<FilterProps> = ({
  onClear,
  onApply,
  className,
  children,
  ...props
}) => {
  const [activeFilters, setActiveFilters] = useState(new Set<string>());

  const setFilterActive = (id: string, active: boolean) => {
    setActiveFilters((prev) => {
      const newSet = new Set(prev);
      if (active) newSet.add(id);
      else newSet.delete(id);
      return newSet;
    });
  };

  const incrementFilters = () => {
    setActiveFilters((prev) => {
      const newSet = new Set(prev);
      newSet.add(`generic-filter-${prev.size}`);
      return newSet;
    });
  };

  const decrementFilters = () => {
    setActiveFilters((prev) => {
      const newSet = new Set(prev);
      const genericFilters = Array.from(newSet).filter((id) =>
        id.startsWith("generic-filter")
      );
      if (genericFilters.length > 0) {
        newSet.delete(genericFilters[genericFilters.length - 1]);
      }
      return newSet;
    });
  };

  const resetFilters = () => {
    setActiveFilters(new Set());
    onClear?.();
  };

  return (
    <FilterContext.Provider
      value={{
        activeFilters,
        setFilterActive,
        incrementFilters,
        decrementFilters,
        resetFilters,
        onClear,
        onApply,
      }}
    >
      <div {...props} className={cn("space-y-6", className)}>
        {children}
      </div>
    </FilterContext.Provider>
  );
};

export interface FilterHeaderProps extends React.ComponentProps<"div"> {
  title?: string;
  description?: string;
  showCount?: boolean;
  className?: string;
}

const FilterHeader: React.FC<FilterHeaderProps> = ({
  title = "Filters",
  description,
  showCount = true,
  className,
  ...props
}) => {
  const { activeFilters } = useFilterContext();

  return (
    <div {...props} className={cn("space-y-2", className)}>
      <div className="flex items-center gap-2">
        <h3 className="text-lg font-semibold text-foreground">{title}</h3>
        {showCount && activeFilters.size > 0 && (
          <Badge variant="secondary" size="sm">
            {activeFilters.size}
          </Badge>
        )}
      </div>
      {description && (
        <p className="text-sm text-muted-foreground">{description}</p>
      )}
    </div>
  );
};

export interface FilterSearchProps
  extends Omit<React.ComponentProps<typeof Input>, "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const FilterSearch: React.FC<FilterSearchProps> = ({
  value,
  onChange,
  placeholder = "Search...",
  className,
  ...props
}) => {
  const { incrementFilters, decrementFilters } = useFilterContext();
  const [internalValue, setInternalValue] = useState(value || "");
  const [wasActive, setWasActive] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const isActive = newValue.trim().length > 0;

    if (!wasActive && isActive) {
      incrementFilters();
      setWasActive(true);
    } else if (wasActive && !isActive) {
      decrementFilters();
      setWasActive(false);
    }

    setInternalValue(newValue);
    onChange?.(newValue);
  };

  useEffect(() => {
    const currentValue = value !== undefined ? value : internalValue;
    const isActive = currentValue.trim().length > 0;
    setWasActive(isActive);
  }, [value, internalValue]);

  return (
    <div {...props} className={cn("relative", className)}>
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        value={value !== undefined ? value : internalValue}
        onChange={handleChange}
        placeholder={placeholder}
        className="pl-9"
      />
    </div>
  );
};

export interface FilterGroupProps extends React.ComponentProps<"div"> {
  title?: string;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  className?: string;
  children: React.ReactNode;
}

const FilterGroup: React.FC<FilterGroupProps> = ({
  title,
  collapsible = false,
  defaultCollapsed = false,
  className,
  children,
  ...props
}) => {
  const [isCollapsed, setIsCollapsed] = useState(defaultCollapsed);

  return (
    <div {...props} className={cn("space-y-3", className)}>
      {title && (
        <div
          className={cn(
            "flex items-center justify-between w-full text-sm font-medium text-foreground",
            collapsible && "cursor-default"
          )}
        >
          <span>{title}</span>

          {collapsible && (
            <Button
              type="button"
              variant="ghost"
              size="icon"
              onClick={() => setIsCollapsed(!isCollapsed)}
              aria-expanded={!isCollapsed}
              aria-label={isCollapsed ? "Expand" : "Collapse"}
              title={isCollapsed ? "Expand" : "Collapse"}
              className=" size-6"
            >
              {isCollapsed ? (
                <ChevronDown className="h-4 w-4" />
              ) : (
                <ChevronUp className="h-4 w-4" />
              )}
            </Button>
          )}
        </div>
      )}
      {!isCollapsed && <div className="space-y-2">{children}</div>}
    </div>
  );
};

export interface FilterInputProps
  extends Omit<React.ComponentProps<typeof Input>, "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  type?: string;
  className?: string;
}

const FilterInput: React.FC<FilterInputProps> = ({
  value,
  onChange,
  placeholder,
  label,
  type = "text",
  className,
  ...props
}) => {
  const { incrementFilters, decrementFilters } = useFilterContext();
  const [internalValue, setInternalValue] = useState(value || "");
  const [wasActive, setWasActive] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    const isActive = newValue.trim().length > 0;

    if (!wasActive && isActive) {
      incrementFilters();
      setWasActive(true);
    } else if (wasActive && !isActive) {
      decrementFilters();
      setWasActive(false);
    }

    setInternalValue(newValue);
    onChange?.(newValue);
  };

  useEffect(() => {
    const currentValue = value !== undefined ? value : internalValue;
    const isActive = currentValue.trim().length > 0;
    setWasActive(isActive);
  }, [value, internalValue]);

  return (
    <div {...props} className={cn("space-y-2", className)}>
      {label && <Label>{label}</Label>}
      <Input
        type={type}
        value={value !== undefined ? value : internalValue}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export interface FilterTextareaProps
  extends Omit<React.ComponentProps<typeof Textarea>, "onChange"> {
  value?: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  rows?: number;
  className?: string;
}

const FilterTextarea: React.FC<FilterTextareaProps> = ({
  value,
  onChange,
  placeholder,
  label,
  rows = 3,
  className,
  ...props
}) => {
  const { incrementFilters, decrementFilters } = useFilterContext();
  const [internalValue, setInternalValue] = useState(value || "");
  const [wasActive, setWasActive] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newValue = e.target.value;
    const isActive = newValue.trim().length > 0;

    if (!wasActive && isActive) {
      incrementFilters();
      setWasActive(true);
    } else if (wasActive && !isActive) {
      decrementFilters();
      setWasActive(false);
    }

    setInternalValue(newValue);
    onChange?.(newValue);
  };

  useEffect(() => {
    const currentValue = value !== undefined ? value : internalValue;
    const isActive = currentValue.trim().length > 0;
    setWasActive(isActive);
  }, [value, internalValue]);

  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label>{label}</Label>}
      <Textarea
        {...props}
        value={value !== undefined ? value : internalValue}
        onChange={handleChange}
        placeholder={placeholder}
        rows={rows}
      />
    </div>
  );
};

export interface FilterCheckboxProps
  extends Omit<React.ComponentProps<typeof Checkbox>, "onChange" | "checked"> {
  checked?: boolean;
  onChange?: (checked: boolean) => void;
  label?: string;
  id: string;
  className?: string;
}

const FilterCheckbox: React.FC<FilterCheckboxProps> = ({
  checked = false,
  onChange,
  label,
  id,
  className,
  ...props
}) => {
  const { setFilterActive } = useFilterContext();

  const handleChange = (newChecked: boolean) => {
    setFilterActive(id, newChecked);
    onChange?.(newChecked);
  };

  return (
    <Checkbox
      {...props}
      id={id}
      checked={checked}
      onChange={handleChange}
      label={label}
      className={className}
    />
  );
};

export interface FilterCheckboxGroupProps
  extends Omit<
    React.ComponentProps<typeof CheckboxGroup>,
    "onValueChange" | "value"
  > {
  value?: string[];
  onValueChange?: (value: string[]) => void;
  label?: string;
  className?: string;
  children: React.ReactNode;
}

const FilterCheckboxGroup: React.FC<FilterCheckboxGroupProps> = ({
  value = [],
  onValueChange,
  label,
  className,
  children,
  ...props
}) => {
  const { setFilterActive } = useFilterContext();

  const handleChange = (newValue: string[]) => {
    setFilterActive(`checkbox-group-${label || "group"}`, newValue.length > 0);
    onValueChange?.(newValue);
  };

  return (
    <CheckboxGroup
      {...props}
      value={value}
      onValueChange={handleChange}
      label={label}
      className={className}
    >
      {children}
    </CheckboxGroup>
  );
};

export interface FilterSliderProps
  extends Omit<React.ComponentProps<typeof Slider>, "onChange" | "value"> {
  value?: number;
  onChange?: (value: number) => void;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: number;
  label?: string;
  showValue?: boolean;
  formatValue?: (value: number) => string;
  className?: string;
}

const FilterSlider: React.FC<FilterSliderProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  defaultValue,
  label,
  showValue = true,
  formatValue = (v) => v.toString(),
  className,
  ...props
}) => {
  const { setFilterActive } = useFilterContext();
  const initialDefault = defaultValue !== undefined ? defaultValue : min;
  const currentValue = value !== undefined ? value : initialDefault;

  const handleChange = (newValue: number) => {
    setFilterActive(`slider-${label || "slider"}`, newValue !== initialDefault);
    onChange?.(newValue);
  };

  return (
    <div className={cn("space-y-3", className)}>
      {label && (
        <div className="flex items-center justify-between">
          <Label>{label}</Label>
          {showValue && (
            <span className="text-sm text-muted-foreground">
              {formatValue(currentValue)}
            </span>
          )}
        </div>
      )}
      <Slider
        {...props}
        value={currentValue}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
      />
    </div>
  );
};

export interface FilterRangeProps
  extends Omit<React.ComponentProps<typeof RangeSlider>, "onChange" | "value"> {
  value?: [number, number];
  onChange?: (value: [number, number]) => void;
  min?: number;
  max?: number;
  step?: number;
  defaultValue?: [number, number];
  label?: string;
  showValues?: boolean;
  formatValue?: (value: number) => string;
  className?: string;
}

const FilterRange: React.FC<FilterRangeProps> = ({
  value,
  onChange,
  min = 0,
  max = 100,
  step = 1,
  defaultValue,
  label,
  showValues = true,
  formatValue = (v) => v.toString(),
  className,
  ...props
}) => {
  const { setFilterActive } = useFilterContext();
  const initialDefault: [number, number] = defaultValue || [min, max];
  const currentValue: [number, number] =
    value !== undefined ? value : initialDefault;

  const handleChange = (newValue: [number, number]) => {
    const isActive =
      newValue[0] !== initialDefault[0] || newValue[1] !== initialDefault[1];
    setFilterActive(`range-${label || "range"}`, isActive);
    onChange?.(newValue);
  };

  return (
    <div className={cn("space-y-3", className)}>
      {label && (
        <div className="flex items-center justify-between">
          <Label>{label}</Label>

          {showValues && (
            <span className="text-sm text-muted-foreground">
              {formatValue(currentValue[0])} - {formatValue(currentValue[1])}
            </span>
          )}
        </div>
      )}

      <RangeSlider
        {...props}
        value={currentValue}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
      />
    </div>
  );
};

export interface FilterRadioGroupProps
  extends Omit<
    React.ComponentProps<typeof RadioGroup>,
    "onValueChange" | "value"
  > {
  value?: string;
  onValueChange?: (value: string) => void;
  label?: string;
  className?: string;
  children: React.ReactNode;
}

const FilterRadioGroup: React.FC<FilterRadioGroupProps> = ({
  value,
  onValueChange,
  label,
  className,
  children,
  ...props
}) => {
  const { incrementFilters, decrementFilters } = useFilterContext();
  const [internalValue, setInternalValue] = useState(value || "");
  const [wasActive, setWasActive] = useState((value || "").length > 0);

  const handleChange = (newValue: string) => {
    const isActive = newValue.trim().length > 0;

    if (!wasActive && isActive) {
      incrementFilters();
      setWasActive(true);
    } else if (wasActive && !isActive) {
      decrementFilters();
      setWasActive(false);
    }

    setInternalValue(newValue);
    onValueChange?.(newValue);
  };

  useEffect(() => {
    const currentValue = value !== undefined ? value : internalValue;
    const isActive = currentValue.trim().length > 0;
    setWasActive(isActive);
  }, [value, internalValue]);

  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label>{label}</Label>}
      <RadioGroup
        {...props}
        value={value !== undefined ? value : internalValue}
        onValueChange={handleChange}
      >
        {children}
      </RadioGroup>
    </div>
  );
};

export interface FilterSwitchProps
  extends Omit<
    React.ComponentProps<typeof Switch>,
    "onCheckedChange" | "checked"
  > {
  checked?: boolean;
  onCheckedChange?: (checked: boolean) => void;
  label?: string;
  description?: string;
  id: string;
  className?: string;
}

const FilterSwitch: React.FC<FilterSwitchProps> = ({
  checked,
  onCheckedChange,
  label,
  description,
  id,
  className,
  ...props
}) => {
  const { incrementFilters, decrementFilters } = useFilterContext();
  const [internalChecked, setInternalChecked] = useState(checked || false);
  const [wasActive, setWasActive] = useState(checked || false);

  const handleChange = (newChecked: boolean) => {
    if (!wasActive && newChecked) {
      incrementFilters();
      setWasActive(true);
    } else if (wasActive && !newChecked) {
      decrementFilters();
      setWasActive(false);
    }

    setInternalChecked(newChecked);
    onCheckedChange?.(newChecked);
  };

  useEffect(() => {
    const currentChecked = checked !== undefined ? checked : internalChecked;
    setWasActive(currentChecked);
  }, [checked, internalChecked]);

  return (
    <div
      className={cn("flex items-center justify-between space-x-4", className)}
    >
      <div className="flex-1 space-y-1">
        {label && <Label htmlFor={id}>{label}</Label>}
        {description && (
          <p className="text-sm text-muted-foreground">{description}</p>
        )}
      </div>
      <Switch
        {...props}
        id={id}
        checked={checked !== undefined ? checked : internalChecked}
        onCheckedChange={handleChange}
      />
    </div>
  );
};

export interface FilterSelectProps
  extends Omit<React.ComponentProps<typeof Select>, "onValueChange" | "value"> {
  value?: string;
  onValueChange?: (value: string) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  children: React.ReactNode;
}

const FilterSelect: React.FC<FilterSelectProps> = ({
  value,
  onValueChange,
  placeholder = "Select option",
  label,
  className,
  children,
  ...props
}) => {
  const { incrementFilters, decrementFilters } = useFilterContext();
  const [internalValue, setInternalValue] = useState(value || "");
  const [wasActive, setWasActive] = useState((value || "").length > 0);

  const handleChange = (newValue: string) => {
    const isActive = newValue.trim().length > 0;

    if (!wasActive && isActive) {
      incrementFilters();
      setWasActive(true);
    } else if (wasActive && !isActive) {
      decrementFilters();
      setWasActive(false);
    }

    setInternalValue(newValue);
    onValueChange?.(newValue);
  };

  useEffect(() => {
    const currentValue = value !== undefined ? value : internalValue;
    const isActive = currentValue.trim().length > 0;
    setWasActive(isActive);
  }, [value, internalValue]);

  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label>{label}</Label>}
      <Select
        {...props}
        value={value !== undefined ? value : internalValue}
        onValueChange={handleChange}
      >
        <SelectTrigger>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>{children}</SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export interface FilterMultiSelectProps
  extends Omit<
    React.ComponentProps<typeof MultiSelect>,
    "onValuesChange" | "values"
  > {
  values?: string[];
  onValuesChange?: (values: string[]) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  children: React.ReactNode;
}

const FilterMultiSelect: React.FC<FilterMultiSelectProps> = ({
  values,
  onValuesChange,
  placeholder = "Select options",
  label,
  className,
  children,
  ...props
}) => {
  const { incrementFilters, decrementFilters } = useFilterContext();
  const [internalValues, setInternalValues] = useState<string[]>(values || []);
  const [wasActive, setWasActive] = useState((values || []).length > 0);

  const handleChange = (newValues: string[]) => {
    const isActive = newValues.length > 0;

    if (!wasActive && isActive) {
      incrementFilters();
      setWasActive(true);
    } else if (wasActive && !isActive) {
      decrementFilters();
      setWasActive(false);
    }

    setInternalValues(newValues);
    onValuesChange?.(newValues);
  };

  useEffect(() => {
    const currentValues = values !== undefined ? values : internalValues;
    const isActive = currentValues.length > 0;
    setWasActive(isActive);
  }, [values, internalValues]);

  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label>{label}</Label>}
      <MultiSelect
        {...props}
        values={values !== undefined ? values : internalValues}
        onValuesChange={handleChange}
      >
        <MultiSelectTrigger>
          <MultiSelectValue placeholder={placeholder} />
        </MultiSelectTrigger>
        <MultiSelectContent>
          <MultiSelectGroup>{children}</MultiSelectGroup>
        </MultiSelectContent>
      </MultiSelect>
    </div>
  );
};

export interface FilterMultiInputProps
  extends Omit<React.ComponentProps<typeof MultiInput>, "onChange" | "value"> {
  value?: string[];
  onChange?: (values: string[]) => void;
  label?: string;
  placeholder?: string;
  max?: number;
  className?: string;
}

const FilterMultiInput: React.FC<FilterMultiInputProps> = ({
  value,
  onChange,
  label,
  placeholder,
  max,
  className,
  ...props
}) => {
  const { incrementFilters, decrementFilters } = useFilterContext();
  const [internalValue, setInternalValue] = useState<string[]>(value || []);
  const [wasActive, setWasActive] = useState((value || []).length > 0);

  const handleChange = (newValues: string[]) => {
    const isActive = newValues.length > 0;

    if (!wasActive && isActive) {
      incrementFilters();
      setWasActive(true);
    } else if (wasActive && !isActive) {
      decrementFilters();
      setWasActive(false);
    }

    setInternalValue(newValues);
    onChange?.(newValues);
  };

  useEffect(() => {
    const currentValue = value !== undefined ? value : internalValue;
    const isActive = currentValue.length > 0;
    setWasActive(isActive);
  }, [value, internalValue]);

  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label>{label}</Label>}
      <MultiInput
        {...props}
        value={value !== undefined ? value : internalValue}
        onChange={handleChange}
        placeholder={placeholder}
        max={max}
      />
    </div>
  );
};

export interface FilterDateProps
  extends Omit<React.ComponentProps<typeof DatePicker>, "onChange" | "value"> {
  value?: Date | null;
  onChange?: (date: Date | null) => void;
  label?: string;
  placeholder?: string;
  includeTime?: boolean;
  className?: string;
}

const FilterDate: React.FC<FilterDateProps> = ({
  value,
  onChange,
  label,
  placeholder = "Select date",
  includeTime = false,
  className,
  ...props
}) => {
  const { incrementFilters, decrementFilters } = useFilterContext();
  const [internalValue, setInternalValue] = useState<Date | null>(
    value || null
  );
  const [wasActive, setWasActive] = useState((value || null) !== null);

  const handleChange = (newValue: Date | null) => {
    const isActive = newValue !== null;

    if (!wasActive && isActive) {
      incrementFilters();
      setWasActive(true);
    } else if (wasActive && !isActive) {
      decrementFilters();
      setWasActive(false);
    }

    setInternalValue(newValue);
    onChange?.(newValue);
  };

  useEffect(() => {
    const currentValue = value !== undefined ? value : internalValue;
    const isActive = currentValue !== null;
    setWasActive(isActive);
  }, [value, internalValue]);

  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label>{label}</Label>}
      <DatePicker
        {...props}
        value={value !== undefined ? value : internalValue}
        onChange={handleChange}
        placeholder={placeholder}
        includeTime={includeTime}
      />
    </div>
  );
};

export interface FilterDateRangeProps
  extends Omit<
    React.ComponentProps<typeof DateRangePicker>,
    "onChange" | "value"
  > {
  value?: DateRange;
  onChange?: (range: DateRange) => void;
  label?: string;
  placeholder?: string;
  className?: string;
}

const FilterDateRange: React.FC<FilterDateRangeProps> = ({
  value,
  onChange,
  label,
  placeholder = "Select date range",
  className,
  ...props
}) => {
  const { incrementFilters, decrementFilters } = useFilterContext();
  const [internalValue, setInternalValue] = useState<DateRange>(
    value || { start: null, end: null }
  );
  const [wasActive, setWasActive] = useState(
    (value || { start: null, end: null }).start !== null ||
      (value || { start: null, end: null }).end !== null
  );

  const handleChange = (newValue: DateRange) => {
    const isActive = newValue.start !== null || newValue.end !== null;

    if (!wasActive && isActive) {
      incrementFilters();
      setWasActive(true);
    } else if (wasActive && !isActive) {
      decrementFilters();
      setWasActive(false);
    }

    setInternalValue(newValue);
    onChange?.(newValue);
  };

  useEffect(() => {
    const currentValue = value !== undefined ? value : internalValue;
    const isActive = currentValue.start !== null || currentValue.end !== null;
    setWasActive(isActive);
  }, [value, internalValue]);

  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label>{label}</Label>}
      <DateRangePicker
        {...props}
        value={value !== undefined ? value : internalValue}
        onChange={handleChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export interface FilterActionsProps extends React.ComponentProps<"div"> {
  showClear?: boolean;
  showApply?: boolean;
  clearLabel?: string;
  applyLabel?: string;
  className?: string;
  showCountOnClear?: boolean;
  showCountOnApply?: boolean;
}

const FilterActions: React.FC<FilterActionsProps> = ({
  showClear = true,
  showApply = true,
  clearLabel = "Clear Filters",
  applyLabel = "Apply Filters",
  className,
  showCountOnClear = false,
  showCountOnApply = false,
  ...props
}) => {
  const { activeFilters, resetFilters, onClear, onApply } = useFilterContext();

  const handleClear = () => {
    resetFilters();
    onClear?.();
  };

  const handleApply = () => {
    onApply?.();
  };

  return (
    <div
      {...props}
      className={cn("flex flex-wrap items-center gap-2 pt-4", className)}
    >
      {showClear && (
        <Button
          variant="outline"
          onClick={handleClear}
          disabled={activeFilters.size === 0}
          className="flex-1  relative"
        >
          <X className="h-4 w-4 mr-2" />
          {clearLabel}

          {showCountOnClear && activeFilters.size > 0 && (
            <Badge
              className="rounded-full size-4 absolute right-2 top-1/2 -translate-y-1/2"
              variant="secondary"
              size="sm"
            >
              {activeFilters.size}
            </Badge>
          )}
        </Button>
      )}
      {showApply && (
        <Button onClick={handleApply} className="flex-1 relative">
          {applyLabel}

          {showCountOnApply && activeFilters.size > 0 && (
            <Badge
              className="rounded-full size-4 absolute right-2 top-1/2 -translate-y-1/2"
              variant="secondary"
              size="sm"
            >
              {activeFilters.size}
            </Badge>
          )}
        </Button>
      )}
    </div>
  );
};

export const Filter: React.FC<FilterProps> & {
  Header: typeof FilterHeader;
  Search: typeof FilterSearch;
  Group: typeof FilterGroup;
  Input: typeof FilterInput;
  Textarea: typeof FilterTextarea;
  Checkbox: typeof FilterCheckbox;
  CheckboxGroup: typeof FilterCheckboxGroup;
  RadioGroup: typeof FilterRadioGroup;
  Switch: typeof FilterSwitch;
  Select: typeof FilterSelect;
  MultiSelect: typeof FilterMultiSelect;
  MultiInput: typeof FilterMultiInput;
  Slider: typeof FilterSlider;
  Range: typeof FilterRange;
  Date: typeof FilterDate;
  DateRange: typeof FilterDateRange;
  Actions: typeof FilterActions;
  Separator: typeof Separator;
} = Object.assign(FilterRoot, {
  Header: FilterHeader,
  Search: FilterSearch,
  Group: FilterGroup,
  Input: FilterInput,
  Textarea: FilterTextarea,
  Checkbox: FilterCheckbox,
  CheckboxGroup: FilterCheckboxGroup,
  RadioGroup: FilterRadioGroup,
  Switch: FilterSwitch,
  Select: FilterSelect,
  MultiSelect: FilterMultiSelect,
  MultiInput: FilterMultiInput,
  Slider: FilterSlider,
  Range: FilterRange,
  Date: FilterDate,
  DateRange: FilterDateRange,
  Actions: FilterActions,
  Separator,
});

export {
  FilterRoot,
  FilterHeader,
  FilterSearch,
  FilterGroup,
  FilterInput,
  FilterTextarea,
  FilterCheckbox,
  FilterCheckboxGroup,
  FilterRadioGroup,
  FilterSwitch,
  FilterSelect,
  FilterMultiSelect,
  FilterMultiInput,
  FilterSlider,
  FilterRange,
  FilterDate,
  FilterDateRange,
  FilterActions,
};
