"use client";

import React, { useState } from "react";
import { RangeSlider } from "@/components/custom/RangeSlider";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";
import { Label } from "../Label";

export const DefaultRangeSliderExample = () => {
  const [value, setValue] = useState<[number, number]>([25, 75]);

  const defaultRangeSliderCode = `
import { RangeSlider } from "@/components/ui/RangeSlider";
import { Label } from "@/components/ui/Label";

import { useState } from "react";

export const DefaultRangeSliderExample = () => {
  const [value, setValue] = useState<[number, number]>([25, 75]);

  return (
     <div className="w-full max-w-md space-y-2 flex flex-col">
        <Label>
          Price Range: ${value[0]} - ${value[1]}
        </Label>
        <RangeSlider
          value={value}
          onChange={setValue}
          min={0}
          max={100}
          step={1}
        />
      </div>
  );
};
`;

  return (
    <SnippetPreview title="Default Range Slider" code={defaultRangeSliderCode}>
      <div className="w-full max-w-md space-y-2 flex flex-col px-4">
        <Label>
          Price Range: ${value[0]} - ${value[1]}
        </Label>
        <RangeSlider
          value={value}
          onChange={setValue}
          min={0}
          max={100}
          step={1}
        />
      </div>
    </SnippetPreview>
  );
};
