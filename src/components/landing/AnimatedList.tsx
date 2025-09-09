"use client";

import React, {
  useRef,
  useState,
  useEffect,
  ReactNode,
  MouseEventHandler,
  UIEvent,
} from "react";
import { motion, useInView } from "framer-motion";

interface ItemProps {
  children: ReactNode;
  delay?: number;
  idx: number;
  onHover?: MouseEventHandler<HTMLDivElement>;
  onPress?: MouseEventHandler<HTMLDivElement>;
}

const ListItem: React.FC<ItemProps> = ({
  children,
  delay = 0,
  idx,
  onHover,
  onPress,
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.5 });

  return (
    <motion.div
      ref={ref}
      data-id={idx}
      onMouseEnter={onHover}
      onClick={onPress}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={visible ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.25, delay }}
      className="mb-3 cursor-pointer"
    >
      {children}
    </motion.div>
  );
};

interface ListProps {
  data?: string[];
  onPick?: (val: string, idx: number) => void;
  gradients?: boolean;
  arrowKeys?: boolean;
  wrapperClass?: string;
  itemClass?: string;
  showScroll?: boolean;
  startIndex?: number;
}

const AnimatedList: React.FC<ListProps> = ({
  data = Array.from({ length: 10 }, (_, i) => `Item ${i + 1}`),
  onPick,
  gradients = true,
  arrowKeys = true,
  wrapperClass = "",
  itemClass = "",
  showScroll = true,
  startIndex = -1,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<number>(startIndex);
  const [usingKeys, setUsingKeys] = useState(false);
  const [topFade, setTopFade] = useState(0);
  const [bottomFade, setBottomFade] = useState(1);

  // handle scroll → fade opacity
  const handleScroll = (e: UIEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    setTopFade(Math.min(el.scrollTop / 50, 1));
    const remaining = el.scrollHeight - (el.scrollTop + el.clientHeight);
    setBottomFade(
      el.scrollHeight <= el.clientHeight ? 0 : Math.min(remaining / 50, 1)
    );
  };

  // keyboard nav
  useEffect(() => {
    if (!arrowKeys) return;
    const handleKeys = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown" || (e.key === "Tab" && !e.shiftKey)) {
        e.preventDefault();
        setUsingKeys(true);
        setActive((prev) => Math.min(prev + 1, data.length - 1));
      } else if (e.key === "ArrowUp" || (e.key === "Tab" && e.shiftKey)) {
        e.preventDefault();
        setUsingKeys(true);
        setActive((prev) => Math.max(prev - 1, 0));
      } else if (e.key === "Enter" && active >= 0) {
        e.preventDefault();
        onPick?.(data[active], active);
      }
    };
    window.addEventListener("keydown", handleKeys);
    return () => window.removeEventListener("keydown", handleKeys);
  }, [data, active, arrowKeys, onPick]);

  // auto-scroll selected into view
  useEffect(() => {
    if (!usingKeys || active < 0 || !containerRef.current) return;
    const el = containerRef.current;
    const chosen = el.querySelector(
      `[data-id="${active}"]`
    ) as HTMLElement | null;
    if (chosen) {
      const margin = 40;
      if (chosen.offsetTop < el.scrollTop + margin) {
        el.scrollTo({ top: chosen.offsetTop - margin, behavior: "smooth" });
      } else if (
        chosen.offsetTop + chosen.offsetHeight >
        el.scrollTop + el.clientHeight - margin
      ) {
        el.scrollTo({
          top:
            chosen.offsetTop + chosen.offsetHeight - el.clientHeight + margin,
          behavior: "smooth",
        });
      }
    }
    setUsingKeys(false);
  }, [active, usingKeys]);

  return (
    <div className={`relative w-[480px] ${wrapperClass}`}>
      <div
        ref={containerRef}
        onScroll={handleScroll}
        className={`max-h-[380px] overflow-y-auto p-4 ${
          showScroll
            ? "[&::-webkit-scrollbar]:w-[8px] [&::-webkit-scrollbar-track]:bg-[#060010] [&::-webkit-scrollbar-thumb]:bg-[#222] [&::-webkit-scrollbar-thumb]:rounded-[4px]"
            : "scrollbar-hide"
        }`}
        style={{
          scrollbarWidth: showScroll ? "thin" : "none",
          scrollbarColor: "#222 #060010",
        }}
      >
        {data.map((txt, idx) => (
          <ListItem
            key={idx}
            idx={idx}
            delay={0.1}
            onHover={() => setActive(idx)}
            onPress={() => {
              setActive(idx);
              onPick?.(txt, idx);
            }}
          >
            <div
              className={`p-3 rounded-lg transition-colors ${
                active === idx ? "bg-neutral-800" : "bg-neutral-900"
              } ${itemClass}`}
            >
              <p className="text-white text-sm">{txt}</p>
            </div>
          </ListItem>
        ))}
      </div>

      {gradients && (
        <>
          <div
            className="absolute top-0 left-0 right-0 h-12 bg-gradient-to-b from-black to-transparent pointer-events-none transition-opacity duration-300"
            style={{ opacity: topFade }}
          />
          <div
            className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black to-transparent pointer-events-none transition-opacity duration-300"
            style={{ opacity: bottomFade }}
          />
        </>
      )}
    </div>
  );
};

export default AnimatedList;
