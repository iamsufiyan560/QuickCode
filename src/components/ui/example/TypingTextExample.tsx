import TypingText from "@/components/animated/TypingText";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

const code = `import TypingText from '@/components/ui/TypingText';

export default function Example() {
  return (
    <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-border bg-background p-8">
      <TypingText
        content={[
          'Building beautiful interfaces.',
          'Creating seamless experiences.',
          'Designing for everyone.'
        ]}
        as="h1"
        className="text-4xl font-bold text-foreground"
        speed={80}
        pause={1500}
        colors={['#3b82f6', '#8b5cf6', '#ec4899']}
      />
    </div>
  );
}`;

export const DefaultExample = () => {
  return (
    <SnippetPreview code={code}>
      <div className="flex min-h-[200px] items-center justify-center rounded-lg border border-border bg-background p-8">
        <TypingText
          content={[
            "Building beautiful interfaces.",
            "Creating seamless experiences.",
            "Designing for everyone.",
          ]}
          as="h1"
          className="text-4xl font-bold text-foreground"
          speed={80}
          pause={1500}
          colors={["#3b82f6", "#8b5cf6", "#ec4899"]}
        />
      </div>
    </SnippetPreview>
  );
};
