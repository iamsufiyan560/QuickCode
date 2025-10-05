"use client";

import React from "react";
import { cn } from "@/lib/utils";

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  orientation?: "horizontal" | "vertical";
  children: React.ReactNode;
}

export const ButtonGroup: React.FC<ButtonGroupProps> = ({
  className,
  orientation = "horizontal",
  children,
  ...props
}) => {
  const childrenArray = React.Children.toArray(children);

  return (
    <div
      role="group"
      className={cn(
        "inline-flex",
        orientation === "horizontal" ? "flex-row" : "flex-col",
        className
      )}
      {...props}
    >
      {React.Children.map(childrenArray, (child, index) => {
        if (!React.isValidElement(child)) return child;

        const isFirst = index === 0;
        const isLast = index === childrenArray.length - 1;
        const isMiddle = !isFirst && !isLast;

        const groupClasses = cn(
          orientation === "horizontal"
            ? {
                "rounded-r-none border-r-0": !isLast,
                "rounded-l-none": !isFirst,
                "rounded-none border-r-0": isMiddle,
              }
            : {
                "rounded-b-none border-b-0": !isLast,
                "rounded-t-none": !isFirst,
                "rounded-none border-b-0": isMiddle,
              }
        );

        return React.cloneElement(
          child as React.ReactElement<{ className?: string }>,
          {
            className: cn(
              (child as React.ReactElement<{ className?: string }>).props
                .className,
              groupClasses
            ),
          }
        );
      })}
    </div>
  );
};
