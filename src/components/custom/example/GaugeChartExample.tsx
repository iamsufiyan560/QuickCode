import { SnippetPreview } from "@/components/helpers/SnippetPreview";
import { GaugeChart } from "@/components/custom/Chart/GaugeChart";

const defaultExampleCode = `import { GaugeChart } from '@/components/ui/GaugeChart';

export default function Example() {
  return (
    <GaugeChart
      value={67}
      min={0}
      max={100}
    />
  );
}`;

export function DefaultExample() {
  return (
    <SnippetPreview code={defaultExampleCode}>
      <div className="flex items-center justify-center p-8">
        <GaugeChart value={67} min={0} max={100} />
      </div>
    </SnippetPreview>
  );
}

const fullCircleExampleCode = `import { GaugeChart } from '@/components/ui/GaugeChart';

export default function Example() {
  return (
    <GaugeChart
      value={7800}
      min={0}
      max={10000}
      startAngle={0}
      endAngle={360}
      segments={[
        { threshold: 0, color: 'var(--chart-1)' },
        { threshold: 40, color: 'var(--chart-2)' },
        { threshold: 70, color: 'var(--chart-3)' },
      ]}
      valueFormatter={(v) => \`$\${v.toLocaleString()}\`}
      size={240}
    />
  );
}`;

export function FullCircleExample() {
  return (
    <SnippetPreview code={fullCircleExampleCode}>
      <div className="flex items-center justify-center p-8">
        <GaugeChart
          value={7800}
          min={0}
          max={10000}
          startAngle={0}
          endAngle={360}
          segments={[
            { threshold: 0, color: "var(--chart-1)" },
            { threshold: 40, color: "var(--chart-2)" },
            { threshold: 70, color: "var(--chart-3)" },
          ]}
          valueFormatter={(v) => `$${v.toLocaleString()}`}
          size={240}
        />
      </div>
    </SnippetPreview>
  );
}

const customSegmentsExampleCode = `import { GaugeChart } from '@/components/ui/GaugeChart';

export default function Example() {
  return (
  <div className="flex flex-col flex-wrap gap-8 items-center justify-center p-8">

      <GaugeChart
        value={45}
        min={0}
        max={100}
        startAngle={-135}
        endAngle={135}
        segments={[
          { threshold: 0, color: 'hsl(0, 84%, 60%)' },
          { threshold: 30, color: 'hsl(39, 100%, 57%)' },
          { threshold: 50, color: 'hsl(48, 96%, 53%)' },
          { threshold: 70, color: 'hsl(142, 76%, 36%)' },
          { threshold: 90, color: 'hsl(142, 76%, 26%)' },
        ]}
        valueFormatter={(v) => \`\${v}%\`}
        size={220}
      />

      <GaugeChart
        value={82}
        min={0}
        max={100}
        startAngle={-90}
        endAngle={90}
        segments={[
          { threshold: 0, color: 'var(--destructive)' },
          { threshold: 25, color: 'var(--chart-2)' },
          { threshold: 50, color: 'var(--chart-4)' },
          { threshold: 75, color: 'var(--chart-3)' },
        ]}
        valueFormatter={(v) => \`\${v} mph\`}
        size={200}
      />

      <GaugeChart
        value={385}
        min={0}
        max={500}
        startAngle={-110}
        endAngle={110}
        segments={[
          { threshold: 0, color: 'var(--chart-5)' },
          { threshold: 60, color: 'var(--chart-3)' },
        ]}
        valueFormatter={(v) => \`\${v}K\`}
        needleColor="var(--primary)"
        size={200}
      />
    </div>
  );
}`;

export function CustomSegmentsExample() {
  return (
    <SnippetPreview code={customSegmentsExampleCode}>
      <div className="flex flex-col flex-wrap gap-8 items-center justify-center p-8">
        <GaugeChart
          value={45}
          min={0}
          max={100}
          startAngle={-135}
          endAngle={135}
          segments={[
            { threshold: 0, color: "hsl(0, 84%, 60%)" },
            { threshold: 30, color: "hsl(39, 100%, 57%)" },
            { threshold: 50, color: "hsl(48, 96%, 53%)" },
            { threshold: 70, color: "hsl(142, 76%, 36%)" },
            { threshold: 90, color: "hsl(142, 76%, 26%)" },
          ]}
          valueFormatter={(v) => `${v}%`}
          size={220}
        />

        <GaugeChart
          value={82}
          min={0}
          max={100}
          startAngle={-90}
          endAngle={90}
          segments={[
            { threshold: 0, color: "var(--destructive)" },
            { threshold: 25, color: "var(--chart-2)" },
            { threshold: 50, color: "var(--chart-4)" },
            { threshold: 75, color: "var(--chart-3)" },
          ]}
          valueFormatter={(v) => `${v} mph`}
          size={200}
        />

        <GaugeChart
          value={385}
          min={0}
          max={500}
          startAngle={-110}
          endAngle={110}
          segments={[
            { threshold: 0, color: "var(--chart-5)" },
            { threshold: 60, color: "var(--chart-3)" },
          ]}
          valueFormatter={(v) => `${v}K`}
          needleColor="var(--primary)"
          size={200}
        />
      </div>
    </SnippetPreview>
  );
}
