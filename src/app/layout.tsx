import { Footer, Layout, Link, Navbar } from "nextra-theme-docs";
import { Banner, Head } from "nextra/components";
import { getPageMap } from "nextra/page-map";
import "nextra-theme-docs/style.css";
import { ReactNode } from "react";
import "./globals.css";
import { Metadata, Viewport } from "next";
import { Constants } from "@/Constants";
import { getImageUrl } from "@/utils/helpers";
import { Analytics } from "@/components/ui/Third-Parties/Analytics";

export const metadata: Metadata = {
  metadataBase: new URL(Constants.API_URL),
  title: {
    default: Constants.SITE_NAME,
    template: `%s | ${Constants.SITE_NAME}`,
  },
  description: "Create applications using Timeworn's services.",
  keywords: [
    Constants.SITE_NAME,
    "Revived Witch",
    "Rw",
    "Revived Witch Api",
    "Api",
    "Documentation",
    "Timeworn",
    "Timeworn Api",
    "Timeworn Docs",
    "Docs",
  ],
  applicationName: Constants.SITE_NAME,
  icons: {
    icon: getImageUrl("metadata/favicon.ico"),
    shortcut: getImageUrl("metadata/favicon.ico"),
    apple: getImageUrl("metadata/favicon.ico"),
  },
  appleWebApp: {
    title: Constants.SITE_NAME,
  },
  openGraph: {
    url: "./",
    siteName: Constants.SITE_NAME,
    images: getImageUrl("metadata/share_image.webp"),
    locale: "en_US",
    type: "website",
  },
  alternates: {
    canonical: "./",
  },
};

export const viewport: Viewport = {
  themeColor: "#0f172b",
};

const banner = (
  <Banner storageKey="extremely-secure-key-for-real">
    Major API and site changes. <Link href="/docs">See here</Link>.
  </Banner>
);
const navbar = (
  <Navbar className="text-black dark:text-white" logo={<b>Timeworn</b>} />
);
const footer = <Footer>{new Date().getFullYear()} © timeworn.</Footer>;

export default async function RootLayout({
  children,
}: {
  children: ReactNode;
}) {
  const pageMap = await getPageMap();
  return (
    <html lang="en" dir="ltr" suppressHydrationWarning>
      <Head
        color={{
          hue: {
            light: 220,
            dark: 355,
          },
          saturation: 100,
          lightness: {
            light: 65,
            dark: 65,
          },
        }}
        backgroundColor={{
          dark: "#0f172b",
        }}
      />
      <body>
        <Layout
          banner={banner}
          navbar={navbar}
          pageMap={pageMap}
          footer={footer}
          editLink={null}
          feedback={{ content: null }}
        >
          {children}
        </Layout>
        <Analytics />
      </body>
    </html>
  );
}
