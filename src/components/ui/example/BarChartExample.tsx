"use client";
import {
  BarChart,
  Bar,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  Cell,
  LabelList,
  type ChartConfig,
} from "@/components/ui/Chart/BarChart";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";
import { Monitor, Smartphone } from "lucide-react";

const basicData = [
  { month: "Jan", desktop: 186 },
  { month: "Feb", desktop: 305 },
  { month: "Mar", desktop: 237 },
  { month: "Apr", desktop: 173 },
  { month: "May", desktop: 209 },
  { month: "Jun", desktop: 214 },
];

const multipleData = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 173, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
];

const mixedData = [
  { month: "Jan", desktop: 186, mobile: 80, tablet: 120 },
  { month: "Feb", desktop: 305, mobile: 200, tablet: 180 },
  { month: "Mar", desktop: 237, mobile: 120, tablet: 160 },
  { month: "Apr", desktop: 173, mobile: 190, tablet: 140 },
  { month: "May", desktop: 209, mobile: 130, tablet: 200 },
  { month: "Jun", desktop: 214, mobile: 140, tablet: 220 },
];

const negativeData = [
  { month: "Jan", profit: 50, loss: -20 },
  { month: "Feb", profit: 80, loss: -35 },
  { month: "Mar", profit: 60, loss: -15 },
  { month: "Apr", profit: 90, loss: -40 },
  { month: "May", profit: 70, loss: -25 },
  { month: "Jun", profit: 100, loss: -30 },
];

const activeData = [
  { month: "Jan", desktop: 186, active: false },
  { month: "Feb", desktop: 305, active: true },
  { month: "Mar", desktop: 237, active: false },
  { month: "Apr", desktop: 173, active: false },
  { month: "May", desktop: 209, active: true },
  { month: "Jun", desktop: 214, active: false },
];

const basicCode = `import { 
  BarChart, 
  Bar, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  CartesianGrid,
  XAxis,
  YAxis,
  type ChartConfig 
} from '@/components/ui/BarChart'

const data = ${JSON.stringify(basicData, null, 2)}

const config: ChartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
}

export function BasicBarChart() {
  return (
    <ChartContainer config={config} className="h-[300px]">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="month" stroke="var(--muted-foreground)" />
        <YAxis stroke="var(--muted-foreground)" />
        <ChartTooltip content={ChartTooltipContent} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}`;

const horizontalCode = `import { 
  BarChart, 
  Bar, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  CartesianGrid,
  XAxis,
  YAxis,
  type ChartConfig 
} from '@/components/ui/BarChart'

const data = ${JSON.stringify(basicData, null, 2)}

const config: ChartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
}

export function HorizontalBarChart() {
  return (
    <ChartContainer config={basicConfig} className="h-[300px]">
        <BarChart data={basicData} layout="vertical">
          <XAxis type="number" stroke="var(--muted-foreground)" />
          <YAxis
            dataKey="month"
            type="category"
            stroke="var(--muted-foreground)"
          />
          <ChartTooltip content={ChartTooltipContent} />
          <Bar
            dataKey="desktop"
            fill="var(--color-desktop)"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ChartContainer>
  )
}`;

const multipleCode = `import { 
  BarChart, 
  Bar, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  CartesianGrid,
  XAxis,
  YAxis,
  type ChartConfig 
} from '@/components/ui/BarChart'

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

export function MultipleBarChart() {
  return (
    <ChartContainer config={config} className="h-[300px]">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="month" stroke="var(--muted-foreground)" />
        <YAxis stroke="var(--muted-foreground)" />
        <ChartTooltip content={ChartTooltipContent} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}`;

const stackedCode = `import { 
  BarChart, 
  Bar, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  CartesianGrid,
  XAxis,
  YAxis,
  Legend,
  type ChartConfig 
} from '@/components/ui/BarChart'
import { Monitor, Smartphone } from 'lucide-react'

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

export function StackedBarChart() {
  return (
    <div className="w-full">
      <ChartContainer config={config} className="h-[300px]">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" stroke="var(--muted-foreground)" />
          <YAxis stroke="var(--muted-foreground)" />
          <ChartTooltip content={ChartTooltipContent} />
          <Bar dataKey="desktop" stackId="a" fill="var(--color-desktop)" radius={[0, 0, 4, 4]} />
          <Bar dataKey="mobile" stackId="a" fill="var(--color-mobile)" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ChartContainer>
      <CustomLegend />
    </div>
  )
}`;

const labelCode = `import { 
  BarChart, 
  Bar, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  CartesianGrid,
  XAxis,
  YAxis,
  LabelList,
  type ChartConfig 
} from '@/components/ui/BarChart'

const data = ${JSON.stringify(basicData, null, 2)}

const config: ChartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
}

export function LabelBarChart() {
  return (
    <ChartContainer config={config} className="h-[300px]">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="month" stroke="var(--muted-foreground)" />
        <YAxis stroke="var(--muted-foreground)" />
        <ChartTooltip content={ChartTooltipContent} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4}>
          <LabelList dataKey="desktop" position="top" className="fill-foreground" fontSize={12} />
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}`;

const customLabelCode = `import { 
  BarChart, 
  Bar, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  CartesianGrid,
  XAxis,
  YAxis,
  LabelList,
  type ChartConfig 
} from '@/components/ui/BarChart'

const data = ${JSON.stringify(basicData, null, 2)}

const config: ChartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
}

const CustomLabel = (props) => {
  const { x, y, width, value } = props
  return (
    <text 
      x={x + width / 2} 
      y={y - 5} 
      fill="var(--chart-1)" 
      textAnchor="middle" 
      fontSize={12}
      fontWeight="bold"
    >
      {value}k
    </text>
  )
}

export function CustomLabelBarChart() {
  return (
    <ChartContainer config={config} className="h-[300px]">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="month" stroke="var(--muted-foreground)" />
        <YAxis stroke="var(--muted-foreground)" />
        <ChartTooltip content={ChartTooltipContent} />
        <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4}>
          <LabelList content={CustomLabel} />
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}`;

const mixedCode = `import { 
  BarChart, 
  Bar, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  CartesianGrid,
  XAxis,
  YAxis,
  type ChartConfig 
} from '@/components/ui/BarChart'

const data = ${JSON.stringify(mixedData, null, 2)}

const config: ChartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
  tablet: {
    label: "Tablet",
    color: "var(--chart-3)",
  },
}

export function MixedBarChart() {
  return (
    <ChartContainer config={config} className="h-[300px]">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="month" stroke="var(--muted-foreground)" />
        <YAxis stroke="var(--muted-foreground)" />
        <ChartTooltip content={ChartTooltipContent} />
        <Bar dataKey="desktop" stackId="stack" fill="var(--color-desktop)" radius={[0, 0, 4, 4]} />
        <Bar dataKey="mobile" stackId="stack" fill="var(--color-mobile)" radius={[0, 0, 0, 0]} />
        <Bar dataKey="tablet" fill="var(--color-tablet)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}`;

const activeCode = `import { 
  BarChart, 
  Bar, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  CartesianGrid,
  XAxis,
  YAxis,
  Cell,
  type ChartConfig 
} from '@/components/ui/BarChart'

const data = ${JSON.stringify(activeData, null, 2)}

const config: ChartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
}

export function ActiveBarChart() {
  return (
    <ChartContainer config={config} className="h-[300px]">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="month" stroke="var(--muted-foreground)" />
        <YAxis stroke="var(--muted-foreground)" />
        <ChartTooltip content={ChartTooltipContent} />
        <Bar dataKey="desktop" radius={4}>
          {data.map((entry, index) => (
            <Cell 
              key={\`cell-\${index}\`} 
              fill={entry.active ? "var(--color-desktop)" : "var(--muted)"} 
            />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}`;

const negativeCode = `import { 
  BarChart, 
  Bar, 
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  CartesianGrid,
  XAxis,
  YAxis,
  type ChartConfig 
} from '@/components/ui/BarChart'

const data = ${JSON.stringify(negativeData, null, 2)}

const config: ChartConfig = {
  profit: {
    label: "Profit",
    color: "var(--chart-1)",
  },
  loss: {
    label: "Loss",
    color: "var(--chart-2)",
  },
}

export function NegativeBarChart() {
  return (
    <ChartContainer config={config} className="h-[300px]">
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
        <XAxis dataKey="month" stroke="var(--muted-foreground)" />
        <YAxis stroke="var(--muted-foreground)" />
        <ChartTooltip content={ChartTooltipContent} />
        <Bar dataKey="profit" fill="var(--color-profit)" radius={4} />
        <Bar dataKey="loss" fill="var(--color-loss)" radius={4} />
      </BarChart>
    </ChartContainer>
  )
}`;

const basicConfig: ChartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
};

const multipleConfig: ChartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
};

const mixedConfig: ChartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
  tablet: {
    label: "Tablet",
    color: "var(--chart-3)",
  },
};

const negativeConfig: ChartConfig = {
  profit: {
    label: "Profit",
    color: "var(--chart-1)",
  },
  loss: {
    label: "Loss",
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

const CustomLabel = (props: any) => {
  const { x, y, width, height, value } = props;
  return (
    <text
      x={x + width / 2}
      y={y + height / 2}
      fill="white"
      textAnchor="middle"
      dominantBaseline="middle"
      fontSize={12}
      fontWeight="bold"
    >
      {value}
    </text>
  );
};

export function BasicExample() {
  return (
    <SnippetPreview code={basicCode} title="Basic Bar Chart">
      <ChartContainer config={basicConfig} className="h-[300px]">
        <BarChart data={basicData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" stroke="var(--muted-foreground)" />
          <YAxis stroke="var(--muted-foreground)" />
          <ChartTooltip content={ChartTooltipContent} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
        </BarChart>
      </ChartContainer>
    </SnippetPreview>
  );
}

export function NegativeExample() {
  return (
    <SnippetPreview code={negativeCode} title="Negative Bar Chart">
      <ChartContainer config={negativeConfig} className="h-[300px]">
        <BarChart data={negativeData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" stroke="var(--muted-foreground)" />
          <YAxis stroke="var(--muted-foreground)" />
          <ChartTooltip content={ChartTooltipContent} />
          <Bar dataKey="profit" fill="var(--color-profit)" radius={4} />
          <Bar dataKey="loss" fill="var(--color-loss)" radius={4} />
        </BarChart>
      </ChartContainer>
    </SnippetPreview>
  );
}

export function HorizontalExample() {
  return (
    <SnippetPreview code={horizontalCode} title="Horizontal Bar Chart">
      <ChartContainer config={basicConfig} className="h-[300px]">
        <BarChart data={basicData} layout="vertical">
          <XAxis type="number" stroke="var(--muted-foreground)" />
          <YAxis
            dataKey="month"
            type="category"
            stroke="var(--muted-foreground)"
          />
          <ChartTooltip content={ChartTooltipContent} />
          <Bar
            dataKey="desktop"
            fill="var(--color-desktop)"
            radius={[0, 4, 4, 0]}
          />
        </BarChart>
      </ChartContainer>
    </SnippetPreview>
  );
}

export function MultipleExample() {
  return (
    <SnippetPreview code={multipleCode} title="Multiple Bar Chart">
      <ChartContainer config={multipleConfig} className="h-[300px]">
        <BarChart data={multipleData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" stroke="var(--muted-foreground)" />
          <YAxis stroke="var(--muted-foreground)" />
          <ChartTooltip content={ChartTooltipContent} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} />
          <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} />
        </BarChart>
      </ChartContainer>
    </SnippetPreview>
  );
}

export function StackedExample() {
  return (
    <SnippetPreview code={stackedCode} title="Stacked Bar Chart with Legend">
      <div className="w-full">
        <ChartContainer config={multipleConfig} className="h-[300px]">
          <BarChart data={multipleData}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis dataKey="month" stroke="var(--muted-foreground)" />
            <YAxis stroke="var(--muted-foreground)" />
            <ChartTooltip content={ChartTooltipContent} />
            <Bar
              dataKey="desktop"
              stackId="a"
              fill="var(--color-desktop)"
              radius={[0, 0, 4, 4]}
            />
            <Bar
              dataKey="mobile"
              stackId="a"
              fill="var(--color-mobile)"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ChartContainer>
        <CustomLegend />
      </div>
    </SnippetPreview>
  );
}

export function LabelExample() {
  return (
    <SnippetPreview code={labelCode} title="Bar Chart with Labels">
      <ChartContainer config={basicConfig} className="h-[300px]">
        <BarChart data={basicData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" stroke="var(--muted-foreground)" />
          <YAxis stroke="var(--muted-foreground)" />
          <ChartTooltip content={ChartTooltipContent} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4}>
            <LabelList
              dataKey="desktop"
              position="top"
              className="fill-foreground"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </SnippetPreview>
  );
}

export function CustomLabelExample() {
  return (
    <SnippetPreview code={customLabelCode} title="Bar Chart with Custom Labels">
      <ChartContainer config={basicConfig} className="h-[300px]">
        <BarChart data={basicData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" stroke="var(--muted-foreground)" />
          <YAxis stroke="var(--muted-foreground)" />
          <ChartTooltip content={ChartTooltipContent} />
          <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4}>
            <LabelList
              dataKey="desktop"
              position="inside"
              content={CustomLabel}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </SnippetPreview>
  );
}

export function MixedExample() {
  return (
    <SnippetPreview code={mixedCode} title="Mixed Bar Chart">
      <ChartContainer config={mixedConfig} className="h-[300px]">
        <BarChart data={mixedData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" stroke="var(--muted-foreground)" />
          <YAxis stroke="var(--muted-foreground)" />
          <ChartTooltip content={ChartTooltipContent} />
          <Bar
            dataKey="desktop"
            stackId="stack"
            fill="var(--color-desktop)"
            radius={[0, 0, 4, 4]}
          />
          <Bar
            dataKey="mobile"
            stackId="stack"
            fill="var(--color-mobile)"
            radius={[0, 0, 0, 0]}
          />
          <Bar dataKey="tablet" fill="var(--color-tablet)" radius={4} />
        </BarChart>
      </ChartContainer>
    </SnippetPreview>
  );
}

export function ActiveExample() {
  return (
    <SnippetPreview code={activeCode} title="Active Bar Chart">
      <ChartContainer config={basicConfig} className="h-[300px]">
        <BarChart data={activeData}>
          <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
          <XAxis dataKey="month" stroke="var(--muted-foreground)" />
          <YAxis stroke="var(--muted-foreground)" />
          <ChartTooltip content={ChartTooltipContent} />
          <Bar
            dataKey="desktop"
            radius={4}
            stroke="var(--chart-1)"
            strokeWidth={2}
            strokeDasharray="5,5"
          >
            {activeData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={
                  entry.active ? "var(--color-desktop)" : "var(--secondary)"
                }
                stroke={entry.active ? "var(--chart-2)" : "transparent"}
                strokeDasharray={entry.active ? "5,5" : "0"}
              />
            ))}
          </Bar>
        </BarChart>
      </ChartContainer>
    </SnippetPreview>
  );
}
