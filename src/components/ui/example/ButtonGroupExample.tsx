"use client";

import React from "react";
import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { Button } from "@/components/ui/Button";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";

export const DefaultButtonGroupExample = () => {
  const code = `import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { Button } from "@/components/ui/Button";

export const DefaultButtonGroupExample = () => {
  return (
    <ButtonGroup>
      <Button variant="outline">Save</Button>
      <Button variant="outline">Preview</Button>
      <Button variant="outline">Publish</Button>
    </ButtonGroup>
  );
};`;

  return (
    <SnippetPreview title="Basic Usage" code={code}>
      <ButtonGroup>
        <Button variant="outline">Save</Button>
        <Button variant="outline">Preview</Button>
        <Button variant="outline">Publish</Button>
      </ButtonGroup>
    </SnippetPreview>
  );
};

export const TextAlignmentExample = () => {
  const [alignment, setAlignment] = React.useState("left");

  const code = `import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { Button } from "@/components/ui/Button";
import { AlignLeft, AlignCenter, AlignRight } from "lucide-react";

export const TextAlignmentExample = () => {
  const [alignment, setAlignment] = React.useState("left");

  return (
    <ButtonGroup>
      <Button
        aria-label="Align left"
        variant="outline"
        size="icon"
        onClick={() => setAlignment("left")}
        className={alignment === "left" ? "bg-secondary" : ""}
      >
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button
        aria-label="Align center"
        variant="outline"
        size="icon"
        onClick={() => setAlignment("center")}
        className={alignment === "center" ? "bg-secondary" : ""}
      >
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button
        aria-label="Align right"
        variant="outline"
        size="icon"
        onClick={() => setAlignment("right")}
        className={alignment === "right" ? "bg-secondary" : ""}
      >
        <AlignRight className="h-4 w-4" />
      </Button>
    </ButtonGroup>
  );
};`;

  return (
    <SnippetPreview title="Single Selection" code={code}>
      <ButtonGroup>
        <Button
          aria-label="Align left"
          variant="outline"
          size="icon"
          onClick={() => setAlignment("left")}
          className={alignment === "left" ? "bg-secondary" : ""}
        >
          <AlignLeft className="h-4 w-4" />
        </Button>
        <Button
          aria-label="Align center"
          variant="outline"
          size="icon"
          onClick={() => setAlignment("center")}
          className={alignment === "center" ? "bg-secondary" : ""}
        >
          <AlignCenter className="h-4 w-4" />
        </Button>
        <Button
          aria-label="Align right"
          variant="outline"
          size="icon"
          onClick={() => setAlignment("right")}
          className={alignment === "right" ? "bg-secondary" : ""}
        >
          <AlignRight className="h-4 w-4" />
        </Button>
      </ButtonGroup>
    </SnippetPreview>
  );
};

export const VerticalButtonGroupExample = () => {
  const code = `import { ButtonGroup } from "@/components/ui/ButtonGroup";
import { Button } from "@/components/ui/Button";

export const VerticalButtonGroupExample = () => {
  return (
    <ButtonGroup orientation="vertical">
      <Button variant="outline">Top</Button>
      <Button variant="outline">Middle</Button>
      <Button variant="outline">Bottom</Button>
    </ButtonGroup>
  );
};`;

  return (
    <SnippetPreview title="Vertical" code={code}>
      <ButtonGroup orientation="vertical">
        <Button variant="outline">Top</Button>
        <Button variant="outline">Middle</Button>
        <Button variant="outline">Bottom</Button>
      </ButtonGroup>
    </SnippetPreview>
  );
};
