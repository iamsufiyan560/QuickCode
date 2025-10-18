"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useRef,
  Dispatch,
  SetStateAction,
  useMemo,
  useCallback,
  memo,
} from "react";
import { motion, AnimatePresence, HTMLMotionProps } from "framer-motion";
import { ChevronLeft, ChevronRight, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

import { Button } from "@/components/custom/Button";
import { Input } from "@/components/custom/Input";
import { Checkbox } from "@/components/custom/Checkbox";
import {
  RadioGroup as RadioGroupBase,
  RadioGroupItem,
} from "@/components/custom/RadioGroup";
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
import { Label as LabelBase } from "@/components/custom/Label";
import { Stepper, StepperProps } from "./Stepper";
import { Tooltip } from "@/components/custom/Tooltip";
import { ImageInput } from "@/components/custom/ImageInput";
import { FormSkeleton, FormSkeletonProps } from "./FormSkeleton";
import Image from "next/image";
import { DatePicker } from "./DatePicker";
import { PasswordInput } from "./PasswordInput";
import { DateRangePicker } from "./DateRangePicker";
import { MultiInput } from "./MultiInput";
import { CheckboxGroup as CheckboxGroupBase } from "./CheckboxGroup";

interface FormFieldValidation {
  required?: boolean;
  minLength?: number;
  maxLength?: number;
  min?: number;
  max?: number;
  pattern?: RegExp;
  override?: boolean;
  custom?: (value: any) => string | null;
  requiredError?: string;
  minLengthError?: string;
  maxLengthError?: string;
  minError?: string;
  maxError?: string;
  patternError?: string;
  emailError?: string;
  urlError?: string;
  telError?: string;
  passwordError?: string;
  customFileError?: string;
  maxSize?: number;
  acceptedTypes?: string[];
}

interface FieldContextValue {
  id: string;
  validation?: FormFieldValidation;
  error?: string;
  touched: boolean;
}

interface StepContextValue {
  stepId: string;
  stepIndex: number;
}

interface FormContextValue {
  formData: Record<string, any>;
  errors: Record<string, string>;
  touched: Record<string, boolean>;
  currentStep: number;
  steps: Array<{ id: string; title: string; description?: string }>;
  fields: Map<string, { validation?: FormFieldValidation; stepId?: string }>;
  setFormData: Dispatch<SetStateAction<Record<string, any>>>;
  setErrors: Dispatch<SetStateAction<Record<string, string>>>;
  setTouched: Dispatch<SetStateAction<Record<string, boolean>>>;
  setCurrentStep: Dispatch<SetStateAction<number>>;
  setFieldValue: (id: string, value: any) => void;
  setFieldTouched: (id: string) => void;
  registerField: (
    id: string,
    validation?: FormFieldValidation,
    stepId?: string
  ) => void;
  unregisterField: (id: string) => void;
  registerStep: (id: string, title: string, description?: string) => void;
  validateField: (id: string, value?: any, inputType?: string) => void;
  canProceed: () => boolean;
  loading: boolean;
  disabled: boolean;
  onChange?: (data: Record<string, any>) => void;
  autoSave: boolean;
  autoSaveKey?: string;
  clearStorage: () => void;
  isSubmitting: boolean;
  setIsSubmitting: Dispatch<SetStateAction<boolean>>;
}

const FormContext = createContext<FormContextValue | null>(null);
const FieldContext = createContext<FieldContextValue | null>(null);
const StepContext = createContext<StepContextValue | null>(null);

const useFormContext = () => {
  const context = useContext(FormContext);
  if (!context) {
    console.error("Form components must be used within AdvancedForm");
  }
  return context!;
};

const useFieldContext = () => {
  const context = useContext(FieldContext);
  if (!context) {
    console.error("This component must be used within AdvancedForm.Field");
  }
  return context!;
};

const useStepContext = () => {
  return useContext(StepContext);
};

const getDefaultValidation = (type: string) => {
  switch (type) {
    case "email":
      return {
        pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        message: "Invalid email address",
      };
    case "url":
      return {
        pattern: /^https?:\/\/.+/,
        message: "Invalid URL",
      };
    case "tel":
      return {
        pattern: /^[\+]?[0-9\s\-\(\)]+$/,
        message: "Invalid phone number",
      };
    case "password":
      return {
        pattern:
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
        message:
          "Password must contain at least 8 characters, one uppercase, one lowercase, one number and one special character",
      };
    default:
      return null;
  }
};

const validateSingleField = (
  fieldId: string,
  value: any,
  fieldConfig: { validation?: FormFieldValidation; stepId?: string },
  inputType?: string
): string | null => {
  const validation = fieldConfig.validation || {};
  const errors: string[] = [];

  if (validation.required) {
    if (Array.isArray(value)) {
      if (value.length === 0) {
        errors.push(validation.requiredError || "This field is required");
      }
    } else if (typeof value === "boolean") {
      if (value !== true) {
        errors.push(validation.requiredError || "This field is required");
      }
    } else if (
      value === undefined ||
      value === null ||
      value === "" ||
      (typeof value === "string" && value.trim() === "")
    ) {
      errors.push(validation.requiredError || "This field is required");
    }
  }

  if (value !== undefined && value !== null && value !== "") {
    const defaultValidation = inputType
      ? getDefaultValidation(inputType)
      : null;

    if (defaultValidation && !validation.override) {
      if (!defaultValidation.pattern.test(String(value))) {
        const errorKey = `${inputType}Error` as keyof FormFieldValidation;
        errors.push(
          (validation[errorKey] as string) || defaultValidation.message
        );
      }
    }

    if (validation.pattern) {
      if (!validation.pattern.test(String(value))) {
        errors.push(validation.patternError || "Invalid format");
      }
    }

    if (validation.minLength !== undefined && typeof value === "string") {
      if (value.length < validation.minLength) {
        errors.push(
          validation.minLengthError ||
            `Minimum length is ${validation.minLength}`
        );
      }
    }

    if (validation.maxLength !== undefined && typeof value === "string") {
      if (value.length > validation.maxLength) {
        errors.push(
          validation.maxLengthError ||
            `Maximum length is ${validation.maxLength}`
        );
      }
    }

    if (validation.min !== undefined && typeof value === "number") {
      if (value < validation.min) {
        errors.push(
          validation.minError || `Minimum value is ${validation.min}`
        );
      }
    }

    if (validation.max !== undefined && typeof value === "number") {
      if (value > validation.max) {
        errors.push(
          validation.maxError || `Maximum value is ${validation.max}`
        );
      }
    }

    if (validation.custom) {
      const customError = validation.custom(value);
      if (customError) {
        errors.push(customError);
      }
    }
  }

  return errors[0] || null;
};

interface AdvancedFormProps
  extends Omit<
    React.ComponentProps<"div">,
    "onChange" | "autoSave" | "loading"
  > {
  children: React.ReactNode;
  onSubmit: (data: Record<string, any>) => void | Promise<void>;
  onChange?: (data: Record<string, any>) => void;
  initialValues?: Record<string, any>;
  autoSave?: boolean;
  autoSaveKey?: string;
  className?: string;
  loading?: boolean;
  isFormLoading?: boolean;
  skeletonProps?: FormSkeletonProps;
}

const AdvancedFormRoot: React.FC<AdvancedFormProps> = ({
  children,
  onChange,
  initialValues = {},
  autoSave = false,
  autoSaveKey,
  className,
  loading = false,
  isFormLoading = false,
  skeletonProps,
  ...props
}) => {
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});
  const [currentStep, setCurrentStep] = useState(0);
  const [steps, setSteps] = useState<
    Array<{ id: string; title: string; description?: string }>
  >([]);
  const [isInitializing, setIsInitializing] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fields = useRef(
    new Map<string, { validation?: FormFieldValidation; stepId?: string }>()
  );

  const formInstanceId = useRef(
    `form-${Math.random().toString(36).substr(2, 9)}`
  ).current;

  const autoSaveTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const getStorageKey = useCallback(() => {
    return autoSaveKey || `form-auto-save-${formInstanceId}`;
  }, [autoSaveKey, formInstanceId]);

  const clearStorage = useCallback(() => {
    if (autoSave) {
      localStorage.removeItem(getStorageKey());
    }
  }, [autoSave, getStorageKey]);

  const debouncedAutoSave = useCallback(
    (data: Record<string, any>) => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
      autoSaveTimeoutRef.current = setTimeout(() => {
        localStorage.setItem(getStorageKey(), JSON.stringify(data));
      }, 500);
    },
    [getStorageKey]
  );

  const setFieldValue = useCallback(
    (id: string, value: any) => {
      setFormData((prev) => {
        const newData = { ...prev, [id]: value };
        onChange?.(newData);

        if (autoSave && !isInitializing) {
          debouncedAutoSave(newData);
        }

        return newData;
      });
    },
    [onChange, autoSave, isInitializing, debouncedAutoSave]
  );

  const setFieldTouched = useCallback((id: string) => {
    setTouched((prev) => {
      if (prev[id]) return prev;
      return { ...prev, [id]: true };
    });
  }, []);

  const validateField = useCallback(
    (id: string, value?: any, inputType?: string) => {
      const fieldConfig = fields.current.get(id);
      if (!fieldConfig) return;

      setFormData((currentFormData) => {
        const fieldValue = value !== undefined ? value : currentFormData[id];
        const error = validateSingleField(
          id,
          fieldValue,
          fieldConfig,
          inputType
        );

        setErrors((prev) => {
          const updated = { ...prev };
          if (error) {
            updated[id] = error;
          } else {
            delete updated[id];
          }
          return updated;
        });

        return currentFormData;
      });
    },
    []
  );

  const registerField = useCallback(
    (id: string, validation?: FormFieldValidation, stepId?: string) => {
      fields.current.set(id, { validation, stepId });
    },
    []
  );

  const unregisterField = useCallback((id: string) => {
    // fields.current.delete(id);
  }, []);

  const registerStep = useCallback(
    (id: string, title: string, description?: string) => {
      setSteps((prev) => {
        const exists = prev.find((s) => s.id === id);
        if (exists) return prev;
        return [...prev, { id, title, description }];
      });
    },
    []
  );

  const canProceed = useCallback(() => {
    const currentStepFields = Array.from(fields.current.entries()).filter(
      ([_, config]) =>
        steps.length === 0 || config.stepId === steps[currentStep]?.id
    );

    if (currentStepFields.length === 0) return false;

    const hasRequiredErrors = currentStepFields.some(([fieldId, config]) => {
      if (!config.validation?.required) return false;
      const value = formData[fieldId];

      if (Array.isArray(value)) return value.length === 0;
      if (typeof value === "boolean") return value !== true;
      return (
        value === undefined ||
        value === null ||
        value === "" ||
        (typeof value === "string" && value.trim() === "")
      );
    });

    return !hasRequiredErrors;
  }, [formData, currentStep, steps]);

  useEffect(() => {
    setIsInitializing(true);
    let initialData = { ...initialValues };

    if (autoSave && Object.keys(initialValues).length === 0) {
      const saved = localStorage.getItem(getStorageKey());
      if (saved) {
        try {
          const parsedData = JSON.parse(saved);
          initialData = { ...parsedData };
        } catch (error) {
          console.error("Failed to parse auto-saved data:", error);
        }
      }
    }

    setFormData(initialData);
    setTimeout(() => setIsInitializing(false), 0);
  }, [autoSave, getStorageKey]);

  useEffect(() => {
    return () => {
      if (autoSaveTimeoutRef.current) {
        clearTimeout(autoSaveTimeoutRef.current);
      }
    };
  }, []);

  const contextValue = useMemo<FormContextValue>(
    () => ({
      formData,
      errors,
      touched,
      currentStep,
      steps,
      fields: fields.current,
      setFormData,
      setErrors,
      setTouched,
      setCurrentStep,
      setFieldValue,
      setFieldTouched,
      registerField,
      unregisterField,
      registerStep,
      validateField,
      canProceed,
      loading: loading || isFormLoading,
      disabled: loading || isFormLoading,
      onChange,
      autoSave,
      autoSaveKey,
      clearStorage,
      isSubmitting,
      setIsSubmitting,
    }),
    [
      formData,
      errors,
      touched,
      currentStep,
      steps,
      loading,
      isFormLoading,
      onChange,
      autoSave,
      autoSaveKey,
      isSubmitting,
      setFieldValue,
      setFieldTouched,
      registerField,
      unregisterField,
      registerStep,
      validateField,
      canProceed,
      clearStorage,
    ]
  );

  return (
    <FormContext.Provider value={contextValue}>
      <div
        {...props}
        className={cn(
          "border border-border rounded-lg p-4 sm:p-6 w-full max-w-6xl mx-auto space-y-6 bg-white dark:bg-muted",
          className
        )}
      >
        {isFormLoading || isInitializing ? (
          <FormSkeleton {...skeletonProps} />
        ) : (
          children
        )}
      </div>
    </FormContext.Provider>
  );
};

interface HeaderProps extends React.ComponentProps<"div"> {
  title?: string;
  description?: string;
  logo?: string;
  logoClassName?: string;
  className?: string;
  children?: React.ReactNode;
}

const Header: React.FC<HeaderProps> = memo(
  ({
    title,
    description,
    logo,
    logoClassName,
    className,
    children,
    ...props
  }) => {
    return (
      <>
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
        <div {...props} className={cn("space-y-2", className)}>
          {title && (
            <h1 className="text-2xl text-center font-bold text-foreground">
              {title}
            </h1>
          )}
          {description && (
            <p className="text-muted-foreground text-center">{description}</p>
          )}
          {children}
        </div>
      </>
    );
  }
);
Header.displayName = "Header";

interface StepperProgressProps extends React.ComponentProps<"div"> {
  className?: string;
  size?: "sm" | "md" | "lg";
  showLabels?: boolean;
}

const StepperProgress: React.FC<StepperProgressProps> = memo(
  ({ className, size = "md", showLabels = true, ...props }) => {
    const { steps, currentStep } = useFormContext();

    if (steps.length === 0) return null;

    return (
      <div {...props} className={cn("w-full mx-auto", className)}>
        <Stepper
          steps={steps}
          currentStep={currentStep}
          size={size}
          showLabels={showLabels}
          className="max-w-full"
        />
      </div>
    );
  }
);
StepperProgress.displayName = "StepperProgress";

interface StepProps extends HTMLMotionProps<"div"> {
  id: string;
  title: string;
  description?: string;
  children: React.ReactNode;
  className?: string;
}

const Step: React.FC<StepProps> = memo(
  ({ id, title, description, children, className, ...props }) => {
    const { currentStep, steps, registerStep } = useFormContext();

    useEffect(() => {
      registerStep(id, title, description);
    }, [id, title, description, registerStep]);

    const stepIndex = steps.findIndex((s) => s.id === id);
    const isActive = stepIndex === currentStep;

    if (!isActive) return null;

    return (
      <StepContext.Provider value={{ stepId: id, stepIndex }}>
        <AnimatePresence mode="wait">
          <motion.div
            {...props}
            key={id}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
            className={cn("space-y-6", className)}
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </StepContext.Provider>
    );
  }
);
Step.displayName = "Step";

interface GroupProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

const Group: React.FC<GroupProps> = memo(
  ({ children, className, ...props }) => {
    return (
      <div
        {...props}
        className={cn("grid grid-cols-1 gap-4 sm:gap-6", className)}
      >
        {children}
      </div>
    );
  }
);
Group.displayName = "Group";

interface FieldProps extends React.ComponentProps<"div"> {
  id: string;
  validation?: FormFieldValidation;
  defaultValue?: any;
  conditional?: (values: Record<string, any>) => boolean;
  children: React.ReactNode;
  className?: string;
}

const Field: React.FC<FieldProps> = memo(
  ({
    id,
    validation,
    defaultValue,
    conditional,
    children,
    className,
    ...props
  }) => {
    const {
      formData,
      errors,
      touched,
      registerField,
      unregisterField,
      setFieldValue,
      setErrors,
      setTouched,
    } = useFormContext();
    const stepContext = useStepContext();
    const hasSetDefault = useRef(false);

    const isVisible = useMemo(
      () => (conditional ? conditional(formData) : true),
      [conditional, formData]
    );

    useEffect(() => {
      if (isVisible) {
        registerField(id, validation, stepContext?.stepId);

        if (
          defaultValue !== undefined &&
          formData[id] === undefined &&
          !hasSetDefault.current
        ) {
          setFieldValue(id, defaultValue);
          hasSetDefault.current = true;
        }
      } else {
        unregisterField(id);
        setErrors((prev) => {
          const newErrors = { ...prev };
          delete newErrors[id];
          return newErrors;
        });
        setTouched((prev) => {
          const newTouched = { ...prev };
          delete newTouched[id];
          return newTouched;
        });
      }

      return () => {
        unregisterField(id);
      };
    }, [
      id,
      validation,
      stepContext?.stepId,
      isVisible,
      registerField,
      unregisterField,
    ]);

    if (!isVisible) {
      return null;
    }

    const fieldContext: FieldContextValue = {
      id,
      validation,
      error: errors[id],
      touched: touched[id] || false,
    };

    return (
      <FieldContext.Provider value={fieldContext}>
        <div {...props} className={cn("space-y-2", className)}>
          {children}
        </div>
      </FieldContext.Provider>
    );
  }
);
Field.displayName = "Field";

interface LabelProps extends React.ComponentProps<"label"> {
  required?: boolean;
  children: React.ReactNode;
}

const Label: React.FC<LabelProps> = memo(
  ({ required, children, className, ...props }) => {
    const fieldContext = useFieldContext();

    return (
      <LabelBase
        htmlFor={fieldContext?.id}
        required={required}
        className={cn("block", className)}
        {...props}
      >
        {children}
      </LabelBase>
    );
  }
);
Label.displayName = "Label";

interface DescriptionProps extends React.ComponentProps<"p"> {
  children: React.ReactNode;
  className?: string;
}

const Description: React.FC<DescriptionProps> = memo(
  ({ children, className, ...props }) => {
    return (
      <p {...props} className={cn("text-xs text-muted-foreground", className)}>
        {children}
      </p>
    );
  }
);
Description.displayName = "Description";

interface ErrorProps extends HTMLMotionProps<"div"> {
  className?: string;
}

const Error: React.FC<ErrorProps> = memo(({ className, ...props }) => {
  const { error, touched } = useFieldContext();

  return (
    <AnimatePresence>
      {error && touched && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          exit={{ opacity: 0, height: 0 }}
          className={cn(
            "flex items-center space-x-1 text-destructive",
            className
          )}
          {...props}
        >
          <AlertCircle className="w-3 h-3" />
          <span className="text-xs">{error}</span>
        </motion.div>
      )}
    </AnimatePresence>
  );
});
Error.displayName = "Error";

interface FormInputProps
  extends Omit<React.ComponentProps<typeof Input>, "onChange"> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: React.FC<FormInputProps> = memo(
  ({ type = "text", onChange: customOnChange, className, ...props }) => {
    const { id, error, touched } = useFieldContext();
    const {
      formData,
      setFieldValue,
      setFieldTouched,
      validateField,
      disabled,
    } = useFormContext();
    const value = formData[id] || "";

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        let inputValue = e.target.value;

        if (type === "tel") {
          inputValue = inputValue.replace(/[^0-9+\-\s()]/g, "");
        }

        setFieldTouched(id);
        setFieldValue(id, inputValue);
        validateField(id, inputValue, type);
        customOnChange?.(e);
      },
      [id, type, setFieldTouched, setFieldValue, validateField, customOnChange]
    );

    const hasError = !!error && touched;

    return (
      <Input
        {...props}
        id={id}
        type={type}
        value={value}
        onChange={handleChange}
        disabled={disabled || props.disabled}
        className={cn(hasError && "border-destructive", className)}
      />
    );
  }
);
FormInput.displayName = "FormInput";

interface FormTextareaProps
  extends Omit<React.ComponentProps<typeof Textarea>, "onChange"> {
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const FormTextarea: React.FC<FormTextareaProps> = memo(
  ({ onChange: customOnChange, className, ...props }) => {
    const { id, error, touched } = useFieldContext();
    const {
      formData,
      setFieldValue,
      setFieldTouched,
      validateField,
      disabled,
    } = useFormContext();
    const value = formData[id] || "";

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        const inputValue = e.target.value;
        setFieldTouched(id);
        setFieldValue(id, inputValue);
        validateField(id, inputValue);
        customOnChange?.(e);
      },
      [id, setFieldTouched, setFieldValue, validateField, customOnChange]
    );

    const hasError = !!error && touched;

    return (
      <Textarea
        {...props}
        id={id}
        value={value}
        onChange={handleChange}
        disabled={disabled || props.disabled}
        className={cn(hasError && "border-destructive", className)}
      />
    );
  }
);
FormTextarea.displayName = "FormTextarea";

interface FormPasswordInputProps
  extends Omit<React.ComponentProps<typeof PasswordInput>, "onChange"> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormPasswordInput: React.FC<FormPasswordInputProps> = memo(
  ({ onChange: customOnChange, className, ...props }) => {
    const { id, error, touched } = useFieldContext();
    const {
      formData,
      setFieldValue,
      setFieldTouched,
      validateField,
      disabled,
    } = useFormContext();
    const value = formData[id] || "";

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const inputValue = e.target.value;
        setFieldTouched(id);
        setFieldValue(id, inputValue);
        validateField(id, inputValue, "password");
        customOnChange?.(e);
      },
      [id, setFieldTouched, setFieldValue, validateField, customOnChange]
    );

    const hasError = !!error && touched;

    return (
      <PasswordInput
        {...props}
        id={id}
        value={value}
        onChange={handleChange}
        disabled={disabled || props.disabled}
        className={cn(hasError && "border-destructive", className)}
      />
    );
  }
);
FormPasswordInput.displayName = "FormPasswordInput";

interface FormCheckboxProps
  extends Omit<React.ComponentProps<typeof Checkbox>, "onChange" | "checked"> {
  children?: React.ReactNode;
}

const FormCheckbox: React.FC<FormCheckboxProps> = memo(
  ({ children, className, ...props }) => {
    const { id, error, touched } = useFieldContext();
    const {
      formData,
      setFieldValue,
      setFieldTouched,
      validateField,
      disabled,
    } = useFormContext();
    const checked = formData[id] || false;

    const handleChange = useCallback(
      (value: boolean) => {
        setFieldTouched(id);
        setFieldValue(id, value);
        validateField(id, value);
      },
      [id, setFieldTouched, setFieldValue, validateField]
    );

    const hasError = !!error && touched;

    return (
      <div className="flex items-center space-x-2">
        <Checkbox
          {...props}
          id={id}
          checked={checked}
          onChange={handleChange}
          disabled={disabled || props.disabled}
          className={cn(hasError && "border-destructive", className)}
        />
        {children && (
          <label htmlFor={id} className="text-sm cursor-pointer">
            {children}
          </label>
        )}
      </div>
    );
  }
);
FormCheckbox.displayName = "FormCheckbox";

interface FormSwitchProps
  extends Omit<
    React.ComponentProps<typeof Switch>,
    "onCheckedChange" | "checked"
  > {
  children?: React.ReactNode;
}

const FormSwitch: React.FC<FormSwitchProps> = memo(
  ({ children, className, ...props }) => {
    const { id, error, touched } = useFieldContext();
    const {
      formData,
      setFieldValue,
      setFieldTouched,
      validateField,
      disabled,
    } = useFormContext();
    const checked = formData[id] || false;

    const handleChange = useCallback(
      (value: boolean) => {
        setFieldTouched(id);
        setFieldValue(id, value);
        validateField(id, value);
      },
      [id, setFieldTouched, setFieldValue, validateField]
    );

    const hasError = !!error && touched;

    return (
      <div className="flex items-center space-x-2">
        <Switch
          {...props}
          id={id}
          checked={checked}
          onCheckedChange={handleChange}
          disabled={disabled || props.disabled}
          className={cn(hasError && "border-destructive", className)}
        />
        {children && (
          <label htmlFor={id} className="text-sm cursor-pointer">
            {children}
          </label>
        )}
      </div>
    );
  }
);
FormSwitch.displayName = "FormSwitch";

interface FormRadioGroupProps
  extends React.ComponentProps<typeof RadioGroupBase> {
  className?: string;
  children: React.ReactNode;
}

const FormRadioGroup: React.FC<FormRadioGroupProps> = memo(
  ({
    className,
    children,

    ...props
  }) => {
    const { id, error, touched } = useFieldContext();
    const {
      formData,
      setFieldValue,
      setFieldTouched,
      validateField,
      disabled,
    } = useFormContext();
    const value = formData[id] || "";

    const handleChange = useCallback(
      (val: string) => {
        setFieldTouched(id);
        setFieldValue(id, val);
        validateField(id, val);
      },
      [id, setFieldTouched, setFieldValue, validateField]
    );

    const hasError = !!error && touched;

    return (
      <RadioGroupBase
        {...props}
        value={value}
        onValueChange={handleChange}
        disabled={disabled}
        className={cn(hasError && "border-destructive", className)}
      >
        {children}
      </RadioGroupBase>
    );
  }
);
FormRadioGroup.displayName = "FormRadioGroup";

const FormRadioGroupItem = RadioGroupItem;
Object.assign(FormRadioGroup, { Item: FormRadioGroupItem });

interface FormSelectProps extends React.ComponentProps<typeof Select> {
  placeholder?: string;
  className?: string;
  children: React.ReactNode;
}

const FormSelect: React.FC<FormSelectProps> = memo(
  ({ placeholder, className, children, ...props }) => {
    const { id, error, touched } = useFieldContext();
    const {
      formData,
      setFieldValue,
      setFieldTouched,
      validateField,
      disabled,
    } = useFormContext();
    const value = formData[id] || "";

    const handleChange = useCallback(
      (val: string) => {
        setFieldTouched(id);
        setFieldValue(id, val);
        validateField(id, val);
      },
      [id, setFieldTouched, setFieldValue, validateField]
    );

    const hasError = !!error && touched;

    return (
      <Select
        {...props}
        value={value}
        onValueChange={handleChange}
        disabled={disabled}
        className={cn(hasError && "border-destructive", className)}
      >
        <SelectTrigger id={id}>
          <SelectValue placeholder={placeholder} />
        </SelectTrigger>
        <SelectContent>{children}</SelectContent>
      </Select>
    );
  }
);
FormSelect.displayName = "FormSelect";

const FormSelectItem = SelectItem;
Object.assign(FormSelect, { Item: FormSelectItem });

interface FormMultiSelectProps
  extends React.ComponentProps<typeof MultiSelect> {
  placeholder?: string;
  className?: string;
  children: React.ReactNode;
}

const FormMultiSelect: React.FC<FormMultiSelectProps> = memo(
  ({
    placeholder,
    className,
    children,

    ...props
  }) => {
    const { id, error, touched } = useFieldContext();
    const {
      formData,
      setFieldValue,
      setFieldTouched,
      validateField,
      disabled,
    } = useFormContext();
    const values = formData[id] || [];

    const handleChange = useCallback(
      (vals: string[]) => {
        setFieldTouched(id);
        setFieldValue(id, vals);
        validateField(id, vals);
      },
      [id, setFieldTouched, setFieldValue, validateField]
    );

    const hasError = !!error && touched;

    return (
      <MultiSelect
        {...props}
        values={values}
        onValuesChange={handleChange}
        disabled={disabled}
        className={cn(hasError && "border-destructive", className)}
      >
        <MultiSelectTrigger id={id}>
          <MultiSelectValue placeholder={placeholder} />
        </MultiSelectTrigger>
        <MultiSelectContent>{children}</MultiSelectContent>
      </MultiSelect>
    );
  }
);
FormMultiSelect.displayName = "FormMultiSelect";

const FormMultiSelectItem = MultiSelectItem;
Object.assign(FormMultiSelect, { Item: FormMultiSelectItem });

interface FormSliderProps extends React.ComponentProps<typeof Slider> {
  min?: number;
  max?: number;
  step?: number;
  showValue?: boolean;
  className?: string;
}

const FormSlider: React.FC<FormSliderProps> = memo(
  ({
    min = 0,
    max = 100,
    step = 1,
    showValue = true,
    className,

    ...props
  }) => {
    const { id, error, touched } = useFieldContext();
    const {
      formData,
      setFieldValue,
      setFieldTouched,
      validateField,
      disabled,
    } = useFormContext();
    const value = formData[id] ?? min;

    const handleChange = useCallback(
      (val: number) => {
        setFieldTouched(id);
        setFieldValue(id, val);
        validateField(id, val);
      },
      [id, setFieldTouched, setFieldValue, validateField]
    );

    const hasError = !!error && touched;

    return (
      <div className="space-y-3">
        <Slider
          {...props}
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={cn(hasError && "border-destructive", className)}
        />
        {showValue && (
          <div className="text-center text-sm text-muted-foreground">
            Value: {value}
          </div>
        )}
      </div>
    );
  }
);
FormSlider.displayName = "FormSlider";

interface FormRangeSliderProps
  extends React.ComponentProps<typeof RangeSlider> {
  min?: number;
  max?: number;
  step?: number;
  showValue?: boolean;
  className?: string;
}

const FormRangeSlider: React.FC<FormRangeSliderProps> = memo(
  ({ min = 0, max = 100, step = 1, showValue = true, className, ...props }) => {
    const { id, error, touched } = useFieldContext();
    const {
      formData,
      setFieldValue,
      setFieldTouched,
      validateField,
      disabled,
    } = useFormContext();
    const value = formData[id] || [min, max];

    const handleChange = useCallback(
      (val: [number, number]) => {
        setFieldTouched(id);
        setFieldValue(id, val);
        validateField(id, val);
      },
      [id, setFieldTouched, setFieldValue, validateField]
    );

    const hasError = !!error && touched;

    return (
      <div className="space-y-3">
        <RangeSlider
          {...props}
          value={value}
          onChange={handleChange}
          min={min}
          max={max}
          step={step}
          disabled={disabled}
          className={cn(hasError && "border-destructive", className)}
        />
        {showValue && (
          <div className="text-center text-sm text-muted-foreground">
            Range: {value[0]} - {value[1]}
          </div>
        )}
      </div>
    );
  }
);
FormRangeSlider.displayName = "FormRangeSlider";

interface FormCheckboxGroupProps
  extends React.ComponentProps<typeof CheckboxGroupBase> {
  className?: string;
  children: React.ReactNode;
}

const FormCheckboxGroup: React.FC<FormCheckboxGroupProps> = memo(
  ({
    className,
    children,

    ...props
  }) => {
    const { id, error, touched } = useFieldContext();
    const {
      formData,
      setFieldValue,
      setFieldTouched,
      validateField,
      disabled,
    } = useFormContext();
    const values = formData[id] || [];

    const handleChange = useCallback(
      (vals: string[]) => {
        setFieldTouched(id);
        setFieldValue(id, vals);
        validateField(id, vals);
      },
      [id, setFieldTouched, setFieldValue, validateField]
    );

    const hasError = !!error && touched;

    return (
      <CheckboxGroupBase
        {...props}
        value={values}
        onValueChange={handleChange}
        disabled={disabled}
        className={cn(hasError && "border-destructive", className)}
      >
        {children}
      </CheckboxGroupBase>
    );
  }
);
FormCheckboxGroup.displayName = "FormCheckboxGroup";

Object.assign(FormCheckboxGroup, { Item: CheckboxGroupBase.Item });

interface FormMultiInputProps extends React.ComponentProps<typeof MultiInput> {
  placeholder?: string;
  max?: number;
  className?: string;
}

const FormMultiInput: React.FC<FormMultiInputProps> = memo(
  ({ placeholder, max, className, ...props }) => {
    const { id, error, touched } = useFieldContext();
    const {
      formData,
      setFieldValue,
      setFieldTouched,
      validateField,
      disabled,
    } = useFormContext();
    const values = formData[id] || [];

    const handleChange = useCallback(
      (vals: string[]) => {
        setFieldTouched(id);
        setFieldValue(id, vals);
        validateField(id, vals);
      },
      [id, setFieldTouched, setFieldValue, validateField]
    );

    const hasError = !!error && touched;

    return (
      <MultiInput
        {...props}
        id={id}
        value={values}
        onChange={handleChange}
        placeholder={placeholder}
        max={max}
        disabled={disabled}
        className={cn(hasError && "border-destructive", className)}
      />
    );
  }
);
FormMultiInput.displayName = "FormMultiInput";

interface FormDatePickerProps extends React.ComponentProps<typeof DatePicker> {
  placeholder?: string;
  includeTime?: boolean;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

const FormDatePicker: React.FC<FormDatePickerProps> = memo(
  ({
    placeholder,
    includeTime = false,
    minDate,
    maxDate,
    className,
    ...props
  }) => {
    const { id, error, touched } = useFieldContext();
    const {
      formData,
      setFieldValue,
      setFieldTouched,
      validateField,
      disabled,
    } = useFormContext();
    const value = formData[id];

    const handleChange = useCallback(
      (date: Date | null) => {
        const dateValue = date ? date.toLocaleDateString("en-CA") : "";
        setFieldTouched(id);
        setFieldValue(id, dateValue);
        validateField(id, dateValue);
      },
      [id, setFieldTouched, setFieldValue, validateField]
    );

    const hasError = !!error && touched;

    return (
      <DatePicker
        {...props}
        id={id}
        value={value ? new Date(value) : null}
        onChange={handleChange}
        placeholder={placeholder}
        includeTime={includeTime}
        minDate={minDate}
        maxDate={maxDate}
        disabled={disabled}
        className={cn(hasError && "border-destructive", className)}
      />
    );
  }
);
FormDatePicker.displayName = "FormDatePicker";

interface FormDateRangePickerProps
  extends React.ComponentProps<typeof DateRangePicker> {
  placeholder?: string;
  minDate?: Date;
  maxDate?: Date;
  className?: string;
}

const FormDateRangePicker: React.FC<FormDateRangePickerProps> = memo(
  ({ placeholder, minDate, maxDate, className, ...props }) => {
    const { id, error, touched } = useFieldContext();
    const {
      formData,
      setFieldValue,
      setFieldTouched,
      validateField,
      disabled,
    } = useFormContext();
    const value = formData[id] || { start: null, end: null };

    const handleChange = useCallback(
      (range: { start: Date | null; end: Date | null }) => {
        setFieldTouched(id);
        setFieldValue(id, range);
        validateField(id, range);
      },
      [id, setFieldTouched, setFieldValue, validateField]
    );

    const hasError = !!error && touched;

    return (
      <DateRangePicker
        {...props}
        id={id}
        value={value}
        onChange={handleChange}
        placeholder={placeholder}
        minDate={minDate}
        maxDate={maxDate}
        disabled={disabled}
        className={cn(hasError && "border-destructive", className)}
      />
    );
  }
);
FormDateRangePicker.displayName = "FormDateRangePicker";

interface FormFileInputProps
  extends Omit<React.ComponentProps<"input">, "onChange" | "type"> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const FormFileInput: React.FC<FormFileInputProps> = memo(
  ({ onChange: customOnChange, className, ...props }) => {
    const { id, error, touched } = useFieldContext();
    const { setFieldValue, setFieldTouched, validateField, disabled } =
      useFormContext();

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldTouched(id);
        setFieldValue(id, e.target.files);
        validateField(id, e.target.files);
        customOnChange?.(e);
      },
      [id, setFieldTouched, setFieldValue, validateField, customOnChange]
    );

    const hasError = !!error && touched;

    return (
      <Input
        {...props}
        id={id}
        type="file"
        onChange={handleChange}
        disabled={disabled || props.disabled}
        className={cn(hasError && "border-destructive", className)}
      />
    );
  }
);
FormFileInput.displayName = "FormFileInput";

interface FormImageInputProps extends React.ComponentProps<typeof ImageInput> {
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  previewUrl?: string;
}

const FormImageInput: React.FC<FormImageInputProps> = memo(
  ({ onChange: customOnChange, previewUrl, className, ...props }) => {
    const { id, error, touched } = useFieldContext();
    const {
      setFieldValue,
      setFieldTouched,
      validateField,
      disabled,
      formData,
    } = useFormContext();

    const value = formData[id] || null;

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        setFieldTouched(id);
        setFieldValue(id, e.target.files);
        validateField(id, e.target.files);
        customOnChange?.(e);
      },
      [id, setFieldTouched, setFieldValue, validateField, customOnChange]
    );

    const hasError = !!error && touched;

    return (
      <ImageInput
        {...props}
        id={id}
        onChange={handleChange}
        previewUrl={value ? previewUrl : null}
        disabled={disabled || props.disabled}
        className={cn(hasError && "border-destructive", className)}
      />
    );
  }
);
FormImageInput.displayName = "FormImageInput";

interface ActionsProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

const Actions: React.FC<ActionsProps> = memo(
  ({
    children,
    className,

    ...props
  }) => {
    return (
      <div
        {...props}
        className={cn(
          "flex flex-col sm:flex-row gap-3 items-center justify-between pt-6 border-t border-border",
          className
        )}
      >
        {children}
      </div>
    );
  }
);
Actions.displayName = "Actions";

interface BackButtonProps
  extends Omit<React.ComponentProps<typeof Button>, "children"> {
  children?: React.ReactNode;
  className?: string;
}

const BackButton: React.FC<BackButtonProps> = memo(
  ({ children = "Back", className, ...props }) => {
    const { currentStep, steps, setCurrentStep } = useFormContext();

    const handleBack = useCallback(() => {
      setCurrentStep((prev) => Math.max(prev - 1, 0));
    }, [setCurrentStep]);

    if (steps.length === 0 || currentStep === 0) return null;

    return (
      <Button
        {...props}
        type="button"
        variant="outline"
        onClick={handleBack}
        className={cn("flex items-center space-x-2 min-w-[100px]", className)}
      >
        <ChevronLeft className="w-4 h-4" />
        <span>{children}</span>
      </Button>
    );
  }
);
BackButton.displayName = "BackButton";

interface NextButtonProps
  extends Omit<React.ComponentProps<typeof Button>, "children"> {
  children?: React.ReactNode;
  className?: string;
}

const NextButton: React.FC<NextButtonProps> = memo(
  ({ children = "Next", className, ...props }) => {
    const {
      currentStep,
      steps,
      canProceed,
      fields,
      formData,
      setFieldTouched,
      setErrors,
      setCurrentStep,
    } = useFormContext();

    const handleNext = useCallback(() => {
      const currentStepId = steps[currentStep]?.id;
      const currentStepFields = Array.from(fields.entries()).filter(
        ([_, config]) => config.stepId === currentStepId
      );

      currentStepFields.forEach(([fieldId]) => {
        setFieldTouched(fieldId);
      });

      const newErrors: Record<string, string> = {};
      currentStepFields.forEach(([fieldId, config]) => {
        const value = formData[fieldId];
        const error = validateSingleField(fieldId, value, config);
        if (error) {
          newErrors[fieldId] = error;
        }
      });

      setErrors((prev) => ({ ...prev, ...newErrors }));

      if (Object.keys(newErrors).length === 0) {
        setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1));
      }
    }, [
      currentStep,
      steps,
      fields,
      formData,
      setFieldTouched,
      setErrors,
      setCurrentStep,
    ]);

    if (steps.length === 0) return null;

    const isLastStep = currentStep === steps.length - 1;
    if (isLastStep) return null;

    const canMove = canProceed();

    if (!canMove) {
      return (
        <Tooltip
          content="Fill all the required fields marked with *"
          side="top"
        >
          <div>
            <Button
              {...props}
              type="button"
              disabled={true}
              className={cn(
                "flex items-center space-x-2 min-w-[100px]",
                className
              )}
            >
              <span>{children}</span>
              <ChevronRight className="w-4 h-4" />
            </Button>
          </div>
        </Tooltip>
      );
    }

    return (
      <Button
        {...props}
        type="button"
        onClick={handleNext}
        className={cn("flex items-center space-x-2 min-w-[100px]", className)}
      >
        <span>{children}</span>
        <ChevronRight className="w-4 h-4" />
      </Button>
    );
  }
);
NextButton.displayName = "NextButton";

interface SubmitButtonProps
  extends Omit<React.ComponentProps<typeof Button>, "children"> {
  children?: React.ReactNode;
  isLoading?: boolean;
  className?: string;
}

const SubmitButton: React.FC<SubmitButtonProps> = memo(
  ({
    children = "Submit",
    isLoading,
    className,

    ...props
  }) => {
    const { canProceed, currentStep, steps, isSubmitting } = useFormContext();

    const isLastStep = steps.length === 0 || currentStep === steps.length - 1;

    if (!isLastStep) return null;

    const canSubmit = canProceed();
    const loading = isLoading || isSubmitting;

    if (!canSubmit) {
      return (
        <Tooltip
          content="Fill all the required fields marked with *"
          side="top"
        >
          <div>
            <Button
              {...props}
              type="submit"
              disabled={true}
              isLoading={loading}
              className={cn("min-w-[120px]", className)}
            >
              {children}
            </Button>
          </div>
        </Tooltip>
      );
    }

    return (
      <Button
        {...props}
        type="submit"
        isLoading={loading}
        className={cn("min-w-[120px]", className)}
      >
        {children}
      </Button>
    );
  }
);
SubmitButton.displayName = "SubmitButton";

interface ResetButtonProps
  extends Omit<React.ComponentProps<typeof Button>, "children"> {
  children?: React.ReactNode;
  className?: string;
}

const ResetButton: React.FC<ResetButtonProps> = memo(
  ({ children = "Reset", className, ...props }) => {
    const { setFormData, setErrors, setTouched, setCurrentStep, clearStorage } =
      useFormContext();

    const handleReset = useCallback(() => {
      setFormData({});
      setErrors({});
      setTouched({});
      setCurrentStep(0);
      clearStorage();
    }, [setFormData, setErrors, setTouched, setCurrentStep, clearStorage]);

    return (
      <Button
        {...props}
        type="button"
        variant="destructive"
        onClick={handleReset}
        className={cn("min-w-[100px]", className)}
      >
        {children}
      </Button>
    );
  }
);
ResetButton.displayName = "ResetButton";

interface FormProps extends Omit<React.ComponentProps<"form">, "onSubmit"> {
  children: React.ReactNode;
  onSubmit: (data: Record<string, any>) => void | Promise<void>;
  className?: string;
}

const Form: React.FC<FormProps> = ({
  children,
  onSubmit,
  className,
  ...props
}) => {
  const {
    formData,
    fields,
    setFieldTouched,
    setErrors,
    clearStorage,
    setFormData,
    setTouched,
    setCurrentStep,
    setIsSubmitting,
  } = useFormContext();

  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      Array.from(fields.keys()).forEach((fieldId) => {
        setFieldTouched(fieldId);
      });

      const newErrors: Record<string, string> = {};
      Array.from(fields.entries()).forEach(([fieldId, config]) => {
        const value = formData[fieldId];
        const error = validateSingleField(fieldId, value, config);
        if (error) {
          newErrors[fieldId] = error;
        }
      });

      setErrors(newErrors);

      const allFieldsData: Record<string, any> = {};
      Array.from(fields.keys()).forEach((fieldId) => {
        const value = formData[fieldId];
        if (value === undefined || value === null) {
          allFieldsData[fieldId] = "";
        } else {
          allFieldsData[fieldId] = value;
        }
      });

      try {
        await onSubmit(allFieldsData);

        if (Object.keys(newErrors).length === 0) {
          clearStorage();
          setFormData({});
          setErrors({});
          setTouched({});
          setCurrentStep(0);
        }
      } catch (error) {
        console.error("Form submission error:", error);
      }

      setIsSubmitting(false);
    },
    [
      formData,
      fields,
      onSubmit,
      setFieldTouched,
      setErrors,
      clearStorage,
      setFormData,
      setTouched,
      setCurrentStep,
      setIsSubmitting,
    ]
  );

  return (
    <form
      {...props}
      onSubmit={handleSubmit}
      className={cn("space-y-6", className)}
    >
      {children}
    </form>
  );
};

interface FooterProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
  className?: string;
}

const Footer: React.FC<FooterProps> = memo(
  ({
    children,
    className,

    ...props
  }) => {
    return (
      <div {...props} className={cn("pt-4 border-t border-border", className)}>
        {children}
      </div>
    );
  }
);
Footer.displayName = "Footer";

export const AdvancedForm: React.FC<AdvancedFormProps> & {
  Header: typeof Header;
  StepperProgress: typeof StepperProgress;
  Step: typeof Step;
  Group: typeof Group;
  Field: typeof Field;
  Label: typeof Label;
  Description: typeof Description;
  Error: typeof Error;
  Input: typeof FormInput;
  Textarea: typeof FormTextarea;
  PasswordInput: typeof FormPasswordInput;
  Checkbox: typeof FormCheckbox;
  Switch: typeof FormSwitch;
  RadioGroup: typeof FormRadioGroup & { Item: typeof RadioGroupItem };
  Select: typeof FormSelect & { Item: typeof SelectItem };
  MultiSelect: typeof FormMultiSelect & { Item: typeof MultiSelectItem };
  Slider: typeof FormSlider;
  RangeSlider: typeof FormRangeSlider;
  CheckboxGroup: typeof FormCheckboxGroup & {
    Item: typeof CheckboxGroupBase.Item;
  };
  MultiInput: typeof FormMultiInput;
  DatePicker: typeof FormDatePicker;
  DateRangePicker: typeof FormDateRangePicker;
  FileInput: typeof FormFileInput;
  ImageInput: typeof FormImageInput;
  Actions: typeof Actions;
  BackButton: typeof BackButton;
  NextButton: typeof NextButton;
  SubmitButton: typeof SubmitButton;
  ResetButton: typeof ResetButton;
  Form: typeof Form;
  Footer: typeof Footer;
} = Object.assign(AdvancedFormRoot, {
  Header,
  StepperProgress,
  Step,
  Group,
  Field,
  Label,
  Description,
  Error,
  Input: FormInput,
  Textarea: FormTextarea,
  PasswordInput: FormPasswordInput,
  Checkbox: FormCheckbox,
  Switch: FormSwitch,
  RadioGroup: Object.assign(FormRadioGroup, { Item: RadioGroupItem }),
  Select: Object.assign(FormSelect, { Item: SelectItem }),
  MultiSelect: Object.assign(FormMultiSelect, { Item: MultiSelectItem }),
  Slider: FormSlider,
  RangeSlider: FormRangeSlider,
  CheckboxGroup: Object.assign(FormCheckboxGroup, {
    Item: CheckboxGroupBase.Item,
  }),
  MultiInput: FormMultiInput,
  DatePicker: FormDatePicker,
  DateRangePicker: FormDateRangePicker,
  FileInput: FormFileInput,
  ImageInput: FormImageInput,
  Actions,
  BackButton,
  NextButton,
  SubmitButton,
  ResetButton,
  Form,
  Footer,
});

export type { FormFieldValidation };
