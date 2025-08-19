"use client";

import React, { useState } from "react";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";
import { Slider } from "../Slider";
import { Label } from "../Label";

export const DefaultSliderExample = () => {
  const [value, setValue] = useState(50);

  const defaultSliderCode = `
import { Slider } from "@/components/ui/Slider";
import { Label } from "@/components/ui/Label";

import { useState } from "react";

export const DefaultSliderExample = () => {
  const [value, setValue] = useState(50);

  return (
   div className="w-full max-w-md space-y-2 flex flex-col ">
        <Label> Volume: {value}%</Label>
        <Slider
          value={value}
          onChange={(value) => setValue(value)}
          min={0}
          max={100}
          step={1}
        />
      </div>
  );
};
`;

  return (
    <SnippetPreview title="Default Slider" code={defaultSliderCode}>
      <div className="w-full max-w-md space-y-2 flex flex-col px-2 ">
        <Label> Volume: {value}%</Label>
        <Slider
          value={value}
          onChange={(value) => setValue(value)}
          min={0}
          max={100}
          step={1}
        />
      </div>
    </SnippetPreview>
  );
};
