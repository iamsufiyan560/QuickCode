"use client";

import React, { useState } from "react";
import { Card, DraggableCards } from "@/components/animated/DraggableCards";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

export const DefaultDraggableCardsExample = () => {
  const defaultDraggableCardsCode = `
import { DraggableCards } from "@/components/ui/DraggableCards";

export const DefaultDraggableCardsExample = () => {
  return <DraggableCards />;
};
`;

  return (
    <SnippetPreview
      title="Default Vertical Cards"
      code={defaultDraggableCardsCode}
    >
      <DraggableCards />
    </SnippetPreview>
  );
};

export const HorizontalDraggableCardsExample = () => {
  const horizontalCards = [
    {
      id: 1,
      title: "Project Alpha",
      description: "High-priority development task with tight deadline",
    },
    {
      id: 2,
      title: "Design Review",
      description: "UI/UX review session for the new dashboard",
    },
    {
      id: 3,
      title: "Code Review",
      description: "Review pull requests from the development team",
    },
    {
      id: 4,
      title: "Team Meeting",
      description: "Weekly sync with the entire development team",
    },
  ];

  const horizontalDraggableCardsCode = `
import { DraggableCards } from "@/components/ui/DraggableCards";

export const HorizontalDraggableCardsExample = () => {
  const horizontalCards = [
    {
      id: 1,
      title: "Project Alpha",
      description: "High-priority development task with tight deadline",
    },
    {
      id: 2,
      title: "Design Review",
      description: "UI/UX review session for the new dashboard",
    },
    {
      id: 3,
      title: "Code Review",
      description: "Review pull requests from the development team",
    },
    {
      id: 4,
      title: "Team Meeting",
      description: "Weekly sync with the entire development team",
    },
  ];

  return <DraggableCards cards={horizontalCards} horizontal />;
};
`;

  return (
    <SnippetPreview
      title="Horizontal Draggable Cards"
      code={horizontalDraggableCardsCode}
    >
      <DraggableCards cards={horizontalCards} horizontal />
    </SnippetPreview>
  );
};

export const BorderedDraggableCardsExample = () => {
  const borderedCards = [
    {
      id: 1,
      title: "Marketing Campaign",
      description:
        "Launch the new product marketing campaign across all channels",
    },
    {
      id: 2,
      title: "Customer Support",
      description: "Respond to customer inquiries and resolve pending tickets",
    },
    {
      id: 3,
      title: "Data Analysis",
      description: "Analyze user behavior data from the past quarter",
    },
  ];

  const borderedDraggableCardsCode = `
import { DraggableCards } from "@/components/ui/DraggableCards";

export const BorderedDraggableCardsExample = () => {
  const borderedCards = [
    {
      id: 1,
      title: "Marketing Campaign",
      description:
        "Launch the new product marketing campaign across all channels",
    },
    {
      id: 2,
      title: "Customer Support",
      description: "Respond to customer inquiries and resolve pending tickets",
    },
    {
      id: 3,
      title: "Data Analysis",
      description: "Analyze user behavior data from the past quarter",
    },
  ];

  return <DraggableCards cards={borderedCards} variant="bordered" />;
};
`;

  return (
    <SnippetPreview title="Bordered Variant" code={borderedDraggableCardsCode}>
      <DraggableCards cards={borderedCards} variant="bordered" />
    </SnippetPreview>
  );
};

export const LargeDraggableCardsExample = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "System Architecture",
      description:
        "Design and implement scalable system architecture for the new platform",
    },
    {
      id: 2,
      title: "Database Optimization",
      description:
        "Optimize database queries and improve overall performance metrics",
    },
  ]);

  const handleReorder = (newTasks: Card[]) => {
    setTasks(newTasks);
    console.log("Tasks reordered:", newTasks);
  };

  // 🔑 full code string (for Code tab + copy button)
  const largeDraggableCardsCode = `
import { useState } from "react";
import { Card ,  DraggableCards } from "@/components/ui/DraggableCards";

export const LargeDraggableCardsExample = () => {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "System Architecture",
      description:
        "Design and implement scalable system architecture for the new platform",
    },
    {
      id: 2,
      title: "Database Optimization",
      description:
        "Optimize database queries and improve overall performance metrics",
    },
  ]);

  const handleReorder = (newTasks) => {
    setTasks(newTasks);
    console.log("Tasks reordered:", newTasks);
  };

  return (
    <DraggableCards
      cards={tasks}
      variant="filled"
      size="lg"
      onReorder={handleReorder}
    />
  );
};
`;

  return (
    <SnippetPreview
      title="Large Size with Custom Handler"
      code={largeDraggableCardsCode}
    >
      <DraggableCards
        cards={tasks}
        variant="filled"
        size="lg"
        onReorder={handleReorder}
      />
    </SnippetPreview>
  );
};
