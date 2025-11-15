"use client";

import React from "react";
import {
  PieChart,
  Pie,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/Chart/PieChart";
import { Chrome, Globe, Flame, Box } from "lucide-react";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

const chartData = [
  { name: "Chrome", value: 275, fill: "var(--color-chrome)" },
  { name: "Safari", value: 200, fill: "var(--color-safari)" },
  { name: "Firefox", value: 187, fill: "var(--color-firefox)" },
  { name: "Edge", value: 173, fill: "var(--color-edge)" },
  { name: "Other", value: 90, fill: "var(--color-other)" },
];

const chartConfig: ChartConfig = {
  chrome: { label: "Chrome", color: "var(--chart-1)" },
  safari: { label: "Safari", color: "var(--chart-2)" },
  firefox: { label: "Firefox", color: "var(--chart-3)" },
  edge: { label: "Edge", color: "var(--chart-4)" },
  other: { label: "Other", color: "var(--chart-5)" },
};

const iconMap: Record<string, any> = {
  Chrome: Chrome,
  Safari: Globe,
  Firefox: Flame,
  Edge: Box,
  Other: Globe,
};

const basicCode = `import { 
  PieChart, 
  Pie,
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  type ChartConfig 
} from '@/components/ui/PieChart'

const data = [
  { name: "Chrome", value: 275, fill: "var(--color-chrome)" },
  { name: "Safari", value: 200, fill: "var(--color-safari)" },
  { name: "Firefox", value: 187, fill: "var(--color-firefox)" },
  { name: "Edge", value: 173, fill: "var(--color-edge)" },
  { name: "Other", value: 90, fill: "var(--color-other)" },
]

const config: ChartConfig = {
  chrome: { label: "Chrome", color: "var(--chart-1)" },
  safari: { label: "Safari", color: "var(--chart-2)" },
  firefox: { label: "Firefox", color: "var(--chart-3)" },
  edge: { label: "Edge", color: "var(--chart-4)" },
  other: { label: "Other", color: "var(--chart-5)" },
}

export function BasicPieChart() {
  return (
    <ChartContainer config={config} className="h-[350px]">
      <PieChart>
        <ChartTooltip content={ChartTooltipContent} />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
        />
      </PieChart>
    </ChartContainer>
  )
}`;

const labelCode = `import { 
  PieChart, 
  Pie,
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  type ChartConfig 
} from '@/components/ui/PieChart'

const data = [
  { name: "Chrome", value: 275, fill: "var(--color-chrome)" },
  { name: "Safari", value: 200, fill: "var(--color-safari)" },
  { name: "Firefox", value: 187, fill: "var(--color-firefox)" },
  { name: "Edge", value: 173, fill: "var(--color-edge)" },
  { name: "Other", value: 90, fill: "var(--color-other)" },
]

const config: ChartConfig = {
  chrome: { label: "Chrome", color: "var(--chart-1)" },
  safari: { label: "Safari", color: "var(--chart-2)" },
  firefox: { label: "Firefox", color: "var(--chart-3)" },
  edge: { label: "Edge", color: "var(--chart-4)" },
  other: { label: "Other", color: "var(--chart-5)" },
}

export function LabelPieChart() {
  return (
    <ChartContainer config={config} className="h-[350px]">
      <PieChart>
        <ChartTooltip content={ChartTooltipContent} />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          label
        />
      </PieChart>
    </ChartContainer>
  )
}`;

const customLabelCode = `import { 
  PieChart, 
  Pie,
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  type ChartConfig 
} from '@/components/ui/PieChart'

const data = [
  { name: "Chrome", value: 275, fill: "var(--color-chrome)" },
  { name: "Safari", value: 200, fill: "var(--color-safari)" },
  { name: "Firefox", value: 187, fill: "var(--color-firefox)" },
  { name: "Edge", value: 173, fill: "var(--color-edge)" },
  { name: "Other", value: 90, fill: "var(--color-other)" },
]

const config: ChartConfig = {
  chrome: { label: "Chrome", color: "var(--chart-1)" },
  safari: { label: "Safari", color: "var(--chart-2)" },
  firefox: { label: "Firefox", color: "var(--chart-3)" },
  edge: { label: "Edge", color: "var(--chart-4)" },
  other: { label: "Other", color: "var(--chart-5)" },
}

const renderCustomLabel = ({ name, percent }: any) => {
  return \`\${name} \${(percent * 100).toFixed(0)}%\`
}

export function CustomLabelPieChart() {
  return (
    <ChartContainer config={config} className="h-[350px]">
      <PieChart>
        <ChartTooltip content={ChartTooltipContent} />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          label={renderCustomLabel}
        />
      </PieChart>
    </ChartContainer>
  )
}`;

const legendCode = `import { 
  PieChart, 
  Pie,
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  type ChartConfig 
} from '@/components/ui/PieChart'
import { Chrome, Globe, Flame, Box } from "lucide-react";

const data = [
  { name: "Chrome", value: 275, fill: "var(--color-chrome)" },
  { name: "Safari", value: 200, fill: "var(--color-safari)" },
  { name: "Firefox", value: 187, fill: "var(--color-firefox)" },
  { name: "Edge", value: 173, fill: "var(--color-edge)" },
  { name: "Other", value: 90, fill: "var(--color-other)" },
]

const config: ChartConfig = {
  chrome: { label: "Chrome", color: "var(--chart-1)" },
  safari: { label: "Safari", color: "var(--chart-2)" },
  firefox: { label: "Firefox", color: "var(--chart-3)" },
  edge: { label: "Edge", color: "var(--chart-4)" },
  other: { label: "Other", color: "var(--chart-5)" },
}
  const iconMap: Record<string, any> = {
  Chrome: Chrome,
  Safari: Globe,
  Firefox: Flame,
  Edge: Box,
  Other: Globe,
};

const CustomLegend = () => {
  return (
    <div className="flex justify-center gap-6 flex-wrap mt-4">
      {data.map((entry) => (
        <div key={entry.name} className="flex items-center gap-2">
          <div className="w-3 h-3 rounded" style={{ backgroundColor: entry.fill }} />
          <span className="text-sm text-muted-foreground">{entry.name}</span>
        </div>
      ))}
    </div>
  )
}

export function LegendPieChart() {
  return (
    <div>
      <ChartContainer config={config} className="h-[300px]">
        <PieChart>
          <ChartTooltip content={ChartTooltipContent} />
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={100}
          />
        </PieChart>
      </ChartContainer>
      <CustomLegend />
    </div>
  )
}`;

const donutCode = `import { 
  PieChart, 
  Pie,
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  type ChartConfig 
} from '@/components/ui/PieChart'

const data = [
  { name: "Chrome", value: 275, fill: "var(--color-chrome)" },
  { name: "Safari", value: 200, fill: "var(--color-safari)" },
  { name: "Firefox", value: 187, fill: "var(--color-firefox)" },
  { name: "Edge", value: 173, fill: "var(--color-edge)" },
  { name: "Other", value: 90, fill: "var(--color-other)" },
]

const config: ChartConfig = {
  chrome: { label: "Chrome", color: "var(--chart-1)" },
  safari: { label: "Safari", color: "var(--chart-2)" },
  firefox: { label: "Firefox", color: "var(--chart-3)" },
  edge: { label: "Edge", color: "var(--chart-4)" },
  other: { label: "Other", color: "var(--chart-5)" },
}

export function DonutPieChart() {
  return (
    <ChartContainer config={config} className="h-[350px]">
      <PieChart>
        <ChartTooltip content={ChartTooltipContent} />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={120}
        />
      </PieChart>
    </ChartContainer>
  )
}`;

const donutTextCode = `import { 
  PieChart, 
  Pie,
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  type ChartConfig 
} from '@/components/ui/PieChart'

const data = [
  { name: "Chrome", value: 275, fill: "var(--color-chrome)" },
  { name: "Safari", value: 200, fill: "var(--color-safari)" },
  { name: "Firefox", value: 187, fill: "var(--color-firefox)" },
  { name: "Edge", value: 173, fill: "var(--color-edge)" },
  { name: "Other", value: 90, fill: "var(--color-other)" },
]

const config: ChartConfig = {
  chrome: { label: "Chrome", color: "var(--chart-1)" },
  safari: { label: "Safari", color: "var(--chart-2)" },
  firefox: { label: "Firefox", color: "var(--chart-3)" },
  edge: { label: "Edge", color: "var(--chart-4)" },
  other: { label: "Other", color: "var(--chart-5)" },
}

const totalValue = data.reduce((acc, item) => acc + item.value, 0)

export function DonutTextPieChart() {
  return (
    <ChartContainer config={config} className="h-[350px]">
      <PieChart>
        <ChartTooltip content={ChartTooltipContent} />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={120}
        />
        <text
          x="50%"
          y="50%"
          textAnchor="middle"
          dominantBaseline="middle"
          className="fill-foreground text-3xl font-bold"
        >
          {totalValue}
        </text>
      </PieChart>
    </ChartContainer>
  )
}`;

const separatorCode = `import { 
  PieChart, 
  Pie,
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  type ChartConfig 
} from '@/components/ui/PieChart'

const data = [
  { name: "Chrome", value: 275, fill: "var(--color-chrome)" },
  { name: "Safari", value: 200, fill: "var(--color-safari)" },
  { name: "Firefox", value: 187, fill: "var(--color-firefox)" },
  { name: "Edge", value: 173, fill: "var(--color-edge)" },
  { name: "Other", value: 90, fill: "var(--color-other)" },
]

const config: ChartConfig = {
  chrome: { label: "Chrome", color: "var(--chart-1)" },
  safari: { label: "Safari", color: "var(--chart-2)" },
  firefox: { label: "Firefox", color: "var(--chart-3)" },
  edge: { label: "Edge", color: "var(--chart-4)" },
  other: { label: "Other", color: "var(--chart-5)" },
}

export function SeparatorPieChart() {
  return (
    <ChartContainer config={config} className="h-[350px]">
      <PieChart>
        <ChartTooltip content={ChartTooltipContent} />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={120}
          paddingAngle={5}
        />
      </PieChart>
    </ChartContainer>
  )
}`;

const stackedCode = `import { 
  PieChart, 
  Pie,
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  type ChartConfig 
} from '@/components/ui/PieChart'

const data = [
  { name: "Chrome", value: 275, fill: "var(--color-chrome)" },
  { name: "Safari", value: 200, fill: "var(--color-safari)" },
  { name: "Firefox", value: 187, fill: "var(--color-firefox)" },
  { name: "Edge", value: 173, fill: "var(--color-edge)" },
  { name: "Other", value: 90, fill: "var(--color-other)" },
]

const config: ChartConfig = {
  chrome: { label: "Chrome", color: "var(--chart-1)" },
  safari: { label: "Safari", color: "var(--chart-2)" },
  firefox: { label: "Firefox", color: "var(--chart-3)" },
  edge: { label: "Edge", color: "var(--chart-4)" },
  other: { label: "Other", color: "var(--chart-5)" },
}

export function StackedPieChart() {
  return (
    <ChartContainer config={config} className="h-[350px]">
      <PieChart>
        <ChartTooltip content={ChartTooltipContent} />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={80}
          outerRadius={120}
          strokeWidth={4}
        />
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={0}
          outerRadius={60}
          strokeWidth={4}
        />
      </PieChart>
    </ChartContainer>
  )
}`;

const renderCustomLabel = ({ name, percent }: any) => {
  return `${name} ${(percent * 100).toFixed(0)}%`;
};

const CustomLegend = () => {
  return (
    <div className="flex justify-center gap-6 flex-wrap mt-4">
      {chartData.map((entry) => {
        const Icon = iconMap[entry.name] || Globe;
        return (
          <div key={entry.name} className="flex items-center gap-2">
            <Icon className="w-4 h-4" style={{ color: entry.fill }} />
            <span className="text-sm text-muted-foreground">{entry.name}</span>
          </div>
        );
      })}
    </div>
  );
};

const totalValue = chartData.reduce((acc, item) => acc + item.value, 0);

export function BasicExample() {
  return (
    <SnippetPreview code={basicCode} title="Basic Pie Chart">
      <ChartContainer config={chartConfig} className="h-[350px]">
        <PieChart>
          <ChartTooltip content={ChartTooltipContent} />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
          />
        </PieChart>
      </ChartContainer>
    </SnippetPreview>
  );
}

export function LabelExample() {
  return (
    <SnippetPreview code={labelCode} title="Pie Chart with Labels">
      <ChartContainer config={chartConfig} className="h-[350px]">
        <PieChart>
          <ChartTooltip content={ChartTooltipContent} />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            label
          />
        </PieChart>
      </ChartContainer>
    </SnippetPreview>
  );
}

export function CustomLabelExample() {
  return (
    <SnippetPreview code={customLabelCode} title="Pie Chart with Custom Labels">
      <ChartContainer config={chartConfig} className="h-[350px]">
        <PieChart>
          <ChartTooltip content={ChartTooltipContent} />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            label={renderCustomLabel}
          />
        </PieChart>
      </ChartContainer>
    </SnippetPreview>
  );
}

export function LegendExample() {
  return (
    <SnippetPreview code={legendCode} title="Pie Chart with Legend">
      <div>
        <ChartContainer config={chartConfig} className="h-[300px]">
          <PieChart>
            <ChartTooltip content={ChartTooltipContent} />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={100}
            />
          </PieChart>
        </ChartContainer>
        <CustomLegend />
      </div>
    </SnippetPreview>
  );
}

export function DonutExample() {
  return (
    <SnippetPreview code={donutCode} title="Donut Chart">
      <ChartContainer config={chartConfig} className="h-[350px]">
        <PieChart>
          <ChartTooltip content={ChartTooltipContent} />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={120}
          />
        </PieChart>
      </ChartContainer>
    </SnippetPreview>
  );
}

export function DonutTextExample() {
  return (
    <SnippetPreview code={donutTextCode} title="Donut Chart with Center Text">
      <ChartContainer config={chartConfig} className="h-[350px]">
        <PieChart>
          <ChartTooltip content={ChartTooltipContent} />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={120}
          />
          <text
            x="50%"
            y="50%"
            textAnchor="middle"
            dominantBaseline="middle"
            className="fill-foreground text-3xl font-bold"
          >
            {totalValue}
          </text>
        </PieChart>
      </ChartContainer>
    </SnippetPreview>
  );
}

export function SeparatorExample() {
  return (
    <SnippetPreview code={separatorCode} title="Pie Chart with Separator">
      <ChartContainer config={chartConfig} className="h-[350px]">
        <PieChart>
          <ChartTooltip content={ChartTooltipContent} />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={120}
            paddingAngle={5}
          />
        </PieChart>
      </ChartContainer>
    </SnippetPreview>
  );
}

export function StackedExample() {
  return (
    <SnippetPreview code={stackedCode} title="Stacked Pie Chart">
      <ChartContainer config={chartConfig} className="h-[350px]">
        <PieChart>
          <ChartTooltip content={ChartTooltipContent} />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={80}
            outerRadius={120}
            strokeWidth={4}
          />
          <Pie
            data={chartData}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            innerRadius={0}
            outerRadius={60}
            strokeWidth={4}
          />
        </PieChart>
      </ChartContainer>
    </SnippetPreview>
  );
}
