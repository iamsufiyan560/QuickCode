"use client";

import React from "react";
import {
  ComboBox,
  ComboBoxTrigger,
  ComboBoxValue,
  ComboBoxContent,
  ComboBoxGroup,
  ComboBoxLabel,
  ComboBoxItem,
} from "@/components/custom/ComboBox";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

export function DefaultExample() {
  const [value, setValue] = React.useState("");

  const frameworks = [
    { value: "Next.js", keywords: ["react", "vercel", "nextjs"] },
    { value: "SvelteKit", keywords: ["svelte", "kit"] },
    { value: "Nuxt.js", keywords: ["vue", "nuxt", "nuxtjs"] },
    { value: "Remix", keywords: ["react", "remix"] },
    { value: "Astro", keywords: ["astro", "static"] },
  ];

  const code = `import {
  ComboBox,
  ComboBoxTrigger,
  ComboBoxValue,
  ComboBoxContent,
  ComboBoxLabel,
  ComboBoxItem,
} from "@/components/ui/ComboBox";

const frameworks = [
  { value: "Next.js", keywords: ["react", "vercel", "nextjs"] },
  { value: "SvelteKit", keywords: ["svelte", "kit"] },
  { value: "Nuxt.js", keywords: ["vue", "nuxt", "nuxtjs"] },
  { value: "Remix", keywords: ["react", "remix"] },
  { value: "Astro", keywords: ["astro", "static"] },
];

export default function ComboBoxDemo() {
  const [value, setValue] = React.useState("");

  return (
    <ComboBox value={value} onValueChange={setValue}>
      <ComboBoxTrigger className="w-[300px]">
        <ComboBoxValue placeholder="Select framework..." />
      </ComboBoxTrigger>
      <ComboBoxContent
        searchPlaceholder="Search framework..."
        emptyMessage="No framework found."
      >
        <ComboBoxLabel>Frameworks</ComboBoxLabel>
        {frameworks.map((framework) => (
          <ComboBoxItem
            key={framework.value}
            value={framework.value}
            keywords={framework.keywords}
          >
            {framework.value}
          </ComboBoxItem>
        ))}
      </ComboBoxContent>
    </ComboBox>
  );
}`;

  return (
    <SnippetPreview title="Default" code={code}>
      <div className="flex items-center justify-center p-8">
        <ComboBox value={value} onValueChange={setValue}>
          <ComboBoxTrigger className="w-[300px]">
            <ComboBoxValue placeholder="Select framework..." />
          </ComboBoxTrigger>
          <ComboBoxContent
            searchPlaceholder="Search framework..."
            emptyMessage="No framework found."
          >
            <ComboBoxLabel>Frameworks</ComboBoxLabel>
            {frameworks.map((framework) => (
              <ComboBoxItem
                key={framework.value}
                value={framework.value}
                keywords={framework.keywords}
              >
                {framework.value}
              </ComboBoxItem>
            ))}
          </ComboBoxContent>
        </ComboBox>
      </div>
    </SnippetPreview>
  );
}

export function GroupedExample() {
  const [value, setValue] = React.useState("");

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
  ComboBox,
  ComboBoxTrigger,
  ComboBoxValue,
  ComboBoxContent,
  ComboBoxGroup,
  ComboBoxLabel,
  ComboBoxItem,
} from "@/components/ui/ComboBox";



export default function GroupedComboBoxDemo() {
  const [value, setValue] = React.useState("");

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
   <ComboBox value={value} onValueChange={setValue}>
          <ComboBoxTrigger className="w-[300px]">
            <ComboBoxValue placeholder="Select countries..." />
          </ComboBoxTrigger>
          <ComboBoxContent
            searchPlaceholder="Search countries..."
            emptyMessage="No countries found."
          >
            {Object.entries(grouped).map(([category, items]) => (
              <ComboBoxGroup key={category}>
                <ComboBoxLabel>{category}</ComboBoxLabel>
                {items.map((country) => (
                  <ComboBoxItem
                    key={country.value}
                    value={country.value}
                    keywords={country.keywords}
                  >
                    {country.value}
                  </ComboBoxItem>
                ))}
              </ComboBoxGroup>
            ))}
          </ComboBoxContent>
    </ComboBox>
  );
}
`;

  return (
    <SnippetPreview title="Grouped" code={code}>
      <div className="flex items-center justify-center p-8">
        <ComboBox value={value} onValueChange={setValue}>
          <ComboBoxTrigger className="w-[300px]">
            <ComboBoxValue placeholder="Select countries..." />
          </ComboBoxTrigger>
          <ComboBoxContent
            searchPlaceholder="Search countries..."
            emptyMessage="No countries found."
          >
            {Object.entries(grouped).map(([category, items]) => (
              <ComboBoxGroup key={category}>
                <ComboBoxLabel>{category}</ComboBoxLabel>
                {items.map((country) => (
                  <ComboBoxItem
                    key={country.value}
                    value={country.value}
                    keywords={country.keywords}
                  >
                    {country.value}
                  </ComboBoxItem>
                ))}
              </ComboBoxGroup>
            ))}
          </ComboBoxContent>
        </ComboBox>
      </div>
    </SnippetPreview>
  );
}
