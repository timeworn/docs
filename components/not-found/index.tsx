import Link from "next/link";
import { AnalogClock } from "./analog-clock";
import { Particles } from "./particles";
import { Ticker } from "./ticker";
import { LiveTimestamp } from "./live-timestamp";

export const NotFound = () => {
  return (
    <main className="bg-background relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-6">
      <Particles />

      {/* Radial ambient light */}
      <div
        className="pointer-events-none absolute top-1/2 left-1/2 h-[600px] w-[600px] -translate-x-1/2 -translate-y-1/2 rounded-full"
        style={{
          background:
            "radial-gradient(circle, hsl(var(--primary) / 0.04) 0%, transparent 70%)",
        }}
        aria-hidden="true"
      />

      <div className="relative z-10 flex flex-col items-center gap-8 md:gap-10">
        {/* 404 label */}
        <div className="flex items-center gap-3">
          <div className="bg-primary/40 h-px w-8 md:w-12" />
          <span className="text-muted-foreground font-sans text-xs tracking-[0.3em] uppercase md:text-sm">
            Error 404
          </span>
          <div className="bg-primary/40 h-px w-8 md:w-12" />
        </div>

        {/* The clock */}
        <AnalogClock />

        {/* Headline */}
        <div className="flex flex-col items-center gap-4 text-center">
          <h1 className="text-foreground font-serif text-4xl tracking-tight text-balance md:text-6xl lg:text-7xl">
            Lost in Time
          </h1>
          <p className="text-muted-foreground max-w-md text-center font-sans text-sm leading-relaxed md:text-base">
            The page you were looking for has drifted beyond the reach of the
            present. It may have existed once, or perhaps it never did.
          </p>
        </div>

        {/* Typing ticker */}
        <Ticker />

        {/* CTA */}
        <Link
          href="/"
          className="group border-primary/30 text-primary hover:bg-primary hover:text-primary-foreground relative inline-flex items-center gap-2 border px-6 py-3 font-sans text-sm tracking-wider uppercase transition-all duration-500"
        >
          <span className="relative z-10">Return to the Present</span>
          <svg
            className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M17 8l4 4m0 0l-4 4m4-4H3"
            />
          </svg>
        </Link>

        {/* Live timestamp */}
        <LiveTimestamp />
      </div>

      {/* Bottom decorative line */}
      <div
        className="bg-border absolute right-0 bottom-0 left-0 h-px"
        aria-hidden="true"
      />
    </main>
  );
};
