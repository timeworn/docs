"use client";

import { useEffect, useState } from "react";

export function LiveTimestamp() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      setTime(
        now.toLocaleTimeString("en-US", {
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: true,
        }),
      );
    };
    update();
    const interval = setInterval(update, 1000);
    return () => clearInterval(interval);
  }, []);

  if (!time) return null;

  return (
    <div className="flex items-center gap-3 text-muted-foreground/50">
      <div className="w-1.5 h-1.5 rounded-full bg-primary/60 animate-pulse" />
      <time className="text-xs tracking-[0.2em] font-sans tabular-nums">{time}</time>
    </div>
  );
}
