"use client";

import React from "react";
import { Button } from "@/components/custom/Button";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

export const DefaultButtonExample = () => {
  const defaultButtonCode = `
import { Button } from "@/components/ui/Button";

export const DefaultButtonExample = () => {
  return <Button>Default Button</Button>;
};
`;

  return (
    <SnippetPreview title="Default Button" code={defaultButtonCode}>
      <Button>Default Button</Button>
    </SnippetPreview>
  );
};

export const VariantExamples = () => {
  const outlineButtonCode = `
import { Button } from "@/components/ui/Button";

export const OutlineButtonExample = () => {
  return <Button variant="outline">Outline</Button>;
};
`;

  const secondaryButtonCode = `
import { Button } from "@/components/ui/Button";

export const SecondaryButtonExample = () => {
  return <Button variant="secondary">Secondary</Button>;
};
`;

  const ghostButtonCode = `
import { Button } from "@/components/ui/Button";

export const GhostButtonExample = () => {
  return <Button variant="ghost">Ghost</Button>;
};
`;

  const destructiveButtonCode = `
import { Button } from "@/components/ui/Button";

export const DestructiveButtonExample = () => {
  return <Button variant="destructive">Destructive</Button>;
};
`;

  const linkButtonCode = `
import { Button } from "@/components/ui/Button";

export const LinkButtonExample = () => {
  return <Button variant="link">Link</Button>;
};
`;

  return (
    <div className="flex flex-col gap-2">
      <SnippetPreview title="Outline Variant" code={outlineButtonCode}>
        <Button variant="outline">Outline</Button>
      </SnippetPreview>
      <SnippetPreview title="Secondary Variant" code={secondaryButtonCode}>
        <Button variant="secondary">Secondary</Button>
      </SnippetPreview>
      <SnippetPreview title="Ghost Variant" code={ghostButtonCode}>
        <Button variant="ghost">Ghost</Button>
      </SnippetPreview>
      <SnippetPreview title="Destructive Variant" code={destructiveButtonCode}>
        <Button variant="destructive">Destructive</Button>
      </SnippetPreview>
      <SnippetPreview title="Link Variant" code={linkButtonCode}>
        <Button variant="link">Link</Button>
      </SnippetPreview>
    </div>
  );
};

export const SizeLoadingExamples = () => {
  const smallButtonCode = `
import { Button } from "@/components/ui/Button";

export const SmallButtonExample = () => {
  return <Button size="sm">Small</Button>;
};
`;

  const largeButtonCode = `
import { Button } from "@/components/ui/Button";

export const LargeButtonExample = () => {
  return <Button size="lg">Large</Button>;
};
`;

  const loadingButtonCode = `
import { Button } from "@/components/ui/Button";

export const LoadingButtonExample = () => {
  return <Button isLoading>Loading...</Button>;
};
`;

  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-2">
        <SnippetPreview title="Small Size" code={smallButtonCode}>
          <Button size="sm">Small</Button>
        </SnippetPreview>
        <SnippetPreview title="Large Size" code={largeButtonCode}>
          <Button size="lg">Large</Button>
        </SnippetPreview>
      </div>
      <SnippetPreview title="Loading State" code={loadingButtonCode}>
        <Button isLoading>Loading...</Button>
      </SnippetPreview>
    </div>
  );
};
