"use client";
import Heatmap from "../Chart/Heatmap";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

const basicCode = `import Heatmap from '@/components/ui/Heatmap'

const data = [
 [ 5, 12, 18, 22, 30, 35, 40, 48 ],
  [ 2,  8, 15, 20, 28, 33, 38, 45 ],
  [10, 14, 19, 25, 32, 37, 42, 50 ],
  [ 3,  7, 11, 18, 26, 31, 36, 43 ],
  [ 6, 13, 17, 23, 29, 34, 39, 47 ],
  [ 1,  4,  9, 16, 21, 27, 30, 41 ],
  [ 8, 15, 20, 24, 33, 38, 44, 52 ]
]

export default function Example() {
  return <Heatmap data={data} />
}`;

export function BasicExample() {
  const data = [
    [5, 12, 18, 22, 30, 35, 40, 48],
    [2, 8, 15, 20, 28, 33, 38, 45],
    [10, 14, 19, 25, 32, 37, 42, 50],
    [3, 7, 11, 18, 26, 31, 36, 43],
    [6, 13, 17, 23, 29, 34, 39, 47],
    [1, 4, 9, 16, 21, 27, 30, 41],
    [8, 15, 20, 24, 33, 38, 44, 52],
  ];

  return (
    <SnippetPreview className="p-4" title="Default Heatmap" code={basicCode}>
      <Heatmap data={data} />
    </SnippetPreview>
  );
}

const githubCode = `import Heatmap from '@/components/ui/Heatmap'

const rows = 7
const cols = 30

const data = Array.from({ length: rows }, () =>
  Array.from({ length: cols }, () => Math.floor(Math.random() * 30))
)

export default function Example() {
  return (
    <Heatmap

      data={data}
      colorFn={(value, row, col, min, max) => {
        const t = (value - min) / (max - min)
        const levels = [
          'bg-green-200',
          'bg-green-300',
          'bg-green-400',
          'bg-green-500',
          'bg-green-600',
        ]
        return levels[Math.floor(t * (levels.length - 1))]
      }}
    />
  )
}`;

export function GithubLikeExample() {
  const rows = 7;
  const cols = 30;
  const data = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => Math.floor(Math.random() * 30))
  );

  return (
    <SnippetPreview
      className="p-4"
      title="GitHub-Style Value Heatmap"
      code={githubCode}
    >
      <Heatmap
        data={data}
        colorFn={(value, row, col, min, max) => {
          const t = (value - min) / (max - min);
          const levels = [
            "bg-green-200",
            "bg-green-300",
            "bg-green-400",
            "bg-green-500",
            "bg-green-600",
          ];
          return levels[Math.floor(t * (levels.length - 1))];
        }}
      />
    </SnippetPreview>
  );
}

const customCode = `import Heatmap from '@/components/ui/Heatmap'

const data = [
  [ 5, 12, 18, 22, 30, 35, 40, 48 ],
  [ 2,  8, 15, 20, 28, 33, 38, 45 ],
  [10, 14, 19, 25, 32, 37, 42, 50 ],
  [ 3,  7, 11, 18, 26, 31, 36, 43 ],
  [ 6, 13, 17, 23, 29, 34, 39, 47 ],
  [ 1,  4,  9, 16, 21, 27, 30, 41 ],
  [ 8, 15, 20, 24, 33, 38, 44, 52 ]
]

export default function Example() {
  return (
    <Heatmap
        showTooltip
        data={data}
        tooltipContent={(value, row, col) => (
          <div className=" text-sm">
            <div className="font-medium mb-1">Cell Details</div>
            <div>
              Row: <b>{row}</b>
            </div>
            <div>
              Col: <b>{col}</b>
            </div>
            <div>
              Value: <b>{value}</b>
            </div>
          </div>
        )}
        colorFn={(value, row, col, min, max) => {
          const t = (value - min) / (max - min);
          const shades = [
            "bg-blue-200",
            "bg-blue-300",
            "bg-blue-400",
            "bg-blue-500",
            "bg-blue-600",
            "bg-blue-700",
          ];
          return shades[Math.floor(t * (shades.length - 1))];
        }}
      />
  )
}`;

export function RowColumnCustomExample() {
  const data = [
    [5, 12, 18, 22, 30, 35, 40, 48],
    [2, 8, 15, 20, 28, 33, 38, 45],
    [10, 14, 19, 25, 32, 37, 42, 50],
    [3, 7, 11, 18, 26, 31, 36, 43],
    [6, 13, 17, 23, 29, 34, 39, 47],
    [1, 4, 9, 16, 21, 27, 30, 41],
    [8, 15, 20, 24, 33, 38, 44, 52],
  ];

  return (
    <SnippetPreview
      className="p-4"
      title="Row + Column Shaded Coloring"
      code={customCode}
    >
      <Heatmap
        showTooltip
        data={data}
        tooltipContent={(value, row, col) => (
          <div className=" text-sm">
            <div className="font-medium mb-1">Cell Details</div>
            <div>
              Row: <b>{row}</b>
            </div>
            <div>
              Col: <b>{col}</b>
            </div>
            <div>
              Value: <b>{value}</b>
            </div>
          </div>
        )}
        colorFn={(value, row, col, min, max) => {
          const t = (value - min) / (max - min);
          const shades = [
            "bg-blue-200",
            "bg-blue-300",
            "bg-blue-400",
            "bg-blue-500",
            "bg-blue-600",
            "bg-blue-700",
          ];
          return shades[Math.floor(t * (shades.length - 1))];
        }}
      />
    </SnippetPreview>
  );
}
