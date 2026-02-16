import { NotFound } from "@/components/not-found";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
};

const Page = () => {
  return <NotFound />;
};

export default Page;
