"use client";

import React from "react";
import {
  ActionSheet,
  ActionSheetAction,
} from "@/components/custom/ActionSheet";

// ------------------------
// Bottom Example
// ------------------------
import { Copy, Edit3, Share2, Trash2 } from "lucide-react";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

const bottomActions: ActionSheetAction[] = [
  {
    label: "Edit Document",
    onClick: () => console.log("Edit clicked"),
    icon: <Edit3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
  },
  {
    label: "Share with Team",
    onClick: () => console.log("Share clicked"),
    icon: <Share2 className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
  },
  {
    label: "Move to Trash",
    onClick: () => console.log("Delete clicked"),
    variant: "destructive",
    icon: <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />,
  },
];

export const BottomExample = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const bottomExampleCode = `
import React from "react";
import { Edit3, Share2, Trash2 } from "lucide-react";
import { ActionSheet, ActionSheetAction } from "@/components/custom/ActionSheet";

const bottomActions: ActionSheetAction[] = [
  { label: "Edit Document", onClick: () => console.log("Edit clicked"), icon: <Edit3 className="w-4 h-4 text-blue-600 dark:text-blue-400" /> },
  { label: "Share with Team", onClick: () => console.log("Share clicked"), icon: <Share2 className="w-4 h-4 text-blue-600 dark:text-blue-400" /> },
  { label: "Move to Trash", onClick: () => console.log("Delete clicked"), variant: "destructive", icon: <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" /> },
];

export const BottomExample = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <ActionSheet
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      setIsOpen={setIsOpen}
      title="Document Options"
      description="Choose an action for this item."
      actions={bottomActions}
      position="bottom"
      triggerButtonLabel="Open from Bottom"
    />
  );
};
`;

  return (
    <SnippetPreview title="Open from Bottom" code={bottomExampleCode}>
      <ActionSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        setIsOpen={setIsOpen}
        title="Document Options"
        description="Choose an action for this item."
        actions={bottomActions}
        position="bottom"
        triggerButtonLabel="Open from Bottom"
      />
    </SnippetPreview>
  );
};

// ------------------------
// Top Example
// ------------------------

const topActions: ActionSheetAction[] = [
  {
    label: "Copy Link",
    onClick: () => console.log("Copy clicked"),
    icon: <Copy className="w-4 h-4 text-green-600 dark:text-green-400" />,
  },
  {
    label: "Move to Trash",
    onClick: () => console.log("Remove clicked"),
    variant: "destructive",
    icon: <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />,
  },
];

export const TopExample = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const topExampleCode = `
import React from "react";
import { Copy, Trash2 } from "lucide-react";
import { ActionSheet, ActionSheetAction } from "@/components/custom/ActionSheet";

const topActions: ActionSheetAction[] = [
  { label: "Copy Link", onClick: () => console.log("Copy clicked"), icon: <Copy className="w-4 h-4 text-green-600 dark:text-green-400" /> },
  { label: "Move to Trash", onClick: () => console.log("Remove clicked"), variant: "destructive", icon: <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" /> },
];

export const TopExample = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <ActionSheet
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      setIsOpen={setIsOpen}
      title="Item Options"
      description="Choose an action for this item."
      actions={topActions}
      position="top"
      triggerButtonLabel="Open from Top"
    />
  );
};
`;

  return (
    <SnippetPreview title="Open from Top" code={topExampleCode}>
      <ActionSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        setIsOpen={setIsOpen}
        title="Item Options"
        description="Choose an action for this item."
        actions={topActions}
        position="top"
        triggerButtonLabel="Open from Top"
      />
    </SnippetPreview>
  );
};

// ------------------------
// Left Example
// ------------------------

const leftActions: ActionSheetAction[] = [
  {
    label: "Edit File",
    onClick: () => console.log("Edit File clicked"),
    icon: <Edit3 className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />,
  },
  {
    label: "Share File",
    onClick: () => console.log("Share File clicked"),
    icon: <Share2 className="w-4 h-4 text-yellow-600 dark:text-yellow-400" />,
  },
];

export const LeftExample = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const leftExampleCode = `
import React from "react";
import { Edit3, Share2 } from "lucide-react";
import { ActionSheet, ActionSheetAction } from "@/components/custom/ActionSheet";

const leftActions: ActionSheetAction[] = [
  { label: "Edit File", onClick: () => console.log("Edit File clicked"), icon: <Edit3 className="w-4 h-4 text-yellow-600 dark:text-yellow-400" /> },
  { label: "Share File", onClick: () => console.log("Share File clicked"), icon: <Share2 className="w-4 h-4 text-yellow-600 dark:text-yellow-400" /> },
];

export const LeftExample = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <ActionSheet
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      setIsOpen={setIsOpen}
      title="File Actions"
      description="Choose an action for this file."
      actions={leftActions}
      position="left"
      triggerButtonLabel="Open from Left"
    />
  );
};
`;

  return (
    <SnippetPreview title="Open from Left" code={leftExampleCode}>
      <ActionSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        setIsOpen={setIsOpen}
        title="File Actions"
        description="Choose an action for this file."
        actions={leftActions}
        position="left"
        triggerButtonLabel="Open from Left"
      />
    </SnippetPreview>
  );
};

// ------------------------
// Right Example
// ------------------------

const rightActions: ActionSheetAction[] = [
  {
    label: "Duplicate",
    onClick: () => console.log("Duplicate clicked"),
    icon: <Copy className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
  },
  {
    label: "Delete",
    onClick: () => console.log("Delete clicked"),
    variant: "destructive",
    icon: <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />,
  },
];

export const RightExample = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const rightExampleCode = `
import React from "react";
import { Copy, Trash2 } from "lucide-react";
import { ActionSheet, ActionSheetAction } from "@/components/custom/ActionSheet";

const rightActions: ActionSheetAction[] = [
  { label: "Duplicate", onClick: () => console.log("Duplicate clicked"), icon: <Copy className="w-4 h-4 text-purple-600 dark:text-purple-400" /> },
  { label: "Delete", onClick: () => console.log("Delete clicked"), variant: "destructive", icon: <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" /> },
];

export const RightExample = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <ActionSheet
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      setIsOpen={setIsOpen}
      title="File Actions"
      description="Choose an action for this file."
      actions={rightActions}
      position="right"
      triggerButtonLabel="Open from Right"
    />
  );
};
`;

  return (
    <SnippetPreview title="Open from Right" code={rightExampleCode}>
      <ActionSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        setIsOpen={setIsOpen}
        title="File Actions"
        description="Choose an action for this file."
        actions={rightActions}
        position="right"
        triggerButtonLabel="Open from Right"
      />
    </SnippetPreview>
  );
};
