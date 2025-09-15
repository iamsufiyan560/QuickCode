"use client";

import React from "react";
import { Separator } from "@/components/custom/Separator";
import { Button } from "@/components/custom/Button";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

export const DefaultSeparatorExample = () => {
  const defaultSeparatorCode = `
import { Separator } from "@/components/ui/Separator";
import { Button } from "@/components/custom/Button";

export const DefaultSeparatorExample = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center space-x-4">
        <Button variant="outline">Account</Button>
        <Separator orientation="vertical" className="h-6" />
        <Button variant="outline">Settings</Button>
        <Separator orientation="vertical" className="h-6" />
        <Button variant="outline">Logout</Button>
      </div>
      
      <Separator />
      
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-foreground">Navigation Menu</h3>
        <p className="text-sm text-muted-foreground">
          Separators help organize content and create visual hierarchy.
        </p>
      </div>
    </div>
  );
};
`;

  return (
    <SnippetPreview title="Default Separator" code={defaultSeparatorCode}>
      <div className="space-y-4">
        <div className="flex items-center space-x-4">
          <Button variant="outline">Account</Button>
          <Separator orientation="vertical" className="h-6" />
          <Button variant="outline">Settings</Button>
          <Separator orientation="vertical" className="h-6" />
          <Button variant="outline">Logout</Button>
        </div>

        <Separator />

        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-foreground">
            Navigation Menu
          </h3>
          <p className="text-sm text-muted-foreground">
            Separators help organize content and create visual hierarchy.
          </p>
        </div>
      </div>
    </SnippetPreview>
  );
};
