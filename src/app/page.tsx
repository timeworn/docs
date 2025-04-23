import Link from "next/link";
import "./page.css";
import { Constants } from "@/Constants";
import services from "@/data/home/services.json";
import { PlaceholderCard, ServiceCard } from "@/components/ui/Card";
import Image from "next/image";
import { InfoAlert } from "@/components/ui/Alert";
import { getImageUrl } from "@/utils/helpers";

export const metadata = {
  title: "Timeworn Documentation - Learn, Create, Deploy",
  description:
    "Find guides and tutorials on how to interact with Timeworn's services to create your own applications and tools.",
};

const Page: React.FC = () => (
  <main className="home mx-auto mt-15 mb-10 flex min-h-screen max-w-[85rem] flex-col gap-20 px-4 sm:px-6 md:px-8 lg:mt-25">
    <header className="grid grid-cols-3">
      <div className="col-span-full flex flex-col justify-center gap-6 lg:col-span-2 lg:gap-8">
        <h1>Learn, Create, Deploy</h1>
        <p className="lg:text-2xl">
          Find guides and tutorials on how to interact with Timeworn&apos;s
          services to create your own applications and tools.
        </p>
        <Link
          className="btn btn-primary btn-lg lg:btn-xl w-fit"
          href="/docs"
          aria-label="Get started with Timeworn documentation"
        >
          Get Started
        </Link>
      </div>
      <div className="col-span-1 hidden w-full lg:block">
        <Image
          className="ml-auto"
          src={getImageUrl("docs/logo.webp")}
          alt="Timeworn Docs Logo"
          width={300}
          height={300}
        />
      </div>
    </header>
    <section aria-labelledby="services" className="flex flex-col gap-4">
      <h2 id="services">Start Building With Timeworn</h2>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, index) => (
          <ServiceCard key={index} {...service} image={getImageUrl(service.image)} />
        ))}
        <PlaceholderCard title={"Coming Soon..."} />
      </div>
    </section>
    <section
      aria-labelledby="platform"
      className="bg-base-100 rounded-box grid w-full grid-cols-3 p-10 lg:p-16"
    >
      <div className="col-span-full flex flex-col items-center lg:items-start justify-center gap-4 lg:col-span-2">
        <InfoAlert className="w-fit" text="Currently in development" />
        <h2 id="platform" className="text-center lg:text-start">
          Developer Platform
        </h2>
        <p>
          We have a rate limit of {Constants.API_RATE_LIMIT} requests per
          minute, changing based on how many users use the API. Need to bypass
          the rate limits? Timeworn provides a API system that allows you to
          create applications without having to worry about rate limits.
        </p>
      </div>
      <div className="col-span-1 hidden w-full lg:block">
        <Image
          className="ml-auto"
          src={getImageUrl("docs/dev.webp")}
          alt="Developer Platform Logo"
          width={214}
          height={208}
        />
      </div>
    </section>
    <section aria-labelledby="contact" className="flex flex-col gap-4">
      <h2 id="contact" className="text-center">
        Get In Touch
      </h2>
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
        <article className="card bg-base-100">
          <div className="card-body">
            <h3 className="text-2xl">Join the Discord Server!</h3>
            <p className="text-lg">
              Come join the Revived Witch community server on{" "}
              <Link
                className="link"
                href={Constants.DISCORD_URL}
                target="_blank"
              >
                Discord
              </Link>{" "}
              (I do not own this server).
            </p>
          </div>
        </article>
        <article className="card bg-base-100">
          <div className="card-body">
            <h3 className="text-2xl">Contact Me</h3>
            <p className="text-lg">
              If you have any questions, feedback, or just want to say hello,
              feel free to reach out! You can contact me on the Discord server
              or email me at{" "}
              <a className="link" href={`mailto:${Constants.EMAIL}`}>
                {Constants.EMAIL}
              </a>
              .
            </p>
          </div>
        </article>
      </div>
    </section>
  </main>
);

export default Page;
