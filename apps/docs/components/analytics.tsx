import Script from "next/script";

const Umami = () => {
  const umamiUrl = process.env.NEXT_PUBLIC_UMAMI_WEBSITE;
  const websiteId = process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID;
  if (!websiteId || !umamiUrl) {
    return <></>;
  }
  return (
    <Script async src={`${umamiUrl}/script.js`} data-website-id={websiteId} />
  );
};

export const Analytics = () => {
  return (
    <>
      <Umami />
    </>
  );
};
