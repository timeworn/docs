import { RootProvider } from "fumadocs-ui/provider/next";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/footer";
import { HomeLayout } from "@/components/layout/home";
import { baseOptions } from "@/lib/layout.shared";
import { DocsLayout } from "@/components/layout/docs";
import { source } from "@/lib/source";

const inter = Inter({
  subsets: ["latin"],
});

export default function Layout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={inter.className} suppressHydrationWarning>
      <body className="flex min-h-screen flex-col">
        <RootProvider
          theme={{
            disableTransitionOnChange: false,
          }}
        >
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
            preChildren={<HomeLayout {...baseOptions()} />}
          >
            {children}
          </DocsLayout>
        </RootProvider>
        <Footer />
      </body>
    </html>
  );
}
