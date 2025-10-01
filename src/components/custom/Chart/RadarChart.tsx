"use client";

import React from "react";
import {
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Legend,
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

export interface RadarChartProps
  extends React.ComponentProps<typeof RechartsRadarChart> {
  className?: string;
}

export const RadarChart: React.FC<RadarChartProps> = ({
  className,
  children,
  ...props
}) => {
  return (
    <RechartsRadarChart
      tabIndex={-1}
      className={cn("outline-none [&>svg]:outline-none", className)}
      style={{ outline: "none" }}
      {...props}
    >
      {children}
    </RechartsRadarChart>
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

export interface ChartLegendContentProps {
  payload?: any[];
  className?: string;
}

export const ChartLegendContent: React.FC<ChartLegendContentProps> = ({
  payload,
  className,
}) => {
  if (!payload?.length) return null;

  return (
    <div className={cn("flex justify-center gap-6 mt-4", className)}>
      {payload.map((entry, index) => (
        <div key={index} className="flex items-center gap-2">
          <div
            className="w-3 h-3 rounded-sm"
            style={{ backgroundColor: entry.color }}
          />
          <span className="text-sm text-muted-foreground">{entry.value}</span>
        </div>
      ))}
    </div>
  );
};

export interface ChartLegendProps {
  content?: React.ComponentType<any>;
  [key: string]: any;
}

export const ChartLegend: React.FC<ChartLegendProps> = ({
  content = ChartLegendContent,
  ...props
}) => {
  return <Legend content={content as any} {...props} />;
};

export { Radar, PolarGrid, PolarAngleAxis, PolarRadiusAxis };
