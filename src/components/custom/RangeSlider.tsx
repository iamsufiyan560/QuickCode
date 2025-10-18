"use client";

import React, { useRef, useCallback } from "react";
import { cn } from "@/lib/utils";

export interface RangeSliderProps
  extends Omit<
    React.ComponentProps<"div">,
    "onChange" | "value" | "defaultValue"
  > {
  className?: string;
  value?: [number, number];
  defaultValue?: [number, number];
  min?: number;
  max?: number;
  step?: number;
  disabled?: boolean;
  onChange?: (value: [number, number]) => void;
}

export const RangeSlider: React.FC<RangeSliderProps> = ({
  className,
  value,
  defaultValue = [25, 75],
  min = 0,
  max = 100,
  step = 1,
  disabled = false,
  onChange,
  ...props
}) => {
  const trackRef = useRef<HTMLDivElement>(null);
  const currentValue = value ?? defaultValue;
  const [minVal, maxVal] = currentValue;

  const minPercentage = ((minVal - min) / (max - min)) * 100;
  const maxPercentage = ((maxVal - min) / (max - min)) * 100;

  const updateValue = useCallback(
    (clientX: number, thumbIndex: number) => {
      if (!trackRef.current || disabled) return;

      const rect = trackRef.current.getBoundingClientRect();
      const percentage = Math.max(
        0,
        Math.min(1, (clientX - rect.left) / rect.width)
      );
      const rawValue = min + percentage * (max - min);
      const steppedValue = Math.round(rawValue / step) * step;
      const clampedValue = Math.max(min, Math.min(max, steppedValue));

      const newValue: [number, number] = [...currentValue];

      if (thumbIndex === 0) {
        newValue[0] = Math.min(clampedValue, currentValue[1]);
      } else {
        newValue[1] = Math.max(clampedValue, currentValue[0]);
      }

      onChange?.(newValue);
    },
    [min, max, step, disabled, onChange, currentValue]
  );

  const handleMouseDown = useCallback(
    (e: React.MouseEvent, thumbIndex: number) => {
      if (disabled) return;
      e.stopPropagation();

      updateValue(e.clientX, thumbIndex);

      const handleMouseMove = (e: MouseEvent) =>
        updateValue(e.clientX, thumbIndex);
      const handleMouseUp = () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
    },
    [updateValue, disabled]
  );

  const handleTrackClick = useCallback(
    (e: React.MouseEvent) => {
      if (disabled || e.target !== e.currentTarget) return;

      const rect = trackRef.current!.getBoundingClientRect();
      const percentage = (e.clientX - rect.left) / rect.width;
      const clickValue = min + percentage * (max - min);

      const distanceToMin = Math.abs(clickValue - currentValue[0]);
      const distanceToMax = Math.abs(clickValue - currentValue[1]);

      let thumbToMove;
      if (distanceToMin === distanceToMax) {
        // When equal distances, choose based on click direction
        thumbToMove = clickValue >= currentValue[0] ? 1 : 0;
      } else {
        thumbToMove = distanceToMin < distanceToMax ? 0 : 1;
      }

      updateValue(e.clientX, thumbToMove);
    },
    [disabled, min, max, currentValue, updateValue]
  );

  const handleTouchStart = useCallback(
    (e: React.TouchEvent, thumbIndex: number) => {
      if (disabled) return;
      e.stopPropagation();

      const touch = e.touches[0];
      updateValue(touch.clientX, thumbIndex);

      const handleTouchMove = (e: TouchEvent) => {
        updateValue(e.touches[0].clientX, thumbIndex);
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
        onClick={handleTrackClick}
        ref={trackRef}
        className="relative w-full h-2.5 bg-input rounded-lg cursor-pointer"
      >
        <div
          className="absolute h-full bg-primary rounded-lg pointer-events-none"
          style={{
            left: `${minPercentage}%`,
            width: `${maxPercentage - minPercentage}%`,
          }}
        />
        <div
          className="absolute top-1/2 w-5 h-5 bg-primary rounded-full shadow-md cursor-pointer transform -translate-y-1/2 transition-transform hover:scale-110 z-10"
          style={{ left: `calc(${minPercentage}% - 10px)` }}
          onMouseDown={(e) => handleMouseDown(e, 0)}
          onTouchStart={(e) => handleTouchStart(e, 0)}
        />
        <div
          className="absolute top-1/2 w-5 h-5 bg-primary rounded-full shadow-md cursor-pointer transform -translate-y-1/2 transition-transform hover:scale-110 z-10"
          style={{ left: `calc(${maxPercentage}% - 10px)` }}
          onMouseDown={(e) => handleMouseDown(e, 1)}
          onTouchStart={(e) => handleTouchStart(e, 1)}
        />
      </div>
    </div>
  );
};
