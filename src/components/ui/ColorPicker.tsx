"use client";
import React, { useCallback, useEffect, useRef, useState } from "react";
import { Pipette } from "lucide-react";
import { cn } from "@/lib/utils";
import { createPortal } from "react-dom";

interface RgbColor {
  r: number;
  g: number;
  b: number;
  a: number;
}

interface HslColor {
  h: number;
  s: number;
  l: number;
  a: number;
}

interface HsvColor {
  h: number;
  s: number;
  v: number;
  a: number;
}

type ColorFormat = "hex" | "rgb" | "hsl";

const hexToRgb = (hex: string): RgbColor => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})?$/i.exec(
    hex
  );
  if (!result) {
    return { r: 0, g: 0, b: 0, a: 1 };
  }
  return {
    r: parseInt(result[1], 16),
    g: parseInt(result[2], 16),
    b: parseInt(result[3], 16),
    a: result[4] ? parseInt(result[4], 16) / 255 : 1,
  };
};

const rgbToHex = (rgb: RgbColor): string => {
  const toHex = (n: number) => {
    const hex = Math.round(n).toString(16);
    return hex.length === 1 ? "0" + hex : hex;
  };
  const hex = `#${toHex(rgb.r)}${toHex(rgb.g)}${toHex(rgb.b)}`;
  return rgb.a < 1 ? `${hex}${toHex(rgb.a * 255)}` : hex;
};

const rgbToHsl = (rgb: RgbColor): HslColor => {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  let h = 0;
  let s = 0;
  const l = (max + min) / 2;

  if (max !== min) {
    const d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);

    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    l: Math.round(l * 100),
    a: rgb.a,
  };
};

const rgbToHsv = (rgb: RgbColor): HsvColor => {
  const r = rgb.r / 255;
  const g = rgb.g / 255;
  const b = rgb.b / 255;

  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const d = max - min;
  let h = 0;
  const s = max === 0 ? 0 : d / max;
  const v = max;

  if (max !== min) {
    switch (max) {
      case r:
        h = ((g - b) / d + (g < b ? 6 : 0)) / 6;
        break;
      case g:
        h = ((b - r) / d + 2) / 6;
        break;
      case b:
        h = ((r - g) / d + 4) / 6;
        break;
    }
  }

  return {
    h: Math.round(h * 360),
    s: Math.round(s * 100),
    v: Math.round(v * 100),
    a: rgb.a,
  };
};

const hsvToRgb = (hsv: HsvColor): RgbColor => {
  const h = hsv.h / 360;
  const s = hsv.s / 100;
  const v = hsv.v / 100;

  const i = Math.floor(h * 6);
  const f = h * 6 - i;
  const p = v * (1 - s);
  const q = v * (1 - f * s);
  const t = v * (1 - (1 - f) * s);

  let r: number, g: number, b: number;

  switch (i % 6) {
    case 0:
      r = v;
      g = t;
      b = p;
      break;
    case 1:
      r = q;
      g = v;
      b = p;
      break;
    case 2:
      r = p;
      g = v;
      b = t;
      break;
    case 3:
      r = p;
      g = q;
      b = v;
      break;
    case 4:
      r = t;
      g = p;
      b = v;
      break;
    case 5:
      r = v;
      g = p;
      b = q;
      break;
    default:
      r = 0;
      g = 0;
      b = 0;
  }

  return {
    r: Math.round(r * 255),
    g: Math.round(g * 255),
    b: Math.round(b * 255),
    a: hsv.a,
  };
};

const formatColorValue = (rgb: RgbColor, format: ColorFormat): string => {
  switch (format) {
    case "hex":
      return rgbToHex(rgb);
    case "rgb": {
      if (rgb.a < 1) {
        return `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${rgb.a.toFixed(2)})`;
      }
      return `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
    }
    case "hsl": {
      const hsl = rgbToHsl(rgb);
      if (hsl.a < 1) {
        return `hsla(${hsl.h}, ${hsl.s}%, ${hsl.l}%, ${hsl.a.toFixed(2)})`;
      }
      return `hsl(${hsl.h}, ${hsl.s}%, ${hsl.l}%)`;
    }
  }
};

interface ColorPickerContextValue {
  value: string;
  onChange: (value: string) => void;
  format: ColorFormat;
  setFormat: (format: ColorFormat) => void;
  rgb: RgbColor;
  hsv: HsvColor;
  updateHsv: (hsv: Partial<HsvColor>) => void;
  updateAlpha: (alpha: number) => void;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  presets: string[];
  showAlpha: boolean;
  showEyeDropper: boolean;
}

const ColorPickerContext = React.createContext<ColorPickerContextValue | null>(
  null
);

const useColorPicker = () => {
  const context = React.useContext(ColorPickerContext);
  if (!context) {
    throw new Error("ColorPicker components must be used within ColorPicker");
  }
  return context;
};

interface ColorPickerRootProps extends React.ComponentProps<"div"> {
  value?: string;
  defaultValue?: string;
  onValueChange?: (value: string) => void;
  format?: ColorFormat;
  onFormatChange?: (format: ColorFormat) => void;
  presets?: string[];
  showAlpha?: boolean;
  showEyeDropper?: boolean;
}

const ColorPickerRoot: React.FC<ColorPickerRootProps> = ({
  value: controlledValue,
  defaultValue = "#3b82f6",
  onValueChange,
  format: controlledFormat,
  onFormatChange,
  presets = [
    "#ef4444",
    "#f97316",
    "#f59e0b",
    "#eab308",
    "#84cc16",
    "#22c55e",
    "#10b981",
    "#14b8a6",
    "#06b6d4",
    "#0ea5e9",
    "#3b82f6",
    "#6366f1",
    "#8b5cf6",
    "#a855f7",
    "#d946ef",
    "#ec4899",
    "#f43f5e",
  ],
  showAlpha = true,
  showEyeDropper = true,
  className,
  children,
  ...props
}) => {
  const [internalValue, setInternalValue] = useState(
    controlledValue || defaultValue
  );
  const [internalFormat, setInternalFormat] = useState<ColorFormat>(
    controlledFormat || "hex"
  );
  const [isOpen, setIsOpen] = useState(false);

  const value = controlledValue !== undefined ? controlledValue : internalValue;
  const format =
    controlledFormat !== undefined ? controlledFormat : internalFormat;

  const onChange = useCallback(
    (newValue: string) => {
      if (controlledValue === undefined) {
        setInternalValue(newValue);
      }
      onValueChange?.(newValue);
    },
    [controlledValue, onValueChange]
  );

  const setFormat = useCallback(
    (newFormat: ColorFormat) => {
      if (controlledFormat === undefined) {
        setInternalFormat(newFormat);
      }
      onFormatChange?.(newFormat);
    },
    [controlledFormat, onFormatChange]
  );

  const rgb = hexToRgb(value.startsWith("#") ? value : defaultValue);
  const hsv = rgbToHsv(rgb);

  const updateHsv = useCallback(
    (partial: Partial<HsvColor>) => {
      const newHsv = { ...hsv, ...partial };
      const newRgb = hsvToRgb(newHsv);
      onChange(rgbToHex(newRgb));
    },
    [hsv, onChange]
  );

  const updateAlpha = useCallback(
    (alpha: number) => {
      const newRgb = { ...rgb, a: alpha };
      onChange(rgbToHex(newRgb));
    },
    [rgb, onChange]
  );

  const contextValue: ColorPickerContextValue = {
    value,
    onChange,
    format,
    setFormat,
    rgb,
    hsv,
    updateHsv,
    updateAlpha,
    isOpen,
    setIsOpen,
    presets,
    showAlpha,
    showEyeDropper,
  };

  return (
    <ColorPickerContext.Provider value={contextValue}>
      <div className={cn("relative inline-block", className)} {...props}>
        {children}
      </div>
    </ColorPickerContext.Provider>
  );
};

interface ColorPickerTriggerProps extends React.ComponentProps<"button"> {}

const ColorPickerTrigger: React.FC<ColorPickerTriggerProps> = ({
  className,
  children,
  ...props
}) => {
  const { value, isOpen, setIsOpen } = useColorPicker();

  return (
    <button
      type="button"
      onClick={() => setIsOpen(!isOpen)}
      aria-expanded={isOpen}
      aria-haspopup="dialog"
      className={cn(
        "inline-flex items-center gap-2 rounded-md border border-border bg-background px-3 py-2 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50",
        className
      )}
      {...props}
    >
      <div
        className="h-5 w-5 rounded border border-border"
        style={{ backgroundColor: value }}
        aria-label={`Current color: ${value}`}
      />
      {children}
    </button>
  );
};

interface ColorPickerContentProps extends React.ComponentProps<"div"> {}

const ColorPickerContent: React.FC<ColorPickerContentProps> = ({
  className,
  children,
  ...props
}) => {
  const { isOpen, setIsOpen } = useColorPicker();
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        contentRef.current &&
        !contentRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      document.addEventListener("keydown", handleEscape);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
        document.removeEventListener("keydown", handleEscape);
      };
    }
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  return createPortal(
    <div
      ref={contentRef}
      role="dialog"
      aria-label="Color picker"
      className={cn(
        "fixed z-50 w-64 rounded-md border border-border bg-card p-4 shadow-lg overflow-auto max-h-[90vh]",
        className
      )}
      style={{
        top: "50%",
        left: "50%",
        transform: "translate(-50%, -50%)",
      }}
      {...props}
    >
      {children}
    </div>,
    document.body
  );
};

interface ColorPickerAreaProps extends React.ComponentProps<"div"> {}

const ColorPickerArea: React.FC<ColorPickerAreaProps> = ({
  className,
  ...props
}) => {
  const { hsv, updateHsv } = useColorPicker();
  const areaRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMove = useCallback(
    (clientX: number, clientY: number) => {
      if (!areaRef.current) return;

      const rect = areaRef.current.getBoundingClientRect();
      const x = Math.max(0, Math.min(clientX - rect.left, rect.width));
      const y = Math.max(0, Math.min(clientY - rect.top, rect.height));

      const s = (x / rect.width) * 100;
      const v = 100 - (y / rect.height) * 100;

      updateHsv({ s, v });
    },
    [updateHsv]
  );

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    setIsDragging(true);
    handleMove(e.clientX, e.clientY);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 1;
    let newS = hsv.s;
    let newV = hsv.v;

    switch (e.key) {
      case "ArrowLeft":
        newS = Math.max(0, hsv.s - step);
        break;
      case "ArrowRight":
        newS = Math.min(100, hsv.s + step);
        break;
      case "ArrowUp":
        newV = Math.min(100, hsv.v + step);
        break;
      case "ArrowDown":
        newV = Math.max(0, hsv.v - step);
        break;
      default:
        return;
    }

    e.preventDefault();
    updateHsv({ s: newS, v: newV });
  };

  useEffect(() => {
    if (!isDragging) return;

    const handleMouseMove = (e: MouseEvent) => {
      handleMove(e.clientX, e.clientY);
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);

    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMove]);

  const hueColor = hsvToRgb({ h: hsv.h, s: 100, v: 100, a: 1 });
  const thumbX = (hsv.s / 100) * 100;
  const thumbY = (1 - hsv.v / 100) * 100;

  return (
    <div
      ref={areaRef}
      onMouseDown={handleMouseDown}
      onKeyDown={handleKeyDown}
      className={cn("relative h-40 w-full cursor-crosshair rounded", className)}
      style={{
        background: `linear-gradient(to top, #000, transparent),
                     linear-gradient(to right, #fff, rgb(${hueColor.r}, ${hueColor.g}, ${hueColor.b}))`,
      }}
      role="slider"
      aria-label="Color saturation and brightness"
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={hsv.s}
      tabIndex={0}
      {...props}
    >
      <div
        className="absolute h-4 w-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white shadow-md"
        style={{
          left: `${thumbX}%`,
          top: `${thumbY}%`,
        }}
      />
    </div>
  );
};

interface ColorPickerHueSliderProps
  extends Omit<React.ComponentProps<"input">, "type" | "min" | "max"> {}

const ColorPickerHueSlider: React.FC<ColorPickerHueSliderProps> = ({
  className,
  ...props
}) => {
  const { hsv, updateHsv } = useColorPicker();

  return (
    <div className="relative w-full">
      <input
        type="range"
        min="0"
        max="360"
        value={hsv.h}
        onChange={(e) => updateHsv({ h: parseInt(e.target.value) })}
        className={cn(
          "h-3 w-full cursor-pointer appearance-none rounded",
          className
        )}
        style={{
          background:
            "linear-gradient(to right, #ff0000 0%, #ffff00 17%, #00ff00 33%, #00ffff 50%, #0000ff 67%, #ff00ff 83%, #ff0000 100%)",
        }}
        aria-label="Hue"
        {...props}
      />
    </div>
  );
};

interface ColorPickerAlphaSliderProps
  extends Omit<React.ComponentProps<"input">, "type" | "min" | "max"> {}

const ColorPickerAlphaSlider: React.FC<ColorPickerAlphaSliderProps> = ({
  className,
  ...props
}) => {
  const { rgb, updateAlpha, showAlpha } = useColorPicker();

  if (!showAlpha) return null;

  return (
    <div className="relative w-full">
      <input
        type="range"
        min="0"
        max="100"
        value={rgb.a * 100}
        onChange={(e) => updateAlpha(parseInt(e.target.value) / 100)}
        className={cn(
          "h-3 w-full cursor-pointer appearance-none rounded",
          className
        )}
        style={{
          background: `linear-gradient(to right, transparent, rgb(${rgb.r}, ${rgb.g}, ${rgb.b}))`,
        }}
        aria-label="Opacity"
        {...props}
      />
    </div>
  );
};

interface ColorPickerSwatchesProps extends React.ComponentProps<"div"> {}

const ColorPickerSwatches: React.FC<ColorPickerSwatchesProps> = ({
  className,
  ...props
}) => {
  const { presets, onChange } = useColorPicker();

  return (
    <div
      className={cn("grid grid-cols-9 gap-1", className)}
      role="group"
      aria-label="Color presets"
      {...props}
    >
      {presets.map((preset) => (
        <button
          key={preset}
          type="button"
          onClick={() => onChange(preset)}
          className="h-6 w-6 rounded border border-border transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          style={{ backgroundColor: preset }}
          aria-label={`Select color ${preset}`}
        />
      ))}
    </div>
  );
};

interface ColorPickerInputProps
  extends Omit<React.ComponentProps<"input">, "type" | "value" | "onChange"> {}

const ColorPickerInput: React.FC<ColorPickerInputProps> = ({
  className,
  ...props
}) => {
  const { value, onChange, rgb, format } = useColorPicker();
  const displayValue = formatColorValue(rgb, format);

  return (
    <input
      type="text"
      value={displayValue}
      onChange={(e) => {
        const val = e.target.value;
        if (
          val.startsWith("#") ||
          val.startsWith("rgb") ||
          val.startsWith("hsl")
        ) {
          onChange(val);
        }
      }}
      className={cn(
        "flex h-9 w-full rounded-md border border-border bg-background px-3 py-1 text-sm text-foreground shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      aria-label="Color value"
      {...props}
    />
  );
};

interface ColorPickerFormatToggleProps
  extends Omit<React.ComponentProps<"select">, "value" | "onChange"> {}

const ColorPickerFormatToggle: React.FC<ColorPickerFormatToggleProps> = ({
  className,
  ...props
}) => {
  const { format, setFormat } = useColorPicker();

  return (
    <select
      value={format}
      onChange={(e) => setFormat(e.target.value as ColorFormat)}
      className={cn(
        "flex h-9 rounded-md border border-border bg-background px-3 py-1 text-sm text-foreground shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      aria-label="Color format"
      {...props}
    >
      <option value="hex">HEX</option>
      <option value="rgb">RGB</option>
      <option value="hsl">HSL</option>
    </select>
  );
};

interface ColorPickerEyeDropperProps extends React.ComponentProps<"button"> {}

const ColorPickerEyeDropper: React.FC<ColorPickerEyeDropperProps> = ({
  className,
  ...props
}) => {
  const { onChange, showEyeDropper } = useColorPicker();
  const [isSupported, setIsSupported] = useState(false);

  useEffect(() => {
    setIsSupported("EyeDropper" in window);
  }, []);

  const handleEyeDropper = async () => {
    if (!("EyeDropper" in window)) return;

    try {
      const eyeDropper = new (
        window as Window & {
          EyeDropper: { new (): { open: () => Promise<{ sRGBHex: string }> } };
        }
      ).EyeDropper();
      const result = await eyeDropper.open();
      onChange(result.sRGBHex);
    } catch (error) {
      if (error instanceof Error && error.name !== "AbortError") {
        console.error("EyeDropper error:", error);
      }
    }
  };

  if (!showEyeDropper || !isSupported) return null;

  return (
    <button
      type="button"
      onClick={handleEyeDropper}
      className={cn(
        "inline-flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 p-2",
        className
      )}
      aria-label="Pick color from screen"
      title="Pick color from screen"
      {...props}
    >
      <Pipette className="h-4 w-4" />
    </button>
  );
};

export const ColorPicker = Object.assign(ColorPickerRoot, {
  Trigger: ColorPickerTrigger,
  Content: ColorPickerContent,
  Area: ColorPickerArea,
  HueSlider: ColorPickerHueSlider,
  AlphaSlider: ColorPickerAlphaSlider,
  Swatches: ColorPickerSwatches,
  Input: ColorPickerInput,
  FormatToggle: ColorPickerFormatToggle,
  EyeDropper: ColorPickerEyeDropper,
});

export {
  ColorPickerRoot,
  ColorPickerTrigger,
  ColorPickerContent,
  ColorPickerArea,
  ColorPickerHueSlider,
  ColorPickerAlphaSlider,
  ColorPickerSwatches,
  ColorPickerInput,
  ColorPickerFormatToggle,
  ColorPickerEyeDropper,
};

export type {
  ColorPickerRootProps,
  ColorPickerTriggerProps,
  ColorPickerContentProps,
  ColorPickerAreaProps,
  ColorPickerHueSliderProps,
  ColorPickerAlphaSliderProps,
  ColorPickerSwatchesProps,
  ColorPickerInputProps,
  ColorPickerFormatToggleProps,
  ColorPickerEyeDropperProps,
  ColorFormat,
  RgbColor,
  HslColor,
  HsvColor,
};
