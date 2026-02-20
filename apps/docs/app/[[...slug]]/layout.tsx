import { DocsLayout } from "@/components/layout/docs";
import { baseOptions } from "@/lib/layout.shared";
import { source } from "@/lib/source";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <DocsLayout
      {...baseOptions()}
      tree={source.getPageTree()}
      usesNav={true}
      sidebar={{
        collapsible: false,
      }}
      searchToggle={{ enabled: false }}
      themeSwitch={{ enabled: false }}
    >
      {children}
    </DocsLayout>
  );
};

export default Layout;
