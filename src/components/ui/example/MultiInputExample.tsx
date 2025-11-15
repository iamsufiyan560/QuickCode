"use client";

import React, { useState } from "react";
import { MultiInput } from "@/components/ui/MultiInput";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";
import { Label } from "@/components/ui/Label";

export const DefaultMultiInputExample = () => {
  const [tags, setTags] = useState<string[]>(["react", "typescript", "nextjs"]);

  const defaultMultiInputCode = `
import { MultiInput } from "@/components/ui/MultiInput";
import { Label } from "@/components/ui/Label";
import { useState } from "react";

export const DefaultMultiInputExample = () => {
  const [tags, setTags] = useState<string[]>(["react", "typescript", "nextjs"]);

  return (
    <div className="grid w-full max-w-sm items-center gap-3">
      <Label htmlFor="tags">Tags</Label>
      <MultiInput
        id="tags"
        value={tags}
        onChange={setTags}
        placeholder="Add tags..."
        max={10}
      />
      <p className="text-xs text-muted-foreground">
           Press Enter or comma to add. Backspace to remove last.
          <br />
          Duplicate Values are not allowed

      </p>
    </div>
  );
};
`;

  return (
    <SnippetPreview title="Multi Input" code={defaultMultiInputCode}>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="tags">Tags</Label>
        <MultiInput
          id="tags"
          value={tags}
          onChange={setTags}
          placeholder="Add tags..."
          max={10}
        />
        <p className="text-xs text-muted-foreground">
          Press Enter or comma to add. Backspace to remove last.
          <br />
          Duplicate Values are not allowed
        </p>
      </div>
    </SnippetPreview>
  );
};
