"use client";

import React from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight, X } from "lucide-react";
import { cn } from "@/lib/utils";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/custom/Select";
import { Tooltip } from "@/components/custom/Tooltip";
import { Button } from "./Button";

export interface DateRange {
  start: Date | null | any;
  end: Date | null | any;
}

export interface DateRangePreset {
  label: string;
  range: DateRange;
}

export interface DateHighlight {
  date: Date;
  className?: string;
  label?: string;
  disabled?: boolean;
}

export interface DateRangePickerProps
  extends Omit<
    React.ComponentProps<"div">,
    "onChange" | "value" | "defaultValue"
  > {
  value?: DateRange;
  defaultValue?: DateRange;
  onChange?: (range: DateRange) => void;
  disabled?: boolean;
  placeholder?: string;
  locale?: string;
  minDate?: Date;
  maxDate?: Date;
  maxRange?: number;
  minRange?: number;
  highlightedDates?: DateHighlight[];
  disabledDates?: Date[];
  holidays?: Date[];
  specialDays?: Array<{
    date: Date;
    className?: string;
    label?: string;
    disabled?: boolean;
  }>;
  disableWeekends?: boolean;
  disableHolidays?: boolean;
  presets?: DateRangePreset[];
  showLegend?: boolean;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  format?: (range: DateRange) => string;
  id?: string;
}

const MONTHS = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

const HOLIDAY_COLORS = {
  normal: "bg-destructive/20 text-destructive hover:bg-destructive/30",
  disabled: "bg-destructive/10 text-destructive/60",
  dot: "bg-destructive",
  legend: "bg-destructive/20",
};

const SPECIAL_COLORS = {
  normal: "bg-blue-500/20 text-blue-600 hover:bg-blue-500/30",
  disabled: "bg-blue-500/10 text-blue-600/60",
  dot: "bg-blue-600",
  legend: "bg-blue-500/20",
};

const DEFAULT_PRESETS: DateRangePreset[] = [
  {
    label: "Last 7 days",
    range: {
      start: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      end: new Date(),
    },
  },
  {
    label: "Last 30 days",
    range: {
      start: new Date(Date.now() - 29 * 24 * 60 * 60 * 1000),
      end: new Date(),
    },
  },
  {
    label: "This month",
    range: {
      start: new Date(new Date().getFullYear(), new Date().getMonth(), 1),
      end: new Date(),
    },
  },
  {
    label: "Last month",
    range: {
      start: new Date(new Date().getFullYear(), new Date().getMonth() - 1, 1),
      end: new Date(new Date().getFullYear(), new Date().getMonth(), 0),
    },
  },
];

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  value,
  defaultValue,
  onChange,
  disabled = false,
  placeholder = "Select date range",
  locale = "en-IN",
  minDate,
  maxDate,
  maxRange,
  minRange,
  highlightedDates = [],
  disabledDates = [],
  holidays = [],
  specialDays = [],
  disableWeekends = false,
  disableHolidays = false,
  presets = DEFAULT_PRESETS,
  showLegend = true,
  className,
  triggerClassName,
  contentClassName,
  format,
  id,
  ...props
}) => {
  const [selectedRange, setSelectedRange] = React.useState<DateRange>(
    value || defaultValue || { start: null, end: null }
  );
  const [open, setOpen] = React.useState(false);
  const [leftMonth, setLeftMonth] = React.useState(
    selectedRange.start || new Date()
  );
  const [rightMonth, setRightMonth] = React.useState(() => {
    const base = selectedRange.start || new Date();
    return new Date(base.getFullYear(), base.getMonth() + 1);
  });
  const [hoverDate, setHoverDate] = React.useState<Date | null>(null);
  const [isSelectingEnd, setIsSelectingEnd] = React.useState(false);

  const containerRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  function formatLocalDate(date: Date | null) {
    if (!date) return null;
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  // React.useEffect(() => {
  //   if (value !== undefined) {
  //     setSelectedRange(value);
  //   }
  // }, [value]);

  React.useEffect(() => {
    if (value !== undefined) {
      const start =
        value.start && typeof value.start === "string"
          ? new Date(value.start)
          : value.start;
      const end =
        value.end && typeof value.end === "string"
          ? new Date(value.end)
          : value.end;
      setSelectedRange({ start, end });
    }
  }, [value]);

  const formatRange = (range: DateRange) => {
    if (!range.start && !range.end) return "";
    if (format) return format(range);

    const options: Intl.DateTimeFormatOptions = {
      month: "short",
      day: "numeric",
      year: "numeric",
    };
    const startDate = range.start
      ? typeof range.start === "string"
        ? new Date(range.start)
        : range.start
      : null;
    const endDate = range.end
      ? typeof range.end === "string"
        ? new Date(range.end)
        : range.end
      : null;

    if (startDate && endDate) {
      return `${startDate.toLocaleDateString(
        locale,
        options
      )} - ${endDate.toLocaleDateString(locale, options)}`;
    } else if (startDate) {
      return `${startDate.toLocaleDateString(locale, options)} - ...`;
    }

    return "";

    // if (range.start && range.end) {
    //   return `${range.start.toLocaleDateString(
    //     locale,
    //     options
    //   )} - ${range.end.toLocaleDateString(locale, options)}`;
    // } else if (range.start) {
    //   return `${range.start.toLocaleDateString(locale, options)} - ...`;
    // }

    // return "";
  };

  const isDateInRange = (date: Date, start: Date | null, end: Date | null) => {
    if (!start || !end) return false;
    const dateTime = date.getTime();
    const startTime = start.getTime();
    const endTime = end.getTime();
    return dateTime >= startTime && dateTime <= endTime;
  };

  const isDateRangeStart = (date: Date, start: Date | null) => {
    return start && date.toDateString() === start.toDateString();
  };

  const isDateRangeEnd = (date: Date, end: Date | null) => {
    return end && date.toDateString() === end.toDateString();
  };

  const getPreviewRange = (): DateRange => {
    if (!selectedRange.start || !hoverDate || selectedRange.end) {
      return selectedRange;
    }

    if (hoverDate < selectedRange.start) {
      return { start: hoverDate, end: selectedRange.start };
    }

    return { start: selectedRange.start, end: hoverDate };
  };

  const handleDateSelect = (date: Date) => {
    if (disabled || isDateDisabled(date)) return;

    if (!selectedRange.start || (selectedRange.start && selectedRange.end)) {
      const newRange = { start: date, end: null };
      setSelectedRange(newRange);
      setIsSelectingEnd(true);
      onChange?.(newRange);
    } else if (selectedRange.start && !selectedRange.end) {
      let start = selectedRange.start;
      let end = date;

      if (date < selectedRange.start) {
        start = date;
        end = selectedRange.start;
      }

      if (maxRange) {
        const daysDiff =
          Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
        if (daysDiff > maxRange - 1) return;
      }

      if (minRange) {
        const daysDiff =
          Math.abs(end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24);
        if (daysDiff < minRange - 1) return;
      }

      const newRange = { start, end };
      setSelectedRange(newRange);
      setIsSelectingEnd(false);
      // onChange?.(newRange);
      onChange?.({
        // start: start ? start.toISOString().split("T")[0] : null,
        // end: end ? end.toISOString().split("T")[0] : null,
        start: formatLocalDate(start),
        end: formatLocalDate(end),
      });
      setOpen(false);
    }
  };
  class DateRangePresetError extends Error {
    constructor(message: string) {
      super(message);
      this.name = "DateRangePresetError";
    }
  }

  const handlePresetSelect = (preset: DateRangePreset) => {
    if ((maxRange || minRange) && preset.range.start && preset.range.end) {
      const daysDiff =
        Math.abs(preset.range.end.getTime() - preset.range.start.getTime()) /
        (1000 * 60 * 60 * 24);

      if (maxRange && daysDiff > maxRange - 1) {
        throw new DateRangePresetError(
          `Preset "${preset.label}" exceeds the maximum allowed range of ${maxRange} days.`
        );
      }

      if (minRange && daysDiff < minRange - 1) {
        throw new DateRangePresetError(
          `Preset "${preset.label}" is shorter than the minimum required range of ${minRange} days.`
        );
      }
    }

    setSelectedRange(preset.range);
    // onChange?.(preset.range);
    onChange?.({
      // start: preset.range.start
      //   ? preset.range.start.toISOString().split("T")[0]
      //   : null,
      // end: preset.range.end
      //   ? preset.range.end.toISOString().split("T")[0]
      //   : null,
      start: formatLocalDate(preset.range.start),
      end: formatLocalDate(preset.range.end),
    });

    setIsSelectingEnd(false);
    setOpen(false);
  };

  const clearSelection = () => {
    const newRange = { start: null, end: null };
    setSelectedRange(newRange);
    setIsSelectingEnd(false);
    onChange?.(newRange);
  };

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    if (disableWeekends && (date.getDay() === 0 || date.getDay() === 6))
      return true;
    if (
      disableHolidays &&
      holidays.some((holiday) => date.toDateString() === holiday.toDateString())
    )
      return true;

    const specialDay = specialDays.find(
      (special) => date.toDateString() === special.date.toDateString()
    );
    if (specialDay?.disabled) return true;

    return disabledDates.some(
      (disabledDate) => date.toDateString() === disabledDate.toDateString()
    );
  };

  const getDateInfo = (date: Date) => {
    const highlight = highlightedDates.find(
      (h) => date.toDateString() === h.date.toDateString()
    );
    if (highlight) return highlight;

    const isHoliday = holidays.some(
      (holiday) => date.toDateString() === holiday.toDateString()
    );
    if (isHoliday) {
      const isDisabled = isDateDisabled(date);
      return {
        date,
        className: isDisabled ? HOLIDAY_COLORS.disabled : HOLIDAY_COLORS.normal,
        label: "Holiday",
      };
    }

    const specialDay = specialDays.find(
      (special) => date.toDateString() === special.date.toDateString()
    );
    if (specialDay) {
      const isDisabled = isDateDisabled(date);
      const defaultClassName = isDisabled
        ? SPECIAL_COLORS.disabled
        : SPECIAL_COLORS.normal;

      return {
        ...specialDay,
        className: specialDay.className
          ? isDisabled
            ? `${specialDay.className} opacity-60`
            : specialDay.className
          : defaultClassName,
      };
    }

    return null;
  };

  const getTooltipContent = (date: Date, dateInfo: any) => {
    const isDisabled = isDateDisabled(date);

    if (maxRange && selectedRange.start && !selectedRange.end) {
      const daysDiff =
        Math.abs(date.getTime() - selectedRange.start.getTime()) /
        (1000 * 60 * 60 * 24);
      if (daysDiff > maxRange - 1) {
        return `Maximum range is ${maxRange} days`;
      }
    }

    if (minRange && selectedRange.start && !selectedRange.end) {
      const daysDiff =
        Math.abs(date.getTime() - selectedRange.start.getTime()) /
        (1000 * 60 * 60 * 24);
      if (daysDiff < minRange - 1) {
        return `Minimum range is ${minRange} days`;
      }
    }

    if (dateInfo?.label) {
      return isDisabled ? `${dateInfo.label} (disabled)` : dateInfo.label;
    }

    if (minDate && date < minDate) return "Date is before minimum allowed date";
    if (maxDate && date > maxDate) return "Date is after maximum allowed date";
    if (disableWeekends && (date.getDay() === 0 || date.getDay() === 6)) {
      return date.getDay() === 0
        ? "Sundays are disabled"
        : "Saturdays are disabled";
    }
    if (
      disableHolidays &&
      holidays.some((holiday) => date.toDateString() === holiday.toDateString())
    ) {
      return "Holidays are disabled";
    }
    if (
      disabledDates.some(
        (disabledDate) => date.toDateString() === disabledDate.toDateString()
      )
    ) {
      return "This date is disabled";
    }

    return null;
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push({ date: null, isCurrentMonth: false });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }

    const totalCells = 35; // 7x5 grid
    const remainingCells = totalCells - days.length;
    for (let i = 0; i < remainingCells; i++) {
      days.push({ date: null, isCurrentMonth: false });
    }

    return days;
  };

  const navigateMonth = (direction: "prev" | "next") => {
    if (direction === "prev") {
      setLeftMonth(new Date(leftMonth.getFullYear(), leftMonth.getMonth() - 1));
      setRightMonth(
        new Date(rightMonth.getFullYear(), rightMonth.getMonth() - 1)
      );
    } else {
      setLeftMonth(new Date(leftMonth.getFullYear(), leftMonth.getMonth() + 1));
      setRightMonth(
        new Date(rightMonth.getFullYear(), rightMonth.getMonth() + 1)
      );
    }
  };

  const handleMonthChange = (monthIndex: number, isLeftCalendar: boolean) => {
    if (isLeftCalendar) {
      const newLeftMonth = new Date(leftMonth.getFullYear(), monthIndex);
      const newRightMonth = new Date(
        newLeftMonth.getFullYear(),
        newLeftMonth.getMonth() + 1
      );
      setLeftMonth(newLeftMonth);
      setRightMonth(newRightMonth);
    } else {
      const newRightMonth = new Date(rightMonth.getFullYear(), monthIndex);
      const newLeftMonth = new Date(
        newRightMonth.getFullYear(),
        newRightMonth.getMonth() - 1
      );
      setLeftMonth(newLeftMonth);
      setRightMonth(newRightMonth);
    }
  };

  const handleYearChange = (year: number, isLeftCalendar: boolean) => {
    if (isLeftCalendar) {
      const newLeftMonth = new Date(year, leftMonth.getMonth());
      const newRightMonth = new Date(
        newLeftMonth.getFullYear(),
        newLeftMonth.getMonth() + 1
      );
      setLeftMonth(newLeftMonth);
      setRightMonth(newRightMonth);
    } else {
      const newRightMonth = new Date(year, rightMonth.getMonth());
      const newLeftMonth = new Date(
        newRightMonth.getFullYear(),
        newRightMonth.getMonth() - 1
      );
      setLeftMonth(newLeftMonth);
      setRightMonth(newRightMonth);
    }
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
        setIsSelectingEnd(false);
      }
    };

    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  const [position, setPosition] = React.useState({
    top: 0,
    left: 0,
    placement: "bottom",
  });
  const [isReady, setIsReady] = React.useState(false);

  React.useEffect(() => {
    if (open && triggerRef?.current) {
      const updatePosition = () => {
        const trigger = triggerRef.current!;
        const rect = trigger.getBoundingClientRect();
        const isDesktop = window.innerWidth >= 768;
        const dropdownWidth = isDesktop ? 680 : 320;
        const dropdownHeight = isDesktop ? 380 : 410;

        const spaceBelow = window.innerHeight - rect.bottom;
        const spaceAbove = rect.top;
        const placement =
          spaceBelow < dropdownHeight && spaceAbove > spaceBelow
            ? "top"
            : "bottom";

        setPosition({
          top:
            placement === "bottom"
              ? rect.bottom + 8
              : rect.top - dropdownHeight - 8,
          left: Math.max(
            8,
            Math.min(rect.left, window.innerWidth - dropdownWidth - 8)
          ),
          placement,
        });
        setIsReady(true);
      };

      updatePosition();
      window.addEventListener("scroll", updatePosition, true);
      window.addEventListener("resize", updatePosition);

      return () => {
        window.removeEventListener("scroll", updatePosition, true);
        window.removeEventListener("resize", updatePosition);
      };
    } else {
      setIsReady(false);
    }
  }, [open]);

  const renderCalendar = (currentMonth: Date, isLeftCalendar?: boolean) => {
    const previewRange = getPreviewRange();

    return (
      <div className="flex-1">
        <div className="flex items-center justify-between mb-4">
          <Button
            size="sm"
            variant="ghost"
            type="button"
            onClick={() => navigateMonth("prev")}
            className="p-1 h-6  transition-colors"
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>

          <div className="flex items-center gap-2">
            <Select
              value={MONTHS[currentMonth.getMonth()]}
              onValueChange={(month) =>
                handleMonthChange(
                  MONTHS.indexOf(month),
                  isLeftCalendar || false
                )
              }
            >
              <SelectTrigger className="w-28">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {MONTHS.map((month, index) => (
                    <SelectItem key={month} value={month}>
                      {month.slice(0, 3)}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Select
              value={currentMonth.getFullYear().toString()}
              onValueChange={(year) =>
                handleYearChange(parseInt(year), isLeftCalendar || false)
              }
            >
              <SelectTrigger className="w-20">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  {Array.from({ length: 201 }, (_, i) => 1900 + i).map(
                    (year) => (
                      <SelectItem key={year} value={year.toString()}>
                        {year}
                      </SelectItem>
                    )
                  )}
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <Button
            size="sm"
            variant="ghost"
            type="button"
            onClick={() => navigateMonth("next")}
            className="p-1 h-6  transition-colors"
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        <div className="grid grid-cols-7 gap-1 mb-2">
          {DAYS.map((day) => (
            <div
              key={day}
              className="text-xs font-medium text-muted-foreground text-center p-2"
            >
              {day}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-7 gap-1">
          {getDaysInMonth(currentMonth).map(
            ({ date, isCurrentMonth }, index) => {
              if (!date) {
                return <div key={index} className="p-2" />;
              }

              const isSelected =
                isDateRangeStart(date, selectedRange.start) ||
                isDateRangeEnd(date, selectedRange.end);
              const isInRange = isDateInRange(
                date,
                previewRange.start,
                previewRange.end
              );
              const isRangeStart = isDateRangeStart(date, previewRange.start);
              const isRangeEnd = isDateRangeEnd(date, previewRange.end);
              const isToday = date.toDateString() === new Date().toDateString();
              const isDisabled = isDateDisabled(date);
              const dateInfo = getDateInfo(date);
              const tooltipContent = getTooltipContent(date, dateInfo);

              const dayButton = (
                <Button
                  variant="ghost"
                  size="sm"
                  key={index}
                  type="button"
                  disabled={isDisabled}
                  onClick={() => handleDateSelect(date)}
                  onMouseEnter={() => setHoverDate(date)}
                  onMouseLeave={() => setHoverDate(null)}
                  className={cn(
                    "p-2 text-sm rounded-md transition-colors  relative    w-8 h-8 flex items-center justify-center",
                    !isDisabled &&
                      "hover:bg-accent hover:text-accent-foreground",
                    "text-foreground",
                    (isRangeStart || isRangeEnd) &&
                      "bg-primary text-primary-foreground hover:bg-primary",
                    isInRange &&
                      !isRangeStart &&
                      !isRangeEnd &&
                      "bg-primary/20 text-primary-foreground",
                    isToday &&
                      !isSelected &&
                      !isInRange &&
                      "bg-accent text-accent-foreground font-medium",
                    isDisabled && "cursor-not-allowed opacity-50",
                    dateInfo?.className
                  )}
                >
                  {date.getDate()}
                  {dateInfo?.label && (
                    <span
                      className={cn(
                        "absolute -top-1 -right-1 w-2 h-2 rounded-full",
                        dateInfo.label === "Holiday"
                          ? HOLIDAY_COLORS.dot
                          : SPECIAL_COLORS.dot,
                        isDisabled && "opacity-60"
                      )}
                    />
                  )}
                </Button>
              );

              return tooltipContent ? (
                <Tooltip key={index} content={tooltipContent} side="top">
                  {dayButton}
                </Tooltip>
              ) : (
                dayButton
              );
            }
          )}
        </div>
      </div>
    );
  };

  const calendarContent = (
    <AnimatePresence>
      {open && isReady && (
        <motion.div
          initial={{
            opacity: 0,
            y: position.placement === "bottom" ? -10 : 10,
            scale: 0.95,
          }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{
            opacity: 0,
            y: position.placement === "bottom" ? -10 : 10,
            scale: 0.95,
          }}
          transition={{ duration: 0.15 }}
          style={{
            position: "fixed",
            top: position.top,
            left: position.left,
            zIndex: 9999,
          }}
          className={cn(
            "bg-popover border border-border rounded-lg shadow-lg p-4",
            "w-80 md:w-[680px]",
            contentClassName
          )}
          onMouseDown={(e) => e.stopPropagation()}
        >
          {presets.length > 0 && (
            <div className="mb-4 pb-4 border-b border-border">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Presets</span>
                {(selectedRange.start || selectedRange.end) && (
                  <Button
                    variant="ghost"
                    size="sm"
                    type="button"
                    onClick={clearSelection}
                    className="p-1  h-5  transition-colors"
                  >
                    <X className="w-3 h-3" />
                  </Button>
                )}
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-2">
                {presets.map((preset, index) => (
                  <Button
                    variant="outline"
                    size="sm"
                    key={index}
                    type="button"
                    onClick={() => handlePresetSelect(preset)}
                    className="px-3 py-2 text-xs  transition-colors text-left"
                  >
                    {preset.label}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {(selectedRange.start || selectedRange.end) && (
            <div className="mb-4 p-2 bg-accent rounded-md">
              <p className="text-sm text-muted-foreground">
                {formatRange(selectedRange) ||
                  (selectedRange.start
                    ? `From ${selectedRange.start.toLocaleDateString(locale, {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}`
                    : "")}
              </p>
            </div>
          )}

          <div className="md:flex md:gap-4">
            <div className="md:hidden">{renderCalendar(leftMonth)}</div>

            <div className="hidden md:block">
              {renderCalendar(leftMonth, true)}
            </div>

            <div className="hidden md:block">
              {renderCalendar(rightMonth, false)}
            </div>
          </div>

          {showLegend && (holidays.length > 0 || specialDays.length > 0) && (
            <div className="border-t border-border mt-4 pt-4">
              <div className="flex flex-wrap gap-3 text-xs">
                {holidays.length > 0 && (
                  <div className="flex items-center gap-1">
                    <div
                      className={cn("w-3 h-3 rounded", HOLIDAY_COLORS.legend)}
                    />
                    <span>Holidays</span>
                  </div>
                )}
                {specialDays.length > 0 && (
                  <div className="flex items-center gap-1">
                    <div
                      className={cn("w-3 h-3 rounded", SPECIAL_COLORS.legend)}
                    />
                    <span>Events</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>
  );

  return (
    <div {...props} ref={containerRef} className={cn("relative", className)}>
      <Button
        id={id}
        variant="outline"
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen(!open)}
        className={cn(
          "flex h-10 w-full items-center justify-between   text-sm transition-colors",
          !selectedRange.start && !selectedRange.end && "text-muted-foreground",
          triggerClassName
        )}
      >
        <span className="truncate">
          {selectedRange.start || selectedRange.end
            ? formatRange(selectedRange)
            : placeholder}
        </span>
        <Calendar className="h-4 w-4 opacity-50" />
      </Button>

      {typeof document !== "undefined" &&
        ReactDOM.createPortal(calendarContent, document.body)}
    </div>
  );
};
