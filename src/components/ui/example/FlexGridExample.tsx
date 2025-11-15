import { FlexGrid } from "@/components/ui/FlexGrid";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

const defaultCode = `import { FlexGrid } from '@/components/ui/FlexGrid';

export default function FlexGridDemo() {
  return (
    <FlexGrid gap="4">
      <div className="h-20 w-32 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
        Item 1
      </div>
      <div className="h-20 w-32 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
        Item 2
      </div>
      <div className="h-20 w-32 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
        Item 3
      </div>
      <div className="h-20 w-32 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
        Item 4
      </div>
      <div className="h-20 w-32 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
        Item 5
      </div>
      <div className="h-20 w-32 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
        Item 6
      </div>
    </FlexGrid>
  );
}`;

export function DefaultExample() {
  return (
    <SnippetPreview title="Basic Usage" code={defaultCode}>
      <FlexGrid gap="4">
        <div className="h-20 w-32 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
          Item 1
        </div>
        <div className="h-20 w-32 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
          Item 2
        </div>
        <div className="h-20 w-32 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
          Item 3
        </div>
        <div className="h-20 w-32 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
          Item 4
        </div>
        <div className="h-20 w-32 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
          Item 5
        </div>
        <div className="h-20 w-32 rounded-lg bg-primary text-primary-foreground flex items-center justify-center">
          Item 6
        </div>
      </FlexGrid>
    </SnippetPreview>
  );
}

const alignmentCode = `import { FlexGrid } from '@/components/ui/FlexGrid';

export default function FlexGridAlignmentDemo() {
  return (
    <FlexGrid gap="4" align="center" justify="center">
      <div className="h-16 w-24 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center">
        Small
      </div>
      <div className="h-24 w-24 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center">
        Medium
      </div>
      <div className="h-20 w-24 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center">
        Regular
      </div>
      <div className="h-28 w-24 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center">
        Large
      </div>
    </FlexGrid>
  );
}`;

export function AlignmentExample() {
  return (
    <SnippetPreview title="With Alignment" code={alignmentCode}>
      <FlexGrid gap="4" align="center" justify="center">
        <div className="h-16 w-24 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center">
          Small
        </div>
        <div className="h-24 w-24 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center">
          Medium
        </div>
        <div className="h-20 w-24 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center">
          Regular
        </div>
        <div className="h-28 w-24 rounded-lg bg-secondary text-secondary-foreground flex items-center justify-center">
          Large
        </div>
      </FlexGrid>
    </SnippetPreview>
  );
}

const customGapCode = `import { FlexGrid } from '@/components/ui/FlexGrid';

export default function FlexGridCustomGapDemo() {
  return (
    <FlexGrid rowGap="8" columnGap="2">
      {Array.from({ length: 12 }).map((_, i) => (
        <div
          key={i}
          className="h-16 w-16 rounded-md bg-accent text-accent-foreground flex items-center justify-center text-sm font-medium"
        >
          {i + 1}
        </div>
      ))}
    </FlexGrid>
  );
}`;

export function CustomGapExample() {
  return (
    <SnippetPreview title="Separate Row & Column Gaps" code={customGapCode}>
      <FlexGrid rowGap="8" columnGap="2">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="h-16 w-16 rounded-md bg-accent text-accent-foreground flex items-center justify-center text-sm font-medium"
          >
            {i + 1}
          </div>
        ))}
      </FlexGrid>
    </SnippetPreview>
  );
}
