"use client";

import React from "react";
import {
  MultiSelect,
  MultiSelectTrigger,
  MultiSelectValue,
  MultiSelectContent,
  MultiSelectGroup,
  MultiSelectLabel,
  MultiSelectItem,
} from "@/components/ui/MultiSelect";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

export const DefaultMultiSelectExample = () => {
  const [selectedTechnologies, setSelectedTechnologies] = React.useState<
    string[]
  >([]);

  const defaultMultiSelectCode = `
import { 
  MultiSelect, 
  MultiSelectTrigger, 
  MultiSelectValue, 
  MultiSelectContent, 
  MultiSelectItem 
} from "@/components/ui/MultiSelect";

export const DefaultMultiSelectExample = () => {
  const [selectedTechnologies, setSelectedTechnologies] = React.useState<string[]>([]);

  return (
    <MultiSelect values={selectedTechnologies} onValuesChange={setSelectedTechnologies}>
      <MultiSelectTrigger className="w-full">
        <MultiSelectValue placeholder="Select technologies" />
      </MultiSelectTrigger>
      <MultiSelectContent>
        <MultiSelectItem value="React">React</MultiSelectItem>
        <MultiSelectItem value="TypeScript">TypeScript</MultiSelectItem>
        <MultiSelectItem value="Next.js">Next.js</MultiSelectItem>
        <MultiSelectItem value="Tailwind CSS">Tailwind CSS</MultiSelectItem>
        <MultiSelectItem value="Framer Motion">Framer Motion</MultiSelectItem>
      </MultiSelectContent>
    </MultiSelect>
  );
};
`;

  return (
    <SnippetPreview title="Default Multi Select" code={defaultMultiSelectCode}>
      <MultiSelect
        values={selectedTechnologies}
        onValuesChange={setSelectedTechnologies}
      >
        <MultiSelectTrigger className="w-full">
          <MultiSelectValue placeholder="Select technologies" />
        </MultiSelectTrigger>
        <MultiSelectContent>
          <MultiSelectItem value="React">React</MultiSelectItem>
          <MultiSelectItem value="TypeScript">TypeScript</MultiSelectItem>
          <MultiSelectItem value="Next.js">Next.js</MultiSelectItem>
          <MultiSelectItem value="Tailwind CSS">Tailwind CSS</MultiSelectItem>
          <MultiSelectItem value="Framer Motion">Framer Motion</MultiSelectItem>
        </MultiSelectContent>
      </MultiSelect>
    </SnippetPreview>
  );
};

export const GroupedMultiSelectExample = () => {
  const [selectedSkills, setSelectedSkills] = React.useState<string[]>([
    "JavaScript",
    "Python",
  ]);

  const groupedMultiSelectCode = `
import { 
  MultiSelect, 
  MultiSelectTrigger, 
  MultiSelectValue, 
  MultiSelectContent, 
  MultiSelectGroup,
  MultiSelectLabel,
  MultiSelectItem 
} from "@/components/ui/MultiSelect";

export const GroupedMultiSelectExample = () => {
  const [selectedSkills, setSelectedSkills] = React.useState<string[]>(["JavaScript", "Python"]);

  return (
    <MultiSelect values={selectedSkills} onValuesChange={setSelectedSkills}>
      <MultiSelectTrigger className="w-full">
        <MultiSelectValue placeholder="Select your skills" />
      </MultiSelectTrigger>
      <MultiSelectContent>
        <MultiSelectGroup>
          <MultiSelectLabel>Frontend</MultiSelectLabel>
          <MultiSelectItem value="JavaScript">JavaScript</MultiSelectItem>
          <MultiSelectItem value="React">React</MultiSelectItem>
          <MultiSelectItem value="Vue.js">Vue.js</MultiSelectItem>
          <MultiSelectItem value="Angular">Angular</MultiSelectItem>
        </MultiSelectGroup>
        <MultiSelectGroup>
          <MultiSelectLabel>Backend</MultiSelectLabel>
          <MultiSelectItem value="Node.js">Node.js</MultiSelectItem>
          <MultiSelectItem value="Python">Python</MultiSelectItem>
          <MultiSelectItem value="Java">Java</MultiSelectItem>
          <MultiSelectItem value="Go">Go</MultiSelectItem>
        </MultiSelectGroup>
      </MultiSelectContent>
    </MultiSelect>
  );
};
`;

  return (
    <SnippetPreview title="Grouped Multi Select" code={groupedMultiSelectCode}>
      <MultiSelect values={selectedSkills} onValuesChange={setSelectedSkills}>
        <MultiSelectTrigger className="w-full">
          <MultiSelectValue placeholder="Select your skills" />
        </MultiSelectTrigger>
        <MultiSelectContent>
          <MultiSelectGroup>
            <MultiSelectLabel>Frontend</MultiSelectLabel>
            <MultiSelectItem value="JavaScript">JavaScript</MultiSelectItem>
            <MultiSelectItem value="React">React</MultiSelectItem>
            <MultiSelectItem value="Vue.js">Vue.js</MultiSelectItem>
            <MultiSelectItem value="Angular">Angular</MultiSelectItem>
          </MultiSelectGroup>
          <MultiSelectGroup>
            <MultiSelectLabel>Backend</MultiSelectLabel>
            <MultiSelectItem value="Node.js">Node.js</MultiSelectItem>
            <MultiSelectItem value="Python">Python</MultiSelectItem>
            <MultiSelectItem value="Java">Java</MultiSelectItem>
            <MultiSelectItem value="Go">Go</MultiSelectItem>
          </MultiSelectGroup>
        </MultiSelectContent>
      </MultiSelect>
    </SnippetPreview>
  );
};

export const MaxDisplayMultiSelectExample = () => {
  const [selectedCountries, setSelectedCountries] = React.useState<string[]>([
    "USA",
    "Canada",
    "UK",
    "Germany",
    "France",
  ]);

  const maxDisplayMultiSelectCode = `
import { 
  MultiSelect, 
  MultiSelectTrigger, 
  MultiSelectValue, 
  MultiSelectContent, 
  MultiSelectItem 
} from "@/components/ui/MultiSelect";

export const MaxDisplayMultiSelectExample = () => {
  const [selectedCountries, setSelectedCountries] = React.useState<string[]>(["USA", "Canada", "UK", "Germany", "France"]);

  return (
    <MultiSelect values={selectedCountries} onValuesChange={setSelectedCountries}>
      <MultiSelectTrigger className="w-full">
        <MultiSelectValue placeholder="Select countries" maxDisplay={2} />
      </MultiSelectTrigger>
      <MultiSelectContent>
        <MultiSelectItem value="USA">United States</MultiSelectItem>
        <MultiSelectItem value="Canada">Canada</MultiSelectItem>
        <MultiSelectItem value="UK">United Kingdom</MultiSelectItem>
        <MultiSelectItem value="Germany">Germany</MultiSelectItem>
        <MultiSelectItem value="France">France</MultiSelectItem>
        <MultiSelectItem value="Italy">Italy</MultiSelectItem>
        <MultiSelectItem value="Spain">Spain</MultiSelectItem>
        <MultiSelectItem value="Japan">Japan</MultiSelectItem>
      </MultiSelectContent>
    </MultiSelect>
  );
};
`;

  return (
    <SnippetPreview
      title="Max Display Multi Select"
      code={maxDisplayMultiSelectCode}
    >
      <MultiSelect
        values={selectedCountries}
        onValuesChange={setSelectedCountries}
      >
        <MultiSelectTrigger className="w-full">
          <MultiSelectValue placeholder="Select countries" maxDisplay={2} />
        </MultiSelectTrigger>
        <MultiSelectContent>
          <MultiSelectItem value="USA">United States</MultiSelectItem>
          <MultiSelectItem value="Canada">Canada</MultiSelectItem>
          <MultiSelectItem value="UK">United Kingdom</MultiSelectItem>
          <MultiSelectItem value="Germany">Germany</MultiSelectItem>
          <MultiSelectItem value="France">France</MultiSelectItem>
          <MultiSelectItem value="Italy">Italy</MultiSelectItem>
          <MultiSelectItem value="Spain">Spain</MultiSelectItem>
          <MultiSelectItem value="Japan">Japan</MultiSelectItem>
        </MultiSelectContent>
      </MultiSelect>
    </SnippetPreview>
  );
};

export const DisabledMultiSelectExample = () => {
  const [selectedItems, setSelectedItems] = React.useState<string[]>([
    "Item 1",
    "Item 3",
  ]);

  const disabledMultiSelectCode = `
import { 
  MultiSelect, 
  MultiSelectTrigger, 
  MultiSelectValue, 
  MultiSelectContent, 
  MultiSelectItem 
} from "@/components/ui/MultiSelect";

export const DisabledMultiSelectExample = () => {
  const [selectedItems, setSelectedItems] = React.useState<string[]>(["Item 1", "Item 3"]);

  return (
    <MultiSelect values={selectedItems} onValuesChange={setSelectedItems} disabled>
      <MultiSelectTrigger className="w-full cursor-not-allowed">
        <MultiSelectValue placeholder="This is disabled" />
      </MultiSelectTrigger>
      <MultiSelectContent>
        <MultiSelectItem value="Item 1">Item 1</MultiSelectItem>
        <MultiSelectItem value="Item 2">Item 2</MultiSelectItem>
        <MultiSelectItem value="Item 3">Item 3</MultiSelectItem>
        <MultiSelectItem value="Item 4" disabled>Item 4 (Disabled Item)</MultiSelectItem>
      </MultiSelectContent>
    </MultiSelect>
  );
};
`;

  return (
    <SnippetPreview
      title="Disabled Multi Select"
      code={disabledMultiSelectCode}
    >
      <MultiSelect
        values={selectedItems}
        onValuesChange={setSelectedItems}
        disabled
      >
        <MultiSelectTrigger className="w-full ">
          <MultiSelectValue placeholder="This is disabled" />
        </MultiSelectTrigger>
        <MultiSelectContent>
          <MultiSelectItem value="Item 1">Item 1</MultiSelectItem>
          <MultiSelectItem value="Item 2">Item 2</MultiSelectItem>
          <MultiSelectItem value="Item 3">Item 3</MultiSelectItem>
          <MultiSelectItem value="Item 4" disabled>
            Item 4 (Disabled Item)
          </MultiSelectItem>
        </MultiSelectContent>
      </MultiSelect>
    </SnippetPreview>
  );
};
