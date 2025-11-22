import {
  BouncyCard,
  BouncyCardContent,
  BouncyCardHeader,
} from "@/components/animated/BouncyCard";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

export const GridExample = () => {
  const code = `import {
  BouncyCard,
  BouncyCardContent,
  BouncyCardHeader,
} from "@/components/ui/BouncyCard";

export const GridExample = () => {
  return (
    <div className="grid gap-6 md:grid-cols-2">
      <BouncyCard>
        <BouncyCardHeader>Security</BouncyCardHeader>
        <BouncyCardContent className="bg-orange-500">
          Demo Here
        </BouncyCardContent>
      </BouncyCard>

      <BouncyCard>
        <BouncyCardHeader>Projects</BouncyCardHeader>
        <BouncyCardContent className="bg-emerald-500">
          Demo Here
        </BouncyCardContent>
      </BouncyCard>
    </div>
  );
};
`;

  return (
    <SnippetPreview code={code} title="Example 1">
      <div className="flex gap-6 flex-wrap">
        <BouncyCard>
          <BouncyCardHeader>Security</BouncyCardHeader>
          <BouncyCardContent className="bg-orange-500">
            Demo Here
          </BouncyCardContent>
        </BouncyCard>

        <BouncyCard>
          <BouncyCardHeader>Projects</BouncyCardHeader>
          <BouncyCardContent className="bg-emerald-500">
            Demo Here
          </BouncyCardContent>
        </BouncyCard>
      </div>
    </SnippetPreview>
  );
};

export const WithFooterExample = () => {
  const code = `import {
  BouncyCard,
  BouncyCardContent,
  BouncyCardHeader,
} from "@/components/ui/BouncyCard";

export const WithFooterExample = () => {
  return (
    <BouncyCard>
      <BouncyCardHeader>Boost Sales</BouncyCardHeader>
      <BouncyCardContent className="bg-pink-500">Preview</BouncyCardContent>
      <BouncyCardFooter>
        <button className="text-sm text-primary">Explore</button>
      </BouncyCardFooter>
    </BouncyCard>
  );
};
`;

  return (
    <SnippetPreview code={code} title="Example 2">
      <BouncyCard>
        <BouncyCardHeader>Boost Sales</BouncyCardHeader>
        <BouncyCardContent className="bg-pink-500">Preview</BouncyCardContent>
      </BouncyCard>
    </SnippetPreview>
  );
};
