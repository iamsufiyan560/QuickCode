"use client";

import React, { useState } from "react";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";
import { Button } from "@/components/custom/Button";
import AnimatedProgress from "@/components/animated/AnimatedProgress";

export const AnimatedProgressExample = () => {
  const [value, setValue] = useState(42);

  const code = `
import AnimatedProgress from "@/components/ui/AnimatedProgress";
import { Button } from "@/components/ui/Button";
import { useState } from "react";

export const Example = () => {
  const [value, setValue] = useState(42);

  return (
      <div className="w-[80%] flex justify-center flex-col gap-4 items-center">

        <AnimatedProgress label="Upload progress" value={value} max={100} />

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
    <SnippetPreview title="Animated Progress" code={code}>
      <div className="w-[80%] flex justify-center flex-col gap-4 items-center">
        <AnimatedProgress label="Upload progress" value={value} max={100} />

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
