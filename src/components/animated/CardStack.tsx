"use client";

import React from "react";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CardItem {
  id?: string | number;
  title: string;
  subtitle: string;
  image: string;
  color: string;
}

export interface CardStackProps {
  cards: CardItem[];
  className?: string;
}

export const CardStack: React.FC<CardStackProps> = ({ cards, className }) => {
  return (
    <div className={cn("group/cardstack flex flex-col gap-4", className)}>
      {cards.map((card, index) => (
        <div
          key={card.id || index}
          className={cn(
            "relative flex h-[100px] w-[250px] flex-col items-center justify-center group/card",
            "rounded-lg text-white cursor-pointer transition-all duration-500 overflow-hidden",
            card.color,
            "group-hover/cardstack:blur-sm group-hover/cardstack:scale-90",
            "hover:!scale-110 hover:!blur-none hover:bg-transparent"
          )}
        >
          {/* Background image with opacity overlay */}
          <Image
            src={card.image}
            alt={card.title}
            fill
            className="absolute inset-0 rounded-lg object-cover opacity-70 group-hover/card:opacity-100 transition-opacity duration-500"
          />
          <div className="absolute inset-0 rounded-lg bg-black/40 group-hover/card:bg-transparent transition-colors duration-500" />

          {/* Text content */}
          <div className="relative z-10 text-center group-hover/card:opacity-0 transition-opacity duration-300 pointer-events-none">
            <p className="text-lg font-bold text-white">{card.title}</p>
            <p className="text-sm text-white/90">{card.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
};
