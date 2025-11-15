"use client";

import React, { useState } from "react";
import { SwipeStack } from "@/components/animated/SwipeStack";
import { SnippetPreview } from "@/components/helpers/SnippetPreview";

const stackData = [
  {
    id: "1",
    title: "Mountain Adventure",
    description: "Explore breathtaking peaks",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2370&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Ocean Paradise",
    description: "Dive into crystal waters",
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2370&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Urban Exploration",
    description: "Discover city landscapes",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2370&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Desert Dreams",
    description: "Wander through golden dunes",
    image:
      "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?q=80&w=2370&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "Forest Retreat",
    description: "Find peace among trees",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2370&auto=format&fit=crop",
  },
];

export function DefaultExample() {
  const [items, setItems] = useState(stackData);

  const handleSwipeComplete = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <SnippetPreview
      title="Swipe Stack"
      code={`"use client";

import React, { useState } from "react";
import { SwipeStack } from "@/components/ui/SwipeStack";

const stackData = [
  {
    id: "1",
    title: "Mountain Adventure",
    description: "Explore breathtaking peaks",
    image:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=2370&auto=format&fit=crop",
  },
  {
    id: "2",
    title: "Ocean Paradise",
    description: "Dive into crystal waters",
    image:
      "https://images.unsplash.com/photo-1559827260-dc66d52bef19?q=80&w=2370&auto=format&fit=crop",
  },
  {
    id: "3",
    title: "Urban Exploration",
    description: "Discover city landscapes",
    image:
      "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?q=80&w=2370&auto=format&fit=crop",
  },
  {
    id: "4",
    title: "Desert Dreams",
    description: "Wander through golden dunes",
    image:
      "https://images.unsplash.com/photo-1473580044384-7ba9967e16a0?q=80&w=2370&auto=format&fit=crop",
  },
  {
    id: "5",
    title: "Forest Retreat",
    description: "Find peace among trees",
    image:
      "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=2370&auto=format&fit=crop",
  },
];

export default function SwipeStackDemo() {
  const [items, setItems] = useState(stackData);

  const handleSwipeComplete = (id: string) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
  };

  return (
   <div className="flex items-center justify-center min-h-[600px] p-8">
        <SwipeStack className="w-full max-w-sm">
          {items.map((item, index) => {
            const isActive = index === items.length - 1;
            return (
              <SwipeStack.Item
                key={item.id}
                id={item.id}
                isActive={isActive}
                index={index}
                totalItems={items.length}
                onSwipeComplete={handleSwipeComplete}
                className="h-[400px] w-[280px]"
              >
                <SwipeStack.Image src={item.image} />
                <SwipeStack.Overlay>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-sm text-white/80">{item.description}</p>
                </SwipeStack.Overlay>
              </SwipeStack.Item>
            );
          })}
        </SwipeStack>
      </div>
  );
}`}
    >
      <div className="flex items-center justify-center min-h-[600px] p-8">
        <SwipeStack className="w-full max-w-sm ">
          {items.map((item, index) => {
            const isActive = index === items.length - 1;
            return (
              <SwipeStack.Item
                key={item.id}
                id={item.id}
                isActive={isActive}
                index={index}
                totalItems={items.length}
                onSwipeComplete={handleSwipeComplete}
                className="h-[400px] w-[280px]"
              >
                <SwipeStack.Image src={item.image} />
                <SwipeStack.Overlay>
                  <h3 className="text-xl font-bold text-white">{item.title}</h3>
                  <p className="text-sm text-white/80">{item.description}</p>
                </SwipeStack.Overlay>
              </SwipeStack.Item>
            );
          })}
        </SwipeStack>
      </div>
    </SnippetPreview>
  );
}
