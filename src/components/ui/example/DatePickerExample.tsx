"use client";

import React from "react";
import { DatePicker } from "@/components/ui/DatePicker";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

export const DefaultDatePickerExample = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  const defaultDatePickerCode = `import { DatePicker } from "@/components/ui/DatePicker";

export const DefaultDatePickerExample = () => {
  const [selectedDate, setSelectedDate] = React.useState<Date | null>(null);

  return (
    <DatePicker
      value={selectedDate}
      onChange={setSelectedDate}
      placeholder="Select appointment date"
    />
  );
};`;

  return (
    <SnippetPreview title="Default DatePicker" code={defaultDatePickerCode}>
      <div className="w-full max-w-sm">
        <DatePicker
          value={selectedDate}
          onChange={setSelectedDate}
          placeholder="Select appointment date"
        />
      </div>
    </SnippetPreview>
  );
};

export const DateTimePickerExample = () => {
  const [selectedDateTime, setSelectedDateTime] = React.useState<Date | null>(
    null
  );

  const dateTimePickerCode = `import { DatePicker } from "@/components/ui/DatePicker";

export const DateTimePickerExample = () => {
  const [selectedDateTime, setSelectedDateTime] = React.useState<Date | null>(null);

  return (
    <DatePicker
      value={selectedDateTime}
      onChange={setSelectedDateTime}
      includeTime
      placeholder="Schedule meeting"
      minDate={new Date()}
    />
  );
};`;

  return (
    <SnippetPreview title="Date & Time Selection" code={dateTimePickerCode}>
      <div className="w-full max-w-sm">
        <DatePicker
          value={selectedDateTime}
          onChange={setSelectedDateTime}
          includeTime
          placeholder="Schedule meeting"
          minDate={new Date()}
        />
      </div>
    </SnippetPreview>
  );
};

export const BusinessDatePickerExample = () => {
  const [eventDate, setEventDate] = React.useState<Date | null>(null);

  const holidays = [
    new Date("2025-01-01"),
    new Date("2025-08-15"),
    new Date("2025-12-25"),
  ];

  const specialDays = [
    {
      date: new Date("2025-09-15"),
      className: "bg-chart-2/20 text-chart-2 hover:bg-chart-2/30",
      label: "Product Launch",
    },
    {
      date: new Date("2025-10-31"),
      className: "bg-chart-4/20 text-chart-4 hover:bg-chart-4/30",
      label: "Quarterly Review",
    },
  ];

  const businessDatePickerCode = `import { DatePicker } from "@/components/ui/DatePicker";

export const BusinessDatePickerExample = () => {
  const [eventDate, setEventDate] = React.useState<Date | null>(null);

  const holidays = [
  new Date("2025-01-01"),
  new Date("2025-08-15"),
  new Date("2025-12-25"),
];

const specialDays = [
  {
    date: new Date("2025-09-15"),
    className: "bg-chart-2/20 text-chart-2 hover:bg-chart-2/30",
    label: "Product Launch",
  },
  {
    date: new Date("2025-10-31"),
    className: "bg-chart-4/20 text-chart-4 hover:bg-chart-4/30",
    label: "Quarterly Review",
  },
];


  return (
    <div className="w-full max-w-sm space-y-3">
        <DatePicker
          value={eventDate}
          onChange={setEventDate}
          minDate={new Date()}
          holidays={holidays}
          specialDays={specialDays}
          disableWeekends
          disableHolidays
          placeholder="Select business event date"
        />
        <div className="text-xs text-muted-foreground space-y-1 px-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-destructive/20 rounded"></div>
            <span>Holidays (New Year, Independence Day, Christmas)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-chart-2/20 rounded"></div>
            <span>Product Launch (Sep 15)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-chart-4/20 rounded"></div>
            <span>Quarterly Review (Oct 31)</span>
          </div>
          <div className="text-muted-foreground/80">
            • Weekends disabled • Holidays disabled
          </div>
        </div>
      </div>
  );
};`;

  return (
    <SnippetPreview title="Business Calendar" code={businessDatePickerCode}>
      <div className="w-full max-w-sm space-y-3">
        <DatePicker
          value={eventDate}
          onChange={setEventDate}
          minDate={new Date()}
          holidays={holidays}
          specialDays={specialDays}
          disableWeekends
          disableHolidays
          placeholder="Select business event date"
        />
        <div className="text-xs text-muted-foreground space-y-1 px-1">
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-destructive/20 rounded"></div>
            <span>Holidays (New Year, Independence Day, Christmas)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-chart-2/20 rounded"></div>
            <span>Product Launch (Sep 15)</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-3 h-3 bg-chart-4/20 rounded"></div>
            <span>Quarterly Review (Oct 31)</span>
          </div>
          <div className="text-muted-foreground/80 text-wrap">
            • Weekends disabled • Holidays disabled • Past Date disabled
          </div>
        </div>
      </div>
    </SnippetPreview>
  );
};
