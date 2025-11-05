"use client";
import React from "react";
import { cn } from "@/lib/utils";

interface TimelineProps extends React.ComponentProps<"ol"> {
  children: React.ReactNode;
  active?: number;
  color?: string;
  lineWidth?: number;
  bulletSize?: number;
  align?: "left" | "right";
  reverseActive?: boolean;
  dotStyle?: "filled" | "outline";
}

interface TimelineItemProps extends Omit<React.ComponentProps<"li">, "title"> {
  children: React.ReactNode;
  variant?: "solid" | "dashed" | "dotted";
  bullet?: React.ReactNode;
  title?: React.ReactNode;
  lineVariant?: "solid" | "dashed" | "dotted";
}

interface TimelineDotProps extends React.ComponentProps<"div"> {
  children?: React.ReactNode;
}

interface TimelineContentProps extends React.ComponentProps<"div"> {
  children: React.ReactNode;
}

interface TimelineTitleProps extends React.ComponentProps<"h3"> {
  children: React.ReactNode;
}

interface TimelineDescriptionProps extends React.ComponentProps<"p"> {
  children: React.ReactNode;
}

const TimelineContext = React.createContext<{
  active?: number;
  color?: string;
  lineWidth?: number;
  bulletSize?: number;
  align?: "left" | "right";
  reverseActive?: boolean;
  currentIndex?: number;
  dotStyle?: "filled" | "outline";
}>({});

const TimelineRoot = ({
  children,
  className,
  active,
  color = "bg-primary",
  lineWidth = 2,
  bulletSize = 32,
  align = "left",
  reverseActive = false,
  dotStyle = "filled",
  ...props
}: TimelineProps) => {
  const contextValue = React.useMemo(
    () => ({
      active,
      color,
      lineWidth,
      bulletSize,
      align,
      reverseActive,
      dotStyle,
    }),
    [active, color, lineWidth, bulletSize, align, reverseActive, dotStyle]
  );

  const childrenArray = React.Children.toArray(children);

  return (
    <TimelineContext.Provider value={contextValue}>
      <ol
        className={cn(
          "relative space-y-0",
          align === "right" && "flex flex-col items-end",
          className
        )}
        {...props}
      >
        {childrenArray.map((child, index) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child as React.ReactElement<any>, {
              key: index,
              "data-index": index,
            });
          }
          return child;
        })}
      </ol>
    </TimelineContext.Provider>
  );
};

const TimelineItem = ({
  children,
  variant,
  bullet,
  title,
  lineVariant,
  className,
  ...props
}: TimelineItemProps) => {
  const context = React.useContext(TimelineContext);
  const itemIndex = (props as any)["data-index"];

  const { dotStyle } = context;
  const isOutline = dotStyle === "outline";

  const {
    active,
    color = "bg-primary",
    lineWidth = 2,
    bulletSize = 32,
    align = "left",
    reverseActive = false,
  } = context;

  const isActive =
    active !== undefined &&
    (reverseActive ? itemIndex > active : itemIndex <= active);

  const effectiveVariant = lineVariant || variant || "solid";

  const lineStyles = {
    solid: `border-l-${lineWidth === 2 ? "2" : lineWidth} ${
      isActive ? color.replace("bg-", "border-") : "border-border"
    }`,
    dashed: `border-l-${lineWidth === 2 ? "2" : lineWidth} border-dashed ${
      isActive ? color.replace("bg-", "border-") : "border-border"
    }`,
    dotted: `border-l-${lineWidth === 2 ? "2" : lineWidth} border-dotted ${
      isActive ? color.replace("bg-", "border-") : "border-border"
    }`,
  };

  const dotElement = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === TimelineDot
  );

  const contentElement = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === TimelineContent
  );

  const titleElement = React.Children.toArray(children).find(
    (child) => React.isValidElement(child) && child.type === TimelineTitle
  );

  return (
    <li
      className={cn(
        "relative flex gap-4 last:pb-0 group",
        align === "right" && "flex-row-reverse",
        className
      )}
      {...props}
    >
      <div className="relative flex flex-col items-center">
        {bullet ? (
          <div
            className={cn(
              "relative z-10 flex shrink-0 items-center justify-center rounded-full transition-colors",
              isOutline
                ? `border-4 border-primary ${color} bg-transparent`
                : isActive
                ? color
                : "bg-muted border-2 border-border"
            )}
            style={{
              width: bulletSize,
              height: bulletSize,
            }}
          >
            {bullet}
          </div>
        ) : dotElement ? (
          React.cloneElement(dotElement as React.ReactElement<any>, {
            className: cn(
              (dotElement as React.ReactElement<any>).props.className,
              isActive && color
            ),
            style: {
              width: bulletSize,
              height: bulletSize,
            },
          })
        ) : (
          <div
            className={cn(
              "relative z-10 flex shrink-0 items-center justify-center rounded-full transition-colors",
              isOutline
                ? `border-4  ${
                    isActive ? color.replace("bg-", "border-") : "border-border"
                  } bg-transparent`
                : isActive
                ? color
                : "bg-background border-border"
            )}
            style={{ width: bulletSize, height: bulletSize }}
          />
        )}
        <div
          className={cn(
            "absolute bottom-0 left-1/2 -translate-x-1/2  group-last:hidden transition-colors",
            lineStyles[effectiveVariant]
          )}
          style={{
            top: bulletSize,
            height: `calc(100% - ${bulletSize}px)`,
            borderLeftWidth: lineWidth,
            borderLeftStyle: effectiveVariant,
            borderLeftColor: isActive ? color.replace("bg-", "") : "#e5e7eb",
            zIndex: 0,
          }}
        />
      </div>
      <div className={cn("flex-1 pb-8", align === "right" && "text-right")}>
        {title && (
          <h3 className="text-base font-semibold leading-none mb-1">{title}</h3>
        )}
        {titleElement}
        {contentElement}
        {!contentElement &&
          !titleElement &&
          React.Children.map(children, (child) => {
            if (
              React.isValidElement(child) &&
              child.type !== TimelineDot &&
              child.type !== TimelineTitle
            ) {
              return child;
            }
            return null;
          })}
      </div>
    </li>
  );
};

const TimelineDot = ({ children, className, ...props }: TimelineDotProps) => {
  return (
    <div
      className={cn(
        "relative z-10 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-background",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

const TimelineContent = ({
  children,
  className,
  ...props
}: TimelineContentProps) => {
  return (
    <div className={cn("space-y-1", className)} {...props}>
      {children}
    </div>
  );
};

const TimelineTitle = ({
  children,
  className,
  ...props
}: TimelineTitleProps) => {
  return (
    <h3
      className={cn("text-base font-semibold leading-none", className)}
      {...props}
    >
      {children}
    </h3>
  );
};

const TimelineDescription = ({
  children,
  className,
  ...props
}: TimelineDescriptionProps) => {
  return (
    <p className={cn("text-sm text-muted-foreground", className)} {...props}>
      {children}
    </p>
  );
};

export const Timeline = Object.assign(TimelineRoot, {
  Item: TimelineItem,
  Dot: TimelineDot,
  Content: TimelineContent,
  Title: TimelineTitle,
  Description: TimelineDescription,
});

export {
  TimelineItem,
  TimelineDot,
  TimelineContent,
  TimelineTitle,
  TimelineDescription,
};
