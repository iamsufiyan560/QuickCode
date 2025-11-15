"use client";

import React from "react";
import { DateRangePicker, DateRange } from "@/components/ui/DateRangePicker";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

const defaultExampleCode = `"use client";

import React from "react";
import { DateRangePicker, DateRange } from "@/components/ui/DateRangePicker";

export default function DateRangePickerDefault() {
  const [dateRange, setDateRange] = React.useState<DateRange>({
    start: null,
    end: null,
  });

  return (
    <div className="w-full max-w-sm">
      <DateRangePicker
        value={dateRange}
        onChange={setDateRange}
        placeholder="Select report period"
      />
    </div>
  );
}`;

export function DefaultExample() {
  const [dateRange, setDateRange] = React.useState<DateRange>({
    start: null,
    end: null,
  });

  return (
    <SnippetPreview code={defaultExampleCode}>
      <div className="w-full max-w-sm">
        <DateRangePicker
          value={dateRange}
          onChange={setDateRange}
          placeholder="Select report period"
        />
      </div>
    </SnippetPreview>
  );
}

const advancedExampleCode = `"use client";

import React from "react";
import { DateRangePicker, DateRange } from "@/components/ui/DateRangePicker";

export default function DateRangePickerAdvanced() {
  const [dateRange, setDateRange] = React.useState<DateRange>({
    start: null,
    end: null,
  });

  const holidays = [
  new Date("2025-01-26"), // Republic Day
  new Date("2025-08-15"), // Independence Day
  new Date("2025-10-02"), // Gandhi Jayanti
];

const specialDays = [
  {
    date: new Date("2025-01-01"),
    className: "bg-blue-500/20 text-blue-600",
    label: "New Year",
  },
  {
    date: new Date("2025-12-25"),
    className: "bg-green-500/20 text-green-600",
    label: "Christmas",
  },
];

const customPresets = [
  {
    label: "Q1 2025",
    range: {
      start: new Date("2025-01-01"),
      end: new Date("2025-03-31"),
    },
  },
  {
    label: "Q2 2025",
    range: {
      start: new Date("2025-04-01"),
      end: new Date("2025-06-30"),
    },
  },
  {
    label: "This Year",
    range: {
      start: new Date("2025-01-01"),
      end: new Date("2025-12-31"),
    },
  },
];

  return (
    <div className="w-full max-w-sm">
      <DateRangePicker
        value={dateRange}
        onChange={setDateRange}
        placeholder="Select booking period"
        minDate={new Date()}
        maxRange={90}
        holidays={holidays}
        specialDays={specialDays}
        presets={customPresets}
        disableWeekends={true}
      />
    </div>
  );
}`;

export function AdvancedExample() {
  const [dateRange, setDateRange] = React.useState<DateRange>({
    start: null,
    end: null,
  });

  const holidays = [
    new Date("2025-01-26"), // Republic Day
    new Date("2025-08-15"), // Independence Day
    new Date("2025-10-02"), // Gandhi Jayanti
  ];

  const specialDays = [
    {
      date: new Date("2025-01-01"),
      className: "bg-blue-500/20 text-blue-600",
      label: "New Year",
    },
    {
      date: new Date("2025-12-25"),
      className: "bg-green-500/20 text-green-600",
      label: "Christmas",
    },
  ];

  const customPresets = [
    {
      label: "Q1 2025",
      range: {
        start: new Date("2025-01-01"),
        end: new Date("2025-03-31"),
      },
    },
    {
      label: "Q2 2025",
      range: {
        start: new Date("2025-04-01"),
        end: new Date("2025-06-30"),
      },
    },
    {
      label: "This Year",
      range: {
        start: new Date("2025-01-01"),
        end: new Date("2025-12-31"),
      },
    },
  ];

  return (
    <SnippetPreview code={advancedExampleCode}>
      <div className="w-full max-w-sm">
        <DateRangePicker
          value={dateRange}
          onChange={setDateRange}
          placeholder="Select booking period"
          minDate={new Date()}
          maxRange={90}
          holidays={holidays}
          specialDays={specialDays}
          presets={customPresets}
          disableWeekends={true}
        />
      </div>
    </SnippetPreview>
  );
}

const customFormattingExampleCode = `"use client";

import React from "react";
import { DateRangePicker, DateRange } from "@/components/ui/DateRangePicker";

export default function DateRangePickerCustomFormatting() {
  const [dateRange, setDateRange] = React.useState<DateRange>({
    start: null,
    end: null,
  });

  const formatRange = (range: DateRange) => {
    if (!range.start && !range.end) return "";
    
    const formatDate = (date: Date) => {
      return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit", 
        year: "numeric",
      });
    };

    if (range.start && range.end) {
      const daysDiff = Math.ceil(
        (range.end.getTime() - range.start.getTime()) / (1000 * 60 * 60 * 24)
      );
      return \`\${formatDate(range.start)} to \${formatDate(range.end)} (\${daysDiff} days)\`;
    } else if (range.start) {
      return \`From \${formatDate(range.start)}\`;
    }
    
    return "";
  };

  return (
    <div className="w-full max-w-sm">
      <DateRangePicker
        value={dateRange}
        onChange={setDateRange}
        placeholder="Select project timeline"
        format={formatRange}
        locale="en-IN"
        minRange={7}
        maxRange={30}
      />
    </div>
  );
}`;

export function CustomFormattingExample() {
  const [dateRange, setDateRange] = React.useState<DateRange>({
    start: null,
    end: null,
  });

  const formatRange = (range: DateRange) => {
    if (!range.start && !range.end) return "";

    const formatDate = (date: Date) => {
      return date.toLocaleDateString("en-IN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    };

    if (range.start && range.end) {
      const daysDiff =
        Math.ceil(
          (range.end.getTime() - range.start.getTime()) / (1000 * 60 * 60 * 24)
        ) + 1;
      return `${formatDate(range.start)} to ${formatDate(
        range.end
      )} (${daysDiff} days)`;
    } else if (range.start) {
      return `From ${formatDate(range.start)}`;
    }

    return "";
  };

  return (
    <SnippetPreview code={customFormattingExampleCode}>
      <div className="w-full max-w-sm">
        <DateRangePicker
          value={dateRange}
          onChange={setDateRange}
          placeholder="Select project timeline"
          format={formatRange}
          locale="en-IN"
          minRange={7}
          maxRange={30}
        />
      </div>
    </SnippetPreview>
  );
}
