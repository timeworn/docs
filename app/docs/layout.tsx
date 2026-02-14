import { DocsLayout } from "@/components/layout/docs";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";
import type { ReactNode } from "react";

export default function Layout({ children }: { children: ReactNode }) {
  return (
    <DocsLayout
      {...baseOptions()}
      tree={source.getPageTree()}
      searchToggle={{ enabled: false }}
      themeSwitch={{ enabled: false }}
      githubUrl=""
      usesNav={true}
      sidebar={{
        collapsible: false,
      }}
    >
      {children}
    </DocsLayout>
  );
}
