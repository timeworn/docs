"use client";

import { type ComponentProps, type FC, useState } from "react";
import { cn } from "../../../lib/utils";
import {
  type LinkItemType,
  type NavOptions,
  renderTitleNav,
  useLinkItems,
} from "../shared";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "../../ui/navigation-menu";
import { buttonVariants } from "../../ui/button";
import type { HomeLayoutProps } from "./index";
import { LargeSearchToggle, SearchToggle } from "../search-toggle";
import { ThemeToggle } from "../theme-toggle";
import { LanguageToggle, LanguageToggleText } from "../language-toggle";
import { ChevronDown, Languages } from "lucide-react";
import { useIsScrollTop } from "fumadocs-ui/utils/use-is-scroll-top";
import {
  NavigationMenuLinkItem,
  MobileNavigationMenuLinkItem,
} from "../navigation-links";

type HeaderNavigationMenuProps = ComponentProps<"div"> & {
  transparentMode?: NavOptions["transparentMode"];
};

const HeaderNavigationMenu: FC<HeaderNavigationMenuProps> = ({
  transparentMode = "none",
  ...props
}) => {
  const [value, setValue] = useState("");
  const isTop = useIsScrollTop({ enabled: transparentMode === "top" }) ?? true;
  const isTransparent =
    transparentMode === "top" ? isTop : transparentMode === "always";

  return (
    <NavigationMenu value={value} onValueChange={setValue} asChild>
      <header
        id="nd-nav"
        {...props}
        className={cn("sticky top-0 z-40 h-16", props.className)}
      >
        <div
          className={cn(
            "border-b backdrop-blur-lg transition-colors *:mx-auto *:max-w-(--layout-width)",
            value.length > 0 && "max-lg:rounded-b-2xl max-lg:shadow-lg",
            (!isTransparent || value.length > 0) && "bg-background/80",
          )}
        >
          <NavigationMenuList
            className="flex h-16 w-full items-center px-4"
            asChild
          >
            <nav>{props.children}</nav>
          </NavigationMenuList>

          <NavigationMenuViewport />
        </div>
      </header>
    </NavigationMenu>
  );
};

const isSecondary = (item: LinkItemType): boolean => {
  if ("secondary" in item && item.secondary != null) return item.secondary;
  return item.type === "icon";
};

export const Header: FC<HomeLayoutProps> = ({
  nav = {},
  i18n = false,
  links,
  githubUrl,
  themeSwitch = {},
  searchToggle = {},
}) => {
  const { navItems, menuItems } = useLinkItems({ links, githubUrl });

  return (
    <HeaderNavigationMenu transparentMode={nav.transparentMode}>
      {renderTitleNav(nav)}
      {nav.children}
      <div className="flex flex-1 flex-row items-center justify-end gap-1.5 max-lg:hidden">
        <ul className="flex flex-row items-center gap-2 px-6 max-sm:hidden">
        {navItems
          .filter((item) => !isSecondary(item))
          .map((item, i) => (
            <NavigationMenuLinkItem key={i} item={item} className="text-sm" />
          ))}
      </ul>
        {searchToggle.enabled !== false &&
          (searchToggle.components?.lg ?? (
            <LargeSearchToggle className="w-full max-w-60" hideIfDisabled />
          ))}
        {themeSwitch.enabled !== false &&
          (themeSwitch.component ?? <ThemeToggle />)}
        {i18n && (
          <LanguageToggle>
            <Languages className="size-5" />
          </LanguageToggle>
        )}
        <ul className="flex flex-row items-center gap-2 empty:hidden">
          {navItems.filter(isSecondary).map((item, i) => (
            <NavigationMenuLinkItem
              key={i}
              className={cn(
                item.type === "icon" && "-mx-1 first:ms-0 last:me-0",
              )}
              item={item}
            />
          ))}
        </ul>
      </div>
      <ul className="ms-auto -me-1.5 flex flex-row items-center lg:hidden">
        {searchToggle.enabled !== false &&
          (searchToggle.components?.sm ?? (
            <SearchToggle className="p-2" hideIfDisabled />
          ))}
        <NavigationMenuItem>
          <NavigationMenuTrigger
            aria-label="Toggle Menu"
            className={cn(
              buttonVariants({
                size: "icon",
                variant: "ghost",
                className: "group [&_svg]:size-5.5",
              }),
            )}
            onPointerMove={
              nav.enableHoverToOpen ? undefined : (e) => e.preventDefault()
            }
          >
            <ChevronDown className="size-4 transition-transform duration-300 group-data-[state=open]:rotate-180" />
          </NavigationMenuTrigger>
          <NavigationMenuContent className="flex flex-col p-4 sm:flex-row sm:items-center sm:justify-end">
            {menuItems
              .filter((item) => !isSecondary(item))
              .map((item, i) => (
                <MobileNavigationMenuLinkItem
                  key={i}
                  item={item}
                  className="sm:hidden"
                />
              ))}
            <div className="-ms-1.5 flex flex-row items-center gap-2 max-sm:mt-2">
              {menuItems.filter(isSecondary).map((item, i) => (
                <MobileNavigationMenuLinkItem
                  key={i}
                  item={item}
                  className={cn(item.type === "icon" && "-mx-1 first:ms-0")}
                />
              ))}
              <div role="separator" className="flex-1" />
              {i18n && (
                <LanguageToggle>
                  <Languages className="size-5" />
                  <LanguageToggleText />
                  <ChevronDown className="text-muted-foreground size-3" />
                </LanguageToggle>
              )}
              {themeSwitch.enabled !== false &&
                (themeSwitch.component ?? <ThemeToggle />)}
            </div>
          </NavigationMenuContent>
        </NavigationMenuItem>
      </ul>
    </HeaderNavigationMenu>
  );
};
