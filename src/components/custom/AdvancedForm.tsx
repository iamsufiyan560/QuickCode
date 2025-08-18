"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { z } from "zod";
import { cn } from "@/lib/utils";

import { Button } from "@/components/custom/Button";
import { Input } from "@/components/custom/Input";
import { Checkbox } from "@/components/custom/Checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/custom/RadioGroup";
import { Switch } from "@/components/custom/Switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/custom/Select";
import { Slider } from "@/components/custom/Slider";
import { RangeSlider } from "@/components/custom/RangeSlider";
import {
  MultiSelect,
  MultiSelectContent,
  MultiSelectItem,
  MultiSelectTrigger,
  MultiSelectValue,
} from "@/components/custom/MultiSelect";
import { Textarea } from "@/components/custom/TextArea";
import { Label } from "@/components/custom/Label";
import { Stepper } from "./Stepper";
import { Tooltip } from "@/components/custom/Tooltip";
import { ImageInput } from "@/components/custom/ImageInput";
import { FormSkeleton, FormSkeletonProps } from "./FormSkeleton";
import Image from "next/image";
import { DatePicker } from "./DatePicker";
export interface FormFieldValidation {
  [key: string]: any;
  min?: number;
  max?: number;
  minLength?: number;
  maxLength?: number;
  required?: boolean;
  pattern?: string;
  email?: boolean;
  url?: boolean;
  custom?: (value: any) => string | null;
  requiredError?: string;
  minLengthError?: string;
  maxLengthError?: string;
  minError?: string;
  maxError?: string;
  emailError?: string;
  urlError?: string;
  patternError?: string;
  customFileError?: string;
  acceptedTypes?: string[];
  maxSize?: number;
}

export interface FormFieldOption {
  label: string;
  value: string | number;
  disabled?: boolean;
}

export interface FormField {
  id: string;
  label: string;
  type:
    | "text"
    | "email"
    | "password"
    | "number"
    | "checkbox"
    | "radio"
    | "switch"
    | "select"
    | "multi-select"
    | "slider"
    | "range-slider"
    | "textarea"
    | "date"
    | "datetime-local"
    | "tel"
    | "url"
    | "file"
    | "image";
  placeholder?: string;
  description?: string;
  options?: FormFieldOption[] | string[];
  validation?: FormFieldValidation;
  defaultValue?: any;
  disabled?: boolean;
  hidden?: boolean;
  className?: string;
  conditional?: (values: Record<string, any>) => boolean;
  sliderProps?: {
    min?: number;
    max?: number;
    step?: number;
  };
  inputProps?: Record<string, any>;
}

export interface FormStep {
  id: string;
  title: string;
  description?: string;
  fields: FormField[];
  className?: string;
}

export interface FormHeader {
  title?: string;
  description?: string;
  className?: string;
  children?: React.ReactNode;
}

export interface FormFooter {
  className?: string;
  children?: React.ReactNode;
}

export interface AdvancedFormProps {
  fields?: FormField[];
  steps?: FormStep[];
  onSubmit: (data: Record<string, any>) => void | Promise<void>;
  onChange?: (data: Record<string, any>) => void;
  initialValues?: Record<string, any>;
  header?: FormHeader;
  footer?: FormFooter;
  submitText?: string;
  resetText?: string;
  nextText?: string;
  backText?: string;
  showReset?: boolean;
  showStepProgress?: boolean;
  autoSave?: boolean;
  className?: string;
  stepperClassName?: string;
  formClassName?: string;
  loading?: boolean;
  isSubmitLoading?: boolean;
  isFormLoading?: boolean;
  skeletonProps?: FormSkeletonProps;
  logo?: string;
  logoClassName?: string;
}

export const AdvancedForm: React.FC<AdvancedFormProps> = ({
  fields = [],
  steps = [],
  onSubmit,
  onChange,
  initialValues = {},
  header,
  footer,
  submitText = "Submit",
  resetText = "Reset",
  nextText = "Next",
  backText = "Back",
  showReset = false,
  showStepProgress = true,
  autoSave = false,
  className,
  stepperClassName,
  formClassName,
  loading = false,
  isFormLoading = false,
  isSubmitLoading = false,

  skeletonProps,
  logo,
  logoClassName,
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [resetCounter, setResetCounter] = useState(0);
  const [isInitializing, setIsInitializing] = useState(true);
  const shouldShowSkeleton = isFormLoading || isInitializing;
  const isSteppedForm = steps.length > 0;
  const currentFields = isSteppedForm
    ? steps[currentStep]?.fields || []
    : fields;
  const totalSteps = steps.length;

  const getStorageKey = () => {
    return `form-auto-save-${
      header?.title?.toLowerCase().replace(/\s+/g, "-") ||
      steps[0]?.title?.toLowerCase().replace(/\s+/g, "-") ||
      "default"
    }`;
  };

  const getErrorMessage = (
    validation: FormFieldValidation,
    errorType: string,
    defaultMessage: string
  ) => {
    return validation[`${errorType}Error`] || defaultMessage;
  };

  const createValidationSchema = (fieldsToValidate: FormField[]) => {
    const schemaObject: Record<string, z.ZodTypeAny> = {};

    fieldsToValidate.forEach((field) => {
      if (field.hidden) return;

      let schema: z.ZodTypeAny;
      const validation = field.validation || {};

      switch (field.type) {
        case "email":
          schema = z.email(
            getErrorMessage(validation, "email", "Invalid email address")
          );
          if (!validation.required) {
            schema = schema.optional().or(z.literal(""));
          }
          break;

        case "url":
          schema = z.url(getErrorMessage(validation, "url", "Invalid URL"));
          if (!validation.required) {
            schema = schema.optional().or(z.literal(""));
          }
          break;
        case "tel":
          schema = z
            .string()
            .regex(
              /^[\+]?[0-9\s\-\(\)]+$/,
              getErrorMessage(validation, "pattern", "Invalid phone number")
            )
            .refine((val) => {
              if (!val) return true;
              const digitsOnly = val.replace(/[^\d]/g, "");
              return digitsOnly.length >= (validation.minLength || 10);
            }, getErrorMessage(validation, "minLength", "Phone number too short"));
          if (!validation.required) {
            schema = schema.optional().or(z.literal(""));
          }
          break;

        case "password":
          schema = z
            .string()
            .regex(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
              getErrorMessage(
                validation,
                "pattern",
                "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character"
              )
            );
          if (!validation.required) {
            schema = schema.optional().or(z.literal(""));
          }
          break;

        case "number":
          schema = z.coerce.number("Invalid number");
          if (validation.min !== undefined) {
            schema = (schema as z.ZodNumber).min(
              validation.min,
              getErrorMessage(
                validation,
                "min",
                `Minimum value is ${validation.min}`
              )
            );
          }
          if (validation.max !== undefined) {
            schema = (schema as z.ZodNumber).max(
              validation.max,
              getErrorMessage(
                validation,
                "max",
                `Maximum value is ${validation.max}`
              )
            );
          }
          if (!validation.required) {
            schema = schema.optional();
          }
          break;

        case "checkbox":
          if (validation.required) {
            schema = z
              .boolean()
              .refine(
                (val) => val === true,
                getErrorMessage(
                  validation,
                  "required",
                  "This field is required"
                )
              );
          } else {
            schema = z.boolean().optional().default(false);
          }
          break;

        case "switch":
          schema = z.boolean().optional().default(false);
          break;

        case "radio":
          if (validation.required) {
            schema = z
              .string()
              .min(
                1,
                getErrorMessage(
                  validation,
                  "required",
                  "Please select an option"
                )
              );
          } else {
            schema = z.string().optional().or(z.literal(""));
          }
          break;

        case "multi-select":
          schema = z.array(z.string());
          if (validation.required) {
            schema = (schema as z.ZodArray<any>).min(
              1,
              getErrorMessage(
                validation,
                "required",
                "Please select at least one option"
              )
            );
          } else {
            schema = schema.optional().default([]);
          }
          break;

        case "slider":
          schema = z.number();
          if (validation.min !== undefined) {
            schema = (schema as z.ZodNumber).min(
              validation.min,
              getErrorMessage(
                validation,
                "min",
                `Minimum value is ${validation.min}`
              )
            );
          }
          if (validation.max !== undefined) {
            schema = (schema as z.ZodNumber).max(
              validation.max,
              getErrorMessage(
                validation,
                "max",
                `Maximum value is ${validation.max}`
              )
            );
          }
          if (!validation.required) {
            schema = schema.optional();
          }
          break;

        case "range-slider":
          schema = z.array(z.number()).length(2);
          if (!validation.required) {
            schema = schema.optional();
          }
          break;

        case "textarea":
          schema = z.string();
          if (validation.minLength) {
            schema = (schema as z.ZodString).min(
              validation.minLength,
              getErrorMessage(
                validation,
                "minLength",
                `Minimum length is ${validation.minLength}`
              )
            );
          }
          if (validation.maxLength) {
            schema = (schema as z.ZodString).max(
              validation.maxLength,
              getErrorMessage(
                validation,
                "maxLength",
                `Maximum length is ${validation.maxLength}`
              )
            );
          }
          if (!validation.required) {
            schema = schema.optional().or(z.literal(""));
          }
          break;

        case "date":
        case "datetime-local":
          schema = z
            .string()
            .min(
              1,
              getErrorMessage(
                validation,
                "required",
                "Please select a valid date/time"
              )
            );
          if (!validation.required) {
            schema = schema.optional().or(z.literal(""));
          }
          break;

        case "file":
          schema = z.any();

          if (validation.required) {
            schema = z
              .any()
              .refine(
                (file) => file && file.length > 0,
                getErrorMessage(validation, "required", "Please select a file")
              )
              .refine(
                (file) =>
                  !file || file[0]?.size <= (validation.maxSize || 5000000),
                getErrorMessage(
                  validation,
                  "customFile",
                  `File must be under ${(
                    (validation.maxSize || 5000000) / 1000000
                  ).toFixed(1)}MB`
                )
              );
          } else {
            schema = z
              .any()
              .optional()
              .refine(
                (file) =>
                  !file ||
                  file.length === 0 ||
                  file[0]?.size <= (validation.maxSize || 5000000),
                getErrorMessage(
                  validation,
                  "customFile",
                  `File must be under ${(
                    (validation.maxSize || 5000000) / 1000000
                  ).toFixed(1)}MB`
                )
              );
          }
          break;

        case "image":
          schema = z.any();
          if (validation.required) {
            schema = z
              .any()
              .refine((value) => {
                if (typeof value === "string" && value.length > 0) return true;
                return value && value.length > 0;
              }, getErrorMessage(validation, "required", "Please select an image"))
              .refine((value) => {
                if (typeof value === "string") return true;
                return (
                  !value ||
                  [
                    "image/jpeg",
                    "image/png",
                    "image/gif",
                    "image/webp",
                  ].includes(value[0]?.type)
                );
              }, getErrorMessage(validation, "customFile", "Please select a valid image file"))
              .refine((value) => {
                if (typeof value === "string") return true;
                return (
                  !value || value[0]?.size <= (validation.maxSize || 2000000)
                );
              }, getErrorMessage(validation, "customFile", `Image must be under ${((validation.maxSize || 2000000) / 1000000).toFixed(1)}MB`));
          } else {
            schema = z
              .any()
              .optional()
              .refine((value) => {
                if (typeof value === "string") return true;
                return (
                  !value ||
                  value.length === 0 ||
                  [
                    "image/jpeg",
                    "image/png",
                    "image/gif",
                    "image/webp",
                  ].includes(value[0]?.type)
                );
              }, getErrorMessage(validation, "customFile", "Please select a valid image file"))
              .refine((value) => {
                if (typeof value === "string") return true;
                return (
                  !value ||
                  value.length === 0 ||
                  value[0]?.size <= (validation.maxSize || 2000000)
                );
              }, getErrorMessage(validation, "customFile", `Image must be under ${((validation.maxSize || 2000000) / 1000000).toFixed(1)}MB`));
          }
          break;

        default:
          schema = z.string();
          if (validation.minLength) {
            schema = (schema as z.ZodString).min(
              validation.minLength,
              getErrorMessage(
                validation,
                "minLength",
                `Minimum length is ${validation.minLength}`
              )
            );
          }
          if (validation.maxLength) {
            schema = (schema as z.ZodString).max(
              validation.maxLength,
              getErrorMessage(
                validation,
                "maxLength",
                `Maximum length is ${validation.maxLength}`
              )
            );
          }
          if (validation.pattern) {
            schema = (schema as z.ZodString).regex(
              new RegExp(validation.pattern),
              getErrorMessage(validation, "pattern", "Invalid format")
            );
          }
          if (!validation.required) {
            schema = schema.optional().or(z.literal(""));
          }
          break;
      }

      schemaObject[field.id] = schema;
    });

    return z.object(schemaObject);
  };

  const validateFields = (
    fieldsToValidate: FormField[],
    dataToValidate: Record<string, any>
  ) => {
    const newErrors: Record<string, string> = {};

    const cleanData: Record<string, any> = {};
    fieldsToValidate.forEach((field) => {
      if (field.hidden) return;

      let value = dataToValidate[field.id];

      if (typeof value === "string") {
        value = value.trim();
        if (value === "") {
          value = undefined;
        }
      }

      if (field.type === "checkbox" || field.type === "switch") {
        cleanData[field.id] = value ?? false;
      } else if (field.type === "multi-select") {
        cleanData[field.id] = value ?? [];
      } else if (
        field.type === "number" &&
        (value === "" || value === undefined)
      ) {
        cleanData[field.id] = undefined;
      } else if (field.type === "slider") {
        cleanData[field.id] = value ?? field.sliderProps?.min ?? 0;
      } else if (field.type === "range-slider") {
        cleanData[field.id] = value ?? [
          field.sliderProps?.min ?? 0,
          field.sliderProps?.max ?? 100,
        ];
      } else {
        cleanData[field.id] = value ?? "";
      }
    });

    try {
      const schema = createValidationSchema(fieldsToValidate);
      schema.parse(cleanData);
    } catch (error) {
      if (error instanceof z.ZodError) {
        error.issues.forEach((err) => {
          const fieldPath = err.path.join(".");
          newErrors[fieldPath] = err.message;
        });
      }
    }

    fieldsToValidate.forEach((field) => {
      if (
        field.validation?.custom &&
        cleanData[field.id] !== undefined &&
        cleanData[field.id] !== ""
      ) {
        const customError = field.validation.custom(cleanData[field.id]);
        if (customError) {
          newErrors[field.id] = customError;
        }
      }
    });

    return newErrors;
  };

  const handleFieldChange = (fieldId: string, value: any) => {
    const trimmedValue = value;
    const newData = { ...formData, [fieldId]: trimmedValue };
    setFormData(newData);
    setTouched({ ...touched, [fieldId]: true });

    if (touched[fieldId]) {
      const field = currentFields.find((f) => f.id === fieldId);
      if (field) {
        const fieldErrors = validateFields([field], newData);
        setErrors((prev) => {
          const updated = { ...prev };
          if (fieldErrors[fieldId]) {
            updated[fieldId] = fieldErrors[fieldId];
          } else {
            delete updated[fieldId];
          }
          return updated;
        });
      }
    }

    onChange?.(newData);

    if (autoSave) {
      localStorage.setItem(getStorageKey(), JSON.stringify(newData));
    }
  };

  const handleNext = (e?: React.MouseEvent) => {
    e?.preventDefault();

    const visibleFields = currentFields.filter(
      (field) =>
        !field.hidden && (!field.conditional || field.conditional(formData))
    );

    const newTouched = { ...touched };
    visibleFields.forEach((field) => {
      newTouched[field.id] = true;
    });
    setTouched(newTouched);

    const trimmedFormData = { ...formData };
    Object.keys(trimmedFormData).forEach((key) => {
      if (typeof trimmedFormData[key] === "string") {
        trimmedFormData[key] = trimmedFormData[key].trim();
      }
    });
    setFormData(trimmedFormData);
    const stepErrors = validateFields(visibleFields, trimmedFormData);

    setErrors((prev) => ({ ...prev, ...stepErrors }));

    if (Object.keys(stepErrors).length === 0) {
      setCurrentStep((prev) => Math.min(prev + 1, totalSteps - 1));
    }
  };

  const handleBack = () => {
    setCurrentStep((prev) => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const fieldsToValidate = isSteppedForm
      ? steps.flatMap((step) => step.fields)
      : fields;

    const visibleFields = fieldsToValidate.filter(
      (field) =>
        !field.hidden && (!field.conditional || field.conditional(formData))
    );

    const newTouched = { ...touched };
    visibleFields.forEach((field) => {
      newTouched[field.id] = true;
    });
    setTouched(newTouched);

    const trimmedFormData = { ...formData };
    Object.keys(trimmedFormData).forEach((key) => {
      if (typeof trimmedFormData[key] === "string") {
        trimmedFormData[key] = trimmedFormData[key].trim();
      }
    });
    setFormData(trimmedFormData);
    const allErrors = validateFields(visibleFields, trimmedFormData);
    setErrors(allErrors);
    if (Object.keys(allErrors).length === 0) {
      try {
        await onSubmit(formData);
        if (autoSave) {
          localStorage.removeItem(getStorageKey());
        }
        setFormData({});
        setResetCounter((prev) => prev + 1);
      } catch (error) {
        console.error("Form submission error:", error);
      }
    }

    setIsSubmitting(false);
  };

  const handleReset = () => {
    setFormData(initialValues);
    setErrors({});
    setTouched({});
    setCurrentStep(0);
    setResetCounter((prev) => prev + 1);
    onChange?.({});
    if (autoSave) {
      localStorage.removeItem(getStorageKey());
    }
  };

  useEffect(() => {
    setIsInitializing(true);
    const allFields = isSteppedForm
      ? steps.flatMap((step) => step.fields)
      : fields;
    const initialData = { ...initialValues };

    allFields.forEach((field) => {
      if (initialData[field.id] === undefined) {
        switch (field.type) {
          case "checkbox":
          case "switch":
            initialData[field.id] = field.defaultValue ?? false;
            break;
          case "multi-select":
            initialData[field.id] = field.defaultValue ?? [];
            break;
          case "slider":
            initialData[field.id] =
              field.defaultValue ?? field.sliderProps?.min ?? 0;
            break;
          case "range-slider":
            initialData[field.id] = field.defaultValue ?? [
              field.sliderProps?.min ?? 0,
              field.sliderProps?.max ?? 100,
            ];
            break;
          default:
            initialData[field.id] = field.defaultValue ?? "";
        }
      }
    });
    setTimeout(() => {
      setFormData(initialData);
      setIsInitializing(false);
    }, 0);
  }, [resetCounter]);

  useEffect(() => {
    if (autoSave) {
      const saved = localStorage.getItem(getStorageKey());
      if (saved) {
        try {
          const parsedData = JSON.parse(saved);
          setFormData({ ...initialValues, ...parsedData });
        } catch (error) {
          console.error("Failed to parse auto-saved data:", error);
        }
      }
    }
  }, [autoSave]);

  const renderField = (field: FormField) => {
    if (field.hidden || (field.conditional && !field.conditional(formData))) {
      return null;
    }

    const getFieldValue = (field: FormField) => {
      const formValue = formData[field.id];

      if (formValue !== undefined) {
        if (touched[field.id] || formValue !== "") return formValue;

        if (formValue === "" && !touched[field.id]) {
        } else {
          return formValue;
        }
      }

      if (field.defaultValue !== undefined) return field.defaultValue;

      switch (field.type) {
        case "checkbox":
        case "switch":
          return false;
        case "multi-select":
          return [];
        case "number":
          return "";
        case "slider":
          return field.sliderProps?.min ?? 0;
        case "range-slider":
          return [field.sliderProps?.min ?? 0, field.sliderProps?.max ?? 100];
        default:
          return "";
      }
    };

    const value = getFieldValue(field);

    const error = errors[field.id];
    const hasError = !!error && touched[field.id];

    const getFieldClassName = (type: string) => {
      switch (type) {
        case "checkbox":
        case "switch":
          return "col-span-full";
        case "textarea":
          return "col-span-full";
        case "slider":
        case "range-slider":
          return "col-span-full sm:col-span-2";
        default:
          return "col-span-full sm:col-span-1";
      }
    };

    const fieldWrapper = (component: React.ReactNode) => (
      <div
        key={field.id}
        className={cn("space-y-2", getFieldClassName(field.type))}
      >
        <Label
          htmlFor={field.id}
          required={field.validation?.required}
          className="block"
        >
          {field.label}
        </Label>

        {component}
        {field.description && (
          <p className="text-xs text-muted-foreground">{field.description}</p>
        )}
        <AnimatePresence>
          {hasError && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="flex items-center space-x-1 text-destructive"
            >
              <AlertCircle className="w-3 h-3" />
              <span className="text-xs">{error}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );

    const normalizeOptions = (
      options: FormFieldOption[] | string[] | undefined
    ) => {
      if (!options) return [];
      return options.map((opt) =>
        typeof opt === "string" ? { label: opt, value: opt } : opt
      );
    };

    switch (field.type) {
      case "checkbox":
        return fieldWrapper(
          <Checkbox
            id={field.id}
            checked={value || false}
            onChange={(checked) => handleFieldChange(field.id, checked)}
            disabled={field.disabled || loading}
            className={cn(field.className, hasError && "border-destructive")}
            {...field.inputProps}
          />
        );

      case "switch":
        return fieldWrapper(
          <Switch
            id={field.id}
            checked={value || false}
            onCheckedChange={(checked) => handleFieldChange(field.id, checked)}
            disabled={field.disabled || loading}
            className={cn(field.className, hasError && "border-destructive")}
            {...field.inputProps}
          />
        );

      case "radio":
        return fieldWrapper(
          <RadioGroup
            value={value || ""}
            onValueChange={(val) => handleFieldChange(field.id, val)}
            disabled={field.disabled || loading}
            className={cn(field.className, hasError && "border-destructive")}
          >
            {normalizeOptions(field.options).map((option) => (
              <div key={option.value} className="flex items-center space-x-2">
                <RadioGroupItem
                  {...field.inputProps}
                  value={String(option.value)}
                  id={`${field.id}-${option.value}`}
                  disabled={option.disabled || field.disabled || loading}
                />
                <Label
                  htmlFor={`${field.id}-${option.value}`}
                  className="cursor-pointer"
                >
                  {option.label}
                </Label>
              </div>
            ))}
          </RadioGroup>
        );

      case "select":
        return fieldWrapper(
          <Select
            value={value || ""}
            onValueChange={(val) => handleFieldChange(field.id, val)}
            disabled={field.disabled || loading}
            className={cn(field.className, hasError && "border-destructive")}
          >
            <SelectTrigger>
              <SelectValue placeholder={field.placeholder} />
            </SelectTrigger>
            <SelectContent>
              {normalizeOptions(field.options).map((option) => (
                <SelectItem
                  key={option.value}
                  value={String(option.value)}
                  disabled={option.disabled}
                >
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        );

      case "multi-select":
        return fieldWrapper(
          <MultiSelect
            values={value || []}
            onValuesChange={(vals) => handleFieldChange(field.id, vals)}
            disabled={field.disabled || loading}
            className={cn(field.className, hasError && "border-destructive")}
          >
            <MultiSelectTrigger>
              <MultiSelectValue placeholder={field.placeholder} />
            </MultiSelectTrigger>
            <MultiSelectContent>
              {normalizeOptions(field.options).map((option) => (
                <MultiSelectItem
                  key={option.value}
                  value={String(option.value)}
                  disabled={option.disabled}
                >
                  {option.label}
                </MultiSelectItem>
              ))}
            </MultiSelectContent>
          </MultiSelect>
        );

      case "slider":
        return fieldWrapper(
          <div className="space-y-3">
            <Slider
              value={value ?? field.sliderProps?.min ?? 0}
              onChange={(val) => handleFieldChange(field.id, val)}
              min={field.sliderProps?.min ?? 0}
              max={field.sliderProps?.max ?? 100}
              step={field.sliderProps?.step ?? 1}
              disabled={field.disabled || loading}
              className={cn(field.className, hasError && "border-destructive")}
            />
            <div className="text-center text-sm text-muted-foreground">
              Value: {value ?? field.sliderProps?.min ?? 0}
            </div>
          </div>
        );

      case "range-slider":
        return fieldWrapper(
          <div className="space-y-3">
            <RangeSlider
              value={
                value || [
                  field.sliderProps?.min ?? 0,
                  field.sliderProps?.max ?? 100,
                ]
              }
              onChange={(val) => handleFieldChange(field.id, val)}
              min={field.sliderProps?.min ?? 0}
              max={field.sliderProps?.max ?? 100}
              step={field.sliderProps?.step ?? 1}
              disabled={field.disabled || loading}
              className={cn(field.className, hasError && "border-destructive")}
            />
            <div className="text-center text-sm text-muted-foreground">
              Range: {value?.[0] ?? field.sliderProps?.min ?? 0} -{" "}
              {value?.[1] ?? field.sliderProps?.max ?? 100}
            </div>
          </div>
        );

      case "textarea":
        return fieldWrapper(
          <Textarea
            {...field.inputProps}
            id={field.id}
            value={value || ""}
            onChange={(e) => handleFieldChange(field.id, e.target.value)}
            placeholder={field.placeholder}
            disabled={field.disabled || loading}
            className={cn(field.className, hasError && "border-destructive")}
          />
        );

      case "number":
        return fieldWrapper(
          <Input
            {...field.inputProps}
            id={field.id}
            type="number"
            value={value || ""}
            onChange={(e) =>
              handleFieldChange(
                field.id,
                e.target.value ? Number(e.target.value) : ""
              )
            }
            placeholder={field.placeholder}
            min={field.validation?.min}
            max={field.validation?.max}
            disabled={field.disabled || loading}
            className={cn(field.className, hasError && "border-destructive")}
          />
        );

      case "file":
        return fieldWrapper(
          <Input
            {...field.inputProps}
            id={field.id}
            type="file"
            onChange={(e) => handleFieldChange(field.id, e.target.files)}
            disabled={field.disabled || loading}
            className={cn(field.className, hasError && "border-destructive")}
          />
        );
      case "image":
        return fieldWrapper(
          <ImageInput
            {...field.inputProps}
            id={field.id}
            onChange={(e) => handleFieldChange(field.id, e.target.files)}
            disabled={field.disabled || loading}
            className={cn(field.className, hasError && "border-destructive")}
            previewUrl={field.defaultValue}
          />
        );
      case "date":
      case "datetime-local":
        return fieldWrapper(
          <DatePicker
            {...field.inputProps}
            value={value ? new Date(value) : null}
            onChange={(date) =>
              handleFieldChange(
                field.id,
                date ? date.toLocaleDateString("en-CA") : ""
              )
            }
            placeholder={field.placeholder}
            disabled={field.disabled || loading}
            className={cn(field.className, hasError && "border-destructive")}
            includeTime={field.type === "datetime-local"}
            minDate={
              field.validation?.min ? new Date(field.validation.min) : undefined
            }
            maxDate={
              field.validation?.max ? new Date(field.validation.max) : undefined
            }
          />
        );
      default:
        return fieldWrapper(
          <Input
            {...field.inputProps}
            id={field.id}
            type={field.type}
            value={value || ""}
            onChange={(e) => {
              const inputValue =
                field.type === "tel"
                  ? e.target.value.replace(/[^0-9+\-\s()]/g, "")
                  : e.target.value;
              handleFieldChange(field.id, inputValue);
            }}
            placeholder={field.placeholder}
            disabled={field.disabled || loading}
            className={cn(field.className, hasError && "border-destructive")}
          />
        );
    }
  };

  const canProceed = () => {
    const visibleFields = currentFields.filter(
      (field) =>
        !field.hidden && (!field.conditional || field.conditional(formData))
    );

    const requiredFields = visibleFields.filter(
      (field) => field.validation?.required
    );
    const hasRequiredErrors = requiredFields.some((field) => {
      const value = formData[field.id];
      if (field.type === "checkbox" || field.type === "switch") {
        return !value;
      }
      if (field.type === "multi-select") {
        return !value || value.length === 0;
      }

      if (field.type === "slider") {
        if (value === undefined || value === null) return true;
        if (field.validation?.min !== undefined && value < field.validation.min)
          return true;
        return false;
      }
      if (field.type === "range-slider") {
        if (!value || !Array.isArray(value) || value.length !== 2) return true;
        if (
          field.validation?.min !== undefined &&
          value[0] < field.validation.min
        )
          return true;
        return false;
      }

      return !value || (typeof value === "string" && value.trim() === "");
    });

    return !hasRequiredErrors;
  };

  const isLastStep = currentStep === totalSteps - 1;

  return (
    <div
      className={cn(
        "border border-border rounded-lg p-4 sm:p-6 w-full max-w-6xl mx-auto space-y-6 bg-secondary dark:bg-muted",
        className
      )}
    >
      {logo && (
        <div className="flex justify-center mb-4">
          <Image
            src={logo}
            alt="Logo"
            width={120}
            height={80}
            className={cn("object-contain", logoClassName)}
            priority
          />
        </div>
      )}

      {header && (
        <div className={cn("space-y-2", header.className)}>
          {header.title && (
            <h1 className="text-2xl text-center font-bold text-foreground">
              {header.title}
            </h1>
          )}
          {header.description && (
            <p className="text-muted-foreground text-center">
              {header.description}
            </p>
          )}
          {header.children}
        </div>
      )}

      {isSteppedForm && showStepProgress && (
        <div className={cn("w-full mx-auto", stepperClassName)}>
          <Stepper
            steps={steps.map((step) => ({
              id: step.id,
              title: step.title,
              description: step.description,
            }))}
            currentStep={currentStep}
            size="md"
            showLabels={true}
            className="max-w-full"
          />
        </div>
      )}

      <form onSubmit={handleSubmit} className={cn("space-y-6", formClassName)}>
        {shouldShowSkeleton ? (
          <FormSkeleton
            {...skeletonProps}
            className={cn(skeletonProps?.className)}
          />
        ) : (
          <AnimatePresence mode="wait">
            <motion.div
              key={isSteppedForm ? currentStep : "form"}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {currentFields.map(renderField)}
              </div>
            </motion.div>
          </AnimatePresence>
        )}

        <div className="flex flex-col sm:flex-row gap-3 items-center justify-between pt-6 border-t border-border">
          <div className="flex flex-wrap gap-3 items-center justify-center sm:justify-start">
            {isSteppedForm && currentStep > 0 && (
              <Button
                type="button"
                variant="outline"
                onClick={handleBack}
                disabled={loading}
                className="flex items-center space-x-2 min-w-[100px]"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>{backText}</span>
              </Button>
            )}
            {showReset && (
              <Button
                type="button"
                variant="destructive"
                onClick={handleReset}
                disabled={loading}
                className="min-w-[100px]"
              >
                {resetText}
              </Button>
            )}
          </div>

          <div className="flex items-center justify-center sm:justify-end">
            {isSteppedForm && !isLastStep ? (
              !canProceed() ? (
                <Tooltip
                  content="Fill all the required fields marked with *"
                  side="top"
                >
                  <div>
                    <Button
                      type="button"
                      onClick={handleNext}
                      disabled={true}
                      className="flex items-center space-x-2 min-w-[100px]"
                    >
                      <span>{nextText}</span>
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </Tooltip>
              ) : (
                <Button
                  type="button"
                  onClick={handleNext}
                  disabled={loading}
                  className="flex items-center space-x-2 min-w-[100px]"
                >
                  <span>{nextText}</span>
                  <ChevronRight className="w-4 h-4" />
                </Button>
              )
            ) : !canProceed() &&
              !loading &&
              !isSubmitting &&
              !isSubmitLoading ? (
              <Tooltip
                content="Fill all the required fields marked with *"
                side="top"
              >
                <div>
                  <Button
                    type="submit"
                    disabled={true}
                    className="min-w-[120px]"
                    isLoading={isSubmitting || isSubmitLoading}
                  >
                    {submitText}
                  </Button>
                </div>
              </Tooltip>
            ) : (
              <Button
                type="submit"
                disabled={false}
                className="min-w-[120px]"
                isLoading={isSubmitting || isSubmitLoading}
              >
                {submitText}
              </Button>
            )}
          </div>
        </div>
      </form>

      {footer && (
        <div className={cn("pt-4 border-t border-border", footer.className)}>
          {footer.children}
        </div>
      )}
    </div>
  );
};
