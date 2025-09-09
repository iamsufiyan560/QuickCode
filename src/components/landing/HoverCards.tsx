"use client";

import Image from "next/image";

const cards = [
  {
    color: "bg-rose-500",
    title: "Curious Cat",
    subtitle: "Always exploring",
    img: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0fGVufDB8fDB8fHww",
  },
  {
    color: "bg-blue-500",
    title: "Chill Cat",
    subtitle: "Cool and calm",
    img: "https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8Y2F0fGVufDB8fDB8fHww",
  },
  {
    color: "bg-green-500",
    title: "Playful Cat",
    subtitle: "Full of energy",
    img: "https://images.unsplash.com/photo-1519052537078-e6302a4968d4?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MjF8fGNhdHxlbnwwfHwwfHx8MA%3D%3D",
  },
];

export default function HoverCards() {
  return (
    <div className="group flex flex-col gap-4">
      {cards.map((card, i) => (
        <div
          key={i}
          className={`
            relative flex h-[100px] w-[250px] flex-col items-center justify-center
            rounded-lg text-white cursor-pointer transition-all duration-500
            ${card.color}
            group-hover:blur-sm group-hover:scale-90
            hover:!scale-110 hover:!blur-none
          `}
        >
          {/* Background image with opacity overlay */}
          <Image
            src={card.img}
            alt={card.title}
            fill
            className="absolute inset-0 rounded-lg object-cover opacity-70"
          />
          <div className="absolute inset-0 rounded-lg bg-black/40" />

          {/* Text */}
          <div className="relative z-10 text-center">
            <p className="text-lg font-bold">{card.title}</p>
            <p className="text-sm">{card.subtitle}</p>
          </div>
        </div>
      ))}
    </div>
  );
}
