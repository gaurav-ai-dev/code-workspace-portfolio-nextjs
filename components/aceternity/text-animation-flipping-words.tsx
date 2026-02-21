"use client";

import * as React from "react";
import { AnimatePresence, motion, animate } from "framer-motion";
import { cn } from "@/lib/utils";

type Props = {
  words: string[];
  className?: string;

  // ms per char (feel free to tweak)
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseBeforeDelete?: number;
  pauseBetweenWords?: number;
};

type Phase = "typing" | "pausing" | "deleting";

export function TextAnimationFlippingWords({
  words,
  className,

  // ✅ faster defaults
  typingSpeed = 60,
  deletingSpeed = 18,
  pauseBeforeDelete = 700,
  pauseBetweenWords = 200,
}: Props) {
  const safeWords = React.useMemo(() => words.filter(Boolean), [words]);

  const [wordIndex, setWordIndex] = React.useState(0);
  const [charIndex, setCharIndex] = React.useState(0);
  const [phase, setPhase] = React.useState<Phase>("typing");

  const word = safeWords[wordIndex] ?? "";

  const timeouts = React.useRef<number[]>([]);
  const animStop = React.useRef<null | (() => void)>(null);

  const clearAll = React.useCallback(() => {
    timeouts.current.forEach((t) => window.clearTimeout(t));
    timeouts.current = [];
    animStop.current?.();
    animStop.current = null;
  }, []);

  React.useEffect(() => {
    if (!safeWords.length) return;

    clearAll();

    // ✅ Smooth typing via framer-motion animate (RAF updates)
    if (phase === "typing") {
      const controls = animate(0, word.length, {
        duration: Math.max(word.length * typingSpeed, 1) / 1000,
        ease: "linear",
        onUpdate: (v) => setCharIndex(Math.floor(v)),
        onComplete: () => setPhase("pausing"),
      });
      animStop.current = () => controls.stop();
    }

    if (phase === "pausing") {
      const t = window.setTimeout(() => setPhase("deleting"), pauseBeforeDelete);
      timeouts.current.push(t);
    }

    if (phase === "deleting") {
      const controls = animate(word.length, 0, {
        duration: Math.max(word.length * deletingSpeed, 1) / 1000,
        ease: "linear",
        onUpdate: (v) => setCharIndex(Math.ceil(v)),
        onComplete: () => {
          const t = window.setTimeout(() => {
            setWordIndex((i) => (i + 1) % safeWords.length);
            setPhase("typing");
          }, pauseBetweenWords);
          timeouts.current.push(t);
        },
      });
      animStop.current = () => controls.stop();
    }

    return () => clearAll();
  }, [
    safeWords.length,
    word.length,
    typingSpeed,
    deletingSpeed,
    pauseBeforeDelete,
    pauseBetweenWords,
    phase,
    clearAll,
    wordIndex,
    word,
  ]);

  const visible = word.slice(0, Math.max(0, Math.min(charIndex, word.length)));
  const chars = visible.split("");

  return (
    <span className={cn("inline-flex flex-wrap", className)}>
      <span className="inline-flex flex-wrap items-center">
        <AnimatePresence initial={false} mode="popLayout">
          {chars.map((ch, i) => (
            <motion.span
              key={`${wordIndex}-${i}-${ch}`}
              initial={{ opacity: 0, rotateX: 85, y: 6, filter: "blur(3px)" }}
              animate={{ opacity: 1, rotateX: 0, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, rotateX: -85, y: -6, filter: "blur(3px)" }}
              transition={{ duration: 0.14, ease: [0.22, 1, 0.36, 1] }}
              style={{ transformOrigin: "50% 60%" }}
              className="inline-block will-change-transform text-white"
            >
              {ch === " " ? "\u00a0" : ch}
            </motion.span>
          ))}
        </AnimatePresence>

        {/* dot lives inside the chars span → always flows after the last character */}
        <motion.span
          aria-hidden
          className="h-2 w-2 rounded-full inline-block ml-1.5 self-center flex-shrink-0"
          animate={{
            backgroundColor:
              phase === "deleting"
                ? ["#fb7185", "#f43f5e", "#fb7185"]
                : ["#60a5fa", "#a78bfa", "#34d399", "#fbbf24", "#22d3ee", "#60a5fa"],
            boxShadow:
              phase === "deleting"
                ? [
                  "0 0 0px rgba(244,63,94,0.0)",
                  "0 0 10px rgba(244,63,94,0.55)",
                  "0 0 0px rgba(244,63,94,0.0)",
                ]
                : [
                  "0 0 0px rgba(96,165,250,0.0)",
                  "0 0 10px rgba(96,165,250,0.45)",
                  "0 0 0px rgba(167,139,250,0.0)",
                ],
          }}
          transition={{
            duration: phase === "deleting" ? 0.6 : 1.1,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </span>
    </span>
  );
}