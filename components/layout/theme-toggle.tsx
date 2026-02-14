"use client";

import { useTheme } from "next-themes";
import { useEffect, useState, type ComponentProps, type FC } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export const ThemeToggle: FC<ComponentProps<typeof Button>> = ({
  className,
  ...props
}) => {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isDark = resolvedTheme === "dark";

  function toggleTheme() {
    setTheme(isDark ? "light" : "dark");
  }

  if (!mounted) {
    return (
      <Button
        variant="outline"
        size="icon"
        className={className}
        {...props}
        disabled
      >
        <span className="h-5 w-5" />
        <span className="sr-only">Toggle theme</span>
      </Button>
    );
  }

  return (
    <Button
      variant="outline"
      size="icon"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className={cn("relative overflow-hidden", className)}
      {...props}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          "absolute h-5 w-5 transition-all duration-500 ease-in-out",
          isDark
            ? "scale-0 rotate-90 opacity-0"
            : "scale-100 rotate-0 opacity-100",
        )}
      >
        <circle cx="12" cy="12" r="4" />
        <path d="M12 2v2" />
        <path d="M12 20v2" />
        <path d="m4.93 4.93 1.41 1.41" />
        <path d="m17.66 17.66 1.41 1.41" />
        <path d="M2 12h2" />
        <path d="M20 12h2" />
        <path d="m6.34 17.66-1.41 1.41" />
        <path d="m19.07 4.93-1.41 1.41" />
      </svg>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className={cn(
          "absolute h-5 w-5 transition-all duration-500 ease-in-out",
          isDark
            ? "scale-100 rotate-0 opacity-100"
            : "scale-0 -rotate-90 opacity-0",
        )}
      >
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z" />
        <path
          d="M19 3v4"
          className={cn(
            "origin-center transition-all delay-200 duration-300",
            isDark ? "scale-100 opacity-100" : "scale-0 opacity-0",
          )}
        />
        <path
          d="M21 5h-4"
          className={cn(
            "origin-center transition-all delay-300 duration-300",
            isDark ? "scale-100 opacity-100" : "scale-0 opacity-0",
          )}
        />
      </svg>

      <span className="sr-only">Toggle theme</span>
    </Button>
  );
};
