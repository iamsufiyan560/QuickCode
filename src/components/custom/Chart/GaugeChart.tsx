import * as React from "react";
import { cn } from "@/lib/utils";

export interface GaugeChartProps extends React.ComponentProps<"div"> {
  value: number;
  min?: number;
  max?: number;
  startAngle?: number;
  endAngle?: number;
  segments?: Array<{
    threshold: number;
    color: string;
    label?: string;
  }>;
  showValue?: boolean;
  showLabels?: boolean;
  valueFormatter?: (value: number) => string;
  needleColor?: string;
  trackColor?: string;
  size?: number;
}

export const GaugeChart = React.forwardRef<HTMLDivElement, GaugeChartProps>(
  (
    {
      value,
      min = 0,
      max = 100,
      startAngle = -90,
      endAngle = 90,
      segments = [
        { threshold: 0, color: "var(--destructive)" },
        { threshold: 33, color: "var(--chart-2)" },
        { threshold: 66, color: "var(--chart-3)" },
      ],
      showValue = true,
      showLabels = true,
      valueFormatter = (v) => `${v}`,
      needleColor = "var(--foreground)",
      trackColor = "var(--muted)",
      size = 200,
      className,
      ...props
    },
    ref
  ) => {
    const normalizedValue = Math.max(min, Math.min(max, value));
    const percentage = ((normalizedValue - min) / (max - min)) * 100;

    const totalAngle = endAngle - startAngle;
    const needleAngle = startAngle + (totalAngle * percentage) / 100;

    const radius = size / 2 - 20;
    const centerX = size / 2;
    const centerY = size / 2;

    const polarToCartesian = (angle: number, r: number) => {
      const angleInRadians = ((angle - 90) * Math.PI) / 180;
      return {
        x: centerX + r * Math.cos(angleInRadians),
        y: centerY + r * Math.sin(angleInRadians),
      };
    };

    const createArc = (start: number, end: number, r: number) => {
      const startPoint = polarToCartesian(start, r);
      const endPoint = polarToCartesian(end, r);
      const largeArcFlag = end - start <= 180 ? 0 : 1;

      return `M ${startPoint.x} ${startPoint.y} A ${r} ${r} 0 ${largeArcFlag} 1 ${endPoint.x} ${endPoint.y}`;
    };

    const sortedSegments = [...segments].sort(
      (a, b) => a.threshold - b.threshold
    );

    const needleLength = radius - 10;
    const needleEnd = polarToCartesian(needleAngle, needleLength);

    const gaugeSegments = sortedSegments.map((segment, index) => {
      const nextSegment = sortedSegments[index + 1];
      const segmentStart = startAngle + (totalAngle * segment.threshold) / 100;
      const segmentEnd = nextSegment
        ? startAngle + (totalAngle * nextSegment.threshold) / 100
        : endAngle;

      return {
        path: createArc(segmentStart, segmentEnd, radius),
        color: segment.color,
        label: segment.label,
      };
    });

    const labelPositions =
      showLabels && Math.abs(endAngle - startAngle) < 360
        ? [
            { value: min, angle: startAngle },
            { value: max, angle: endAngle },
          ]
        : [];

    return (
      <div
        ref={ref}
        className={cn("inline-flex flex-col items-center gap-2", className)}
        {...props}
      >
        <svg
          width={size}
          height={size}
          viewBox={`0 0 ${size} ${size}`}
          className="overflow-visible"
        >
          <path
            d={createArc(startAngle, endAngle, radius)}
            fill="none"
            stroke={trackColor}
            strokeWidth="16"
            strokeLinecap="round"
          />
          {gaugeSegments.map((segment, index) => (
            <path
              key={index}
              d={segment.path}
              fill="none"
              stroke={segment.color}
              strokeWidth="16"
              strokeLinecap="round"
            />
          ))}
          //
          {/* {showLabels &&
            labelPositions.map((label, index) => {
              const labelPos = polarToCartesian(label.angle, radius + 25);
              return (
                <text
                  key={index}
                  x={labelPos.x}
                  y={labelPos.y}
                  textAnchor="middle"
                  className="fill-muted-foreground text-xs"
                  dominantBaseline="middle"
                >
                  {valueFormatter(label.value)}
                </text>
              );
            })} */}
          {showLabels &&
            labelPositions.map((label, index) => {
              const offsetOutside = 20;
              const labelPos = polarToCartesian(
                label.angle,
                radius + offsetOutside
              );
              const formatted = valueFormatter(label.value);

              const isRightSide = labelPos.x >= centerX;
              const anchor = isRightSide ? "start" : "end";

              return (
                <text
                  key={index}
                  x={labelPos.x}
                  y={labelPos.y}
                  textAnchor={anchor}
                  className="fill-muted-foreground text-xs"
                  dominantBaseline="middle"
                >
                  {formatted}
                </text>
              );
            })}
          <line
            x1={centerX}
            y1={centerY}
            x2={needleEnd.x}
            y2={needleEnd.y}
            stroke={needleColor}
            strokeWidth="3"
            strokeLinecap="round"
          />
          <circle cx={centerX} cy={centerY} r="8" fill={needleColor} />
        </svg>

        {showValue && (
          <div className="flex flex-col items-center gap-1">
            <span className="text-2xl font-bold text-foreground">
              {valueFormatter(normalizedValue)}
            </span>
            <span className="text-sm text-muted-foreground">
              of {valueFormatter(max)}
            </span>
          </div>
        )}
      </div>
    );
  }
);

GaugeChart.displayName = "GaugeChart";
