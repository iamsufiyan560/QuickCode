"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/Skeleton";

export interface FormSkeletonProps {
  className?: string;
  fields?: number;
  columns?: 1 | 2 | 3;
}

export const FormSkeleton: React.FC<FormSkeletonProps> = ({
  className,
  fields = 6,
  columns = 2,
  ...props
}) => {
  const getGridCols = () => {
    switch (columns) {
      case 1:
        return "grid-cols-1";
      case 2:
        return "grid-cols-1 sm:grid-cols-2";
      case 3:
        return "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3";
      default:
        return "grid-cols-1 sm:grid-cols-2";
    }
  };

  const renderField = (index: number) => {
    const fieldType = index % 4;

    switch (fieldType) {
      case 0: // Regular input
        return (
          <div key={index} className="space-y-2">
            <Skeleton variant="text" height="16px" className="w-20" />
            <Skeleton variant="rounded" height="36px" className="w-full" />
          </div>
        );

      case 1: // Select/dropdown
        return (
          <div key={index} className="space-y-2">
            <Skeleton variant="text" height="16px" className="w-24" />
            <Skeleton variant="rounded" height="36px" className="w-full" />
          </div>
        );

      case 2: // Textarea
        return (
          <div key={index} className="col-span-full space-y-2">
            <Skeleton variant="text" height="16px" className="w-16" />
            <Skeleton variant="rounded" height="80px" className="w-full" />
          </div>
        );

      case 3: // Checkbox/Radio group
        return (
          <div key={index} className="space-y-3">
            <Skeleton variant="text" height="16px" className="w-28" />
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Skeleton variant="rounded" height="16px" width="16px" />
                <Skeleton variant="text" height="14px" className="w-20" />
              </div>
              <div className="flex items-center space-x-2">
                <Skeleton variant="rounded" height="16px" width="16px" />
                <Skeleton variant="text" height="14px" className="w-24" />
              </div>
            </div>
          </div>
        );

      default:
        return (
          <div key={index} className="space-y-2">
            <Skeleton variant="text" height="16px" className="w-20" />
            <Skeleton variant="rounded" height="36px" className="w-full" />
          </div>
        );
    }
  };

  return (
    <div {...props} className={cn("space-y-6", className)}>
      {/*  */}

      <div className={cn("grid gap-4 sm:gap-6", getGridCols())}>
        {Array.from({ length: fields }).map((_, index) => renderField(index))}
      </div>
    </div>
  );
};
