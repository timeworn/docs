import { RootProvider } from "fumadocs-ui/provider/next";
import "./globals.css";
import { Inter } from "next/font/google";
import Footer from "@/components/footer";
import { HomeLayout } from "@/components/layout/home";
import { baseOptions } from "@/lib/layout.shared";

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
          <HomeLayout {...baseOptions()}>{children}</HomeLayout>
        </RootProvider>
        <Footer />
      </body>
    </html>
  );
}
