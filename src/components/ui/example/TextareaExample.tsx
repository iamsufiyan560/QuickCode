"use client";

import React from "react";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";
import { Textarea } from "../TextArea";

export const DefaultTextareaExample = () => {
  const defaultTextareaCode = `
import { Textarea } from "@/components/ui/Textarea";

export const DefaultTextareaExample = () => {
  return (
    <Textarea
      placeholder="Type your message here..."
      rows={4}
    />
  );
};
`;

  return (
    <SnippetPreview title="Default Textarea" code={defaultTextareaCode}>
      <Textarea
        onChange={(e) => console.log(e.target.value)}
        placeholder="Type your message here..."
        rows={4}
      />
    </SnippetPreview>
  );
};
