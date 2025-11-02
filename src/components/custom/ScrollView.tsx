"use client";
import React, { useRef, useState, useEffect } from "react";

interface ScrollViewProps extends React.ComponentProps<"div"> {
  orientation?: "vertical" | "horizontal";
  showScrollbar?: boolean;
  scrollbarSize?: "sm" | "md" | "lg";
}

export const ScrollView = React.forwardRef<HTMLDivElement, ScrollViewProps>(
  (
    {
      children,
      className,
      orientation = "vertical",
      showScrollbar = true,
      scrollbarSize = "md",
      ...props
    },
    ref
  ) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const viewportRef = useRef<HTMLDivElement>(null);
    const thumbRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const [scrollRatio, setScrollRatio] = useState(0);
    const [thumbSize, setThumbSize] = useState(0);
    const [showThumb, setShowThumb] = useState(false);

    const isVertical = orientation === "vertical";

    const scrollbarSizeClasses = {
      sm: isVertical ? "w-1.5" : "h-1.5",
      md: isVertical ? "w-2" : "h-2",
      lg: isVertical ? "w-2.5" : "h-2.5",
    };

    useEffect(() => {
      const viewport = viewportRef.current;
      if (!viewport) return;

      const updateScrollbar = () => {
        const scrollSize = isVertical
          ? viewport.scrollHeight
          : viewport.scrollWidth;
        const clientSize = isVertical
          ? viewport.clientHeight
          : viewport.clientWidth;
        const scrollPos = isVertical ? viewport.scrollTop : viewport.scrollLeft;

        const ratio = clientSize / scrollSize;
        const needsScrollbar = ratio < 0.99;
        setShowThumb(needsScrollbar);

        if (needsScrollbar) {
          const trackSize = isVertical
            ? containerRef.current?.clientHeight || clientSize
            : containerRef.current?.clientWidth || clientSize;
          const newThumbSize = Math.max(ratio * trackSize, 30);
          const maxScroll = scrollSize - clientSize;
          const newScrollRatio = maxScroll > 0 ? scrollPos / maxScroll : 0;

          setThumbSize(newThumbSize);
          setScrollRatio(newScrollRatio);
        }
      };

      updateScrollbar();
      viewport.addEventListener("scroll", updateScrollbar);

      const resizeObserver = new ResizeObserver(updateScrollbar);
      resizeObserver.observe(viewport);

      return () => {
        viewport.removeEventListener("scroll", updateScrollbar);
        resizeObserver.disconnect();
      };
    }, [isVertical]);

    const handleThumbMouseDown = (e: React.MouseEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(true);
    };

    useEffect(() => {
      if (!isDragging) return;

      const handleMouseMove = (e: MouseEvent) => {
        const viewport = viewportRef.current;
        const track = containerRef.current;
        if (!viewport || !track) return;

        const rect = track.getBoundingClientRect();
        const scrollSize = isVertical
          ? viewport.scrollHeight
          : viewport.scrollWidth;
        const clientSize = isVertical
          ? viewport.clientHeight
          : viewport.clientWidth;
        const maxScroll = scrollSize - clientSize;
        const trackSize = isVertical ? rect.height : rect.width;

        if (isVertical) {
          const mouseY = e.clientY - rect.top;
          const scrollPercentage = Math.max(
            0,
            Math.min(1, (mouseY - thumbSize / 2) / (trackSize - thumbSize))
          );
          viewport.scrollTop = scrollPercentage * maxScroll;
        } else {
          const mouseX = e.clientX - rect.left;
          const scrollPercentage = Math.max(
            0,
            Math.min(1, (mouseX - thumbSize / 2) / (trackSize - thumbSize))
          );
          viewport.scrollLeft = scrollPercentage * maxScroll;
        }
      };

      const handleMouseUp = () => {
        setIsDragging(false);
      };

      document.addEventListener("mousemove", handleMouseMove);
      document.addEventListener("mouseup", handleMouseUp);
      document.body.style.userSelect = "none";

      return () => {
        document.removeEventListener("mousemove", handleMouseMove);
        document.removeEventListener("mouseup", handleMouseUp);
        document.body.style.userSelect = "";
      };
    }, [isDragging, thumbSize, isVertical]);

    const handleTrackClick = (e: React.MouseEvent) => {
      if (e.target !== e.currentTarget) return;

      const viewport = viewportRef.current;
      const track = containerRef.current;
      if (!viewport || !track) return;

      const rect = track.getBoundingClientRect();
      const scrollSize = isVertical
        ? viewport.scrollHeight
        : viewport.scrollWidth;
      const clientSize = isVertical
        ? viewport.clientHeight
        : viewport.clientWidth;
      const maxScroll = scrollSize - clientSize;
      const trackSize = isVertical ? rect.height : rect.width;

      if (isVertical) {
        const mouseY = e.clientY - rect.top;
        const scrollPercentage = Math.max(
          0,
          Math.min(1, (mouseY - thumbSize / 2) / (trackSize - thumbSize))
        );
        viewport.scrollTop = scrollPercentage * maxScroll;
      } else {
        const mouseX = e.clientX - rect.left;
        const scrollPercentage = Math.max(
          0,
          Math.min(1, (mouseX - thumbSize / 2) / (trackSize - thumbSize))
        );
        viewport.scrollLeft = scrollPercentage * maxScroll;
      }
    };

    const trackSize = isVertical
      ? containerRef.current?.clientHeight || 0
      : containerRef.current?.clientWidth || 0;
    const thumbPosition = scrollRatio * (trackSize - thumbSize);

    return (
      <div
        className={`relative flex ${
          isVertical ? "flex-row" : "flex-col"
        } overflow-hidden ${className || ""}`}
        ref={ref}
        {...props}
      >
        <div
          ref={viewportRef}
          className={`flex-1  overflow-auto ${
            isVertical
              ? "overflow-y-auto overflow-x-hidden"
              : "overflow-x-auto overflow-y-hidden "
          }`}
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
          tabIndex={0}
          role="region"
          aria-label={`${orientation} scrollable content`}
        >
          <div style={{ display: "table" }}>{children}</div>
        </div>

        {showScrollbar && showThumb && (
          <div
            ref={containerRef}
            className={`flex-shrink-0 ${
              isVertical ? "w-3 py-1" : "h-3 px-1"
            } flex ${
              isVertical
                ? "items-start justify-center"
                : "items-center justify-start"
            }`}
            onClick={handleTrackClick}
          >
            <div
              ref={thumbRef}
              className={`bg-border hover:bg-foreground/20 rounded-full transition-colors cursor-grab active:cursor-grabbing ${scrollbarSizeClasses[scrollbarSize]}`}
              style={{
                [isVertical ? "height" : "width"]: `${thumbSize}px`,
                transform: isVertical
                  ? `translateY(${thumbPosition}px)`
                  : `translateX(${thumbPosition}px)`,
              }}
              onMouseDown={handleThumbMouseDown}
              role="scrollbar"
              aria-orientation={orientation}
              aria-valuenow={Math.round(scrollRatio * 100)}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
        )}
      </div>
    );
  }
);

ScrollView.displayName = "ScrollView";
