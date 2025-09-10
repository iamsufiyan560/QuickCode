"use client";

import React from "react";
import { Accordion } from "@/components/custom/Accordion";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

// Default Accordion Example
export const DefaultAccordionExample = () => {
  const defaultAccordionCode = `
import { Accordion } from "@/components/custom/Accordion";

export const DefaultAccordionExample = () => {
  return <Accordion />;
};
`;

  return (
    <SnippetPreview title="Default Accordion" code={defaultAccordionCode}>
      <Accordion />
    </SnippetPreview>
  );
};

// Allow Multiple Open Example
export const AllowMultipleExample = () => {
  const allowMultipleCode = `
import { Accordion } from "@/components/custom/Accordion";

export const AllowMultipleExample = () => {
  return (
    <Accordion
      allowMultiple
      items={[
        {
          title: "Section 1",
          content:
            "This section can be open alongside others when allowMultiple is enabled.",
        },
        {
          title: "Section 2",
          content:
            "Multiple sections can be expanded simultaneously for better content comparison.",
        },
        {
          title: "Section 3",
          content:
            "This provides flexibility for users who want to reference multiple sections at once.",
        },
      ]}
    />
  );
};
`;

  return (
    <SnippetPreview title="Allow Multiple Open" code={allowMultipleCode}>
      <Accordion
        allowMultiple
        items={[
          {
            title: "Section 1",
            content:
              "This section can be open alongside others when allowMultiple is enabled.",
          },
          {
            title: "Section 2",
            content:
              "Multiple sections can be expanded simultaneously for better content comparison.",
          },
          {
            title: "Section 3",
            content:
              "This provides flexibility for users who want to reference multiple sections at once.",
          },
        ]}
      />
    </SnippetPreview>
  );
};

// Bordered Variant Example
export const BorderedExample = () => {
  const borderedCode = `
import { Accordion } from "@/components/custom/Accordion";

export const BorderedExample = () => {
  return (
    <Accordion
      variant="bordered"
      items={[
        {
          title: "Features",
          content:
            "Clean borders around each accordion item for a more defined look.",
        },
        {
          title: "Styling",
          content:
            "The bordered variant adds visual separation between accordion items.",
        },
      ]}
    />
  );
};
`;

  return (
    <SnippetPreview title="Bordered Variant" code={borderedCode}>
      <Accordion
        variant="bordered"
        items={[
          {
            title: "Features",
            content:
              "Clean borders around each accordion item for a more defined look.",
          },
          {
            title: "Styling",
            content:
              "The bordered variant adds visual separation between accordion items.",
          },
        ]}
      />
    </SnippetPreview>
  );
};

// Filled Large Example
export const FilledLargeExample = () => {
  const filledLargeCode = `
import { Accordion } from "@/components/custom/Accordion";

export const FilledLargeExample = () => {
  return (
    <Accordion
      variant="filled"
      size="lg"
      items={[
        {
          title: "Enhanced Visibility",
          content:
            "The filled variant provides a subtle background color that enhances readability and creates better visual hierarchy.",
        },
        {
          title: "Large Text Size",
          content:
            "Larger text size improves accessibility and readability, especially useful for content-heavy accordions.",
        },
      ]}
    />
  );
};
`;

  return (
    <SnippetPreview title="Filled Variant Large" code={filledLargeCode}>
      <Accordion
        variant="filled"
        size="lg"
        items={[
          {
            title: "Enhanced Visibility",
            content:
              "The filled variant provides a subtle background color that enhances readability and creates better visual hierarchy.",
          },
          {
            title: "Large Text Size",
            content:
              "Larger text size improves accessibility and readability, especially useful for content-heavy accordions.",
          },
        ]}
      />
    </SnippetPreview>
  );
};
