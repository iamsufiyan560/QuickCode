import { CandlestickChart } from "@/components/ui/Chart/CandlestickChart";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

const stockData = [
  {
    date: "Jan 1",
    open: 150,
    high: 155,
    low: 148,
    close: 153,
    volume: 2500000,
  },
  {
    date: "Jan 2",
    open: 153,
    high: 158,
    low: 152,
    close: 156,
    volume: 2800000,
  },
  {
    date: "Jan 3",
    open: 156,
    high: 160,
    low: 154,
    close: 155,
    volume: 3100000,
  },
  {
    date: "Jan 4",
    open: 155,
    high: 157,
    low: 150,
    close: 151,
    volume: 3500000,
  },
  {
    date: "Jan 5",
    open: 151,
    high: 154,
    low: 149,
    close: 152,
    volume: 2900000,
  },
  {
    date: "Jan 8",
    open: 152,
    high: 159,
    low: 151,
    close: 158,
    volume: 3300000,
  },
  {
    date: "Jan 9",
    open: 158,
    high: 162,
    low: 157,
    close: 161,
    volume: 3700000,
  },
  {
    date: "Jan 10",
    open: 161,
    high: 165,
    low: 160,
    close: 163,
    volume: 4100000,
  },
  {
    date: "Jan 11",
    open: 163,
    high: 164,
    low: 159,
    close: 160,
    volume: 3400000,
  },
  {
    date: "Jan 12",
    open: 160,
    high: 162,
    low: 156,
    close: 157,
    volume: 3200000,
  },
];

const cryptoData = [
  { date: "Mon", open: 42000, high: 43500, low: 41500, close: 43000 },
  { date: "Tue", open: 43000, high: 44000, low: 42500, close: 42800 },
  { date: "Wed", open: 42800, high: 43200, low: 41800, close: 42000 },
  { date: "Thu", open: 42000, high: 43800, low: 41900, close: 43500 },
  { date: "Fri", open: 43500, high: 45000, low: 43200, close: 44800 },
  { date: "Sat", open: 44800, high: 45500, low: 44000, close: 44500 },
  { date: "Sun", open: 44500, high: 45200, low: 43800, close: 45000 },
];

const defaultCode = `import { CandlestickChart } from '@/components/ui/CandlestickChart';

const stockData = [
  { date: 'Jan 1', open: 150, high: 155, low: 148, close: 153, volume: 2500000 },
  { date: 'Jan 2', open: 153, high: 158, low: 152, close: 156, volume: 2800000 },
  { date: 'Jan 3', open: 156, high: 160, low: 154, close: 155, volume: 3100000 },
  { date: 'Jan 4', open: 155, high: 157, low: 150, close: 151, volume: 3500000 },
  { date: 'Jan 5', open: 151, high: 154, low: 149, close: 152, volume: 2900000 },
  { date: 'Jan 8', open: 152, high: 159, low: 151, close: 158, volume: 3300000 },
  { date: 'Jan 9', open: 158, high: 162, low: 157, close: 161, volume: 3700000 },
  { date: 'Jan 10', open: 161, high: 165, low: 160, close: 163, volume: 4100000 },
  { date: 'Jan 11', open: 163, high: 164, low: 159, close: 160, volume: 3400000 },
  { date: 'Jan 12', open: 160, high: 162, low: 156, close: 157, volume: 3200000 },
];

export default function DefaultExample() {
  return (
    <div className="w-full h-[400px]">
      <CandlestickChart data={stockData} />
    </div>
  );
}`;

const customStyleCode = `import { CandlestickChart } from '@/components/ui/CandlestickChart';

const cryptoData = [
  { date: 'Mon', open: 42000, high: 43500, low: 41500, close: 43000 },
  { date: 'Tue', open: 43000, high: 44000, low: 42500, close: 42800 },
  { date: 'Wed', open: 42800, high: 43200, low: 41800, close: 42000 },
  { date: 'Thu', open: 42000, high: 43800, low: 41900, close: 43500 },
  { date: 'Fri', open: 43500, high: 45000, low: 43200, close: 44800 },
  { date: 'Sat', open: 44800, high: 45500, low: 44000, close: 44500 },
  { date: 'Sun', open: 44500, high: 45200, low: 43800, close: 45000 },
];

export default function CustomStyleExample() {
  return (
    <div className="w-full h-[400px]">
      <CandlestickChart
        data={cryptoData}
        config={{
          bullish: {
            label: 'Bullish',
            color: 'hsl(142, 76%, 36%)',
          },
          bearish: {
            label: 'Bearish',
            color: 'hsl(346, 87%, 43%)',
          },
        }}
        candleWidth={12}
        wickWidth={2}
        showGrid={false}
      />
    </div>
  );
}`;

export function DefaultExample() {
  return (
    <SnippetPreview title="DefaultExample" code={defaultCode}>
      <div className="w-full   h-[400px] ">
        <CandlestickChart data={stockData} />
      </div>
    </SnippetPreview>
  );
}

export function CustomStyleExample() {
  return (
    <SnippetPreview title="CustomStyleExample" code={customStyleCode}>
      <div className="w-full  h-[400px]">
        <CandlestickChart
          data={cryptoData}
          config={{
            bullish: {
              label: "Bullish",
              color: "hsl(142, 76%, 36%)",
            },
            bearish: {
              label: "Bearish",
              color: "hsl(346, 87%, 43%)",
            },
          }}
          candleWidth={12}
          wickWidth={2}
        />
      </div>
    </SnippetPreview>
  );
}
