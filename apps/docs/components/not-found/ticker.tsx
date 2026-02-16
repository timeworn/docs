"use client";

import { useEffect, useState } from "react";

const phrases = [
  "This moment doesn't exist.",
  "Time slipped away.",
  "You've wandered off the timeline.",
  "The clock has no hands here.",
  "This page was lost in time.",
  "Some moments were never meant to be found.",
  "The present is elsewhere.",
];

export const Ticker = () => {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const phrase = phrases[index];

    if (isTyping) {
      if (displayed.length < phrase.length) {
        const timeout = setTimeout(() => {
          setDisplayed(phrase.slice(0, displayed.length + 1));
        }, 50);
        return () => clearTimeout(timeout);
      } else {
        const timeout = setTimeout(() => setIsTyping(false), 3000);
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayed.length > 0) {
        const timeout = setTimeout(() => {
          setDisplayed(displayed.slice(0, -1));
        }, 30);
        return () => clearTimeout(timeout);
      } else {
        setIndex((prev) => (prev + 1) % phrases.length);
        setIsTyping(true);
      }
    }
  }, [displayed, isTyping, index]);

  return (
    <div className="h-8 flex items-center justify-center">
      <p className="text-muted-foreground text-sm md:text-base tracking-wide font-sans">
        {displayed}
        <span className="inline-block w-0.5 h-4 bg-primary ml-0.5 animate-pulse" />
      </p>
    </div>
  );
};
