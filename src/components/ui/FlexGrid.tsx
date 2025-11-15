import React from "react";
import { cn } from "@/lib/utils";

export interface FlexGridProps extends React.ComponentProps<"div"> {
  gap?: string;
  rowGap?: string;
  columnGap?: string;
  align?: "start" | "center" | "end" | "stretch" | "baseline";
  justify?: "start" | "center" | "end" | "between" | "around" | "evenly";
}

export const FlexGrid = React.forwardRef<HTMLDivElement, FlexGridProps>(
  (
    {
      className,
      gap = "2",
      rowGap,
      columnGap,
      align,
      justify,
      children,
      ...props
    },
    ref
  ) => {
    const alignClasses = {
      start: "items-start",
      center: "items-center",
      end: "items-end",
      stretch: "items-stretch",
      baseline: "items-baseline",
    };

    const justifyClasses = {
      start: "justify-start",
      center: "justify-center",
      end: "justify-end",
      between: "justify-between",
      around: "justify-around",
      evenly: "justify-evenly",
    };

    const gapClass = `gap-${gap}`;
    const rowGapClass = rowGap ? `gap-y-${rowGap}` : "";
    const columnGapClass = columnGap ? `gap-x-${columnGap}` : "";

    return (
      <div
        ref={ref}
        className={cn(
          "flex flex-wrap",
          !rowGap && !columnGap && gapClass,
          rowGapClass,
          columnGapClass,
          align && alignClasses[align],
          justify && justifyClasses[justify],
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

FlexGrid.displayName = "FlexGrid";
