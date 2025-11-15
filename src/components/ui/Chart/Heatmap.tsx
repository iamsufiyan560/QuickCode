"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { Tooltip } from "@/components/ui/Tooltip";

export interface HeatmapProps extends React.ComponentProps<"div"> {
  data: number[][];
  rowLabels?: string[];
  colLabels?: string[];
  min?: number;
  max?: number;
  cellSize?: number;
  gap?: number;
  onCellClick?: (row: number, col: number, value: number) => void;
  colorFn?: (
    value: number,
    row: number,
    col: number,
    min: number,
    max: number
  ) => string;
  colorScale?: string[];
  caption?: string;
  showTooltip?: boolean;
  tooltipContent?: (value: number, row: number, col: number) => React.ReactNode;
  tooltipSide?: "top" | "right" | "bottom" | "left";
}

export const Heatmap = ({
  data,
  rowLabels,
  colLabels,
  min,
  max,
  cellSize = 20,
  gap = 4,
  onCellClick,
  colorFn,
  colorScale,
  caption,
  className,
  showTooltip = false,
  tooltipContent,
  tooltipSide = "top",
  ...props
}: HeatmapProps) => {
  const flat = data.flat();
  const computedMin =
    typeof min === "number" ? min : flat.length ? Math.min(...flat) : 0;
  const computedMax =
    typeof max === "number" ? max : flat.length ? Math.max(...flat) : 1;

  const range = computedMax - computedMin || 1;
  const normalize = (v: number) => (v - computedMin) / range;

  const getBucket = (v: number) => {
    if (!colorScale) return "bg-primary/50";
    const t = normalize(v);
    const idx = Math.min(
      colorScale.length - 1,
      Math.floor(t * (colorScale.length - 1))
    );
    return colorScale[idx];
  };

  const padding = 2;

  return (
    <div className={cn("overflow-auto", className)} {...props}>
      <table aria-label={caption ?? "Heatmap"}>
        {caption && <caption className="sr-only">{caption}</caption>}

        {colLabels && (
          <thead>
            <tr>
              {rowLabels && <th />}
              {colLabels.map((label, i) => (
                <th
                  key={i}
                  className="text-xs text-muted-foreground px-1"
                  style={{ padding }}
                >
                  <div style={{ width: cellSize, textAlign: "center" }}>
                    {label}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
        )}

        <tbody>
          {data.map((row, ri) => (
            <tr key={ri}>
              {rowLabels && (
                <th className="text-xs text-muted-foreground pr-2">
                  {rowLabels[ri]}
                </th>
              )}

              {row.map((value, ci) => {
                const result = colorFn?.(
                  value,
                  ri,
                  ci,
                  computedMin,
                  computedMax
                );

                const isClass = result?.startsWith("bg-");
                const classColor = isClass
                  ? result
                  : !colorFn
                  ? getBucket(value)
                  : "";

                const styleColor =
                  !isClass && colorFn ? { background: result } : {};

                return (
                  <td key={ci} style={{ padding: padding }}>
                    {/* <button
                      type="button"
                      className={cn(
                        "rounded",
                        "focus-visible:ring-2 focus-visible:ring-primary",
                        classColor
                      )}
                      style={{
                        width: cellSize,
                        height: cellSize,
                        ...styleColor,
                      }}
                      onClick={() => onCellClick?.(ri, ci, value)}
                    /> */}
                    <ConditionalWrapper
                      condition={showTooltip}
                      wrapper={(children) => (
                        <Tooltip
                          content={
                            tooltipContent
                              ? tooltipContent(value, ri, ci)
                              : `Value: ${value}`
                          }
                          side={tooltipSide}
                        >
                          {children}
                        </Tooltip>
                      )}
                    >
                      <button
                        type="button"
                        className={cn(
                          "rounded",
                          "focus-visible:ring-2 focus-visible:ring-primary",
                          classColor
                        )}
                        style={{
                          width: cellSize,
                          height: cellSize,
                          ...styleColor,
                        }}
                        onClick={() => onCellClick?.(ri, ci, value)}
                      />
                    </ConditionalWrapper>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Heatmap;

const ConditionalWrapper = ({
  condition,
  wrapper,
  children,
}: {
  condition: boolean;
  wrapper: (children: React.ReactNode) => React.JSX.Element;
  children: React.ReactNode;
}) => (condition ? wrapper(children) : <>{children}</>);
