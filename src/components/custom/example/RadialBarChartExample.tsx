"use client";

import {
  ChartContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ChartTooltip,
  Legend,
} from "@/components/custom/Chart/RadialBarChart";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

const projectData = [
  { category: "Completed", value: 85, fill: "var(--color-completed)" },
  { category: "In Progress", value: 65, fill: "var(--color-progress)" },
  { category: "Pending", value: 45, fill: "var(--color-pending)" },
  { category: "On Hold", value: 25, fill: "var(--color-hold)" },
];

const chartConfig = {
  completed: {
    label: "Completed",
    color: "var(--chart-1)",
  },
  progress: {
    label: "In Progress",
    color: "var(--chart-2)",
  },
  pending: {
    label: "Pending",
    color: "var(--chart-3)",
  },
  hold: {
    label: "On Hold",
    color: "var(--chart-4)",
  },
};

const defaultCodeString = `import {
  ChartContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ChartTooltip,
  Legend,
} from "@/components/ui/RadialBarChart";

const projectData = [
  { category: "Completed", value: 85, fill: "var(--color-completed)" },
  { category: "In Progress", value: 65, fill: "var(--color-progress)" },
  { category: "Pending", value: 45, fill: "var(--color-pending)" },
  { category: "On Hold", value: 25, fill: "var(--color-hold)" },
];

const chartConfig = {
  completed: {
    label: "Completed",
    color: "var(--chart-1)",
  },
  progress: {
    label: "In Progress",
    color: "var(--chart-2)",
  },
  pending: {
    label: "Pending",
    color: "var(--chart-3)",
  },
  hold: {
    label: "On Hold",
    color: "var(--chart-4)",
  },
};

export default function RadialBarChartExample() {
  return (
    <div className="w-full space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Project Status Overview</h3>
        <p className="text-sm text-muted-foreground">
          Current distribution of project tasks
        </p>
      </div>
       <ChartContainer
          config={chartConfig}
          className="h-[400px] flex flex-col justify-between"
        >
          <RadialBarChart
            data={projectData}
            innerRadius="10%"
            outerRadius="90%"
          >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar dataKey="value" cornerRadius={5} />

            <ChartTooltip />
            <Legend
              iconType="circle"
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              formatter={(value: any, entry: any) => entry.payload.category}
            />
          </RadialBarChart>
        </ChartContainer>
    </div>
  );
}`;

export function DefaultExample() {
  return (
    <SnippetPreview code={defaultCodeString} title="Default">
      <div className="w-full  space-y-4 ">
        <div>
          <h3 className="text-lg font-semibold">Project Status Overview</h3>
          <p className="text-sm text-muted-foreground">
            Current distribution of project tasks
          </p>
        </div>
        <ChartContainer
          config={chartConfig}
          className="h-[400px] flex flex-col justify-between"
        >
          <RadialBarChart
            data={projectData}
            innerRadius="10%"
            outerRadius="90%"
          >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar dataKey="value" cornerRadius={5} />

            <ChartTooltip />
            <Legend
              iconType="square"
              layout="horizontal"
              verticalAlign="bottom"
              align="center"
              formatter={(value: any, entry: any) => entry.payload.category}
            />
          </RadialBarChart>
        </ChartContainer>
      </div>
    </SnippetPreview>
  );
}

const performanceData = [
  { metric: "Sales", score: 92, fill: "var(--color-sales)" },
  { metric: "Support", score: 78, fill: "var(--color-support)" },
  { metric: "Marketing", score: 85, fill: "var(--color-marketing)" },
];

const performanceConfig = {
  sales: {
    label: "Sales",
    color: "var(--chart-1)",
  },
  support: {
    label: "Support",
    color: "var(--chart-2)",
  },
  marketing: {
    label: "Marketing",
    color: "var(--chart-3)",
  },
};

const performanceCodeString = `import {
  ChartContainer,
  RadialBarChart,
  RadialBar,
  PolarAngleAxis,
  ChartTooltip,
} from "@/components/ui/RadialBarChart";

const performanceData = [
  { metric: "Sales", score: 92, fill: "var(--color-sales)" },
  { metric: "Support", score: 78, fill: "var(--color-support)" },
  { metric: "Marketing", score: 85, fill: "var(--color-marketing)" },
];

const performanceConfig = {
  sales: {
    label: "Sales",
    color: "var(--chart-1)",
  },
  support: {
    label: "Support",
    color: "var(--chart-2)",
  },
  marketing: {
    label: "Marketing",
    color: "var(--chart-3)",
  },
};

export default function PerformanceRadialBarChart() {
  return (
    <div className="w-full space-y-4">
      <div>
        <h3 className="text-lg font-semibold">Department Performance</h3>
        <p className="text-sm text-muted-foreground">
          Quarterly performance scores by department
        </p>
      </div>
      <ChartContainer config={performanceConfig} className="h-[350px]">
        <RadialBarChart
          data={performanceData}
          innerRadius="30%"
          outerRadius="90%"
          startAngle={90}
          endAngle={-270}
        >
          <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
          <RadialBar
            dataKey="score"
            cornerRadius={10}
            label={{ position: "insideStart", fill: "#fff", fontSize: 14 }}
          />
          <ChartTooltip />
        </RadialBarChart>
      </ChartContainer>
    </div>
  );
}`;

export function PerformanceExample() {
  return (
    <SnippetPreview code={performanceCodeString} title="Performance Metrics">
      <div className="w-full space-y-4">
        <div>
          <h3 className="text-lg font-semibold">Department Performance</h3>
          <p className="text-sm text-muted-foreground">
            Quarterly performance scores by department
          </p>
        </div>
        <ChartContainer config={performanceConfig} className="h-[350px]">
          <RadialBarChart
            data={performanceData}
            innerRadius="30%"
            outerRadius="90%"
            startAngle={90}
            endAngle={-270}
          >
            <PolarAngleAxis type="number" domain={[0, 100]} tick={false} />
            <RadialBar
              dataKey="score"
              cornerRadius={10}
              label={{ position: "insideStart", fill: "#fff", fontSize: 14 }}
            />
            <ChartTooltip />
          </RadialBarChart>
        </ChartContainer>
      </div>
    </SnippetPreview>
  );
}
