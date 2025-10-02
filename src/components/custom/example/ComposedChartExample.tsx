import {
  ComposedChart,
  Line,
  Bar,
  Area,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  CartesianGrid,
  XAxis,
  YAxis,
  type ChartConfig,
} from "@/components/custom/Chart/ComposedChart";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

const chartData = [
  { month: "Jan", revenue: 12000, expenses: 8000, profit: 4000 },
  { month: "Feb", revenue: 15000, expenses: 9000, profit: 6000 },
  { month: "Mar", revenue: 18000, expenses: 11000, profit: 7000 },
  { month: "Apr", revenue: 22000, expenses: 13000, profit: 9000 },
  { month: "May", revenue: 20000, expenses: 12000, profit: 8000 },
  { month: "Jun", revenue: 25000, expenses: 14000, profit: 11000 },
];

const chartDataJSON = JSON.stringify(chartData, null, 2);

const basicCode = `import { 
  ComposedChart, 
  Line,
  Bar,
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  CartesianGrid,
  XAxis,
  YAxis,
  type ChartConfig 
} from '@/components/ui/ComposedChart'

const data = ${chartDataJSON}

const config: ChartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
  profit: {
    label: "Profit",
    color: "var(--chart-2)",
  },
}

export function BasicComposedChart() {
  return (
    <ChartContainer config={config} className="h-[350px]">
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="month" stroke="var(--muted-foreground)" />
        <YAxis stroke="var(--muted-foreground)" />
        <ChartTooltip content={ChartTooltipContent} />
        <Bar
          dataKey="revenue"
          fill="var(--color-revenue)"
          radius={[4, 4, 0, 0]}
        />
        <Line
          dataKey="profit"
          type="monotone"
          stroke="var(--color-profit)"
          strokeWidth={2}
          dot={{ r: 4 }}
        />
      </ComposedChart>
    </ChartContainer>
  )
}`;

const areaBarCode = `import { 
  ComposedChart, 
  Bar,
  Area,
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  CartesianGrid,
  XAxis,
  YAxis,
  type ChartConfig 
} from '@/components/ui/ComposedChart'

const data = ${chartDataJSON}

const config: ChartConfig = {
  expenses: {
    label: "Expenses",
    color: "var(--chart-3)",
  },
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
}

export function AreaBarComposedChart() {
  return (
    <ChartContainer config={config} className="h-[350px]">
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="month" stroke="var(--muted-foreground)" />
        <YAxis stroke="var(--muted-foreground)" />
        <ChartTooltip content={ChartTooltipContent} />
        <Area
          dataKey="expenses"
          type="monotone"
          fill="var(--color-expenses)"
          fillOpacity={0.3}
          stroke="var(--color-expenses)"
          strokeWidth={0}
        />
        <Bar
          dataKey="revenue"
          fill="var(--color-revenue)"
          radius={[4, 4, 0, 0]}
        />
      </ComposedChart>
    </ChartContainer>
  )
}`;

const multiLineCode = `import { 
  ComposedChart, 
  Line,
  Bar,
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  CartesianGrid,
  XAxis,
  YAxis,
  type ChartConfig 
} from '@/components/ui/ComposedChart'

const data = ${chartDataJSON}

const config: ChartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
  expenses: {
    label: "Expenses",
    color: "var(--chart-3)",
  },
  profit: {
    label: "Profit",
    color: "var(--chart-2)",
  },
}

export function MultiLineComposedChart() {
  return (
    <ChartContainer config={config} className="h-[350px]">
      <ComposedChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="month" stroke="var(--muted-foreground)" />
        <YAxis stroke="var(--muted-foreground)" />
        <ChartTooltip content={ChartTooltipContent} />
        <Bar
          dataKey="profit"
          fill="var(--color-profit)"
          radius={[4, 4, 0, 0]}
        />
        <Line
          dataKey="revenue"
          type="monotone"
          stroke="var(--color-revenue)"
          strokeWidth={2}
          dot={{ r: 4 }}
        />
        <Line
          dataKey="expenses"
          type="monotone"
          stroke="var(--color-expenses)"
          strokeWidth={2}
          strokeDasharray="5 5"
          dot={{ r: 4 }}
        />
      </ComposedChart>
    </ChartContainer>
  )
}`;

const basicConfig: ChartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
  profit: {
    label: "Profit",
    color: "var(--chart-2)",
  },
};

const areaBarConfig: ChartConfig = {
  expenses: {
    label: "Expenses",
    color: "var(--chart-3)",
  },
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
};

const multiLineConfig: ChartConfig = {
  revenue: {
    label: "Revenue",
    color: "var(--chart-1)",
  },
  expenses: {
    label: "Expenses",
    color: "var(--chart-3)",
  },
  profit: {
    label: "Profit",
    color: "var(--chart-2)",
  },
};

export function BasicExample() {
  return (
    <SnippetPreview code={basicCode} title="Bar + Line Chart">
      <ChartContainer config={basicConfig} className="h-[350px]">
        <ComposedChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" stroke="var(--muted-foreground)" />
          <YAxis stroke="var(--muted-foreground)" />
          <ChartTooltip content={ChartTooltipContent} />
          <Bar
            dataKey="revenue"
            fill="var(--color-revenue)"
            radius={[4, 4, 0, 0]}
          />
          <Line
            dataKey="profit"
            type="monotone"
            stroke="var(--color-profit)"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
        </ComposedChart>
      </ChartContainer>
    </SnippetPreview>
  );
}

export function AreaBarExample() {
  return (
    <SnippetPreview code={areaBarCode} title="Area + Bar Chart">
      <ChartContainer config={areaBarConfig} className="h-[350px]">
        <ComposedChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" stroke="var(--muted-foreground)" />
          <YAxis stroke="var(--muted-foreground)" />
          <ChartTooltip content={ChartTooltipContent} />
          <Area
            dataKey="expenses"
            type="monotone"
            fill="var(--color-expenses)"
            fillOpacity={0.3}
            stroke="var(--color-expenses)"
            strokeWidth={0}
          />
          <Bar
            dataKey="revenue"
            fill="var(--color-revenue)"
            radius={[4, 4, 0, 0]}
          />
        </ComposedChart>
      </ChartContainer>
    </SnippetPreview>
  );
}

export function MultiLineExample() {
  return (
    <SnippetPreview code={multiLineCode} title="Bar + Multiple Lines">
      <ChartContainer config={multiLineConfig} className="h-[350px]">
        <ComposedChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" stroke="var(--muted-foreground)" />
          <YAxis stroke="var(--muted-foreground)" />
          <ChartTooltip content={ChartTooltipContent} />
          <Bar
            dataKey="profit"
            fill="var(--color-profit)"
            radius={[4, 4, 0, 0]}
          />
          <Line
            dataKey="revenue"
            type="monotone"
            stroke="var(--color-revenue)"
            strokeWidth={2}
            dot={{ r: 4 }}
          />
          <Line
            dataKey="expenses"
            type="monotone"
            stroke="var(--color-expenses)"
            strokeWidth={2}
            strokeDasharray="5 5"
            dot={{ r: 4 }}
          />
        </ComposedChart>
      </ChartContainer>
    </SnippetPreview>
  );
}
