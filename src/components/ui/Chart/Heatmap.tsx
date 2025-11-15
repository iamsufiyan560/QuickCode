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
  children?: React.ReactNode;
}

export interface HeatmapTooltipProps {
  content?: (value: number, row: number, col: number) => React.ReactNode;
  side?: "top" | "right" | "bottom" | "left";
  className?: string;
}

interface CellProps {
  value: number;
  row: number;
  col: number;
  cellSize: number;
  classColor: string;
  styleColor: React.CSSProperties;
  onClick?: () => void;
  tooltipConfig: HeatmapTooltipProps | null;
}

const HeatmapCell = React.memo(
  ({
    value,
    row,
    col,
    cellSize,
    classColor,
    styleColor,
    onClick,
    tooltipConfig,
  }: CellProps) => {
    const cellStyle = React.useMemo(
      () => ({
        width: cellSize,
        height: cellSize,
        ...styleColor,
      }),
      [cellSize, styleColor]
    );

    const button = (
      <button
        type="button"
        className={cn(
          "rounded",
          "focus-visible:ring-2 focus-visible:ring-primary",
          classColor
        )}
        style={cellStyle}
        onClick={onClick}
      />
    );

    if (!tooltipConfig) return button;

    return (
      <Tooltip
        content={
          tooltipConfig.content
            ? tooltipConfig.content(value, row, col)
            : `Value: ${value}`
        }
        side={tooltipConfig.side || "top"}
        className={tooltipConfig.className}
      >
        {button}
      </Tooltip>
    );
  }
);

HeatmapCell.displayName = "HeatmapCell";

const HeatmapRoot = ({
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
  children,
  ...props
}: HeatmapProps) => {
  const flat = React.useMemo(() => data.flat(), [data]);

  const computedMin = React.useMemo(
    () => (typeof min === "number" ? min : flat.length ? Math.min(...flat) : 0),
    [min, flat]
  );

  const computedMax = React.useMemo(
    () => (typeof max === "number" ? max : flat.length ? Math.max(...flat) : 1),
    [max, flat]
  );

  const range = computedMax - computedMin || 1;

  const normalize = React.useCallback(
    (v: number) => (v - computedMin) / range,
    [computedMin, range]
  );

  const getBucket = React.useCallback(
    (v: number) => {
      if (!colorScale) return "bg-primary/50";
      const t = normalize(v);
      const idx = Math.min(
        colorScale.length - 1,
        Math.floor(t * (colorScale.length - 1))
      );
      return colorScale[idx];
    },
    [colorScale, normalize]
  );

  const tooltipConfig = React.useMemo(() => {
    const tooltipChild = React.Children.toArray(children).find(
      (child) => React.isValidElement(child) && child.type === HeatmapTooltip
    ) as React.ReactElement<HeatmapTooltipProps> | undefined;

    return tooltipChild?.props || null;
  }, [children]);

  const padding = 2;

  const getCellStyle = React.useCallback(
    (value: number, ri: number, ci: number) => {
      const result = colorFn?.(value, ri, ci, computedMin, computedMax);
      const isClass = result?.startsWith("bg-");
      const classColor = isClass
        ? result || ""
        : !colorFn
        ? getBucket(value)
        : "";
      const styleColor: React.CSSProperties =
        !isClass && colorFn && result ? { background: result } : {};

      return { classColor, styleColor };
    },
    [colorFn, computedMin, computedMax, getBucket]
  );

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
                const { classColor, styleColor } = getCellStyle(value, ri, ci);

                return (
                  <td key={ci} style={{ padding }}>
                    <HeatmapCell
                      value={value}
                      row={ri}
                      col={ci}
                      cellSize={cellSize}
                      classColor={classColor}
                      styleColor={styleColor}
                      onClick={
                        onCellClick
                          ? () => onCellClick(ri, ci, value)
                          : undefined
                      }
                      tooltipConfig={tooltipConfig}
                    />
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

const HeatmapTooltip = (_props: HeatmapTooltipProps) => {
  return null;
};

export const Heatmap = Object.assign(HeatmapRoot, {
  Tooltip: HeatmapTooltip,
});

export { HeatmapTooltip };
export default Heatmap;
