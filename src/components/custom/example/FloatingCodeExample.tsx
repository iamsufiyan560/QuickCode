"use client";

import React from "react";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";
import { FloatingCode } from "@/components/animated/FloatingCode";

// Default Floating Code Example
export const DefaultFloatingCodeExample = () => {
  const defaultFloatingCode = `
import { FloatingCode } from "@/components/animated/FloatingCode";

export const DefaultFloatingCodeExample = () => {
  return (
    <div className="relative h-80 w-full bg-background overflow-hidden">
      <FloatingCode code="<QuickCode />" className="top-10 left-5" />
      <FloatingCode code="npm install" className="top-20 right-10" />
      <FloatingCode
        code="const [state, setState]"
        className="bottom-20 left-10"
      />

      <div className="absolute font-bold inset-0 flex items-center justify-center">
        <div className="text-center text-primary">
          <h3 className="text-2xl font-bold mb-2">Animated Code Snippets</h3>
          <p className="text-primary">
            Floating code elements with smooth animations
          </p>
        </div>
      </div>
    </div>
  );
};
`;

  return (
    <SnippetPreview title="Floating Code Animation" code={defaultFloatingCode}>
      <div className="relative h-80 w-full bg-background overflow-hidden">
        <FloatingCode code="<QuickCode />" className="top-10 left-5" />
        <FloatingCode code="npm install" className="top-20 right-10" />
        <FloatingCode
          code="const [state, setState]"
          className="bottom-20 left-10"
        />

        <div className="absolute font-bold inset-0 flex items-center justify-center">
          <div className="text-center text-primary">
            <h3 className="text-2xl font-bold mb-2">Animated Code Snippets</h3>
            <p className="text-primary">
              Floating code elements with smooth animations
            </p>
          </div>
        </div>
      </div>
    </SnippetPreview>
  );
};
