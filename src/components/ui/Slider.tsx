"use client";

import React, { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

export interface SliderProps
  extends Omit<React.ComponentProps<"div">, "onChange"> {
  className?: string;
  value?: number;
  defaultValue?: number;
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  onChange?: (value: number) => void;
}

export const Slider: React.FC<SliderProps> = ({
  className,
  value,
  defaultValue = 0,
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  onChange,
  ...props
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const currentValue = value ?? defaultValue;
  const percentage = ((currentValue - min) / (max - min)) * 100;

  const updateValue = useCallback(
    (clientX: number) => {
      if (!trackRef.current || disabled) return;

      const rect = trackRef.current.getBoundingClientRect();
      const percentage = Math.max(
        0,
        Math.min(1, (clientX - rect.left) / rect.width)
      );
      const rawValue = min + percentage * (max - min);
      const steppedValue = Math.round(rawValue / step) * step;
      const clampedValue = Math.max(min, Math.min(max, steppedValue));

      onChange?.(clampedValue);
    },
    [min, max, step, disabled, onChange]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent) => {
      if (disabled) return;

      updateValue(e.clientX);

      const handleMouseMove = (e: MouseEvent) => updateValue(e.clientX);
      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [updateValue, disabled]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent) => {
      if (disabled) return;
      const touch = e.touches[0];
      updateValue(touch.clientX);

      const handleTouchMove = (e: TouchEvent) => {
        updateValue(e.touches[0].clientX);
      };
      const handleTouchEnd = () => {
        document.removeEventListener("touchmove", handleTouchMove);
        document.removeEventListener("touchend", handleTouchEnd);
      };

      document.addEventListener("touchmove", handleTouchMove);
      document.addEventListener("touchend", handleTouchEnd);
    },
    [updateValue, disabled]
  );

  return (
    <div
      {...props}
      className={cn(
        "relative flex w-full touch-none items-center select-none",
        disabled && "opacity-50 pointer-events-none",
        className
      )}
    >
      <div
        ref={trackRef}
        className="relative w-full h-2.5 bg-input  rounded-lg cursor-pointer"
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div
          className="absolute h-full bg-primary rounded-lg"
          style={{ width: `${percentage}%` }}
        />
        <div
          className="absolute top-1/2 w-5 h-5 bg-primary rounded-full shadow-md cursor-pointer transform -translate-y-1/2 transition-transform hover:scale-110"
          style={{ left: `calc(${percentage}% - 10px)` }}
        />
      </div>
    </div>
  );
};
