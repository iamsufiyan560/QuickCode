"use client";

import { useState } from "react";
import { Reorder, motion, useDragControls } from "framer-motion";

interface Card {
  id: number;
  title: string;
  description: string;
}

const initialCards: Card[] = [
  {
    id: 1,
    title: "Fast API Calls",
    description: "Optimized for speed and efficiency",
  },
  {
    id: 2,
    title: "Beautiful UI",
    description: "Tailwind + Framer Motion magic",
  },
];

export default function DraggableCards() {
  const [cards, setCards] = useState(initialCards);
  const [draggingId, setDraggingId] = useState<number | null>(null);

  return (
    <div className="max-w-5xl mx-auto py-16 px-4">
      <Reorder.Group
        axis="y"
        values={cards}
        onReorder={setCards}
        className="space-y-4"
      >
        {cards.map((card) => {
          const isDragging = draggingId === card.id;

          return (
            <Reorder.Item
              key={card.id}
              value={card}
              onDragStart={() => setDraggingId(card.id)}
              onDragEnd={() => setDraggingId(null)}
              dragListener
              className="cursor-grab"
            >
              <motion.div
                animate={{
                  scale: isDragging ? 1.05 : 1,
                  boxShadow: isDragging
                    ? "0 15px 35px rgba(72, 209, 204, 0.6)"
                    : "0 8px 20px rgba(0,0,0,0.4)",
                  background: isDragging
                    ? "linear-gradient(135deg, rgba(72,209,204,0.15), rgba(72,209,204,0.05))"
                    : "#1B1F3B",
                }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
                className="rounded-xl p-6 text-gray-100 border border-[#272B4D] shadow-lg"
              >
                <h3 className="text-xl font-semibold mb-2 text-teal-400">
                  {card.title}
                </h3>
                <p className="text-gray-300">{card.description}</p>
              </motion.div>
            </Reorder.Item>
          );
        })}
      </Reorder.Group>
    </div>
  );
}

// "use client";

// import { motion } from "framer-motion";
// import Image from "next/image";

// const TiltShowcase = () => {
//   return (
//     <motion.div
//       className="relative w-full h-72 rounded-2xl overflow-hidden shadow-xl cursor-pointer"
//       whileHover={{
//         rotateX: 10,
//         rotateY: -10,
//         scale: 1.05,
//       }}
//       transition={{ type: "spring", stiffness: 200, damping: 15 }}
//     >
//       <Image
//         src="https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8Y2F0fGVufDB8fDB8fHww"
//         alt="Cool Cat"
//         fill
//         className="object-cover"
//       />
//       <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent flex items-end p-4">
//         <h3 className="text-white text-lg font-bold">3D Tilt Showcase</h3>
//       </div>
//     </motion.div>
//   );
// };

// export default TiltShowcase;
