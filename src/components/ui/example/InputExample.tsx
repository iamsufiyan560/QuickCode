"use client";

import React from "react";
import { Input } from "@/components/ui/Input";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";
import { Label } from "@/components/ui/Label";

export const DefaultInputExample = () => {
  const defaultInputCode = `
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

export const DefaultInputExample = () => {
  return (
  <div className="grid w-full max-w-sm items-center gap-3">
  <Label htmlFor="email">Email</Label>
   <Input type="email" id="email" placeholder="Email" />
   </div>
   );
};

`;

  return (
    <SnippetPreview title="Default Input" code={defaultInputCode}>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="email">Email</Label>
        <Input type="email" id="email" placeholder="Email" />
      </div>
    </SnippetPreview>
  );
};

export const FileInputExample = () => {
  const fileInputCode = `
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

export const FileInputExample = () => {
  return (
  <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="resume">Resume</Label>
        <Input accept=".pdf" id="resume" type="file" />
      </div>
  );
};
`;

  return (
    <SnippetPreview title="File Input" code={fileInputCode}>
      <div className="grid w-full max-w-sm items-center gap-3">
        <Label htmlFor="resume">Resume</Label>
        <Input accept=".pdf" id="resume" type="file" />
      </div>
    </SnippetPreview>
  );
};
