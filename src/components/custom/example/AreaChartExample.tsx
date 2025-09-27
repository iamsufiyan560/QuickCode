import {
  AreaChart,
  Area,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  type ChartConfig,
} from "@/components/custom/Chart/AreaChart";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";
import { TrendingUp, Monitor, Smartphone } from "lucide-react";

const chartData = [
  { month: "Jan", desktop: 8000, mobile: 4000 },
  { month: "Feb", desktop: 12000, mobile: 7000 },
  { month: "Mar", desktop: 9000, mobile: 6000 },
  { month: "Apr", desktop: 15000, mobile: 10000 },
  { month: "May", desktop: 13000, mobile: 9000 },
  { month: "Jun", desktop: 18000, mobile: 12000 },
];

const basicCode = `import { 
  AreaChart, 
  Area, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  CartesianGrid,
  XAxis,
  type ChartConfig 
} from '@/components/ui/AreaChart'

const data = ${JSON.stringify(chartData, null, 2)}

const config: ChartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
}

export function BasicAreaChart() {
  return (
    <ChartContainer config={config} className="h-[300px]">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="month" stroke="var(--muted-foreground)" />
        <ChartTooltip content={ChartTooltipContent} />
        <Area
          dataKey="desktop"
          type="monotone"
          fill="var(--color-desktop)"
          fillOpacity={0.4}
          stroke="var(--color-desktop)"
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  )
}`;

const linearCode = `import { 
  AreaChart, 
  Area, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  CartesianGrid,
  XAxis,
  type ChartConfig 
} from '@/components/ui/AreaChart'

const data = ${JSON.stringify(chartData, null, 2)}

const config: ChartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
}

export function LinearAreaChart() {
  return (
    <ChartContainer config={config} className="h-[300px]">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="month" stroke="var(--muted-foreground)" />
        <ChartTooltip content={ChartTooltipContent} />
        <Area
          dataKey="desktop"
          type="linear"
          fill="var(--color-desktop)"
          fillOpacity={0.4}
          stroke="var(--color-desktop)"
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  )
}`;

const stepCode = `import { 
  AreaChart, 
  Area, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  CartesianGrid,
  XAxis,
  type ChartConfig 
} from '@/components/ui/AreaChart'

const data = ${JSON.stringify(chartData, null, 2)}

const config: ChartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
}

export function StepAreaChart() {
  return (
    <ChartContainer config={config} className="h-[300px]">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="month" stroke="var(--muted-foreground)" />
        <ChartTooltip content={ChartTooltipContent} />
        <Area
          dataKey="desktop"
          type="step"
          fill="var(--color-desktop)"
          fillOpacity={0.4}
          stroke="var(--color-desktop)"
          strokeWidth={2}
        />
      </AreaChart>
    </ChartContainer>
  )
}`;

const stackedCode = `import { 
  AreaChart, 
  Area, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  CartesianGrid,
  XAxis,
  type ChartConfig 
} from '@/components/ui/AreaChart'

const data = ${JSON.stringify(chartData, null, 2)}

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

export function StackedAreaChart() {
  return (
    <ChartContainer config={config} className="h-[350px]">
      <AreaChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="month" stroke="var(--muted-foreground)" />
        <ChartTooltip content={ChartTooltipContent} />
        <Area
          dataKey="mobile"
          stackId="1"
          type="monotone"
          fill="var(--color-mobile)"
          fillOpacity={0.6}
          stroke="var(--color-mobile)"
          strokeWidth={0}
        />
        <Area
          dataKey="desktop"
          stackId="1"
          type="monotone"
          fill="var(--color-desktop)"
          fillOpacity={0.8}
          stroke="var(--color-desktop)"
          strokeWidth={0}
        />
      </AreaChart>
    </ChartContainer>
  )
}`;

const legendCode = `import { 
  AreaChart, 
  Area, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  CartesianGrid,
  XAxis,
  type ChartConfig 
} from '@/components/ui/AreaChart'
import { Monitor, Smartphone } from 'lucide-react'

const data = ${JSON.stringify(chartData, null, 2)}

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

const CustomLegend = () => {
  return (
    <div className="flex justify-center gap-6 mt-4">
      <div className="flex items-center gap-2">
        <Monitor className="w-4 h-4" style={{ color: 'var(--chart-1)' }} />
        <span className="text-sm text-muted-foreground">Desktop</span>
      </div>
      <div className="flex items-center gap-2">
        <Smartphone className="w-4 h-4" style={{ color: 'var(--chart-2)' }} />
        <span className="text-sm text-muted-foreground">Mobile</span>
      </div>
    </div>
  )
}

export function LegendAreaChart() {
  return (
    <div>
      <ChartContainer config={config} className="h-[300px]">
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" stroke="var(--muted-foreground)" />
          <ChartTooltip content={ChartTooltipContent} />
          <Area
            dataKey="mobile"
            stackId="1"
            type="monotone"
            fill="var(--color-mobile)"
            fillOpacity={0.6}
            stroke="var(--color-mobile)"
            strokeWidth={0}
          />
          <Area
            dataKey="desktop"
            stackId="1"
            type="monotone"
            fill="var(--color-desktop)"
            fillOpacity={0.8}
            stroke="var(--color-desktop)"
            strokeWidth={0}
          />
        </AreaChart>
      </ChartContainer>
      <CustomLegend />
    </div>
  )
}`;

const basicConfig: ChartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
};

const dualConfig: ChartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
};

const CustomLegend = () => {
  return (
    <div className="flex justify-center gap-6 mt-4">
      <div className="flex items-center gap-2">
        <Monitor className="w-4 h-4" style={{ color: "var(--chart-1)" }} />
        <span className="text-sm text-muted-foreground">Desktop</span>
      </div>
      <div className="flex items-center gap-2">
        <Smartphone className="w-4 h-4" style={{ color: "var(--chart-2)" }} />
        <span className="text-sm text-muted-foreground">Mobile</span>
      </div>
    </div>
  );
};

export function BasicExample() {
  return (
    <SnippetPreview code={basicCode} title="Basic Area Chart">
      <ChartContainer config={basicConfig} className="h-[300px]">
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" stroke="var(--muted-foreground)" />
          <ChartTooltip content={ChartTooltipContent} />
          <Area
            dataKey="desktop"
            type="monotone"
            fill="var(--color-desktop)"
            fillOpacity={0.4}
            stroke="var(--color-desktop)"
            strokeWidth={2}
          />
        </AreaChart>
      </ChartContainer>
    </SnippetPreview>
  );
}

export function LinearExample() {
  return (
    <SnippetPreview code={linearCode} title="Linear Area Chart">
      <ChartContainer config={basicConfig} className="h-[300px]">
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" stroke="var(--muted-foreground)" />
          <ChartTooltip content={ChartTooltipContent} />
          <Area
            dataKey="desktop"
            type="linear"
            fill="var(--color-desktop)"
            fillOpacity={0.4}
            stroke="var(--color-desktop)"
            strokeWidth={2}
          />
        </AreaChart>
      </ChartContainer>
    </SnippetPreview>
  );
}

export function StepExample() {
  return (
    <SnippetPreview code={stepCode} title="Step Area Chart">
      <ChartContainer config={basicConfig} className="h-[300px]">
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" stroke="var(--muted-foreground)" />
          <ChartTooltip content={ChartTooltipContent} />
          <Area
            dataKey="desktop"
            type="step"
            fill="var(--color-desktop)"
            fillOpacity={0.4}
            stroke="var(--color-desktop)"
            strokeWidth={2}
          />
        </AreaChart>
      </ChartContainer>
    </SnippetPreview>
  );
}

export function StackedExample() {
  return (
    <SnippetPreview code={stackedCode} title="Stacked Area Chart">
      <ChartContainer config={dualConfig} className="h-[350px]">
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" stroke="var(--muted-foreground)" />
          <ChartTooltip content={ChartTooltipContent} />
          <Area
            dataKey="mobile"
            stackId="1"
            type="monotone"
            fill="var(--color-mobile)"
            fillOpacity={0.6}
            stroke="var(--color-mobile)"
            strokeWidth={0}
          />
          <Area
            dataKey="desktop"
            stackId="1"
            type="monotone"
            fill="var(--color-desktop)"
            fillOpacity={0.8}
            stroke="var(--color-desktop)"
            strokeWidth={0}
          />
        </AreaChart>
      </ChartContainer>
    </SnippetPreview>
  );
}

export function LegendExample() {
  return (
    <SnippetPreview code={legendCode} title="Area Chart with Custom Legend">
      <div className="w-full">
        <ChartContainer config={dualConfig} className="h-[300px]">
          <AreaChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" stroke="var(--muted-foreground)" />
            <ChartTooltip content={ChartTooltipContent} />
            <Area
              dataKey="mobile"
              stackId="1"
              type="monotone"
              fill="var(--color-mobile)"
              fillOpacity={0.6}
              stroke="var(--color-mobile)"
              strokeWidth={0}
            />
            <Area
              dataKey="desktop"
              stackId="1"
              type="monotone"
              fill="var(--color-desktop)"
              fillOpacity={0.8}
              stroke="var(--color-desktop)"
              strokeWidth={0}
            />
          </AreaChart>
        </ChartContainer>
        <CustomLegend />
      </div>
    </SnippetPreview>
  );
}
