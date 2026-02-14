import type * as PageTree from "fumadocs-core/page-tree";
import {
  type ComponentProps,
  type FC,
  type HTMLAttributes,
  type ReactNode,
  useMemo,
} from "react";
import { Languages, Sidebar as SidebarIcon } from "lucide-react";
import { cn } from "../../../lib/utils";
import { buttonVariants } from "../../ui/button";
import {
  Sidebar,
  SidebarCollapseTrigger,
  SidebarContent,
  SidebarDrawer,
  SidebarLinkItem,
  SidebarPageTree,
  SidebarTrigger,
  SidebarViewport,
} from "./sidebar";
import { type BaseLayoutProps, renderTitleNav, useLinkItems } from "../shared";
import { LinkItem } from "../link-item";
import { LanguageToggle, LanguageToggleText } from "../language-toggle";
import {
  LayoutBody,
  LayoutContextProvider,
  LayoutHeader,
  LayoutTabs,
  type LayoutBodyProps,
} from "./client";
import { TreeContextProvider } from "fumadocs-ui/contexts/tree";
import { ThemeToggle } from "../theme-toggle";
import { LargeSearchToggle, SearchToggle } from "../search-toggle";
import { getSidebarTabs, type GetSidebarTabsOptions } from "../sidebar/tabs";
import type { SidebarPageTreeComponents } from "../sidebar/page-tree";
import {
  SidebarTabsDropdown,
  type SidebarTabWithOptions,
} from "../sidebar/tabs/dropdown";

interface DocsViewportProps extends HTMLAttributes<HTMLDivElement> {
  menuItems: ReturnType<typeof useLinkItems>["menuItems"];
  components?: Partial<SidebarPageTreeComponents>;
}

const DocsViewport: FC<DocsViewportProps> = ({ menuItems, components }) => {
  return (
    <SidebarViewport>
      {menuItems
        .filter((v) => v.type !== "icon")
        .map((item, i, list) => (
          <SidebarLinkItem
            key={i}
            item={item}
            className={cn(i === list.length - 1 && "mb-4")}
          />
        ))}
      <SidebarPageTree {...components} />
    </SidebarViewport>
  );
};

export interface DocsLayoutProps extends BaseLayoutProps {
  tree: PageTree.Root;
  sidebar?: SidebarOptions;
  tabMode?: "top" | "auto";
  /**
   * Props for the `div` container
   */
  containerProps?: LayoutBodyProps;
  usesNav?: boolean;
}

interface SidebarOptions
  extends
    ComponentProps<"aside">,
    Pick<ComponentProps<typeof Sidebar>, "defaultOpenLevel" | "prefetch"> {
  enabled?: boolean;
  component?: ReactNode;
  components?: Partial<SidebarPageTreeComponents>;

  /**
   * Root Toggle options
   */
  tabs?: SidebarTabWithOptions[] | GetSidebarTabsOptions | false;

  banner?: ReactNode;
  footer?: ReactNode;

  /**
   * Support collapsing the sidebar on desktop mode
   *
   * @defaultValue true
   */
  collapsible?: boolean;
}

export function DocsLayout({
  nav: { transparentMode, ...nav } = {},
  sidebar: {
    tabs: sidebarTabs,
    enabled: sidebarEnabled = true,
    defaultOpenLevel,
    prefetch,
    ...sidebarProps
  } = {},
  searchToggle = {},
  themeSwitch = {},
  tabMode = "auto",
  i18n = false,
  children,
  tree,
  usesNav = false,
  ...props
}: DocsLayoutProps) {
  const { menuItems } = useLinkItems(props);
  const tabs = useMemo(() => {
    if (Array.isArray(sidebarTabs)) {
      return sidebarTabs;
    }
    if (typeof sidebarTabs === "object") {
      return getSidebarTabs(tree, sidebarTabs);
    }
    if (sidebarTabs !== false) {
      return getSidebarTabs(tree);
    }
    return [];
  }, [tree, sidebarTabs]);

  function sidebar() {
    const {
      footer,
      banner,
      collapsible = true,
      component,
      components,
      ...rest
    } = sidebarProps;
    if (component) return component;

    const iconLinks = menuItems.filter((item) => item.type === "icon");

    return (
      <>
        <SidebarContent {...rest}>
          <div className="flex flex-col gap-3 p-4 pb-2">
            <div className="flex empty:hidden">
              {!usesNav &&
                renderTitleNav(nav, {
                  className:
                    "inline-flex text-[0.9375rem] items-center gap-2.5 font-medium me-auto",
                })}
              {nav.children}
              {collapsible && (
                <SidebarCollapseTrigger
                  className={cn(
                    buttonVariants({
                      variant: "ghost",
                      size: "icon-sm",
                      className: "text-fd-muted-foreground mb-auto",
                    }),
                  )}
                >
                  <SidebarIcon />
                </SidebarCollapseTrigger>
              )}
            </div>
            {searchToggle.enabled !== false &&
              (searchToggle.components?.lg ?? (
                <LargeSearchToggle hideIfDisabled />
              ))}
            {tabs.length > 0 && tabMode === "auto" && (
              <SidebarTabsDropdown options={tabs} />
            )}
            {banner}
          </div>
          <DocsViewport menuItems={menuItems} components={components} />
          {(i18n ||
            iconLinks.length > 0 ||
            themeSwitch?.enabled !== false ||
            footer) && (
            <div className="flex flex-col border-t p-4 pt-2 empty:hidden">
              <div className="text-fd-muted-foreground flex items-center empty:hidden">
                {i18n && (
                  <LanguageToggle>
                    <Languages className="size-4.5" />
                  </LanguageToggle>
                )}
                {iconLinks.map((item, i) => (
                  <LinkItem
                    key={i}
                    item={item}
                    className={cn(
                      buttonVariants({ size: "icon-sm", variant: "ghost" }),
                    )}
                    aria-label={item.label}
                  >
                    {item.icon}
                  </LinkItem>
                ))}
                {themeSwitch.enabled !== false &&
                  (themeSwitch.component ?? (
                    <ThemeToggle className="ms-auto p-0" />
                  ))}
              </div>
              {footer}
            </div>
          )}
        </SidebarContent>
        <SidebarDrawer>
          <div className="flex flex-col gap-3 p-4 pb-2">
            <div className="text-fd-muted-foreground flex items-center gap-1.5">
              <div className="flex flex-1">
                {iconLinks.map((item, i) => (
                  <LinkItem
                    key={i}
                    item={item}
                    className={cn(
                      buttonVariants({
                        size: "icon-sm",
                        variant: "ghost",
                        className: "p-2",
                      }),
                    )}
                    aria-label={item.label}
                  >
                    {item.icon}
                  </LinkItem>
                ))}
              </div>
              {i18n && (
                <LanguageToggle>
                  <Languages className="size-4.5" />
                  <LanguageToggleText />
                </LanguageToggle>
              )}
              {themeSwitch.enabled !== false &&
                (themeSwitch.component ?? <ThemeToggle className="p-0" />)}
              <SidebarTrigger
                className={cn(
                  buttonVariants({
                    variant: "ghost",
                    size: "icon-sm",
                    className: "p-2",
                  }),
                )}
              >
                <SidebarIcon />
              </SidebarTrigger>
            </div>
            {tabs.length > 0 && <SidebarTabsDropdown options={tabs} />}
            {banner}
          </div>
          <DocsViewport menuItems={menuItems} components={components} />
          <div className="flex flex-col border-t p-4 pt-2 empty:hidden">
            {footer}
          </div>
        </SidebarDrawer>
      </>
    );
  }

  return (
    <TreeContextProvider tree={tree}>
      <LayoutContextProvider navTransparentMode={transparentMode}>
        <Sidebar defaultOpenLevel={defaultOpenLevel} prefetch={prefetch}>
          <LayoutBody usesNav={usesNav} {...props.containerProps}>
            {nav.enabled !== false &&
              (nav.component ?? (
                <LayoutHeader
                  id="nd-subnav"
                  className="max-md:layout:[--fd-header-height:--spacing(14)] data-[transparent=false]:bg-fd-background/80 sticky top-(--fd-docs-row-1) z-30 flex h-(--fd-header-height) items-center border-b ps-4 pe-2.5 backdrop-blur-sm transition-colors [grid-area:header] md:hidden"
                >
                  {renderTitleNav(nav)}
                  <div className="flex-1">{nav.children}</div>
                  {searchToggle.enabled !== false &&
                    (searchToggle.components?.sm ?? (
                      <SearchToggle className="p-2" hideIfDisabled />
                    ))}
                  {sidebarEnabled && (
                    <SidebarTrigger
                      className={cn(
                        buttonVariants({
                          variant: "ghost",
                          size: "icon-sm",
                          className: "p-2",
                        }),
                      )}
                    >
                      <SidebarIcon />
                    </SidebarTrigger>
                  )}
                </LayoutHeader>
              ))}
            {sidebarEnabled && sidebar()}
            {tabMode === "top" && tabs.length > 0 && (
              <LayoutTabs
                options={tabs}
                className="bg-fd-background z-10 border-b px-6 pt-3 max-md:hidden xl:px-8"
              />
            )}
            {children}
          </LayoutBody>
        </Sidebar>
      </LayoutContextProvider>
    </TreeContextProvider>
  );
}
