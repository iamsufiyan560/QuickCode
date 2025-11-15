"use client";

import React from "react";
import { Label } from "@/components/ui/Label";
import { Checkbox } from "@/components/ui/Checkbox";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

export const DefaultLabelExample = () => {
  const [checked, setChecked] = React.useState(false);

  const defaultLabelCode = `
import { Label } from "@/components/ui/Label";
import { Checkbox } from "@/components/ui/Checkbox";

export const DefaultLabelExample = () => {
  const [checked, setChecked] = React.useState(false);

  return (
    <div className="flex items-center space-x-2">
      <Checkbox 
        id="pizza-lover" 
        checked={checked}
        onChange={setChecked}
      />
      <Label htmlFor="pizza-lover">I'm a pizza enthusiast</Label>
    </div>
  );
};
`;

  return (
    <SnippetPreview title="Default Label" code={defaultLabelCode}>
      <div className="flex items-center space-x-2">
        <Checkbox id="pizza-lover" checked={checked} onChange={setChecked} />
        <Label htmlFor="pizza-lover">I'm a pizza enthusiast</Label>
      </div>
    </SnippetPreview>
  );
};

export const RequiredFieldExample = () => {
  const [checked, setChecked] = React.useState(false);

  const requiredFieldCode = `
import { Label } from "@/components/ui/Label";
import { Checkbox } from "@/components/ui/Checkbox";

export const RequiredFieldExample = () => {
  const [checked, setChecked] = React.useState(false);

  return (
    <div className="flex items-center space-x-2">
      <Checkbox 
        id="coffee-addiction" 
        checked={checked}
        onChange={setChecked}
      />
      <Label htmlFor="coffee-addiction" required>
        I need coffee to function
      </Label>
    </div>
  );
};
`;

  return (
    <SnippetPreview title="Required Field" code={requiredFieldCode}>
      <div className="flex items-center space-x-2">
        <Checkbox
          id="coffee-addiction"
          checked={checked}
          onChange={setChecked}
        />
        <Label htmlFor="coffee-addiction" required>
          I need coffee to function
        </Label>
      </div>
    </SnippetPreview>
  );
};

export const VariantExamples = () => {
  const [catChecked, setCatChecked] = React.useState(false);
  const [procrastinationChecked, setProcrastinationChecked] =
    React.useState(true);
  const [superheroChecked, setSuperheroChecked] = React.useState(false);

  const variantExamplesCode = `
import { Label } from "@/components/ui/Label";
import { Checkbox } from "@/components/ui/Checkbox";

export const VariantExamples = () => {
  const [catChecked, setCatChecked] = React.useState(false);
  const [procrastinationChecked, setProcrastinationChecked] = React.useState(true);
  const [superheroChecked, setSuperheroChecked] = React.useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="default-cat" 
          checked={catChecked}
          onChange={setCatChecked}
        />
        <Label htmlFor="default-cat" variant="default">
          Cats are basically liquid
        </Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="muted-procrastination" 
          checked={procrastinationChecked}
          onChange={setProcrastinationChecked}
        />
        <Label htmlFor="muted-procrastination" variant="muted">
          I'll do it tomorrow (maybe)
        </Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="accent-superhero" 
          checked={superheroChecked}
          onChange={setSuperheroChecked}
        />
        <Label htmlFor="accent-superhero" variant="accent">
          My superpower is finding snacks at 2 AM
        </Label>
      </div>
    </div>
  );
};
`;

  return (
    <SnippetPreview title="Label Variants" code={variantExamplesCode}>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="default-cat"
            checked={catChecked}
            onChange={setCatChecked}
          />
          <Label htmlFor="default-cat" variant="default">
            Cats are basically liquid
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="muted-procrastination"
            checked={procrastinationChecked}
            onChange={setProcrastinationChecked}
          />
          <Label htmlFor="muted-procrastination" variant="muted">
            I'll do it tomorrow (maybe)
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="accent-superhero"
            checked={superheroChecked}
            onChange={setSuperheroChecked}
          />
          <Label htmlFor="accent-superhero" variant="accent">
            My superpower is finding snacks at 2 AM
          </Label>
        </div>
      </div>
    </SnippetPreview>
  );
};

export const SizeExamples = () => {
  const [smallChecked, setSmallChecked] = React.useState(false);
  const [mediumChecked, setMediumChecked] = React.useState(true);
  const [largeChecked, setLargeChecked] = React.useState(false);

  const sizeExamplesCode = `
import { Label } from "@/components/ui/Label";
import { Checkbox } from "@/components/ui/Checkbox";

export const SizeExamples = () => {
  const [smallChecked, setSmallChecked] = React.useState(false);
  const [mediumChecked, setMediumChecked] = React.useState(true);
  const [largeChecked, setLargeChecked] = React.useState(false);

  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="small-label" 
          size="sm" 
          checked={smallChecked}
          onChange={setSmallChecked}
        />
        <Label htmlFor="small-label" size="sm">
          Small text for tiny decisions
        </Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="medium-label" 
          size="md" 
          checked={mediumChecked}
          onChange={setMediumChecked}
        />
        <Label htmlFor="medium-label" size="md">
          Medium text for medium choices
        </Label>
      </div>
      
      <div className="flex items-center space-x-2">
        <Checkbox 
          id="large-label" 
          size="lg" 
          checked={largeChecked}
          onChange={setLargeChecked}
        />
        <Label htmlFor="large-label" size="lg">
          Large text for important stuff
        </Label>
      </div>
    </div>
  );
};
`;

  return (
    <SnippetPreview title="Label Sizes" code={sizeExamplesCode}>
      <div className="space-y-4">
        <div className="flex items-center space-x-2">
          <Checkbox
            id="small-label"
            size="sm"
            checked={smallChecked}
            onChange={setSmallChecked}
          />
          <Label htmlFor="small-label" size="sm">
            Small text for tiny decisions
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="medium-label"
            size="md"
            checked={mediumChecked}
            onChange={setMediumChecked}
          />
          <Label htmlFor="medium-label" size="md">
            Medium text for medium choices
          </Label>
        </div>

        <div className="flex items-center space-x-2">
          <Checkbox
            id="large-label"
            size="lg"
            checked={largeChecked}
            onChange={setLargeChecked}
          />
          <Label htmlFor="large-label" size="lg">
            Large text for important stuff
          </Label>
        </div>
      </div>
    </SnippetPreview>
  );
};
