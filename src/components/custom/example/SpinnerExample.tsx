import React from "react";
import { Spinner } from "@/components/custom/Spinner";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

const defaultCode = `import { Spinner } from '@/components/ui/Spinner';

export default function SpinnerDemo() {
  return (
    <div className="flex items-center gap-6">
      <Spinner size="sm" />
      <Spinner size="md" />
      <Spinner size="lg" />
      <Spinner size="xl" />
    </div>
  );
}`;

export function DefaultExample() {
  return (
    <SnippetPreview title="Default Example" code={defaultCode}>
      <div className="flex items-center gap-6">
        <Spinner size="sm" />
        <Spinner size="md" />
        <Spinner size="lg" />
        <Spinner size="xl" />
      </div>
    </SnippetPreview>
  );
}
