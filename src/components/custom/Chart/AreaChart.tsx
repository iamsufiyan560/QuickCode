"use client";

import React from "react";
import {
  AreaChart as RechartsAreaChart,
  Area,
  ResponsiveContainer,
  CartesianGrid as RechartsCartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
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

export const CartesianGrid: React.FC<
  React.ComponentProps<typeof RechartsCartesianGrid>
> = ({ vertical = false, ...props }) => {
  return <RechartsCartesianGrid vertical={vertical} {...props} />;
};
export interface AreaChartProps
  extends React.ComponentProps<typeof RechartsAreaChart> {
  className?: string;
}

export const AreaChart: React.FC<AreaChartProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <RechartsAreaChart
      tabIndex={-1}
      className={cn("outline-none [&>svg]:outline-none", className)}
      style={{ outline: "none" }}
      {...props}
    >
      {children}
    </RechartsAreaChart>
  );
};

export interface ChartTooltipContentProps {
  active?: boolean;
  payload?: any[];
  label?: string | number;
  indicator?: "line" | "dot" | "dashed";
  hideLabel?: boolean;
  hideIndicator?: boolean;
  className?: string;
}

export const ChartTooltipContent: React.FC<ChartTooltipContentProps> = ({
  active,
  payload,
  label,
  indicator = "dot",
  hideLabel = false,
  hideIndicator = false,
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
      {!hideLabel && label && (
        <p className="text-sm font-medium text-card-foreground mb-2">{label}</p>
      )}
      <div className="space-y-1">
        {payload.map((entry, index) => (
          <div key={index} className="flex items-center gap-2 text-sm">
            {!hideIndicator && (
              <div className="flex items-center">
                {indicator === "dot" && (
                  <div
                    className="w-2 h-2 rounded-full"
                    style={{ backgroundColor: entry.color }}
                  />
                )}
                {indicator === "line" && (
                  <div
                    className="w-3 h-0.5"
                    style={{ backgroundColor: entry.color }}
                  />
                )}
                {indicator === "dashed" && (
                  <div
                    className="w-3 h-0.5 border-t border-dashed"
                    style={{ borderColor: entry.color }}
                  />
                )}
              </div>
            )}
            <span className="text-muted-foreground">{entry.name}:</span>
            <span className="font-medium text-card-foreground">
              {entry.value}
            </span>
          </div>
        ))}
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

export { Area, XAxis, YAxis, Legend };
