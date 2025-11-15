"use client";

import React from "react";
import {
  ScatterChart as RechartsScatterChart,
  Scatter,
  ResponsiveContainer,
  CartesianGrid as RechartsCartesianGrid,
  XAxis,
  YAxis,
  ZAxis,
  Tooltip,
  Legend,
  Cell,
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

export interface ScatterChartProps
  extends React.ComponentProps<typeof RechartsScatterChart> {
  className?: string;
}

export const ScatterChart: React.FC<ScatterChartProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <RechartsScatterChart
      tabIndex={-1}
      className={cn("outline-none [&>svg]:outline-none", className)}
      style={{ outline: "none" }}
      {...props}
    >
      {children}
    </RechartsScatterChart>
  );
};

export interface ChartTooltipContentProps {
  active?: boolean;
  payload?: any[];
  label?: string | number;
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

  const data = payload[0]?.payload;
  if (!data) return null;

  return (
    <div
      className={cn(
        "bg-card border border-border rounded-lg shadow-md p-3 min-w-[140px]",
        className
      )}
    >
      {!hideLabel && data.name && (
        <p className="text-sm font-medium text-card-foreground mb-2">
          {data.name}
        </p>
      )}
      <div className="space-y-1">
        {data.x !== undefined && (
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="text-muted-foreground">X:</span>
            <span className="font-medium text-card-foreground">{data.x}</span>
          </div>
        )}
        {data.y !== undefined && (
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="text-muted-foreground">Y:</span>
            <span className="font-medium text-card-foreground">{data.y}</span>
          </div>
        )}
        {data.z !== undefined && (
          <div className="flex items-center justify-between gap-4 text-sm">
            <span className="text-muted-foreground">Size:</span>
            <span className="font-medium text-card-foreground">{data.z}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export interface ChartTooltipProps {
  content?: React.ComponentType<any>;
  cursor?: boolean | object;
  [key: string]: any;
}

export const ChartTooltip: React.FC<ChartTooltipProps> = ({
  content = ChartTooltipContent,
  ...props
}) => {
  return <Tooltip content={content as any} {...props} />;
};

export { Scatter, XAxis, YAxis, ZAxis, Legend, Cell };
