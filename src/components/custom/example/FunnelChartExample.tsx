"use client";
import {
  FunnelChart,
  Funnel,
  LabelList,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/custom/Chart/FunnelChart";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

const chartData = [
  { stage: "Website Visits", value: 10000, fill: "var(--chart-1)" },
  { stage: "Product Views", value: 6500, fill: "var(--chart-2)" },
  { stage: "Add to Cart", value: 3200, fill: "var(--chart-3)" },
  { stage: "Checkout", value: 1500, fill: "var(--chart-4)" },
  { stage: "Purchase", value: 850, fill: "var(--chart-5)" },
];

const chartDataJSON = JSON.stringify(chartData, null, 2);

const basicCode = `import { 
  FunnelChart, 
  Funnel,
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  type ChartConfig 
} from '@/components/ui/FunnelChart'

const data = ${chartDataJSON}

const config: ChartConfig = {
  value: {
    label: "Visitors",
    color: "var(--chart-1)",
  },
}

export function BasicFunnelChart() {
  return (
    <ChartContainer config={config} className="h-[400px]">
      <FunnelChart>
        <ChartTooltip content={ChartTooltipContent} />
        <Funnel dataKey="value" data={data} />
      </FunnelChart>
    </ChartContainer>
  )
}`;

const labelCode = `import { 
  FunnelChart, 
  Funnel,
  LabelList,
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  type ChartConfig 
} from '@/components/ui/FunnelChart'

const data = ${chartDataJSON}

const config: ChartConfig = {
  value: {
    label: "Visitors",
    color: "var(--chart-1)",
  },
}

export function LabelFunnelChart() {
  return (
    <ChartContainer config={config} className="h-[400px]">
      <FunnelChart>
        <ChartTooltip content={ChartTooltipContent} />
        <Funnel dataKey="value" data={data}>
          <LabelList
            position="inside"
            fill="white"
            stroke="none"
            dataKey="stage"
            style={{ fontSize: '14px', fontWeight: 500 }}
          />
        </Funnel>
      </FunnelChart>
    </ChartContainer>
  )
}`;

const customCode = `import { 
  FunnelChart, 
  Funnel,
  LabelList,
  ChartContainer, 
  ChartTooltip, 
  ChartTooltipContent,
  type ChartConfig 
} from '@/components/ui/FunnelChart'

const data = ${chartDataJSON}

const config: ChartConfig = {
  value: {
    label: "Visitors",
    color: "var(--chart-1)",
  },
}

const CustomLabel = (props: any) => {
  const { x, y, width, height, value, stage } = props
  return (
    <g>
      <text
        x={x + width / 2}
        y={y + height / 2 - 8}
        fill="white"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ fontSize: '14px', fontWeight: 600 }}
      >
        {stage}
      </text>
      <text
        x={x + width / 2}
        y={y + height / 2 + 10}
        fill="white"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ fontSize: '12px' }}
      >
        {value.toLocaleString()}
      </text>
    </g>
  )
}

export function CustomLabelFunnelChart() {
  return (
    <ChartContainer config={config} className="h-[400px]">
      <FunnelChart>
        <ChartTooltip content={ChartTooltipContent} />
        <Funnel dataKey="value" data={data}>
          <LabelList content={CustomLabel} />
        </Funnel>
      </FunnelChart>
    </ChartContainer>
  )
}`;

const basicConfig: ChartConfig = {
  value: {
    label: "Visitors",
    color: "var(--chart-1)",
  },
};

const CustomLabel = (props: any) => {
  const { x, y, width, height, value, stage } = props;
  return (
    <g>
      <text
        x={x + width / 2}
        y={y + height / 2 - 8}
        fill="white"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ fontSize: "14px", fontWeight: 600 }}
      >
        {stage}
      </text>
      <text
        x={x + width / 2}
        y={y + height / 2 + 10}
        fill="white"
        textAnchor="middle"
        dominantBaseline="middle"
        style={{ fontSize: "12px" }}
      >
        {value.toLocaleString()}
      </text>
    </g>
  );
};

export function BasicExample() {
  return (
    <SnippetPreview code={basicCode} title="Basic Funnel Chart">
      <ChartContainer config={basicConfig} className="h-[400px]">
        <FunnelChart>
          <ChartTooltip content={ChartTooltipContent} />
          <Funnel dataKey="value" data={chartData} />
        </FunnelChart>
      </ChartContainer>
    </SnippetPreview>
  );
}

export function LabelExample() {
  return (
    <SnippetPreview code={labelCode} title="Funnel Chart with Labels">
      <ChartContainer config={basicConfig} className="h-[400px]">
        <FunnelChart>
          <ChartTooltip content={ChartTooltipContent} />
          <Funnel dataKey="value" data={chartData}>
            <LabelList
              position="inside"
              fill="white"
              stroke="none"
              dataKey="stage"
              style={{ fontSize: "14px", fontWeight: 500 }}
            />
          </Funnel>
        </FunnelChart>
      </ChartContainer>
    </SnippetPreview>
  );
}

export function CustomLabelExample() {
  return (
    <SnippetPreview code={customCode} title="Funnel Chart with Custom Labels">
      <ChartContainer config={basicConfig} className="h-[400px]">
        <FunnelChart>
          <ChartTooltip content={ChartTooltipContent} />
          <Funnel dataKey="value" data={chartData}>
            <LabelList content={CustomLabel} />
          </Funnel>
        </FunnelChart>
      </ChartContainer>
    </SnippetPreview>
  );
}
