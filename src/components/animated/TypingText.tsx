"use client";

import {
  ElementType,
  useEffect,
  useRef,
  useState,
  createElement,
  useMemo,
  useCallback,
} from "react";
import { motion } from "framer-motion";

interface TypingTextProps extends Omit<React.ComponentProps<"div">, "content"> {
  content: string | string[];
  as?: ElementType;
  speed?: number;
  startDelay?: number;
  pause?: number;
  eraseSpeed?: number;
  repeat?: boolean;
  cursor?: boolean;
  cursorChar?: string | React.ReactNode;
  cursorHide?: boolean;
  cursorClass?: string;
  cursorBlink?: number;
  colors?: string[];
  randomSpeed?: { min: number; max: number };
  onComplete?: (content: string, index: number) => void;
  triggerOnView?: boolean;
  reversed?: boolean;
}

const TypingText = ({
  content,
  as: Component = "div",
  speed = 50,
  startDelay = 0,
  pause = 2000,
  eraseSpeed = 30,
  repeat = true,
  className = "",
  cursor = true,
  cursorHide = false,
  cursorChar = "|",
  cursorClass = "",
  cursorBlink = 0.5,
  colors = [],
  randomSpeed,
  onComplete,
  triggerOnView = false,
  reversed = false,
  ...props
}: TypingTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [erasing, setErasing] = useState(false);
  const [textIndex, setTextIndex] = useState(0);
  const [visible, setVisible] = useState(!triggerOnView);
  const containerRef = useRef<HTMLElement>(null);

  const contentArray = useMemo(
    () => (Array.isArray(content) ? content : [content]),
    [content]
  );

  const getSpeed = useCallback(() => {
    if (!randomSpeed) return speed;
    const { min, max } = randomSpeed;
    return Math.random() * (max - min) + min;
  }, [randomSpeed, speed]);

  const getTextColor = () => {
    if (colors.length === 0) return;
    return colors[textIndex % colors.length];
  };

  useEffect(() => {
    if (!triggerOnView || !containerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setVisible(true);
          }
        });
      },
      { threshold: 0.1 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [triggerOnView]);

  useEffect(() => {
    if (!visible) return;

    let timeout: NodeJS.Timeout;

    const currentContent = contentArray[textIndex];
    const processedContent = reversed
      ? currentContent.split("").reverse().join("")
      : currentContent;

    const runAnimation = () => {
      if (erasing) {
        if (displayText === "") {
          setErasing(false);
          if (textIndex === contentArray.length - 1 && !repeat) {
            return;
          }

          if (onComplete) {
            onComplete(contentArray[textIndex], textIndex);
          }

          setTextIndex((prev) => (prev + 1) % contentArray.length);
          setCharIndex(0);
          timeout = setTimeout(() => {}, pause);
        } else {
          timeout = setTimeout(() => {
            setDisplayText((prev) => prev.slice(0, -1));
          }, eraseSpeed);
        }
      } else {
        if (charIndex < processedContent.length) {
          timeout = setTimeout(
            () => {
              setDisplayText((prev) => prev + processedContent[charIndex]);
              setCharIndex((prev) => prev + 1);
            },
            randomSpeed ? getSpeed() : speed
          );
        } else if (contentArray.length > 1) {
          timeout = setTimeout(() => {
            setErasing(true);
          }, pause);
        }
      }
    };

    if (charIndex === 0 && !erasing && displayText === "") {
      timeout = setTimeout(runAnimation, startDelay);
    } else {
      runAnimation();
    }

    return () => clearTimeout(timeout);
  }, [
    charIndex,
    displayText,
    erasing,
    speed,
    eraseSpeed,
    pause,
    contentArray,
    textIndex,
    repeat,
    startDelay,
    visible,
    reversed,
    randomSpeed,
    onComplete,
    getSpeed,
  ]);

  const hideCursor =
    cursorHide && (charIndex < contentArray[textIndex].length || erasing);

  return createElement(
    Component,
    {
      ref: containerRef,
      className: `inline-block whitespace-pre-wrap tracking-tight ${className}`,
      ...props,
    },
    <span className="inline" style={{ color: getTextColor() || "inherit" }}>
      {displayText}
    </span>,
    cursor && (
      <motion.span
        className={`ml-1 inline-block ${
          hideCursor ? "hidden" : ""
        } ${cursorClass}`}
        animate={{ opacity: [1, 0] }}
        transition={{
          duration: cursorBlink,
          repeat: Infinity,
          repeatType: "reverse",
          ease: "easeInOut",
        }}
      >
        {cursorChar}
      </motion.span>
    )
  );
};

export default TypingText;
