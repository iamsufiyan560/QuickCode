import {
  ScatterChart,
  Scatter,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  CartesianGrid,
  XAxis,
  YAxis,
  ZAxis,
  Cell,
  type ChartConfig,
} from "@/components/custom/Chart/ScatterChart";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

const chartData = [
  { name: "Product A", sales: 120, profit: 45, marketShare: 15 },
  { name: "Product B", sales: 95, profit: 38, marketShare: 12 },
  { name: "Product C", sales: 180, profit: 72, marketShare: 22 },
  { name: "Product D", sales: 65, profit: 28, marketShare: 8 },
  { name: "Product E", sales: 150, profit: 58, marketShare: 18 },
  { name: "Product F", sales: 85, profit: 32, marketShare: 10 },
  { name: "Product G", sales: 210, profit: 88, marketShare: 28 },
  { name: "Product H", sales: 140, profit: 52, marketShare: 16 },
];

const chartDataJSON = JSON.stringify(chartData, null, 2);

const basicCode = `import { 
  ScatterChart, 
  Scatter,
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  CartesianGrid,
  XAxis,
  YAxis,
  type ChartConfig 
} from '@/components/ui/ScatterChart'

const data = ${chartDataJSON}

const config: ChartConfig = {
  scatter: {
    label: "Products",
    color: "var(--chart-1)",
  },
}

export function BasicScatterChart() {
  return (
    <ChartContainer config={config} className="h-[400px]">
      <ScatterChart>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis 
          dataKey="sales" 
          type="number" 
          stroke="var(--muted-foreground)"
          label={{ value: 'Sales (K)', position: 'insideBottom', offset: -5 }}
        />
        <YAxis 
          dataKey="profit" 
          type="number" 
          stroke="var(--muted-foreground)"
          label={{ value: 'Profit (K)', angle: -90, position: 'insideLeft' }}
        />
        <ChartTooltip content={ChartTooltipContent} cursor={{ strokeDasharray: '3 3' }} />
        <Scatter 
          data={data.map(d => ({ ...d, x: d.sales, y: d.profit }))} 
          fill="var(--color-scatter)" 
        />
      </ScatterChart>
    </ChartContainer>
  )
}`;

const bubbleCode = `import { 
  ScatterChart, 
  Scatter,
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  CartesianGrid,
  XAxis,
  YAxis,
  ZAxis,
  type ChartConfig 
} from '@/components/ui/ScatterChart'

const data = ${chartDataJSON}

const config: ChartConfig = {
  scatter: {
    label: "Products",
    color: "var(--chart-2)",
  },
}

export function BubbleScatterChart() {
  return (
    <ChartContainer config={config} className="h-[400px]">
      <ScatterChart>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis 
          dataKey="sales" 
          type="number" 
          stroke="var(--muted-foreground)"
          label={{ value: 'Sales (K)', position: 'insideBottom', offset: -5 }}
        />
        <YAxis 
          dataKey="profit" 
          type="number" 
          stroke="var(--muted-foreground)"
          label={{ value: 'Profit (K)', angle: -90, position: 'insideLeft' }}
        />
        <ZAxis dataKey="marketShare" range={[100, 1000]} />
        <ChartTooltip content={ChartTooltipContent} cursor={{ strokeDasharray: '3 3' }} />
        <Scatter 
          data={data.map(d => ({ ...d, x: d.sales, y: d.profit, z: d.marketShare }))} 
          fill="var(--color-scatter)" 
        />
      </ScatterChart>
    </ChartContainer>
  )
}`;

const multiScatterCode = `import { 
  ScatterChart, 
  Scatter,
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  CartesianGrid,
  XAxis,
  YAxis,
  type ChartConfig 
} from '@/components/ui/ScatterChart'

const productsA = [
  { name: "Q1", sales: 120, profit: 45 },
  { name: "Q2", sales: 180, profit: 72 },
  { name: "Q3", sales: 150, profit: 58 },
  { name: "Q4", sales: 210, profit: 88 },
]

const productsB = [
  { name: "Q1", sales: 95, profit: 38 },
  { name: "Q2", sales: 65, profit: 28 },
  { name: "Q3", sales: 85, profit: 32 },
  { name: "Q4", sales: 140, profit: 52 },
]

const config: ChartConfig = {
  categoryA: {
    label: "Category A",
    color: "var(--chart-1)",
  },
  categoryB: {
    label: "Category B",
    color: "var(--chart-3)",
  },
}

export function MultiScatterChart() {
  return (
    <ChartContainer config={config} className="h-[400px]">
      <ScatterChart>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis 
          dataKey="sales" 
          type="number" 
          stroke="var(--muted-foreground)"
          label={{ value: 'Sales (K)', position: 'insideBottom', offset: -5 }}
        />
        <YAxis 
          dataKey="profit" 
          type="number" 
          stroke="var(--muted-foreground)"
          label={{ value: 'Profit (K)', angle: -90, position: 'insideLeft' }}
        />
        <ChartTooltip content={ChartTooltipContent} cursor={{ strokeDasharray: '3 3' }} />
        <Scatter 
          name="Category A"
          data={productsA.map(d => ({ ...d, x: d.sales, y: d.profit }))} 
          fill="var(--color-categoryA)" 
        />
        <Scatter 
          name="Category B"
          data={productsB.map(d => ({ ...d, x: d.sales, y: d.profit }))} 
          fill="var(--color-categoryB)" 
        />
      </ScatterChart>
    </ChartContainer>
  )
}`;

const basicConfig: ChartConfig = {
  scatter: {
    label: "Products",
    color: "var(--chart-1)",
  },
};

const bubbleConfig: ChartConfig = {
  scatter: {
    label: "Products",
    color: "var(--chart-2)",
  },
};

const productsA = [
  { name: "Q1", sales: 120, profit: 45 },
  { name: "Q2", sales: 180, profit: 72 },
  { name: "Q3", sales: 150, profit: 58 },
  { name: "Q4", sales: 210, profit: 88 },
];

const productsB = [
  { name: "Q1", sales: 95, profit: 38 },
  { name: "Q2", sales: 65, profit: 28 },
  { name: "Q3", sales: 85, profit: 32 },
  { name: "Q4", sales: 140, profit: 52 },
];

const multiConfig: ChartConfig = {
  categoryA: {
    label: "Category A",
    color: "var(--chart-1)",
  },
  categoryB: {
    label: "Category B",
    color: "var(--chart-3)",
  },
};

export function BasicExample() {
  return (
    <SnippetPreview code={basicCode} title="Basic Scatter Chart">
      <ChartContainer config={basicConfig} className="h-[400px]">
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis
            dataKey="sales"
            type="number"
            stroke="var(--muted-foreground)"
            label={{ value: "Sales (K)", position: "insideBottom", offset: -5 }}
          />
          <YAxis
            dataKey="profit"
            type="number"
            stroke="var(--muted-foreground)"
            label={{ value: "Profit (K)", angle: -90, position: "insideLeft" }}
          />
          <ChartTooltip
            content={ChartTooltipContent}
            cursor={{ strokeDasharray: "3 3" }}
          />
          <Scatter
            data={chartData.map((d) => ({ ...d, x: d.sales, y: d.profit }))}
            fill="var(--color-scatter)"
          />
        </ScatterChart>
      </ChartContainer>
    </SnippetPreview>
  );
}

export function BubbleExample() {
  return (
    <SnippetPreview code={bubbleCode} title="Bubble Scatter Chart">
      <ChartContainer config={bubbleConfig} className="h-[400px]">
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis
            dataKey="sales"
            type="number"
            stroke="var(--muted-foreground)"
            label={{ value: "Sales (K)", position: "insideBottom", offset: -5 }}
          />
          <YAxis
            dataKey="profit"
            type="number"
            stroke="var(--muted-foreground)"
            label={{ value: "Profit (K)", angle: -90, position: "insideLeft" }}
          />
          <ZAxis dataKey="marketShare" range={[100, 1000]} />
          <ChartTooltip
            content={ChartTooltipContent}
            cursor={{ strokeDasharray: "3 3" }}
          />
          <Scatter
            data={chartData.map((d) => ({
              ...d,
              x: d.sales,
              y: d.profit,
              z: d.marketShare,
            }))}
            fill="var(--color-scatter)"
          />
        </ScatterChart>
      </ChartContainer>
    </SnippetPreview>
  );
}

export function MultiScatterExample() {
  return (
    <SnippetPreview code={multiScatterCode} title="Multiple Scatter Series">
      <ChartContainer config={multiConfig} className="h-[400px]">
        <ScatterChart>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis
            dataKey="sales"
            type="number"
            stroke="var(--muted-foreground)"
            label={{ value: "Sales (K)", position: "insideBottom", offset: -5 }}
          />
          <YAxis
            dataKey="profit"
            type="number"
            stroke="var(--muted-foreground)"
            label={{ value: "Profit (K)", angle: -90, position: "insideLeft" }}
          />
          <ChartTooltip
            content={ChartTooltipContent}
            cursor={{ strokeDasharray: "3 3" }}
          />
          <Scatter
            name="Category A"
            data={productsA.map((d) => ({ ...d, x: d.sales, y: d.profit }))}
            fill="var(--color-categoryA)"
          />
          <Scatter
            name="Category B"
            data={productsB.map((d) => ({ ...d, x: d.sales, y: d.profit }))}
            fill="var(--color-categoryB)"
          />
        </ScatterChart>
      </ChartContainer>
    </SnippetPreview>
  );
}
