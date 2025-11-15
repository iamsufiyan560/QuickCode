"use client";

import React, { useState } from "react";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";
import { Button } from "@/components/ui/Button";
import Progress from "@/components/ui/Progress";

export const DefaultProgressExample = () => {
  const [value, setValue] = useState(42);

  const code = `
import Progress from "@/components/ui/Progress";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

export const Example = () => {
  const [value, setValue] = useState(42);

  return (
    <div className="w-[80%] flex justify-center flex-col gap-4 items-center">
      <Progress label="Upload progress" value={value} max={100} />

      <div className="mt-4 flex items-center gap-3">
        <Button
          onClick={() => setValue((v) => Math.max(0, v - 5))}
          className="px-3 py-1"
        >
          -
        </Button>
        <Button
          onClick={() => setValue((v) => Math.min(100, v + 5))}
          className="px-3 py-1"
        >
          +
        </Button>
        <Button
          onClick={() => setValue(0)}
          className="px-3 py-1"
          variant="outline"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};
`.trim();

  return (
    <SnippetPreview title="Default Progress" code={code}>
      <div className="w-[80%] flex justify-center flex-col gap-4 items-center">
        <Progress label="Upload progress" value={value} max={100} />

        <div className="mt-4 flex items-center gap-3">
          <Button
            onClick={() => setValue((v) => Math.max(0, v - 5))}
            className="px-3 py-1"
          >
            -
          </Button>
          <Button
            onClick={() => setValue((v) => Math.min(100, v + 5))}
            className="px-3 py-1"
          >
            +
          </Button>
          <Button
            onClick={() => setValue(0)}
            className="px-3 py-1"
            variant="outline"
          >
            Reset
          </Button>
        </div>
      </div>
    </SnippetPreview>
  );
};

export const SizesProgressExample = () => {
  const code = `
import Progress from "@/components/ui/Progress";

export const Example = () => {
  return (
    <div className="w-[80%] flex flex-col gap-6">
      <Progress label="Small" value={65} size="sm" />
      <Progress label="Medium" value={65} size="md" />
      <Progress label="Large" value={65} size="lg" />
    </div>
  );
};
`.trim();

  return (
    <SnippetPreview title="Sizes" code={code}>
      <div className="w-[80%] flex flex-col gap-6">
        <Progress label="Small" value={65} size="sm" />
        <Progress label="Medium" value={65} size="md" />
        <Progress label="Large" value={65} size="lg" />
      </div>
    </SnippetPreview>
  );
};

export const CustomColorProgressExample = () => {
  const code = `
import Progress from "@/components/ui/Progress";

export const Example = () => {
  return (
    <div className="w-[80%] flex flex-col gap-6">
      <Progress 
        label="Success" 
        value={85} 
        barClassName="bg-green-500" 
      />
      <Progress 
        label="Warning" 
        value={50} 
        barClassName="bg-yellow-500" 
      />
      <Progress 
        label="Error" 
        value={25} 
        barClassName="bg-red-500" 
      />
    </div>
  );
};
`.trim();

  return (
    <SnippetPreview title="Custom Colors" code={code}>
      <div className="w-[80%] flex flex-col gap-6">
        <Progress label="Success" value={85} barClassName="bg-green-500" />
        <Progress label="Warning" value={50} barClassName="bg-yellow-500" />
        <Progress label="Error" value={25} barClassName="bg-red-500" />
      </div>
    </SnippetPreview>
  );
};
