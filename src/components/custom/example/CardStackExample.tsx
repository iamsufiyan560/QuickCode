"use client";

import React from "react";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";
import { CardStack } from "@/components/animated/CardStack";

export const cards = [
  {
    id: 1,
    color: "bg-rose-500",
    title: "Curious Cat",
    subtitle: "Always exploring",
    image:
      "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0fGVufDB8fDB8fHww",
  },
  {
    id: 2,
    color: "bg-blue-500",
    title: "Chill Cat",
    subtitle: "Cool and calm",
    image:
      "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2F0fGVufDB8fDB8fHww",
  },
  {
    id: 3,
    color: "bg-green-500",
    title: "Playful Cat",
    subtitle: "Full of energy",
    image:
      "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGNhdHxlbnwwfHwwfHx8MA%3D%3D",
  },
];
// Default CardStack Example
export const DefaultCardStackExample = () => {
  const defaultCardStackCode = `
import { CardStack } from "@/components/custom/CardStack";

const cards = [
  {
    id: 1,
    color: "bg-rose-500",
    title: "Curious Cat",
    subtitle: "Always exploring",
    image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0fGVufDB8fDB8fHww",
  },
  {
    id: 2,
    color: "bg-blue-500",
    title: "Chill Cat",
    subtitle: "Cool and calm",
    image: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2F0fGVufDB8fDB8fHww",
  },
  {
    id: 3,
    color: "bg-green-500",
    title: "Playful Cat",
    subtitle: "Full of energy",
    image: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGNhdHxlbnwwfHwwfHx8MA%3D%3D",
  },
];

export const DefaultCardStackExample = () => {
  return <CardStack cards={cards} />;
};
`;

  return (
    <SnippetPreview title="Default Card Stack" code={defaultCardStackCode}>
      <CardStack cards={cards} />
    </SnippetPreview>
  );
};
