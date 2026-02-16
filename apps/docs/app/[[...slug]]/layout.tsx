import { DocsLayout } from "@/components/layout/docs"
import { baseOptions } from "@/lib/layout.shared"
import { source } from "@/lib/source"
import type { FC } from "react";

interface LayoutProps {
  children: Readonly<React.ReactNode>;
}

const Layout: FC<LayoutProps> = ({ children}) => {
    return             <DocsLayout
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
}

export default Layout;