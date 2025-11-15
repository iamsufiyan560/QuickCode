import {
  LineChart,
  Line,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  CartesianGrid,
  XAxis,
  type ChartConfig,
} from "@/components/ui/Chart/LineChart";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";
import { TrendingUp, DollarSign } from "lucide-react";

const chartData = [
  { month: "Jan", revenue: 4200, expenses: 4800 },
  { month: "Feb", revenue: 5800, expenses: 3200 },
  { month: "Mar", revenue: 4600, expenses: 2900 },
  { month: "Apr", revenue: 7200, expenses: 3800 },
  { month: "May", revenue: 6400, expenses: 3400 },
  { month: "Jun", revenue: 8900, expenses: 4100 },
];

const basicCode = `import { 
  LineChart, 
  Line, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  CartesianGrid,
  XAxis,
  type ChartConfig 
} from '@/components/ui/LineChart'

const data = ${JSON.stringify(chartData, null, 2)}

const config: ChartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
}

export function BasicLineChart() {
  return (
    <ChartContainer config={config} className="h-[300px]">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="month" stroke="var(--muted-foreground)" />
        <ChartTooltip content={ChartTooltipContent} />
        <Line
          dataKey="revenue"
          type="monotone"
          stroke="var(--color-revenue)"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ChartContainer>
  )
}`;

const linearCode = `import { 
  LineChart, 
  Line, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  CartesianGrid,
  XAxis,
  type ChartConfig 
} from '@/components/ui/LineChart'

const data = ${JSON.stringify(chartData, null, 2)}

const config: ChartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
}

export function LinearLineChart() {
  return (
    <ChartContainer config={config} className="h-[300px]">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="month" stroke="var(--muted-foreground)" />
        <ChartTooltip content={ChartTooltipContent} />
        <Line
          dataKey="revenue"
          type="linear"
          stroke="var(--color-revenue)"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ChartContainer>
  )
}`;

const stepCode = `import { 
  LineChart, 
  Line, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  CartesianGrid,
  XAxis,
  type ChartConfig 
} from '@/components/ui/LineChart'

const data = ${JSON.stringify(chartData, null, 2)}

const config: ChartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
}

export function StepLineChart() {
  return (
    <ChartContainer config={config} className="h-[300px]">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="month" stroke="var(--muted-foreground)" />
        <ChartTooltip content={ChartTooltipContent} />
        <Line
          dataKey="revenue"
          type="step"
          stroke="var(--color-revenue)"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ChartContainer>
  )
}`;

const multipleCode = `import { 
  LineChart, 
  Line, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  CartesianGrid,
  XAxis,
  type ChartConfig 
} from '@/components/ui/LineChart'

const data = ${JSON.stringify(chartData, null, 2)}

const config: ChartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
  expenses: {
    label: "Expenses",
    color: "var(--chart-2)",
  },
}

export function MultipleLineChart() {
  return (
    <ChartContainer config={config} className="h-[350px]">
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="month" stroke="var(--muted-foreground)" />
        <ChartTooltip content={ChartTooltipContent} />
        <Line
          dataKey="revenue"
          type="monotone"
          stroke="var(--color-revenue)"
          strokeWidth={2}
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
        <Line
          dataKey="expenses"
          type="monotone"
          stroke="var(--color-expenses)"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={{ r: 4 }}
          activeDot={{ r: 6 }}
        />
      </LineChart>
    </ChartContainer>
  )
}`;

const legendCode = `import { 
  LineChart, 
  Line, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  CartesianGrid,
  XAxis,
  type ChartConfig 
} from '@/components/ui/LineChart'
import { TrendingUp, DollarSign } from 'lucide-react'

const data = ${JSON.stringify(chartData, null, 2)}

const config: ChartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
  expenses: {
    label: "Expenses",
    color: "var(--chart-2)",
  },
}

const CustomLegend = () => {
  return (
    <div className="flex justify-center gap-6 mt-4">
      <div className="flex items-center gap-2">
        <TrendingUp className="w-4 h-4" style={{ color: 'var(--chart-1)' }} />
        <span className="text-sm text-muted-foreground">Revenue</span>
      </div>
      <div className="flex items-center gap-2">
        <DollarSign className="w-4 h-4" style={{ color: 'var(--chart-2)' }} />
        <span className="text-sm text-muted-foreground">Expenses</span>
      </div>
    </div>
  )
}

export function LegendLineChart() {
  return (
    <div>
      <ChartContainer config={config} className="h-[300px]">
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" stroke="var(--muted-foreground)" />
          <ChartTooltip content={ChartTooltipContent} />
          <Line
            dataKey="revenue"
            type="monotone"
            stroke="var(--color-revenue)"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            dataKey="expenses"
            type="monotone"
            stroke="var(--color-expenses)"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ChartContainer>
      <CustomLegend />
    </div>
  )
}`;

const basicConfig: ChartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
};

const dualConfig: ChartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
  expenses: {
    label: "Expenses",
    color: "var(--chart-2)",
  },
};

const CustomLegend = () => {
  return (
    <div className="flex justify-center gap-6 mt-4">
      <div className="flex items-center gap-2">
        <TrendingUp className="w-4 h-4" style={{ color: "var(--chart-1)" }} />
        <span className="text-sm text-muted-foreground">Revenue</span>
      </div>
      <div className="flex items-center gap-2">
        <DollarSign className="w-4 h-4" style={{ color: "var(--chart-2)" }} />
        <span className="text-sm text-muted-foreground">Expenses</span>
      </div>
    </div>
  );
};

export function BasicExample() {
  return (
    <SnippetPreview code={basicCode} title="Basic Line Chart">
      <ChartContainer config={basicConfig} className="h-[300px]">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" stroke="var(--muted-foreground)" />
          <ChartTooltip content={ChartTooltipContent} />
          <Line
            dataKey="revenue"
            type="monotone"
            stroke="var(--color-revenue)"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ChartContainer>
    </SnippetPreview>
  );
}

export function LinearExample() {
  return (
    <SnippetPreview code={linearCode} title="Linear Line Chart">
      <ChartContainer config={basicConfig} className="h-[300px]">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" stroke="var(--muted-foreground)" />
          <ChartTooltip content={ChartTooltipContent} />
          <Line
            dataKey="revenue"
            type="linear"
            stroke="var(--color-revenue)"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ChartContainer>
    </SnippetPreview>
  );
}

export function StepExample() {
  return (
    <SnippetPreview code={stepCode} title="Step Line Chart">
      <ChartContainer config={basicConfig} className="h-[300px]">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" stroke="var(--muted-foreground)" />
          <ChartTooltip content={ChartTooltipContent} />
          <Line
            dataKey="revenue"
            type="step"
            stroke="var(--color-revenue)"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ChartContainer>
    </SnippetPreview>
  );
}

export function MultipleExample() {
  return (
    <SnippetPreview code={multipleCode} title="Multiple Lines Chart">
      <ChartContainer config={dualConfig} className="h-[350px]">
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" stroke="var(--muted-foreground)" />
          <ChartTooltip content={ChartTooltipContent} />
          <Line
            dataKey="revenue"
            type="monotone"
            stroke="var(--color-revenue)"
            strokeWidth={2}
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
          <Line
            dataKey="expenses"
            type="monotone"
            stroke="var(--color-expenses)"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ r: 4 }}
            activeDot={{ r: 6 }}
          />
        </LineChart>
      </ChartContainer>
    </SnippetPreview>
  );
}

export function LegendExample() {
  return (
    <SnippetPreview code={legendCode} title="Line Chart with Custom Legend">
      <div className="w-full">
        <ChartContainer config={dualConfig} className="h-[300px]">
          <LineChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" stroke="var(--muted-foreground)" />
            <ChartTooltip content={ChartTooltipContent} />
            <Line
              dataKey="revenue"
              type="monotone"
              stroke="var(--color-revenue)"
              strokeWidth={2}
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
            <Line
              dataKey="expenses"
              type="monotone"
              stroke="var(--color-expenses)"
              strokeWidth={2}
              strokeDasharray="5 5"
              dot={{ r: 4 }}
              activeDot={{ r: 6 }}
            />
          </LineChart>
        </ChartContainer>
        <CustomLegend />
      </div>
    </SnippetPreview>
  );
}
