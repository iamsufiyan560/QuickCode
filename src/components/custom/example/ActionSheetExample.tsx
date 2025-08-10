"use client";

import React from "react";
import { Copy, Edit3, Share2, Trash2, Download } from "lucide-react";
import {
  ActionSheet,
  ActionSheetAction,
} from "@/components/custom/ActionSheet";
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
    label: "Download File",
    onClick: () => console.log("Download clicked"),
    icon: <Download className="w-4 h-4 text-green-600 dark:text-green-400" />,
  },
  {
    label: "Move to Trash",
    onClick: () => console.log("Delete clicked"),
    variant: "destructive",
    icon: <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />,
  },
];

export const BottomExample = () => {
  const bottomExampleCode = `"use client";

import React from "react";
import { Edit3, Share2, Download, Trash2 } from "lucide-react";
import { ActionSheet, ActionSheetAction } from "@/components/ui/ActionSheet";

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
    label: "Download File",
    onClick: () => console.log("Download clicked"),
    icon: <Download className="w-4 h-4 text-green-600 dark:text-green-400" />,
  },
  {
    label: "Move to Trash",
    onClick: () => console.log("Delete clicked"),
    variant: "destructive",
    icon: <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />,
  },
];

export const BottomExample = () => {
  return (
    <ActionSheet position="bottom">
      <ActionSheet.Trigger>Open from Bottom</ActionSheet.Trigger>
      
      <ActionSheet.Header>
        <ActionSheet.Title>Document Options</ActionSheet.Title>
        <ActionSheet.Description>
          Choose an action for this document.
        </ActionSheet.Description>
      </ActionSheet.Header>
      
      <ActionSheet.Content>
        <ActionSheet.Actions actions={bottomActions} />
      </ActionSheet.Content>
      
      <ActionSheet.Footer />
    </ActionSheet>
  );
};`;

  return (
    <SnippetPreview title="Open from Bottom" code={bottomExampleCode}>
      <ActionSheet position="bottom">
        <ActionSheet.Trigger>Open from Bottom</ActionSheet.Trigger>

        <ActionSheet.Header>
          <ActionSheet.Title>Document Options</ActionSheet.Title>
          <ActionSheet.Description>
            Choose an action for this document.
          </ActionSheet.Description>
        </ActionSheet.Header>

        <ActionSheet.Content>
          <ActionSheet.Actions actions={bottomActions} />
        </ActionSheet.Content>

        <ActionSheet.Footer />
      </ActionSheet>
    </SnippetPreview>
  );
};

const topActions: ActionSheetAction[] = [
  {
    label: "Copy Link",
    onClick: () => console.log("Copy clicked"),
    icon: <Copy className="w-4 h-4 text-green-600 dark:text-green-400" />,
  },
  {
    label: "Edit Item",
    onClick: () => console.log("Edit clicked"),
    icon: <Edit3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
  },
  {
    label: "Move to Trash",
    onClick: () => console.log("Remove clicked"),
    variant: "destructive",
    icon: <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />,
  },
];

export const TopExample = () => {
  const topExampleCode = `"use client";

import React from "react";
import { Copy, Edit3, Trash2 } from "lucide-react";
import { ActionSheet, ActionSheetAction } from "@/components/ui/ActionSheet";

const topActions: ActionSheetAction[] = [
  {
    label: "Copy Link",
    onClick: () => console.log("Copy clicked"),
    icon: <Copy className="w-4 h-4 text-green-600 dark:text-green-400" />,
  },
  {
    label: "Edit Item",
    onClick: () => console.log("Edit clicked"),
    icon: <Edit3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
  },
  {
    label: "Move to Trash",
    onClick: () => console.log("Remove clicked"),
    variant: "destructive",
    icon: <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />,
  },
];

export const TopExample = () => {
  return (
    <ActionSheet position="top">
      <ActionSheet.Trigger>Open from Top</ActionSheet.Trigger>
      <ActionSheet.Header>
        <ActionSheet.Title>Item Options</ActionSheet.Title>
        <ActionSheet.Description>
          Choose an action for this item.
        </ActionSheet.Description>
      </ActionSheet.Header>
      
      <ActionSheet.Content>
        <ActionSheet.Actions actions={topActions} />
      </ActionSheet.Content>
      
      <ActionSheet.Footer />
    </ActionSheet>
  );
};`;

  return (
    <SnippetPreview title="Open from Top" code={topExampleCode}>
      <ActionSheet position="top">
        <ActionSheet.Trigger>Open from Top</ActionSheet.Trigger>

        <ActionSheet.Header>
          <ActionSheet.Title>Item Options</ActionSheet.Title>
          <ActionSheet.Description>
            Choose an action for this item.
          </ActionSheet.Description>
        </ActionSheet.Header>

        <ActionSheet.Content>
          <ActionSheet.Actions actions={topActions} />
        </ActionSheet.Content>

        <ActionSheet.Footer />
      </ActionSheet>
    </SnippetPreview>
  );
};

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
  {
    label: "Download File",
    onClick: () => console.log("Download clicked"),
    icon: <Download className="w-4 h-4 text-green-600 dark:text-green-400" />,
  },
];

export const LeftExample = () => {
  const leftExampleCode = `"use client";

import React from "react";
import { Edit3, Share2, Download } from "lucide-react";
import { ActionSheet, ActionSheetAction } from "@/components/ui/ActionSheet";

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
  {
    label: "Download File",
    onClick: () => console.log("Download clicked"),
    icon: <Download className="w-4 h-4 text-green-600 dark:text-green-400" />,
  },
];

export const LeftExample = () => {
  return (
    <ActionSheet position="left">
      <ActionSheet.Trigger>Open from Left</ActionSheet.Trigger>
      
      <ActionSheet.Header>
        <ActionSheet.Title>File Actions</ActionSheet.Title>
        <ActionSheet.Description>
          Choose an action for this file.
        </ActionSheet.Description>
      </ActionSheet.Header>
      
      <ActionSheet.Content>
        <ActionSheet.Actions actions={leftActions} />
      </ActionSheet.Content>
    </ActionSheet>
  );
};`;

  return (
    <SnippetPreview title="Open from Left" code={leftExampleCode}>
      <ActionSheet position="left">
        <ActionSheet.Trigger>Open from Left</ActionSheet.Trigger>

        <ActionSheet.Header>
          <ActionSheet.Title>File Actions</ActionSheet.Title>
          <ActionSheet.Description>
            Choose an action for this file.
          </ActionSheet.Description>
        </ActionSheet.Header>

        <ActionSheet.Content>
          <ActionSheet.Actions actions={leftActions} />
        </ActionSheet.Content>
      </ActionSheet>
    </SnippetPreview>
  );
};

const rightActions: ActionSheetAction[] = [
  {
    label: "Duplicate",
    onClick: () => console.log("Duplicate clicked"),
    icon: <Copy className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
  },
  {
    label: "Edit Properties",
    onClick: () => console.log("Edit clicked"),
    icon: <Edit3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
  },
  {
    label: "Delete",
    onClick: () => console.log("Delete clicked"),
    variant: "destructive",
    icon: <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />,
  },
];

export const RightExample = () => {
  const rightExampleCode = `"use client";

import React from "react";
import { Copy, Edit3, Trash2 } from "lucide-react";
import { ActionSheet, ActionSheetAction } from "@/components/ui/ActionSheet";

const rightActions: ActionSheetAction[] = [
  {
    label: "Duplicate",
    onClick: () => console.log("Duplicate clicked"),
    icon: <Copy className="w-4 h-4 text-purple-600 dark:text-purple-400" />,
  },
  {
    label: "Edit Properties",
    onClick: () => console.log("Edit clicked"),
    icon: <Edit3 className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
  },
  {
    label: "Delete",
    onClick: () => console.log("Delete clicked"),
    variant: "destructive",
    icon: <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />,
  },
];

export const RightExample = () => {
  return (
    <ActionSheet position="right">
      <ActionSheet.Trigger>Open from Right</ActionSheet.Trigger>
      
      <ActionSheet.Header>
        <ActionSheet.Title>File Actions</ActionSheet.Title>
        <ActionSheet.Description>
          Choose an action for this file.
        </ActionSheet.Description>
      </ActionSheet.Header>
      
      <ActionSheet.Content>
        <ActionSheet.Actions actions={rightActions} />
      </ActionSheet.Content>
    </ActionSheet>
  );
};`;

  return (
    <SnippetPreview title="Open from Right" code={rightExampleCode}>
      <ActionSheet position="right">
        <ActionSheet.Trigger>Open from Right</ActionSheet.Trigger>

        <ActionSheet.Header>
          <ActionSheet.Title>File Actions</ActionSheet.Title>
          <ActionSheet.Description>
            Choose an action for this file.
          </ActionSheet.Description>
        </ActionSheet.Header>

        <ActionSheet.Content>
          <ActionSheet.Actions actions={rightActions} />
        </ActionSheet.Content>
      </ActionSheet>
    </SnippetPreview>
  );
};
