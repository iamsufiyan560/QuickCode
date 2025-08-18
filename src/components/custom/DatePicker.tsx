"use client";

import React from "react";
import ReactDOM from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Calendar, ChevronLeft, ChevronRight, Clock } from "lucide-react";
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

export interface DateHighlight {
  date: Date;
  className?: string;
  label?: string;
  disabled?: boolean;
}

export interface DatePickerProps {
  value?: Date | null;
  defaultValue?: Date;
  onChange?: (date: Date | null) => void;
  disabled?: boolean;
  placeholder?: string;
  includeTime?: boolean;
  minDate?: Date;
  maxDate?: Date;
  highlightedDates?: DateHighlight[];
  disabledDates?: Array<{ year: number; month: number; day: number }>;
  holidays?: Array<{ year: number; month: number; day: number }>;
  specialDays?: Array<{
    date: { year: number; month: number; day: number };
    className?: string;
    label?: string;
    disabled?: boolean;
  }>;
  disableWeekends?: boolean;
  disableHolidays?: boolean;
  showLegend?: boolean;
  className?: string;
  triggerClassName?: string;
  contentClassName?: string;
  format?: (date: Date) => string;
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

const NORMAL_COLORS = {
  normal: "",
  disabled: "opacity-30",
  dot: "",
  legend: "",
};

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  defaultValue,
  onChange,
  disabled = false,
  placeholder = "Select date",
  includeTime = false,
  minDate,
  maxDate,
  highlightedDates = [],
  disabledDates = [],
  holidays = [],
  specialDays = [],
  disableWeekends = false,
  disableHolidays = false,
  showLegend = true,
  className,
  triggerClassName,
  contentClassName,
  format,
}) => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(
    value || defaultValue || null
  );
  const [open, setOpen] = React.useState(false);
  const [currentMonth, setCurrentMonth] = React.useState(
    selectedDate
      ? new Date(selectedDate.getFullYear(), selectedDate.getMonth())
      : new Date()
  );
  const [time, setTime] = React.useState({
    hours: selectedDate ? selectedDate.getHours() : 12,
    minutes: selectedDate ? selectedDate.getMinutes() : 0,
  });

  const containerRef = React.useRef<HTMLDivElement>(null);
  const triggerRef = React.useRef<HTMLButtonElement>(null);

  const createUserDate = (year: any, month: any, day: any) => {
    return new Date(year, month - 1, day);
  };

  const processedHolidays = holidays.map((h) =>
    createUserDate(h.year, h.month, h.day)
  );
  const processedSpecialDays = specialDays.map((s) => ({
    ...s,
    date: createUserDate(s.date.year, s.date.month, s.date.day),
  }));
  const processedDisabledDates = disabledDates.map((d) =>
    createUserDate(d.year, d.month, d.day)
  );

  React.useEffect(() => {
    if (value !== undefined) setSelectedDate(value);
  }, [value]);

  const formatDate = (date: Date | null) => {
    if (!date) return "";
    if (format) return format(date);

    if (includeTime) {
      return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      });
    }

    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  const handleDateSelect = (date: Date) => {
    if (disabled) return;

    let newDate = new Date(date);
    if (includeTime) {
      newDate.setHours(time.hours, time.minutes);
    }

    setSelectedDate(newDate);
    onChange?.(newDate);

    if (!includeTime) {
      setOpen(false);
    }
  };

  const handleTimeChange = (hours: number, minutes: number) => {
    setTime({ hours, minutes });
    if (selectedDate) {
      const newDate = new Date(selectedDate);
      newDate.setHours(hours, minutes);
      setSelectedDate(newDate);
      onChange?.(newDate);
    }
  };

  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);

    if (value === 60) {
      const newHours = (time.hours + 1) % 24;
      handleTimeChange(newHours, 0);
    } else if (value === -1) {
      const newHours = time.hours === 0 ? 23 : time.hours - 1;
      handleTimeChange(newHours, 59);
    } else if (value < 0) {
      handleTimeChange(time.hours, 0);
    } else if (value > 60) {
      handleTimeChange(time.hours, 59);
    } else {
      handleTimeChange(time.hours, value || 0);
    }
  };

  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hour12 = parseInt(e.target.value);

    if (hour12 === 0) {
      const newHour24 = time.hours >= 12 ? 11 + 12 : 11;
      handleTimeChange(newHour24, time.minutes);
    } else if (hour12 === 13) {
      const newHour24 = time.hours >= 12 ? 1 + 12 : 1;
      handleTimeChange(newHour24, time.minutes);
    } else {
      const hour24 =
        time.hours >= 12
          ? hour12 === 12
            ? 12
            : hour12 + 12
          : hour12 === 12
          ? 0
          : hour12;
      handleTimeChange(hour24, time.minutes);
    }
  };

  const isDateDisabled = (date: Date) => {
    if (minDate && date < minDate) return true;
    if (maxDate && date > maxDate) return true;
    if (disableWeekends && (date.getDay() === 0 || date.getDay() === 6))
      return true;
    if (
      disableHolidays &&
      processedHolidays.some(
        (holiday) => date.toDateString() === holiday.toDateString()
      )
    )
      return true;
    const specialDay = processedSpecialDays.find(
      (special) => date.toDateString() === special.date.toDateString()
    );

    if (specialDay?.disabled) return true;

    return processedDisabledDates.some(
      (disabledDate) => date.toDateString() === disabledDate.toDateString()
    );
  };

  const getDateInfo = (date: Date) => {
    const highlight = highlightedDates.find(
      (h) => date.toDateString() === h.date.toDateString()
    );
    if (highlight) return highlight;

    const isHoliday = processedHolidays.some(
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

    const specialDay = processedSpecialDays.find(
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

    const isDisabled = isDateDisabled(date);
    if (isDisabled) {
      return {
        date,
        className: NORMAL_COLORS.disabled,
        label: null,
      };
    }

    return null;
  };

  const getTooltipContent = (date: Date, dateInfo: any) => {
    if (dateInfo?.label) {
      const isDisabled = isDateDisabled(date);
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
      processedHolidays.some(
        (holiday) => date.toDateString() === holiday.toDateString()
      )
    ) {
      return "Holidays are disabled";
    }
    if (
      processedDisabledDates.some(
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
      const prevMonthDate = new Date(year, month, -startingDayOfWeek + i + 1);
      days.push({ date: prevMonthDate, isCurrentMonth: false });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      days.push({ date: new Date(year, month, i), isCurrentMonth: true });
    }

    const remainingDays = 42 - days.length;
    for (let i = 1; i <= remainingDays; i++) {
      const nextMonthDate = new Date(year, month + 1, i);
      days.push({ date: nextMonthDate, isCurrentMonth: false });
    }

    return days;
  };

  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
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
        const dropdownHeight = includeTime ? 420 : 350;
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
          left: Math.max(8, Math.min(rect.left, window.innerWidth - 320)),
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
  }, [open, includeTime]);

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
            "bg-popover border border-border rounded-lg shadow-lg w-72 p-4",
            contentClassName
          )}
          onMouseDown={(e) => e.stopPropagation()}
        >
          <div className="flex items-center justify-between mb-4">
            <button
              type="button"
              onClick={() =>
                setCurrentMonth(
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth() - 1
                  )
                )
              }
              className="p-1 hover:bg-accent rounded-md transition-colors cursor-pointer"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            <div className="flex items-center gap-2">
              <Select
                value={MONTHS[currentMonth.getMonth()]}
                onValueChange={(month) =>
                  setCurrentMonth(
                    new Date(currentMonth.getFullYear(), MONTHS.indexOf(month))
                  )
                }
              >
                <SelectTrigger className="w-24">
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
                  setCurrentMonth(
                    new Date(parseInt(year), currentMonth.getMonth())
                  )
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

            <button
              type="button"
              onClick={() =>
                setCurrentMonth(
                  new Date(
                    currentMonth.getFullYear(),
                    currentMonth.getMonth() + 1
                  )
                )
              }
              className="p-1 hover:bg-accent rounded-md transition-colors cursor-pointer"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
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
                const isSelected =
                  selectedDate &&
                  date.toDateString() === selectedDate.toDateString();
                const isToday =
                  date.toDateString() === new Date().toDateString();
                const isDisabled = isDateDisabled(date);
                const dateInfo = getDateInfo(date);
                const tooltipContent = getTooltipContent(date, dateInfo);

                const dayButton = (
                  <button
                    key={index}
                    type="button"
                    disabled={isDisabled}
                    onClick={() => handleDateSelect(date)}
                    className={cn(
                      "p-2 text-sm rounded-md transition-colors relative",
                      !isDisabled &&
                        "hover:bg-accent hover:text-accent-foreground",
                      !isCurrentMonth && "text-muted-foreground/50",
                      isCurrentMonth && "text-foreground",
                      isSelected &&
                        "bg-primary text-primary-foreground hover:bg-primary",
                      isToday &&
                        !isSelected &&
                        "bg-accent text-accent-foreground font-medium",
                      isDisabled && "cursor-not-allowed ",
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
                      ></span>
                    )}
                  </button>
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

          {includeTime && (
            <div className="border-t border-border mt-4 pt-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm font-medium text-foreground">
                  Time
                </span>
              </div>

              <div className="flex items-center gap-2">
                <div className="flex items-center gap-1">
                  <input
                    type="number"
                    min="1"
                    max="12"
                    value={
                      time.hours > 12
                        ? time.hours - 12
                        : time.hours === 0
                        ? 12
                        : time.hours
                    }
                    onChange={handleHoursChange}
                    className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [moz-appearance:textfield] w-16 px-2 py-2 text-sm border border-border rounded-lg bg-background text-center focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                  <span className="text-muted-foreground">:</span>
                  <input
                    type="number"
                    max="60"
                    value={time.minutes.toString().padStart(2, "0")}
                    onChange={handleMinutesChange}
                    className="appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none [moz-appearance:textfield] w-16 px-2 py-2 text-sm border border-border rounded-lg bg-background text-center focus:outline-none focus:ring-2 focus:ring-ring"
                  />
                </div>

                <button
                  type="button"
                  onClick={() => {
                    const newHours =
                      time.hours >= 12 ? time.hours - 12 : time.hours + 12;
                    handleTimeChange(newHours, time.minutes);
                  }}
                  className="px-3 py-2 text-sm border border-border rounded-lg hover:bg-accent transition-colors cursor-pointer select-none bg-background"
                >
                  {time.hours >= 12 ? "PM" : "AM"}
                </button>
              </div>
            </div>
          )}

          {showLegend && (holidays.length > 0 || specialDays.length > 0) && (
            <div className="border-t border-border mt-4 pt-4">
              <div className="flex flex-wrap gap-3 text-xs">
                {holidays.length > 0 && (
                  <div className="flex items-center gap-1">
                    <div
                      className={cn("w-3 h-3 rounded", HOLIDAY_COLORS.legend)}
                    ></div>
                    <span>Holidays</span>
                  </div>
                )}
                {specialDays.length > 0 && (
                  <div className="flex items-center gap-1">
                    <div
                      className={cn("w-3 h-3 rounded", SPECIAL_COLORS.legend)}
                    ></div>
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
    <div ref={containerRef} className={cn("relative", className)}>
      <button
        ref={triggerRef}
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setOpen(!open)}
        className={cn(
          "flex h-10 w-full items-center justify-between rounded-md border border-input hover:bg-input/30 bg-background px-3 py-2 text-sm transition-colors",
          "disabled:cursor-not-allowed disabled:opacity-50",
          !selectedDate && "text-muted-foreground",
          triggerClassName
        )}
      >
        <span className="truncate">
          {selectedDate ? formatDate(selectedDate) : placeholder}
        </span>
        <Calendar className="h-4 w-4 opacity-50" />
      </button>

      {typeof document !== "undefined" &&
        ReactDOM.createPortal(calendarContent, document.body)}
    </div>
  );
};
