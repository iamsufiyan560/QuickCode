"use client";

import React from "react";
import {
  FunnelChart as RechartsFunnelChart,
  Funnel,
  LabelList,
  ResponsiveContainer,
  Tooltip,
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

export interface FunnelChartProps
  extends React.ComponentProps<typeof RechartsFunnelChart> {
  className?: string;
}

export const FunnelChart: React.FC<FunnelChartProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <RechartsFunnelChart
      tabIndex={-1}
      className={cn("outline-none [&>svg]:outline-none", className)}
      style={{ outline: "none" }}
      {...props}
    >
      {children}
    </RechartsFunnelChart>
  );
};

export interface ChartTooltipContentProps {
  active?: boolean;
  payload?: any[];
  label?: string | number;
  hideLabel?: boolean;
  className?: string;
  nameKey?: string;
  valueKey?: string;
}

export const ChartTooltipContent: React.FC<ChartTooltipContentProps> = ({
  active,
  payload,
  hideLabel = false,
  className,
  nameKey = "name",
  valueKey = "value",
}) => {
  if (!active || !payload?.length) return null;

  const data = payload[0]?.payload;
  if (!data) return null;

  return (
    <div
      className={cn(
        "bg-card border border-border rounded-lg shadow-md p-3 min-w-[120px]",
        className
      )}
    >
      {!hideLabel && data[nameKey] && (
        <p className="text-sm font-medium text-card-foreground mb-2">
          {data[nameKey]}
        </p>
      )}
      <div className="space-y-1">
        <div className="flex items-center justify-between gap-4 text-sm">
          <span className="text-muted-foreground">Value:</span>
          <span className="font-medium text-card-foreground">
            {data[valueKey]?.toLocaleString()}
          </span>
        </div>
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

export { Funnel, LabelList };
