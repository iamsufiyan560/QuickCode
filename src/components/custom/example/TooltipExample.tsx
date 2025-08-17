"use client";

import React from "react";
import { Button } from "@/components/custom/Button";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";
import { Tooltip } from "../Tooltip";
import { Search, Info, Upload } from "lucide-react";
import { Input } from "../Input";

export const DefaultTooltipExample = () => {
  const searchTooltipCode = `
import { Tooltip } from "@/components/ui/Tooltip";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

import { Search, Info, Upload } from "lucide-react";

export const DefaultTooltipExample = () => {
  return (
    <div className="flex flex-col gap-12">
      {/* Icon examples */}
      <div className="flex items-center gap-6">
        <Tooltip content="Search on the left" side="left">
          <Search className="w-6 h-6 cursor-pointer text-muted-foreground" />
        </Tooltip>
        <Tooltip content="More info above" side="top">
          <Info className="w-6 h-6 cursor-pointer text-muted-foreground" />
        </Tooltip>
        <Tooltip content="Upload options on the right" side="right">
          <Upload className="w-6 h-6 cursor-pointer text-muted-foreground" />
        </Tooltip>
      </div>

      {/* Input with tooltip */}
      <div className="flex items-center gap-4">
        <input
          type="text"
          placeholder="Search..."
          className="border border-border rounded-md px-3 py-2 text-sm w-60"
        />
        <Tooltip content="Enter keywords and press Enter" side="bottom">
          <Button variant="outline">Help</Button>
        </Tooltip>
      </div>
    </div>
  );
};
`;

  return (
    <SnippetPreview title="Search Tooltip" code={searchTooltipCode}>
      <div className="flex flex-col gap-12">
        <div className="flex items-center justify-center mx-auto gap-6">
          <Tooltip content="Search on the left" side="left">
            <Search className="w-6 h-6 cursor-pointer text-muted-foreground" />
          </Tooltip>
          <Tooltip content="More info above" side="top">
            <Info className="w-6 h-6 cursor-pointer text-muted-foreground" />
          </Tooltip>
          <Tooltip content="Upload options on the right" side="right">
            <Upload className="w-6 h-6 cursor-pointer text-muted-foreground" />
          </Tooltip>
        </div>

        <div className="flex items-center gap-4">
          <Input type="text" placeholder="Search..." />
          <Tooltip content="Enter keywords and press Enter" side="bottom">
            <Button variant="outline">Help</Button>
          </Tooltip>
        </div>
      </div>
    </SnippetPreview>
  );
};
