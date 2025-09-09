"use client";

import { Showcase } from "@/components/ui/Showcase";
import { ActionSheet } from "../ActionSheet";
import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Edit3, Share2, Trash2, Copy } from "lucide-react";

// Default Variant Example
export const DefaultVariantExample = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const actions = [
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
      variant: "destructive" as const,
      icon: <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />,
    },
  ];

  return (
    <Showcase
      title="Default Variant"
      imports={[
        "import { ActionSheet } from '@/components/custom/ActionSheet'",
        "import { Edit3, Share2, Trash2 } from 'lucide-react'",
      ]}
      scope={{
        React,
        motion,
        AnimatePresence,
        X,
        Edit3,
        Share2,
        Trash2,
        ActionSheet,
      }}
    >
      <ActionSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        setIsOpen={setIsOpen}
        title="Document Options"
        description="Choose an action for this document."
        actions={actions}
        triggerButtonLabel="Open Document Actions"
        triggerButtonProps={{ variant: "default", size: "default" }}
      />
    </Showcase>
  );
};

// Filled Variant Example
export const FilledVariantExample = () => {
  const [isOpen, setIsOpen] = React.useState(false);

  const actions = [
    {
      label: "Copy Link",
      onClick: () => console.log("Copy clicked"),
      icon: <Copy className="w-4 h-4 text-blue-600 dark:text-blue-400" />,
    },
    {
      label: "Move to Trash",
      onClick: () => console.log("Remove clicked"),
      variant: "destructive" as const,
      icon: <Trash2 className="w-4 h-4 text-red-600 dark:text-red-400" />,
    },
  ];

  return (
    <Showcase
      title="Filled Variant"
      imports={[
        "import { ActionSheet } from '@/components/custom/ActionSheet'",
        "import { Copy, Trash2 } from 'lucide-react'",
      ]}
      scope={{
        React,
        motion,
        AnimatePresence,
        X,
        Copy,
        Trash2,
        ActionSheet,
      }}
    >
      <ActionSheet
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        setIsOpen={setIsOpen}
        title="Item Actions"
        description="Manage this item with the options below."
        actions={actions}
        variant="filled"
        cancelLabel="Close"
        triggerButtonLabel="Open Item Actions"
        triggerButtonProps={{ variant: "secondary", size: "sm" }}
      />
    </Showcase>
  );
};
