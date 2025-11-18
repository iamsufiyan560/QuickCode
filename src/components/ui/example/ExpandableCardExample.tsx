"use client";

import { useState } from "react";
import { ExpandableCard } from "@/components/ui/ExpandableCard";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

const code = `
import { useState } from "react";
import { ExpandableCard } from "@/components/ui/ExpandableCard";

export default function Example() {
  const [open, setOpen] = useState(false);

  return (
    <ExpandableCard
      value="settings"
      open={open}
      onToggle={() => setOpen(!open)}
      className="w-full max-w-md"
    >
      <ExpandableCard.Item>
        <h3 className="text-foreground font-medium">Account Settings</h3>
      </ExpandableCard.Item>

      <ExpandableCard.Content>
        <p className="text-muted-foreground text-sm">
          Manage your profile information, password, and security settings.
        </p>
      </ExpandableCard.Content>
    </ExpandableCard>
  );
}
`;

export function DefaultExample() {
  const [open, setOpen] = useState(false);

  return (
    <SnippetPreview code={code} title="Expandable Card Example">
      <ExpandableCard
        value="settings"
        open={open}
        onToggle={() => setOpen(!open)}
        className="w-full max-w-md"
      >
        <ExpandableCard.Item>
          <h3 className="text-foreground font-medium">Account Settings</h3>
        </ExpandableCard.Item>

        <ExpandableCard.Content>
          <p className="text-muted-foreground text-sm">
            Manage your profile information, password, and security settings.
          </p>
        </ExpandableCard.Content>
      </ExpandableCard>
    </SnippetPreview>
  );
}
