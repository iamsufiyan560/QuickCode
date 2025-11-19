"use client";

import React from "react";
import {
  MultiComboBox,
  MultiComboBoxTrigger,
  MultiComboBoxValue,
  MultiComboBoxContent,
  MultiComboBoxGroup,
  MultiComboBoxLabel,
  MultiComboBoxItem,
} from "@/components/ui/MultiComboBox";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

export function DefaultExample() {
  const [value, setValue] = React.useState<string[]>([]);

  const frameworks = [
    { value: "Next.js", keywords: ["react", "vercel", "nextjs"] },
    { value: "SvelteKit", keywords: ["svelte", "kit"] },
    { value: "Nuxt.js", keywords: ["vue", "nuxt", "nuxtjs"] },
    { value: "Remix", keywords: ["react", "remix"] },
    { value: "Astro", keywords: ["astro", "static"] },
  ];

  const code = `import {
  MultiComboBox,
  MultiComboBoxTrigger,
  MultiComboBoxValue,
  MultiComboBoxContent,
  MultiComboBoxLabel,
  MultiComboBoxItem,
} from "@/components/ui/MultiComboBox";

const frameworks = [
  { value: "Next.js", keywords: ["react", "vercel", "nextjs"] },
  { value: "SvelteKit", keywords: ["svelte", "kit"] },
  { value: "Nuxt.js", keywords: ["vue", "nuxt", "nuxtjs"] },
  { value: "Remix", keywords: ["react", "remix"] },
  { value: "Astro", keywords: ["astro", "static"] },
];

export default function MultiComboBoxDemo() {
  const [value, setValue] = React.useState<string[]>([]);

  return (
    <MultiComboBox values={value} onValuesChange={setValue}>
      <MultiComboBoxTrigger className="w-[300px]">
        <MultiComboBoxValue placeholder="Select framework..." />
      </MultiComboBoxTrigger>
      <MultiComboBoxContent
        searchPlaceholder="Search framework..."
        emptyMessage="No framework found."
      >
        <MultiComboBoxLabel>Frameworks</MultiComboBoxLabel>
        {frameworks.map((framework) => (
          <MultiComboBoxItem
            key={framework.value}
            value={framework.value}
            keywords={framework.keywords}
          >
            {framework.value}
          </MultiComboBoxItem>
        ))}
      </MultiComboBoxContent>
    </MultiComboBox>
  );
}`;

  return (
    <SnippetPreview title="Default" code={code}>
      <div className="flex items-center justify-center p-8">
        <MultiComboBox values={value} onValuesChange={setValue}>
          <MultiComboBoxTrigger className="w-[300px]">
            <MultiComboBoxValue placeholder="Select framework..." />
          </MultiComboBoxTrigger>
          <MultiComboBoxContent
            searchPlaceholder="Search framework..."
            emptyMessage="No framework found."
          >
            <MultiComboBoxLabel>Frameworks</MultiComboBoxLabel>
            {frameworks.map((framework) => (
              <MultiComboBoxItem
                key={framework.value}
                value={framework.value}
                keywords={framework.keywords}
              >
                {framework.value}
              </MultiComboBoxItem>
            ))}
          </MultiComboBoxContent>
        </MultiComboBox>
      </div>
    </SnippetPreview>
  );
}

export function GroupedExample() {
  const [value, setValue] = React.useState<string[]>([]);

  const countries = [
    { value: "India", keywords: ["asia", "in", "bharat"], category: "Asia" },
    { value: "Japan", keywords: ["asia", "jp", "nippon"], category: "Asia" },
    { value: "China", keywords: ["asia", "cn"], category: "Asia" },
    {
      value: "Germany",
      keywords: ["europe", "de", "deutschland"],
      category: "Europe",
    },
    { value: "France", keywords: ["europe", "fr"], category: "Europe" },
    { value: "Italy", keywords: ["europe", "it"], category: "Europe" },
    {
      value: "USA",
      keywords: ["america", "us", "usa"],
      category: "North America",
    },
    { value: "Canada", keywords: ["america", "ca"], category: "North America" },
    { value: "Mexico", keywords: ["america", "mx"], category: "North America" },
    {
      value: "Brazil",
      keywords: ["south america", "br"],
      category: "South America",
    },
    {
      value: "Argentina",
      keywords: ["south america", "ar"],
      category: "South America",
    },
    { value: "Nigeria", keywords: ["africa", "ng"], category: "Africa" },
    { value: "South Africa", keywords: ["africa", "za"], category: "Africa" },
    { value: "Egypt", keywords: ["africa", "eg"], category: "Africa" },
    { value: "Australia", keywords: ["oceania", "au"], category: "Oceania" },
    { value: "New Zealand", keywords: ["oceania", "nz"], category: "Oceania" },
  ];

  const grouped = countries.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof countries>);

  const code = `import * as React from "react";
import {
  MultiComboBox,
  MultiComboBoxTrigger,
  MultiComboBoxValue,
  MultiComboBoxContent,
  MultiComboBoxGroup,
  MultiComboBoxLabel,
  MultiComboBoxItem,
} from "@/components/ui/MultiComboBox";



export default function GroupedMultiComboBoxDemo() {
  const [value, setValue] = React.useState<string[]>([]);

  const countries = [
    { value: "India", keywords: ["asia", "in", "bharat"], category: "Asia" },
    { value: "Japan", keywords: ["asia", "jp", "nippon"], category: "Asia" },
    { value: "China", keywords: ["asia", "cn"], category: "Asia" },
    {
      value: "Germany",
      keywords: ["europe", "de", "deutschland"],
      category: "Europe",
    },
    { value: "France", keywords: ["europe", "fr"], category: "Europe" },
    { value: "Italy", keywords: ["europe", "it"], category: "Europe" },
    {
      value: "USA",
      keywords: ["america", "us", "usa"],
      category: "North America",
    },
    { value: "Canada", keywords: ["america", "ca"], category: "North America" },
    { value: "Mexico", keywords: ["america", "mx"], category: "North America" },
    {
      value: "Brazil",
      keywords: ["south america", "br"],
      category: "South America",
    },
    {
      value: "Argentina",
      keywords: ["south america", "ar"],
      category: "South America",
    },
    { value: "Nigeria", keywords: ["africa", "ng"], category: "Africa" },
    { value: "South Africa", keywords: ["africa", "za"], category: "Africa" },
    { value: "Egypt", keywords: ["africa", "eg"], category: "Africa" },
    { value: "Australia", keywords: ["oceania", "au"], category: "Oceania" },
    { value: "New Zealand", keywords: ["oceania", "nz"], category: "Oceania" },
  ];

  const grouped = countries.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, typeof countries>);

  return (
   <MultiComboBox values={value} onValuesChange={setValue}>
          <MultiComboBoxTrigger className="w-[300px]">
            <MultiComboBoxValue placeholder="Select countries..." />
          </MultiComboBoxTrigger>
          <MultiComboBoxContent
            searchPlaceholder="Search countries..."
            emptyMessage="No countries found."
          >
            {Object.entries(grouped).map(([category, items]) => (
              <MultiComboBoxGroup key={category}>
                <MultiComboBoxLabel>{category}</MultiComboBoxLabel>
                {items.map((country) => (
                  <MultiComboBoxItem
                    key={country.value}
                    value={country.value}
                    keywords={country.keywords}
                  >
                    {country.value}
                  </MultiComboBoxItem>
                ))}
              </MultiComboBoxGroup>
            ))}
          </MultiComboBoxContent>
    </MultiComboBox>
  );
}
`;

  return (
    <SnippetPreview title="Grouped" code={code}>
      <div className="flex items-center justify-center p-8">
        <MultiComboBox values={value} onValuesChange={setValue}>
          <MultiComboBoxTrigger className="w-[300px]">
            <MultiComboBoxValue placeholder="Select countries..." />
          </MultiComboBoxTrigger>
          <MultiComboBoxContent
            searchPlaceholder="Search countries..."
            emptyMessage="No countries found."
          >
            {Object.entries(grouped).map(([category, items]) => (
              <MultiComboBoxGroup key={category}>
                <MultiComboBoxLabel>{category}</MultiComboBoxLabel>
                {items.map((country) => (
                  <MultiComboBoxItem
                    key={country.value}
                    value={country.value}
                    keywords={country.keywords}
                  >
                    {country.value}
                  </MultiComboBoxItem>
                ))}
              </MultiComboBoxGroup>
            ))}
          </MultiComboBoxContent>
        </MultiComboBox>
      </div>
    </SnippetPreview>
  );
}
