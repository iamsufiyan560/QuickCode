"use client";

import React from "react";
import {
  RadialBarChart as RechartsRadialBarChart,
  RadialBar as RechartsRadialBar,
  ResponsiveContainer,
  PolarAngleAxis,
  Tooltip,
  Legend,
  RadialBarProps,
} from "recharts";
import { cn } from "@/lib/utils";

export interface ChartConfig {
  [key: string]: {
    label: string;
    color: string;
  };
}

export interface ChartContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  config: ChartConfig;
  children: React.ReactElement;
}

export const ChartContainer: React.FC<ChartContainerProps> = ({
  config,
  children,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        "w-full h-[400px] outline-none focus:outline-none",
        className
      )}
      style={
        {
          ...Object.entries(config).reduce((acc, [key, value]) => {
            acc[`--color-${key}`] = value.color;
            return acc;
          }, {} as Record<string, string>),
        } as React.CSSProperties
      }
      {...props}
    >
      <ResponsiveContainer className="outline-none" width="100%" height="100%">
        {children}
      </ResponsiveContainer>
    </div>
  );
};

export interface RadialBarChartProps
  extends React.ComponentProps<typeof RechartsRadialBarChart> {
  className?: string;
}

export const RadialBarChart: React.FC<RadialBarChartProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <RechartsRadialBarChart
      tabIndex={-1}
      className={cn("outline-none [&>svg]:outline-none", className)}
      style={{ outline: "none" }}
      {...props}
    >
      {children}
    </RechartsRadialBarChart>
  );
};

export interface ChartTooltipContentProps {
  active?: boolean;
  payload?: any[];
  hideLabel?: boolean;
  className?: string;
}

export const ChartTooltipContent: React.FC<ChartTooltipContentProps> = ({
  active,
  payload,
  hideLabel = false,
  className,
}) => {
  if (!active || !payload?.length) return null;

  return (
    <div
      className={cn(
        "bg-card border border-border rounded-lg shadow-md p-3 min-w-[120px]",
        className
      )}
    >
      <div className="space-y-1">
        {payload.map((entry: any, index: number) => {
          const labelKey = Object.keys(entry.payload).find(
            (k) => typeof entry.payload[k] === "string" && k !== "fill"
          );

          return (
            <div key={index} className="flex items-center gap-2 text-sm">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: entry.payload.fill }}
              />
              <span className="font-medium text-card-foreground">
                {entry.payload[labelKey!]}: {entry.value}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export interface ChartTooltipProps {
  content?: React.ComponentType<any>;
  cursor?: boolean;
  [key: string]: any;
}

export const ChartTooltip: React.FC<ChartTooltipProps> = ({
  content = ChartTooltipContent,
  ...props
}) => {
  return <Tooltip content={content as any} {...props} />;
};

export const RadialBar = ({ ...props }: RadialBarProps) => {
  return (
    <RechartsRadialBar style={{ outline: "none" }} background {...props} />
  );
};

export { PolarAngleAxis, Legend };
