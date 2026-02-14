// 'use client';
// import { cva } from 'class-variance-authority';
// import { Airplay, Moon, Sun } from 'lucide-react';
// import { useTheme } from 'next-themes';
// import { ComponentProps, useEffect, useState } from 'react';
// import { cn } from '../../lib/utils';

// const itemVariants = cva('size-6.5 p-1.5 text-fd-muted-foreground', {
//   variants: {
//     active: {
//       true: 'bg-fd-accent text-fd-accent-foreground',
//       false: 'text-fd-muted-foreground',
//     },
//   },
// });

// const full = [['light', Sun] as const, ['dark', Moon] as const, ['system', Airplay] as const];

// export function ThemeToggle({
//   className,
//   mode = 'light-dark',
//   ...props
// }: ComponentProps<'div'> & {
//   mode?: 'light-dark' | 'light-dark-system';
// }) {
//   const { setTheme, theme, resolvedTheme } = useTheme();
//   const [mounted, setMounted] = useState(false);

//   useEffect(() => {
//     setMounted(true);
//   }, []);

//   const container = cn(
//     'inline-flex items-center rounded-full border p-1 *:rounded-full',
//     className,
//   );

//   if (mode === 'light-dark') {
//     const value = mounted ? resolvedTheme : null;

//     return (
//       <button
//         className={container}
//         aria-label={`Toggle Theme`}
//         onClick={() => setTheme(value === 'light' ? 'dark' : 'light')}
//         data-theme-toggle=""
//       >
//         {full.map(([key, Icon]) => {
//           if (key === 'system') return;

//           return (
//             <Icon
//               key={key}
//               fill="currentColor"
//               className={cn(itemVariants({ active: value === key }))}
//             />
//           );
//         })}
//       </button>
//     );
//   }

//   const value = mounted ? theme : null;

//   return (
//     <div className={container} data-theme-toggle="" {...props}>
//       {full.map(([key, Icon]) => (
//         <button
//           key={key}
//           aria-label={key}
//           className={cn(itemVariants({ active: value === key }))}
//           onClick={() => setTheme(key)}
//         >
//           <Icon className="size-full" fill="currentColor" />
//         </button>
//       ))}
//     </div>
//   );
// }

"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
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
      <Button variant="outline" size="icon" disabled>
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
      className="relative overflow-hidden"
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
}
