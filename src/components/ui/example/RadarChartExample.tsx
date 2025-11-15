"use client";
import {
  RadarChart,
  Radar,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig,
} from "@/components/ui/Chart/RadarChart";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

const chartData = [
  { month: "January", sales: 186 },
  { month: "February", sales: 305 },
  { month: "March", sales: 237 },
  { month: "April", sales: 273 },
  { month: "May", sales: 209 },
  { month: "June", sales: 214 },
];

const multipleData = [
  { month: "January", desktop: 186, mobile: 80 },
  { month: "February", desktop: 305, mobile: 200 },
  { month: "March", desktop: 237, mobile: 120 },
  { month: "April", desktop: 273, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "June", desktop: 214, mobile: 140 },
];

const basicCode = `import { 
  RadarChart, 
  Radar, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  PolarGrid,
  PolarAngleAxis,
  type ChartConfig 
} from '@/components/ui/RadarChart'

const data = ${JSON.stringify(chartData, null, 2)}

const config: ChartConfig = {
  sales: {
    label: "Sales",
    color: "var(--chart-1)",
  },
}

export function BasicRadarChart() {
  return (
    <ChartContainer config={config} className="h-[400px]">
      <RadarChart data={data}>
        <PolarGrid stroke="var(--border)" />
        <PolarAngleAxis dataKey="month" stroke="var(--muted-foreground)" />
        <ChartTooltip content={ChartTooltipContent} />
        <Radar
          dataKey="sales"
          fill="var(--color-sales)"
          fillOpacity={0.6}
          stroke="var(--color-sales)"
          strokeWidth={2}
        />
      </RadarChart>
    </ChartContainer>
  )
}`;

const dotsCode = `import { 
  RadarChart, 
  Radar, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  PolarGrid,
  PolarAngleAxis,
  type ChartConfig 
} from '@/components/ui/RadarChart'

const data = ${JSON.stringify(chartData, null, 2)}

const config: ChartConfig = {
  sales: {
    label: "Sales",
    color: "var(--chart-1)",
  },
}

export function DotsRadarChart() {
  return (
    <ChartContainer config={config} className="h-[400px]">
      <RadarChart data={data}>
        <PolarGrid stroke="var(--border)" />
        <PolarAngleAxis dataKey="month" stroke="var(--muted-foreground)" />
        <ChartTooltip content={ChartTooltipContent} />
        <Radar
          dataKey="sales"
          fill="var(--color-sales)"
          fillOpacity={0.6}
          stroke="var(--color-sales)"
          strokeWidth={2}
          dot={{ fill: "var(--color-sales)", r: 4 }}
        />
      </RadarChart>
    </ChartContainer>
  )
}`;

const linesOnlyCode = `import { 
  RadarChart, 
  Radar, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  PolarGrid,
  PolarAngleAxis,
  type ChartConfig 
} from '@/components/ui/RadarChart'

const data = ${JSON.stringify(chartData, null, 2)}

const config: ChartConfig = {
  sales: {
    label: "Sales",
    color: "var(--chart-1)",
  },
}

export function LinesOnlyRadarChart() {
  return (
    <ChartContainer config={config} className="h-[400px]">
      <RadarChart data={data}>
        <PolarGrid stroke="var(--border)" />
        <PolarAngleAxis dataKey="month" stroke="var(--muted-foreground)" />
        <ChartTooltip content={ChartTooltipContent} />
        <Radar
          dataKey="sales"
          fill="transparent"
          stroke="var(--color-sales)"
          strokeWidth={2}
        />
      </RadarChart>
    </ChartContainer>
  )
}`;

const customLabelCode = `import { 
  RadarChart, 
  Radar, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  PolarGrid,
  PolarAngleAxis,
  type ChartConfig 
} from '@/components/ui/RadarChart'

const data = ${JSON.stringify(multipleData, null, 2)}

const config: ChartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
}

export function CustomLabelRadarChart() {
  return (
    <ChartContainer config={config} className="h-[400px]">
      <RadarChart data={data}>
        <PolarGrid stroke="var(--border)" />
        <PolarAngleAxis 
          dataKey="month" 
          stroke="var(--muted-foreground)"
          tick={{ fill: "var(--foreground)", fontSize: 12 }}
        />
        <ChartTooltip content={ChartTooltipContent} />
        <Radar
          dataKey="sales"
          fill="var(--color-sales)"
          fillOpacity={0.6}
          stroke="var(--color-sales)"
          strokeWidth={2}
        />
      </RadarChart>
    </ChartContainer>
  )
}`;

const gridCustomCode = `import { 
  RadarChart, 
  Radar, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  PolarGrid,
  PolarAngleAxis,
  type ChartConfig 
} from '@/components/ui/RadarChart'

const data = ${JSON.stringify(chartData, null, 2)}

const config: ChartConfig = {
  sales: {
    label: "Sales",
    color: "var(--chart-1)",
  },
}

export function GridCustomRadarChart() {
  return (
    <ChartContainer config={config} className="h-[400px]">
      <RadarChart data={data}>
        <PolarGrid 
          stroke="var(--border)" 
          strokeDasharray="3 3"
          gridType="polygon"
        />
        <PolarAngleAxis dataKey="month" stroke="var(--muted-foreground)" />
        <ChartTooltip content={ChartTooltipContent} />
        <Radar
          dataKey="sales"
          fill="var(--color-sales)"
          fillOpacity={0.6}
          stroke="var(--color-sales)"
          strokeWidth={2}
        />
      </RadarChart>
    </ChartContainer>
  )
}`;

const gridRadiusCode = `import { 
  RadarChart, 
  Radar, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  type ChartConfig 
} from '@/components/ui/RadarChart'

const data = ${JSON.stringify(chartData, null, 2)}

const config: ChartConfig = {
  sales: {
    label: "Sales",
    color: "var(--chart-1)",
  },
}

export function GridRadiusRadarChart() {
  return (
    <ChartContainer config={config} className="h-[400px]">
      <RadarChart data={data}>
        <PolarGrid stroke="var(--border)" />
        <PolarAngleAxis dataKey="month" stroke="var(--muted-foreground)" />
        <PolarRadiusAxis stroke="var(--muted-foreground)" />
        <ChartTooltip content={ChartTooltipContent} />
        <Radar
          dataKey="sales"
          fill="var(--color-sales)"
          fillOpacity={0.6}
          stroke="var(--color-sales)"
          strokeWidth={2}
        />
      </RadarChart>
    </ChartContainer>
  )
}`;

const basicConfig: ChartConfig = {
  sales: {
    label: "Sales",
    color: "var(--chart-1)",
  },
};

export function BasicExample() {
  return (
    <SnippetPreview code={basicCode} title="Basic Radar Chart">
      <ChartContainer config={basicConfig} className="h-[400px]">
        <RadarChart data={chartData}>
          <PolarGrid stroke="var(--border)" />
          <PolarAngleAxis dataKey="month" stroke="var(--muted-foreground)" />
          <ChartTooltip content={ChartTooltipContent} />
          <Radar
            dataKey="sales"
            fill="var(--color-sales)"
            fillOpacity={0.6}
            stroke="var(--color-sales)"
            strokeWidth={2}
          />
        </RadarChart>
      </ChartContainer>
    </SnippetPreview>
  );
}

export function DotsExample() {
  return (
    <SnippetPreview code={dotsCode} title="Radar Chart with Dots">
      <ChartContainer config={basicConfig} className="h-[400px]">
        <RadarChart data={chartData}>
          <PolarGrid stroke="var(--border)" />
          <PolarAngleAxis dataKey="month" stroke="var(--muted-foreground)" />
          <ChartTooltip content={ChartTooltipContent} />
          <Radar
            dataKey="sales"
            fill="var(--color-sales)"
            fillOpacity={0.6}
            stroke="var(--color-sales)"
            strokeWidth={2}
            dot={{ fill: "var(--color-sales)", r: 4 }}
          />
        </RadarChart>
      </ChartContainer>
    </SnippetPreview>
  );
}

export function LinesOnlyExample() {
  return (
    <SnippetPreview code={linesOnlyCode} title="Radar Chart - Lines Only">
      <ChartContainer config={basicConfig} className="h-[400px]">
        <RadarChart data={chartData}>
          <PolarGrid stroke="var(--border)" />
          <PolarAngleAxis dataKey="month" stroke="var(--muted-foreground)" />
          <ChartTooltip content={ChartTooltipContent} />
          <Radar
            dataKey="sales"
            fill="transparent"
            stroke="var(--color-sales)"
            strokeWidth={2}
          />
        </RadarChart>
      </ChartContainer>
    </SnippetPreview>
  );
}

export function CustomLabelExample() {
  return (
    <SnippetPreview code={customLabelCode} title="Radar Chart - Custom Label">
      <ChartContainer config={multiConfig} className="h-[400px]">
        <RadarChart data={multipleData}>
          <PolarGrid stroke="var(--border)" />
          <PolarAngleAxis
            dataKey="month"
            stroke="var(--muted-foreground)"
            tick={{ fill: "var(--foreground)", fontSize: 12 }}
          />
          <ChartTooltip content={ChartTooltipContent} />
          <Radar
            dataKey="desktop"
            fill="var(--color-desktop)"
            fillOpacity={0.6}
            stroke="var(--color-desktop)"
            strokeWidth={2}
          />
          <Radar
            dataKey="mobile"
            fill="var(--color-mobile)"
            fillOpacity={0.4}
            stroke="var(--color-mobile)"
            strokeWidth={2}
          />
        </RadarChart>
      </ChartContainer>
    </SnippetPreview>
  );
}

export function GridCustomExample() {
  return (
    <SnippetPreview code={gridCustomCode} title="Radar Chart - Grid Custom">
      <ChartContainer config={basicConfig} className="h-[400px]">
        <RadarChart data={chartData}>
          <PolarGrid
            stroke="var(--border)"
            strokeDasharray="3 3"
            gridType="polygon"
          />
          <PolarAngleAxis dataKey="month" stroke="var(--muted-foreground)" />
          <ChartTooltip content={ChartTooltipContent} />
          <Radar
            dataKey="sales"
            fill="var(--color-sales)"
            fillOpacity={0.6}
            stroke="var(--color-sales)"
            strokeWidth={2}
          />
        </RadarChart>
      </ChartContainer>
    </SnippetPreview>
  );
}

export function GridRadiusExample() {
  return (
    <SnippetPreview code={gridRadiusCode} title="Radar Chart - Grid Radius">
      <ChartContainer config={basicConfig} className="h-[400px]">
        <RadarChart data={chartData}>
          <PolarGrid stroke="var(--border)" />
          <PolarAngleAxis dataKey="month" stroke="var(--muted-foreground)" />
          <PolarRadiusAxis stroke="var(--muted-foreground)" />
          <ChartTooltip content={ChartTooltipContent} />
          <Radar
            dataKey="sales"
            fill="var(--color-sales)"
            fillOpacity={0.6}
            stroke="var(--color-sales)"
            strokeWidth={2}
          />
        </RadarChart>
      </ChartContainer>
    </SnippetPreview>
  );
}

const gridCircleCode = `import { 
  RadarChart, 
  Radar, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  PolarGrid,
  PolarAngleAxis,
  type ChartConfig 
} from '@/components/ui/RadarChart'

const data = ${JSON.stringify(chartData, null, 2)}

const config: ChartConfig = {
  sales: {
    label: "Sales",
    color: "var(--chart-1)",
  },
}

export function GridCircleRadarChart() {
  return (
    <ChartContainer config={config} className="h-[400px]">
      <RadarChart data={data}>
        <PolarGrid stroke="var(--border)" gridType="circle" />
        <PolarAngleAxis dataKey="month" stroke="var(--muted-foreground)" />
        <ChartTooltip content={ChartTooltipContent} />
        <Radar
          dataKey="sales"
          fill="var(--color-sales)"
          fillOpacity={0.6}
          stroke="var(--color-sales)"
          strokeWidth={2}
        />
      </RadarChart>
    </ChartContainer>
  )
}`;

const gridCircleNoBasisCode = `import { 
  RadarChart, 
  Radar, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  PolarGrid,
  PolarAngleAxis,
  type ChartConfig 
} from '@/components/ui/RadarChart'

const data = ${JSON.stringify(chartData, null, 2)}

const config: ChartConfig = {
  sales: {
    label: "Sales",
    color: "var(--chart-1)",
  },
}

export function GridCircleNoBasisRadarChart() {
  return (
    <ChartContainer config={config} className="h-[400px]">
      <RadarChart data={data}>
        <PolarGrid stroke="var(--border)" gridType="circle" polarRadius={[20, 40, 60, 80]} />
        <PolarAngleAxis dataKey="month" stroke="transparent" />
        <ChartTooltip content={ChartTooltipContent} />
        <Radar
          dataKey="sales"
          fill="var(--color-sales)"
          fillOpacity={0.6}
          stroke="var(--color-sales)"
          strokeWidth={2}
        />
      </RadarChart>
    </ChartContainer>
  )
}`;

const gridCircleFilledCode = `import { 
  RadarChart, 
  Radar, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  PolarGrid,
  PolarAngleAxis,
  type ChartConfig 
} from '@/components/ui/RadarChart'

const data = ${JSON.stringify(chartData, null, 2)}

const config: ChartConfig = {
  sales: {
    label: "Sales",
    color: "var(--chart-1)",
  },
}

export function GridCircleFilledRadarChart() {
  return (
    <ChartContainer config={config} className="h-[400px]">
      <RadarChart data={data} outerRadius="80%">
        <PolarGrid stroke="var(--border)" gridType="circle" />
        <PolarAngleAxis dataKey="month" stroke="var(--muted-foreground)" />
        <ChartTooltip content={ChartTooltipContent} />
        <Radar
          dataKey="sales"
          fill="var(--color-sales)"
          fillOpacity={0.8}
          stroke="var(--color-sales)"
          strokeWidth={0}
        />
      </RadarChart>
    </ChartContainer>
  )
}`;

const gridFilledCode = `import { 
  RadarChart, 
  Radar, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  PolarGrid,
  PolarAngleAxis,
  type ChartConfig 
} from '@/components/ui/RadarChart'

const data = ${JSON.stringify(chartData, null, 2)}

const config: ChartConfig = {
  sales: {
    label: "Sales",
    color: "var(--chart-1)",
  },
}

export function GridFilledRadarChart() {
  return (
    <ChartContainer config={config} className="h-[400px]">
      <RadarChart data={data} outerRadius="80%">
        <PolarGrid stroke="var(--border)" />
        <PolarAngleAxis dataKey="month" stroke="var(--muted-foreground)" />
        <ChartTooltip content={ChartTooltipContent} />
        <Radar
          dataKey="sales"
          fill="var(--color-sales)"
          fillOpacity={0.8}
          stroke="var(--color-sales)"
          strokeWidth={0}
        />
      </RadarChart>
    </ChartContainer>
  )
}`;

const multipleCode = `import { 
  RadarChart, 
  Radar, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  PolarGrid,
  PolarAngleAxis,
  type ChartConfig 
} from '@/components/ui/RadarChart'

const data = ${JSON.stringify(multipleData, null, 2)}

const config: ChartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
}

export function MultipleRadarChart() {
  return (
    <ChartContainer config={config} className="h-[400px]">
      <RadarChart data={data}>
        <PolarGrid stroke="var(--border)" />
        <PolarAngleAxis dataKey="month" stroke="var(--muted-foreground)" />
        <ChartTooltip content={ChartTooltipContent} />
        <Radar
          dataKey="desktop"
          fill="var(--color-desktop)"
          fillOpacity={0.6}
          stroke="var(--color-desktop)"
          strokeWidth={2}
        />
        <Radar
          dataKey="mobile"
          fill="var(--color-mobile)"
          fillOpacity={0.4}
          stroke="var(--color-mobile)"
          strokeWidth={2}
        />
      </RadarChart>
    </ChartContainer>
  )
}`;

const legendCode = `import { 
  RadarChart, 
  Radar, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  PolarGrid,
  PolarAngleAxis,
  ChartLegend,
  ChartLegendContent,
  type ChartConfig 
} from '@/components/ui/RadarChart'

const data = ${JSON.stringify(multipleData, null, 2)}

const config: ChartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
}

export function LegendRadarChart() {
  return (
    <ChartContainer config={config} className="h-[450px]">
      <RadarChart data={data}>
        <PolarGrid stroke="var(--border)" />
        <PolarAngleAxis dataKey="month" stroke="var(--muted-foreground)" />
        <ChartTooltip content={ChartTooltipContent} />
        <ChartLegend content={ChartLegendContent} />
        <Radar
          dataKey="desktop"
          fill="var(--color-desktop)"
          fillOpacity={0.6}
          stroke="var(--color-desktop)"
          strokeWidth={2}
        />
        <Radar
          dataKey="mobile"
          fill="var(--color-mobile)"
          fillOpacity={0.4}
          stroke="var(--color-mobile)"
          strokeWidth={2}
        />
      </RadarChart>
    </ChartContainer>
  )
}`;

const multiConfig: ChartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
};

export function GridCircleExample() {
  return (
    <SnippetPreview code={gridCircleCode} title="Radar Chart - Grid Circle">
      <ChartContainer config={basicConfig} className="h-[400px]">
        <RadarChart data={chartData}>
          <PolarGrid stroke="var(--border)" gridType="circle" />
          <PolarAngleAxis dataKey="month" stroke="var(--muted-foreground)" />
          <ChartTooltip content={ChartTooltipContent} />
          <Radar
            dataKey="sales"
            fill="var(--color-sales)"
            fillOpacity={0.6}
            stroke="var(--color-sales)"
            strokeWidth={2}
          />
        </RadarChart>
      </ChartContainer>
    </SnippetPreview>
  );
}

export function GridCircleNoBasisExample() {
  return (
    <SnippetPreview
      code={gridCircleNoBasisCode}
      title="Radar Chart - Grid Circle No Basis"
    >
      <ChartContainer config={basicConfig} className="h-[400px]">
        <RadarChart data={chartData}>
          <PolarGrid
            stroke="var(--border)"
            gridType="circle"
            polarRadius={[20, 40, 60, 80]}
          />
          <PolarAngleAxis dataKey="month" stroke="transparent" />
          <ChartTooltip content={ChartTooltipContent} />
          <Radar
            dataKey="sales"
            fill="var(--color-sales)"
            fillOpacity={0.6}
            stroke="var(--color-sales)"
            strokeWidth={2}
          />
        </RadarChart>
      </ChartContainer>
    </SnippetPreview>
  );
}

export function GridCircleFilledExample() {
  return (
    <SnippetPreview
      code={gridCircleFilledCode}
      title="Radar Chart - Grid Circle Filled"
    >
      <ChartContainer config={basicConfig} className="h-[400px]">
        <RadarChart data={chartData} outerRadius="80%">
          <PolarGrid stroke="var(--border)" gridType="circle" />
          <PolarAngleAxis dataKey="month" stroke="var(--muted-foreground)" />
          <ChartTooltip content={ChartTooltipContent} />
          <Radar
            dataKey="sales"
            fill="var(--color-sales)"
            fillOpacity={0.8}
            stroke="var(--color-sales)"
            strokeWidth={0}
          />
        </RadarChart>
      </ChartContainer>
    </SnippetPreview>
  );
}

export function GridFilledExample() {
  return (
    <SnippetPreview code={gridFilledCode} title="Radar Chart - Grid Filled">
      <ChartContainer config={basicConfig} className="h-[400px]">
        <RadarChart data={chartData} outerRadius="80%">
          <PolarGrid stroke="var(--border)" />
          <PolarAngleAxis dataKey="month" stroke="var(--muted-foreground)" />
          <ChartTooltip content={ChartTooltipContent} />
          <Radar
            dataKey="sales"
            fill="var(--color-sales)"
            fillOpacity={0.8}
            stroke="var(--color-sales)"
            strokeWidth={0}
          />
        </RadarChart>
      </ChartContainer>
    </SnippetPreview>
  );
}

export function MultipleExample() {
  return (
    <SnippetPreview code={multipleCode} title="Radar Chart - Multiple">
      <ChartContainer config={multiConfig} className="h-[400px]">
        <RadarChart data={multipleData}>
          <PolarGrid stroke="var(--border)" />
          <PolarAngleAxis dataKey="month" stroke="var(--muted-foreground)" />
          <ChartTooltip content={ChartTooltipContent} />
          <Radar
            dataKey="desktop"
            fill="var(--color-desktop)"
            fillOpacity={0.6}
            stroke="var(--color-desktop)"
            strokeWidth={2}
          />
          <Radar
            dataKey="mobile"
            fill="var(--color-mobile)"
            fillOpacity={0.4}
            stroke="var(--color-mobile)"
            strokeWidth={2}
          />
        </RadarChart>
      </ChartContainer>
    </SnippetPreview>
  );
}

export function LegendExample() {
  return (
    <SnippetPreview code={legendCode} title="Radar Chart - Legend">
      <ChartContainer config={multiConfig} className="h-[450px]">
        <RadarChart data={multipleData}>
          <PolarGrid stroke="var(--border)" />
          <PolarAngleAxis dataKey="month" stroke="var(--muted-foreground)" />
          <ChartTooltip content={ChartTooltipContent} />
          <ChartLegend content={ChartLegendContent} />
          <Radar
            dataKey="desktop"
            fill="var(--color-desktop)"
            fillOpacity={0.6}
            stroke="var(--color-desktop)"
            strokeWidth={2}
          />
          <Radar
            dataKey="mobile"
            fill="var(--color-mobile)"
            fillOpacity={0.4}
            stroke="var(--color-mobile)"
            strokeWidth={2}
          />
        </RadarChart>
      </ChartContainer>
    </SnippetPreview>
  );
}
