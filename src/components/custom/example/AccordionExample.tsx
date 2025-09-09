"use client";

import { Showcase } from "@/components/ui/Showcase";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { Accordion } from "../Accordion";

// Default Accordion Example
export const DefaultAccordionExample = () => (
  <Showcase
    title="Default Accordion"
    imports={["import { Accordion } from '@/components/custom/Accordion'"]}
    scope={{ React, motion, AnimatePresence, ChevronDown, Accordion }}
  >
    <Accordion />
  </Showcase>
);

// Allow Multiple Open Example
export const AllowMultipleExample = () => (
  <Showcase
    title="Allow Multiple Open"
    imports={["import { Accordion } from '@/components/custom/Accordion'"]}
    scope={{ React, motion, AnimatePresence, ChevronDown, Accordion }}
  >
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
  </Showcase>
);

// Bordered Variant Example
export const BorderedExample = () => (
  <Showcase
    title="Bordered Variant"
    imports={["import { Accordion } from '@/components/custom/Accordion'"]}
    scope={{ React, motion, AnimatePresence, ChevronDown, Accordion }}
  >
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
  </Showcase>
);

// Filled Large Example
export const FilledLargeExample = () => (
  <Showcase
    title="Filled Variant Large"
    imports={["import { Accordion } from '@/components/custom/Accordion'"]}
    scope={{ React, motion, AnimatePresence, ChevronDown, Accordion }}
  >
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
  </Showcase>
);
