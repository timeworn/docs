import { GoogleAnalytics } from "@next/third-parties/google";
import Script from "next/script";

const Umami = () => {
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  if (!websiteId) {
    return <></>;
  }
  return (
    <Script
      async
      src="https://analytics.timeworn.net/script.js"
      data-website-id={websiteId}
    />
  );
};

const Google = () => {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  if (!gaId) {
    return <></>;
  }
  return (
    <>
      <GoogleAnalytics gaId={gaId} />
    </>
  );
};

export const Analytics = () => {
  return (
    <>
      <Umami />
      <Google />
    </>
  );
};
