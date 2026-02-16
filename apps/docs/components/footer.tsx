import { MailIcon } from "lucide-react";
import { SiBluesky, SiGithub } from "@icons-pack/react-simple-icons";
import { Link } from "@/components/ui/link";

interface Contact {
  text: string;
  url: string;
  icon: React.FC<{ size?: number }>;
}

const contacts: Contact[] = [
  {
    icon: MailIcon,
    url: "mailto:contact@timeworn.net",
    text: "contact@timeworn.net",
  },
  {
    icon: SiGithub,
    url: "https://github.com/timeworn",
    text: "@timeworn",
  },
  {
    icon: SiBluesky,
    url: "https://bsky.app/profile/timeworn.net",
    text: "@timeworn.net",
  },
];

const Footer = () => {
  return (
    <footer className="relative bottom-0 mt-auto">
      <div className="text-muted-foreground container flex flex-col justify-between gap-4 border-t px-8 py-8 text-center font-medium md:flex-row md:items-center md:text-left">
        <p className="order-2 lg:order-1" aria-label="Copyright">
          © {new Date().getFullYear()} Timeworn
        </p>
        <nav className="order-1 md:order-2" aria-label="Contact links">
          <ul className="flex flex-row justify-center gap-2 md:justify-start">
            {contacts.map((contact, index) => (
              <li key={index} className="hover:text-primary duration-300">
                <Link title={contact.text} href={contact.url} target="_blank">
                  <contact.icon size={24} />
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </footer>
  );
};

export default Footer;
