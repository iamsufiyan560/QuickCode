"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { Minus } from "lucide-react";

interface OtpContextValue {
  value: string;
  onChange: (value: string) => void;
  maxLength: number;
  disabled?: boolean;
  pattern: RegExp;
  focusedIndex: number | null;
  setFocusedIndex: (index: number | null) => void;
  inputRefs: React.MutableRefObject<(HTMLInputElement | null)[]>;
}

const OtpContext = React.createContext<OtpContextValue | null>(null);

interface OtpInputProps extends Omit<React.ComponentProps<"div">, "onChange"> {
  maxLength: number;
  value?: string;
  onChange?: (value: string) => void;
  disabled?: boolean;
  pattern?: RegExp;
  containerClassName?: string;
}

const OtpInput = React.forwardRef<HTMLDivElement, OtpInputProps>(
  (
    {
      className,
      containerClassName,
      maxLength,
      value: controlledValue,
      onChange,
      disabled = false,
      pattern = /^[0-9]$/,
      children,
      ...props
    },
    ref
  ) => {
    const [internalValue, setInternalValue] = React.useState("");
    const [focusedIndex, setFocusedIndex] = React.useState<number | null>(null);
    const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

    const value =
      controlledValue !== undefined ? controlledValue : internalValue;

    const handleChange = React.useCallback(
      (newValue: string) => {
        const filteredValue = newValue.slice(0, maxLength);
        if (controlledValue === undefined) {
          setInternalValue(filteredValue);
        }
        onChange?.(filteredValue);
      },
      [maxLength, onChange, controlledValue]
    );

    const contextValue = React.useMemo(
      () => ({
        value,
        onChange: handleChange,
        maxLength,
        disabled,
        pattern,
        focusedIndex,
        setFocusedIndex,
        inputRefs,
      }),
      [value, handleChange, maxLength, disabled, pattern, focusedIndex]
    );

    return (
      <OtpContext.Provider value={contextValue}>
        <div
          ref={ref}
          data-slot="otp-input"
          className={cn(
            "flex items-center gap-2",
            disabled && "opacity-50",
            containerClassName
          )}
          {...props}
        >
          {children}
        </div>
      </OtpContext.Provider>
    );
  }
);
OtpInput.displayName = "OtpInput";

const OtpInputGroup = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="otp-input-group"
      className={cn("flex items-center", className)}
      {...props}
    />
  );
});
OtpInputGroup.displayName = "OtpInputGroup";

interface OtpInputSlotProps
  extends Omit<React.ComponentProps<"div">, "children"> {
  index: number;
}

const OtpInputSlot = React.forwardRef<HTMLDivElement, OtpInputSlotProps>(
  ({ index, className, ...props }, ref) => {
    const context = React.useContext(OtpContext);
    const inputRef = React.useRef<HTMLInputElement>(null);

    if (!context) {
      throw new Error("OtpInputSlot must be used within OtpInput");
    }

    const {
      value,
      onChange,
      maxLength,
      disabled,
      pattern,
      focusedIndex,
      setFocusedIndex,
      inputRefs,
    } = context;

    const char = value[index] || "";
    const isActive = focusedIndex === index;

    React.useEffect(() => {
      inputRefs.current[index] = inputRef.current;
    }, [inputRefs, index]);

    const handleFocus = () => {
      setFocusedIndex(index);
    };

    const handleBlur = () => {
      setFocusedIndex(null);
    };

    const handleInput = (e: React.FormEvent<HTMLInputElement>) => {
      const input = e.currentTarget;
      const inputValue = input.value;

      if (inputValue.length === 0) {
        return;
      }

      const newChar = inputValue[inputValue.length - 1];

      if (!pattern.test(newChar)) {
        input.value = char;
        return;
      }

      const newValue =
        value.substring(0, index) + newChar + value.substring(index + 1);
      onChange(newValue);

      input.value = newChar;

      if (index < maxLength - 1) {
        setTimeout(() => {
          const nextInput = inputRefs.current[index + 1];
          if (nextInput) {
            nextInput.focus();
            nextInput.select();
          }
        }, 0);
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      const input = e.currentTarget;

      if (e.key === "Backspace") {
        e.preventDefault();

        if (char) {
          const valueArray = Array.from(
            { length: maxLength },
            (_, i) => value[i] || ""
          );
          valueArray[index] = "";
          const newValue = valueArray.join("");
          onChange(newValue);
          input.value = "";
        } else if (index > 0) {
          const newValue =
            value.substring(0, index - 1) + value.substring(index);
          onChange(newValue);

          setTimeout(() => {
            const prevInput = inputRefs.current[index - 1];
            if (prevInput) {
              prevInput.focus();
              prevInput.select();
            }
          }, 0);
        }
      } else if (e.key === "ArrowLeft" && index > 0) {
        e.preventDefault();
        const prevInput = inputRefs.current[index - 1];
        if (prevInput) {
          prevInput.focus();
          prevInput.select();
        }
      } else if (e.key === "ArrowRight" && index < maxLength - 1) {
        e.preventDefault();
        const nextInput = inputRefs.current[index + 1];
        if (nextInput) {
          nextInput.focus();
          nextInput.select();
        }
      } else if (e.key === "Delete") {
        e.preventDefault();
        if (char) {
          const valueArray = Array.from(
            { length: maxLength },
            (_, i) => value[i] || ""
          );
          valueArray[index] = "";
          const newValue = valueArray.join("");
          onChange(newValue);
          input.value = "";
        }
      }
    };

    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      const pastedText = e.clipboardData.getData("text").toUpperCase();
      const validChars = pastedText
        .split("")
        .filter((char) => pattern.test(char));

      if (validChars.length === 0) {
        return;
      }

      let newValue = value;
      let currentIndex = index;

      for (const char of validChars) {
        if (currentIndex >= maxLength) break;
        newValue =
          newValue.substring(0, currentIndex) +
          char +
          newValue.substring(currentIndex + 1);
        currentIndex++;
      }

      onChange(newValue);

      setTimeout(() => {
        if (currentIndex < maxLength) {
          const nextInput = inputRefs.current[currentIndex];
          if (nextInput) {
            nextInput.focus();
            nextInput.select();
          }
        } else {
          inputRef.current?.blur();
        }
      }, 0);
    };

    const handleClick = () => {
      if (inputRef.current) {
        inputRef.current.select();
      }
    };

    React.useEffect(() => {
      if (inputRef.current) {
        inputRef.current.value = char;
      }
    }, [char]);

    return (
      <div
        ref={ref}
        data-slot="otp-input-slot"
        className={cn(
          "relative flex h-10 w-10 items-center justify-center border-y border-r text-sm shadow-xs transition-all first:rounded-l-md first:border-l last:rounded-r-md",
          "border-input dark:bg-input/30",
          isActive && "border-ring ring-ring/50 z-10 ring-[3px]",
          disabled && "cursor-not-allowed opacity-50",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        <input
          ref={inputRef}
          type="text"
          inputMode="numeric"
          maxLength={2}
          defaultValue={char}
          onInput={handleInput}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          onFocus={handleFocus}
          onBlur={handleBlur}
          disabled={disabled}
          data-otp-index={index}
          className="absolute inset-0 w-full h-full bg-transparent text-center outline-none text-sm opacity-0"
          aria-label={`Digit ${index + 1} of ${maxLength}`}
        />
        <span className="pointer-events-none select-none text-foreground">
          {char}
        </span>
        {isActive && !char && !disabled && (
          <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
            <div className="animate-caret-blink bg-foreground h-4 w-px duration-1000" />
          </div>
        )}
      </div>
    );
  }
);
OtpInputSlot.displayName = "OtpInputSlot";

const OtpInputSeparator = React.forwardRef<
  HTMLDivElement,
  React.ComponentProps<"div">
>(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      data-slot="otp-input-separator"
      role="separator"
      aria-hidden="true"
      className={cn("flex items-center justify-center", className)}
      {...props}
    >
      {children || <Minus />}
    </div>
  );
});
OtpInputSeparator.displayName = "OtpInputSeparator";

const OtpInputRoot = OtpInput as typeof OtpInput & {
  Group: typeof OtpInputGroup;
  Slot: typeof OtpInputSlot;
  Separator: typeof OtpInputSeparator;
};

OtpInputRoot.Group = OtpInputGroup;
OtpInputRoot.Slot = OtpInputSlot;
OtpInputRoot.Separator = OtpInputSeparator;

export {
  OtpInputRoot as OtpInput,
  OtpInputGroup,
  OtpInputSlot,
  OtpInputSeparator,
};
export type { OtpInputProps, OtpInputSlotProps };
