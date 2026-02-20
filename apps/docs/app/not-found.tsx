import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Page Not Found",
  description: "The page you are looking for does not exist.",
};

const Page = () => {
  return (
    <main className="flex flex-1 flex-col items-center justify-center text-center">
      <div className="space-y-6">
        <h1 className="text-9xl font-extrabold tracking-tight">404</h1>
        <h2 className="text-3xl font-semibold tracking-tight">
          Page Not Found
        </h2>
        <p className="text-muted-foreground text-lg">
          The page you&apos;re looking for doesn&apos;t exist or has been moved.
        </p>
      </div>
    </main>
  );
};

export default Page;
