"use client";

import React from "react";
import { Badge } from "@/components/ui/Badge";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";
import { Star, CheckCircle, AlertCircle, User } from "lucide-react";

export const AllBadgeVariantsExample = () => {
  const allBadgeVariantsCode = `
import { Badge } from "@/components/ui/Badge";
import { Star, CheckCircle, AlertCircle, User } from "lucide-react";

export const AllBadgeVariantsExample = () => {
  return (
    <div className="flex flex-wrap gap-4">
      {/* Default Variants */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-muted-foreground">Default</h4>
        <Badge variant="default">New</Badge>
        <Badge variant="default">
          <Star className="w-3 h-3" />
          Featured
        </Badge>
      </div>

      {/* Secondary Variants */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-muted-foreground">Secondary</h4>
        <Badge variant="secondary">Draft</Badge>
        <Badge variant="secondary">
          <User className="w-3 h-3" />
          Member
        </Badge>
      </div>

      {/* Destructive Variants */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-muted-foreground">Destructive</h4>
        <Badge variant="destructive">Error</Badge>
        <Badge variant="destructive">
          <AlertCircle className="w-3 h-3" />
          Failed
        </Badge>
      </div>

      {/* Outline Variants */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-muted-foreground">Outline</h4>
        <Badge variant="outline">Pending</Badge>
        <Badge variant="outline">
          <CheckCircle className="w-3 h-3" />
          Verified
        </Badge>
      </div>

      {/* Different Sizes */}
      <div className="space-y-2">
        <h4 className="text-sm font-medium text-muted-foreground">Sizes</h4>
        <Badge size="sm">Small</Badge>
        <Badge size="md">Medium</Badge>
        <Badge size="lg">Large</Badge>
      </div>
    </div>
  );
};
`;

  return (
    <SnippetPreview title="All Badge Variants" code={allBadgeVariantsCode}>
      <div className="flex flex-wrap gap-6">
        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Default</h4>
          <div className="flex flex-col gap-2">
            <Badge variant="default">New</Badge>
            <Badge variant="default">
              <Star className="w-3 h-3" />
              Featured
            </Badge>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">
            Secondary
          </h4>
          <div className="flex flex-col gap-2">
            <Badge variant="secondary">Draft</Badge>
            <Badge variant="secondary">
              <User className="w-3 h-3" />
              Member
            </Badge>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">
            Destructive
          </h4>
          <div className="flex flex-col gap-2">
            <Badge variant="destructive">Error</Badge>
            <Badge variant="destructive">
              <AlertCircle className="w-3 h-3" />
              Failed
            </Badge>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Outline</h4>
          <div className="flex flex-col gap-2">
            <Badge variant="outline">Pending</Badge>
            <Badge variant="outline" className="flex gap-1">
              <CheckCircle className="w-3 h-3" />
              Verified
            </Badge>
          </div>
        </div>

        <div className="space-y-3">
          <h4 className="text-sm font-medium text-muted-foreground">Sizes</h4>
          <div className="flex flex-col gap-2">
            <Badge size="sm">Small</Badge>
            <Badge size="md">Medium</Badge>
            <Badge size="lg">Large</Badge>
          </div>
        </div>
      </div>
    </SnippetPreview>
  );
};
