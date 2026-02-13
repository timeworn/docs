import { useMemo, type ComponentProps, type ReactNode } from "react";
import type { I18nConfig } from "fumadocs-core/i18n";
import type { LinkItemType } from "./link-item";
import Link from "fumadocs-core/link";
import { SiGithub } from "@icons-pack/react-simple-icons";

export interface NavOptions {
  enabled: boolean;
  component: ReactNode;

  title?: ReactNode | ((props: ComponentProps<"a">) => ReactNode);

  /**
   * Redirect url of title
   * @defaultValue '/'
   */
  url?: string;

  /**
   * Use transparent background
   *
   * @defaultValue none
   */
  transparentMode?: "always" | "top" | "none";

  children?: ReactNode;
}

export interface BaseLayoutProps {
  themeSwitch?: {
    enabled?: boolean;
    component?: ReactNode;
    mode?: "light-dark" | "light-dark-system";
  };

  searchToggle?: Partial<{
    enabled: boolean;
    components: Partial<{
      sm: ReactNode;
      lg: ReactNode;
    }>;
  }>;

  /**
   * I18n options
   *
   * @defaultValue false
   */
  i18n?: boolean | I18nConfig;

  /**
   * GitHub url
   */
  githubUrl?: string;

  links?: LinkItemType[];
  /**
   * Replace or disable navbar
   */
  nav?: Partial<NavOptions>;

  children?: ReactNode;
}

/**
 * Get link items with shortcuts
 */
export function resolveLinkItems({
  links = [],
  githubUrl,
}: Pick<BaseLayoutProps, "links" | "githubUrl">): LinkItemType[] {
  const result = [...links];

  if (githubUrl)
    result.push({
      type: "icon",
      url: githubUrl,
      text: "Github",
      label: "GitHub",
      icon: <SiGithub />,
      external: true,
    });

  return result;
}

export function renderTitleNav(
  { title, url = "/" }: Partial<NavOptions>,
  props: ComponentProps<"a">,
) {
  if (typeof title === "function") return title({ href: url, ...props });
  return (
    <Link href={url} {...props}>
      {title}
    </Link>
  );
}

export function useLinkItems({
  githubUrl,
  links,
}: Pick<BaseLayoutProps, "links" | "githubUrl">) {
  return useMemo(() => {
    const all = resolveLinkItems({ links, githubUrl });
    const navItems: LinkItemType[] = [];
    const menuItems: LinkItemType[] = [];

    for (const item of all) {
      switch (item.on) {
        case "menu":
          menuItems.push(item);
          break;
        case "nav":
          navItems.push(item);
          break;
        default:
          navItems.push(item);
          menuItems.push(item);
      }
    }

    return { navItems, menuItems, all };
  }, [links, githubUrl]);
}

export type * from "./link-item";
