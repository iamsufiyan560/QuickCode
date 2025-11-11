"use client";
import React, { useRef, useState, useEffect } from "react";
import { cn } from "@/lib/utils";

export interface CandlestickDataPoint {
  date: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume?: number;
}

export interface CandlestickChartConfig {
  date?: {
    label?: string;
    color?: string;
  };
  bullish?: {
    label?: string;
    color?: string;
  };
  bearish?: {
    label?: string;
    color?: string;
  };
  volume?: {
    label?: string;
    color?: string;
  };
}

export interface CandlestickChartProps extends React.ComponentProps<"div"> {
  data: CandlestickDataPoint[];
  config?: CandlestickChartConfig;
  showGrid?: boolean;
  showTooltip?: boolean;
  showLegend?: boolean;
  showVolume?: boolean;
  candleWidth?: number;
  wickWidth?: number;
  renderTooltip?: (
    item: CandlestickDataPoint,
    index: number
  ) => React.ReactNode;
}

export const CandlestickChart: React.FC<CandlestickChartProps> = ({
  data,
  config = {},
  showGrid = true,
  showTooltip = true,
  candleWidth = 12,
  wickWidth = 2,
  className,
  renderTooltip,
  ...props
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.clientWidth,
          height: containerRef.current.clientHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const bullishColor = config.bullish?.color || "var(--chart-1)";
  const bearishColor = config.bearish?.color || "var(--chart-2)";

  const padding = { top: 20, right: 60, bottom: 40, left: 60 };
  const chartWidth = dimensions.width - padding.left - padding.right;
  const chartHeight = dimensions.height - padding.top - padding.bottom;

  const minPrice = Math.min(...data.map((d) => d.low));
  const maxPrice = Math.max(...data.map((d) => d.high));
  const priceRange = maxPrice - minPrice;
  const priceMin = minPrice - priceRange * 0.05;
  const priceMax = maxPrice + priceRange * 0.05;
  const totalPriceRange = priceMax - priceMin;

  const candleSpacing = chartWidth / data.length;
  const actualCandleWidth = Math.min(candleWidth, candleSpacing * 0.8);

  const priceToY = (price: number) => {
    return (
      padding.top +
      chartHeight -
      ((price - priceMin) / totalPriceRange) * chartHeight
    );
  };

  const indexToX = (index: number) => {
    return padding.left + (index + 0.5) * candleSpacing;
  };

  const yAxisTicks = 6;
  const yAxisValues = Array.from({ length: yAxisTicks }, (_, i) => {
    return priceMin + (totalPriceRange / (yAxisTicks - 1)) * i;
  });

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    if (
      x < padding.left ||
      x > dimensions.width - padding.right ||
      y < padding.top ||
      y > dimensions.height - padding.bottom
    ) {
      setHoveredIndex(null);
      return;
    }

    const relativeX = x - padding.left;
    const index = Math.floor(relativeX / candleSpacing);

    if (index >= 0 && index < data.length) {
      setHoveredIndex(index);
      setMousePos({ x, y });
    }
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    const touch = e.touches[0];
    const rect = containerRef.current!.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const relativeX = x - padding.left;
    const index = Math.floor(relativeX / candleSpacing);

    if (index >= 0 && index < data.length) {
      setHoveredIndex(index);
      setMousePos({ x, y });
    }
  };

  const handleMouseLeave = () => {
    setHoveredIndex(null);
  };

  if (dimensions.width === 0) {
    return (
      <div
        ref={containerRef}
        className={cn("w-full  h-full", className)}
        {...props}
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative min w-full  flex-shrink-0 min-w-0  h-full bg-background",
        className
      )}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchStart}
      {...props}
    >
      <svg
        width={dimensions.width}
        height={dimensions.height}
        className="absolute inset-0"
      >
        <defs>
          <pattern
            id="grid"
            width={candleSpacing}
            height={chartHeight / (yAxisTicks - 1)}
            patternUnits="userSpaceOnUse"
          >
            <path
              d={`M ${candleSpacing} 0 L 0 0 0 ${
                chartHeight / (yAxisTicks - 1)
              }`}
              fill="none"
              stroke="var(--border)"
              strokeWidth="0.5"
              opacity="0.3"
            />
          </pattern>
        </defs>

        {showGrid && (
          <g>
            {yAxisValues.map((value, i) => {
              const y = priceToY(value);
              return (
                <line
                  key={`grid-h-${i}`}
                  x1={padding.left}
                  y1={y}
                  x2={dimensions.width - padding.right}
                  y2={y}
                  stroke="var(--border)"
                  strokeWidth="1"
                  opacity="0.5"
                />
              );
            })}
            {data.map((_, i) => {
              if (i % Math.ceil(data.length / 10) !== 0) return null;
              const x = indexToX(i);
              return (
                <line
                  key={`grid-v-${i}`}
                  x1={x}
                  y1={padding.top}
                  x2={x}
                  y2={dimensions.height - padding.bottom}
                  stroke="var(--border)"
                  strokeWidth="1"
                  opacity="0.5"
                />
              );
            })}
          </g>
        )}

        <g className="y-axis">
          {yAxisValues.map((value, i) => {
            const y = priceToY(value);
            return (
              <g key={`y-axis-${i}`}>
                <text
                  x={dimensions.width - padding.right + 10}
                  y={y + 4}
                  className="fill-muted-foreground text-[11px] font-medium"
                >
                  ${value.toFixed(0)}
                </text>
              </g>
            );
          })}
        </g>

        <g className="x-axis">
          {data.map((item, i) => {
            if (i % Math.ceil(data.length / 8) !== 0 && i !== data.length - 1)
              return null;
            const x = indexToX(i);
            return (
              <text
                key={`x-axis-${i}`}
                x={x}
                y={dimensions.height - padding.bottom + 20}
                textAnchor="middle"
                className="fill-muted-foreground text-[11px] font-medium"
              >
                {item.date}
              </text>
            );
          })}
        </g>

        <g className="candlesticks">
          {data.map((item, i) => {
            const x = indexToX(i);
            const isBullish = item.close >= item.open;
            const color = isBullish ? bullishColor : bearishColor;

            const highY = priceToY(item.high);
            const lowY = priceToY(item.low);
            const openY = priceToY(item.open);
            const closeY = priceToY(item.close);

            const bodyTop = Math.min(openY, closeY);
            const bodyBottom = Math.max(openY, closeY);
            const bodyHeight = Math.max(bodyBottom - bodyTop, 1);

            const isHovered = hoveredIndex === i;

            return (
              <g key={`candle-${i}`}>
                <line
                  x1={x}
                  y1={highY}
                  x2={x}
                  y2={lowY}
                  stroke={color}
                  strokeWidth={wickWidth}
                  opacity={isHovered ? 1 : 0.9}
                />
                <rect
                  x={x - actualCandleWidth / 2}
                  y={bodyTop}
                  width={actualCandleWidth}
                  height={bodyHeight}
                  fill={isBullish ? color : color}
                  stroke={color}
                  strokeWidth={isBullish ? 0 : 1}
                  opacity={isHovered ? 1 : 0.9}
                  className={isHovered ? "brightness-110" : ""}
                />
              </g>
            );
          })}
        </g>

        {hoveredIndex !== null && (
          <g>
            <line
              x1={indexToX(hoveredIndex)}
              y1={padding.top}
              x2={indexToX(hoveredIndex)}
              y2={dimensions.height - padding.bottom}
              stroke="var(--muted-foreground)"
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity="0.5"
            />
            <line
              x1={padding.left}
              y1={mousePos.y}
              x2={dimensions.width - padding.right}
              y2={mousePos.y}
              stroke="var(--muted-foreground)"
              strokeWidth="1"
              strokeDasharray="4 4"
              opacity="0.5"
            />
          </g>
        )}
      </svg>

      {showTooltip &&
        hoveredIndex !== null &&
        (() => {
          const ttWidth = 220;
          const ttHeight = 180;
          const padding = 8;

          let left =
            mousePos.x > dimensions.width / 2
              ? mousePos.x - 220
              : mousePos.x + 20;

          let top = Math.min(mousePos.y, dimensions.height - 200);

          left = Math.max(
            padding,
            Math.min(left, window.innerWidth - ttWidth - padding)
          );

          top = Math.max(
            padding,
            Math.min(top, window.innerHeight - ttHeight - padding)
          );

          return (
            <div
              className="pointer-events-none absolute z-50 rounded-lg border border-border bg-popover/95 p-3 shadow-xl min-w-[200px]"
              style={{ left, top }}
            >
              {renderTooltip ? (
                renderTooltip(data[hoveredIndex], hoveredIndex)
              ) : (
                <>
                  <div className="space-y-1.5">
                    <p className="text-sm font-semibold text-popover-foreground border-b border-border pb-1.5 mb-2">
                      {data[hoveredIndex].date}
                    </p>
                    <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-xs">
                      <span className="text-muted-foreground">Open</span>
                      <span className="font-medium text-popover-foreground text-right tabular-nums">
                        ${data[hoveredIndex].open.toFixed(2)}
                      </span>

                      <span className="text-muted-foreground">High</span>
                      <span className="font-medium text-popover-foreground text-right tabular-nums">
                        ${data[hoveredIndex].high.toFixed(2)}
                      </span>

                      <span className="text-muted-foreground">Low</span>
                      <span className="font-medium text-popover-foreground text-right tabular-nums">
                        ${data[hoveredIndex].low.toFixed(2)}
                      </span>

                      <span className="text-muted-foreground">Close</span>
                      <span className="font-medium text-popover-foreground text-right tabular-nums">
                        ${data[hoveredIndex].close.toFixed(2)}
                      </span>
                    </div>

                    <div className="border-t border-border pt-1.5 mt-2 grid grid-cols-2 gap-x-4 text-xs">
                      <span className="text-muted-foreground">Change</span>
                      <span
                        className={cn(
                          "font-semibold text-right tabular-nums",
                          data[hoveredIndex].close >= data[hoveredIndex].open
                            ? "text-chart-1"
                            : "text-chart-2"
                        )}
                      >
                        {data[hoveredIndex].close >= data[hoveredIndex].open
                          ? "+"
                          : ""}
                        $
                        {(
                          data[hoveredIndex].close - data[hoveredIndex].open
                        ).toFixed(2)}{" "}
                        (
                        {(
                          ((data[hoveredIndex].close -
                            data[hoveredIndex].open) /
                            data[hoveredIndex].open) *
                          100
                        ).toFixed(2)}
                        %)
                      </span>
                    </div>

                    {data[hoveredIndex].volume && (
                      <div className="grid grid-cols-2 gap-x-4 text-xs">
                        <span className="text-muted-foreground">Volume</span>
                        <span className="font-medium text-popover-foreground text-right tabular-nums">
                          {data[hoveredIndex].volume.toLocaleString()}
                        </span>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
          );
        })()}
    </div>
  );
};
