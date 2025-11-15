"use client";

import React, { useState } from "react";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";
import { AnimatedList } from "@/components/animated/AnimatedList";

export const DefaultAnimatedListExample = () => {
  const [selectedItem, setSelectedItem] = useState<string>("");

  const sampleData = [
    "React Development",
    "TypeScript Integration",
    "UI/UX Design",
    "Database Management",
    "API Development",
    "Mobile App Development",
    "DevOps & Deployment",
    "Testing & QA",
    "Performance Optimization",
    "Security Implementation",
    "Code Review",
    "Documentation Writing",
  ];

  const defaultAnimatedListCode = `
import { AnimatedList } from "@/components/ui/AnimatedList";


export const DefaultAnimatedListExample = () => {
  const [selectedItem, setSelectedItem] = useState<string>("");
  
  const sampleData = [
    "React Development",
    "TypeScript Integration", 
    "UI/UX Design",
    "Database Management",
    "API Development",
    "Mobile App Development",
    "DevOps & Deployment",
    "Testing & QA",
    "Performance Optimization",
    "Security Implementation",
    "Code Review",
    "Documentation Writing"
  ];

  return (
    <div className="space-y-4">
      <AnimatedList 
        data={sampleData}
        onPick={(val, idx) => setSelectedItem(val)}
        arrowKeys={true}
        gradients={true}
        showScroll={true}
      />
      {selectedItem && (
        <p className="text-sm text-muted-foreground">
          Selected: <span className="text-foreground font-medium">{selectedItem}</span>
        </p>
      )}
    </div>
  );
};
`;

  return (
    <SnippetPreview
      title="Interactive Animated List"
      code={defaultAnimatedListCode}
    >
      <div className="space-y-4">
        <AnimatedList
          data={sampleData}
          onPick={(val, idx) => setSelectedItem(val)}
          arrowKeys={true}
          gradients={true}
          showScroll={true}
        />
        {selectedItem && (
          <p className="text-sm text-muted-foreground ">
            Selected:{" "}
            <span className="text-foreground font-medium">{selectedItem}</span>
          </p>
        )}
      </div>
    </SnippetPreview>
  );
};
