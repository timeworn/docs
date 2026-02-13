"use client";

import { useEffect, useState } from "react";

export function AnalogClock() {
  const [time, setTime] = useState(new Date());
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  if (!mounted) return null;

  const seconds = time.getSeconds();
  const minutes = time.getMinutes();
  const hours = time.getHours() % 12;

  const secondDeg = seconds * 6;
  const minuteDeg = minutes * 6 + seconds * 0.1;
  const hourDeg = hours * 30 + minutes * 0.5;

  const hourMarkers = Array.from({ length: 12 }, (_, i) => {
    const angle = (i * 30 * Math.PI) / 180;
    const isQuarter = i % 3 === 0;
    const outerR = 45;
    const innerR = isQuarter ? 39 : 41;
    return {
      x1: 50 + innerR * Math.sin(angle),
      y1: 50 - innerR * Math.cos(angle),
      x2: 50 + outerR * Math.sin(angle),
      y2: 50 - outerR * Math.cos(angle),
      isQuarter,
    };
  });

  const minuteMarkers = Array.from({ length: 60 }, (_, i) => {
    if (i % 5 === 0) return null;
    const angle = (i * 6 * Math.PI) / 180;
    return {
      x1: 50 + 43 * Math.sin(angle),
      y1: 50 - 43 * Math.cos(angle),
      x2: 50 + 45 * Math.sin(angle),
      y2: 50 - 45 * Math.cos(angle),
    };
  }).filter(Boolean);

  const romanNumerals = ["XII", "I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI"];

  return (
    <div className="relative">
      {/* Outer glow */}
      <div className="absolute inset-0 rounded-full bg-primary/5 blur-3xl scale-150" />

      <svg
        viewBox="0 0 100 100"
        className="w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96 relative z-10 drop-shadow-2xl"
        aria-label={`Analog clock showing ${time.toLocaleTimeString()}`}
        role="img"
      >
        {/* Clock face */}
        <circle cx="50" cy="50" r="48" fill="hsl(var(--card))" stroke="hsl(var(--border))" strokeWidth="0.5" />
        <circle cx="50" cy="50" r="47" fill="none" stroke="hsl(var(--primary) / 0.15)" strokeWidth="0.3" />

        {/* Minute markers */}
        {minuteMarkers.map((m, i) => (
          <line
            key={`min-${i}`}
            x1={m!.x1}
            y1={m!.y1}
            x2={m!.x2}
            y2={m!.y2}
            stroke="hsl(var(--muted-foreground) / 0.3)"
            strokeWidth="0.3"
          />
        ))}

        {/* Hour markers */}
        {hourMarkers.map((m, i) => (
          <line
            key={`hour-${i}`}
            x1={m.x1}
            y1={m.y1}
            x2={m.x2}
            y2={m.y2}
            stroke={m.isQuarter ? "hsl(var(--primary))" : "hsl(var(--foreground) / 0.5)"}
            strokeWidth={m.isQuarter ? "0.8" : "0.5"}
          />
        ))}

        {/* Roman numerals */}
        {romanNumerals.map((num, i) => {
          const angle = (i * 30 * Math.PI) / 180;
          const r = 36;
          const x = 50 + r * Math.sin(angle);
          const y = 50 - r * Math.cos(angle) + 1.5;
          return (
            <text
              key={num}
              x={x}
              y={y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="hsl(var(--foreground) / 0.6)"
              fontSize="3"
              fontFamily="var(--font-playfair), Georgia, serif"
              fontWeight={i % 3 === 0 ? "700" : "400"}
            >
              {num}
            </text>
          );
        })}

        {/* Inner decorative circle */}
        <circle cx="50" cy="50" r="30" fill="none" stroke="hsl(var(--border) / 0.3)" strokeWidth="0.2" />

        {/* Hour hand */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="26"
          stroke="hsl(var(--foreground))"
          strokeWidth="1.8"
          strokeLinecap="round"
          transform={`rotate(${hourDeg}, 50, 50)`}
          className="transition-transform duration-300"
        />

        {/* Minute hand */}
        <line
          x1="50"
          y1="50"
          x2="50"
          y2="16"
          stroke="hsl(var(--foreground) / 0.85)"
          strokeWidth="1"
          strokeLinecap="round"
          transform={`rotate(${minuteDeg}, 50, 50)`}
          className="transition-transform duration-300"
        />

        {/* Second hand */}
        <g transform={`rotate(${secondDeg}, 50, 50)`}>
          <line x1="50" y1="56" x2="50" y2="12" stroke="hsl(var(--primary))" strokeWidth="0.4" strokeLinecap="round" />
          <circle cx="50" cy="12" r="1" fill="hsl(var(--primary))" />
        </g>

        {/* Center pin */}
        <circle cx="50" cy="50" r="1.5" fill="hsl(var(--primary))" />
        <circle cx="50" cy="50" r="0.8" fill="hsl(var(--card))" />
      </svg>
    </div>
  );
}
