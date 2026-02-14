import { type FC, Fragment } from "react";
import Link from "fumadocs-core/link";
import { cn } from "../../lib/utils";
import { type LinkItemType } from "./shared";
import { LinkItem } from "./link-item";
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
} from "../ui/navigation-menu";
import { cva } from "class-variance-authority";
import { buttonVariants } from "../ui/button";

export const navItemVariants = cva("[&_svg]:size-4", {
  variants: {
    variant: {
      main: "inline-flex items-center gap-1 p-2 text-muted-foreground transition-colors hover:text-accent-foreground data-[active=true]:text-primary",
      button: buttonVariants({
        variant: "secondary",
        className: "gap-1.5",
      }),
      icon: buttonVariants({
        variant: "ghost",
        size: "icon",
      }),
    },
  },
  defaultVariants: {
    variant: "main",
  },
});

interface NavigationMenuLinkItemProps {
  item: LinkItemType;
  className?: string;
}

export const NavigationMenuLinkItem: FC<NavigationMenuLinkItemProps> = ({
  item,
  ...props
}) => {
  if (item.type === "custom") return <div {...props}>{item.children}</div>;

  if (item.type === "menu") {
    const children = item.items.map((child, j) => {
      if (child.type === "custom") {
        return <Fragment key={j}>{child.children}</Fragment>;
      }

      const {
        banner = child.icon ? (
          <div className="bg-muted w-fit rounded-md border p-1 [&_svg]:size-4">
            {child.icon}
          </div>
        ) : null,
        ...rest
      } = child.menu ?? {};

      return (
        <NavigationMenuLink key={`${j}-${child.url}`} asChild>
          <Link
            href={child.url}
            external={child.external}
            {...rest}
            className={cn(
              "bg-card hover:bg-accent/80 hover:text-accent-foreground flex flex-col gap-2 rounded-lg border p-3 transition-colors",
              rest.className,
            )}
          >
            {rest.children ?? (
              <>
                {banner}
                <p className="text-base font-medium">{child.text}</p>
                <p className="text-muted-foreground text-sm empty:hidden">
                  {child.description}
                </p>
              </>
            )}
          </Link>
        </NavigationMenuLink>
      );
    });

    return (
      <NavigationMenuItem {...props}>
        <NavigationMenuTrigger className={cn(navItemVariants(), "rounded-md")}>
          {item.url ? (
            <Link href={item.url} external={item.external}>
              {item.text}
            </Link>
          ) : (
            item.text
          )}
        </NavigationMenuTrigger>
        <NavigationMenuContent className="grid grid-cols-1 gap-2 p-4 md:grid-cols-2 lg:grid-cols-3">
          {children}
        </NavigationMenuContent>
      </NavigationMenuItem>
    );
  }

  return (
    <NavigationMenuItem {...props}>
      <NavigationMenuLink asChild>
        <LinkItem
          item={item}
          aria-label={item.type === "icon" ? item.label : undefined}
          className={cn(navItemVariants({ variant: item.type }))}
        >
          {item.type === "icon" ? item.icon : item.text}
        </LinkItem>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
};

interface MobileNavigationMenuLinkItemProps {
  item: LinkItemType;
  className?: string;
}

export const MobileNavigationMenuLinkItem: FC<
  MobileNavigationMenuLinkItemProps
> = ({ item, ...props }) => {
  if (item.type === "custom")
    return <div className={cn("grid", props.className)}>{item.children}</div>;

  if (item.type === "menu") {
    const header = (
      <>
        {item.icon}
        {item.text}
      </>
    );

    return (
      <div className={cn("mb-4 flex flex-col", props.className)}>
        <p className="text-muted-foreground mb-1 text-sm">
          {item.url ? (
            <NavigationMenuLink asChild>
              <Link href={item.url} external={item.external}>
                {header}
              </Link>
            </NavigationMenuLink>
          ) : (
            header
          )}
        </p>
        {item.items.map((child, i) => (
          <MobileNavigationMenuLinkItem key={i} item={child} />
        ))}
      </div>
    );
  }

  return (
    <NavigationMenuLink asChild>
      <LinkItem
        item={item}
        className={cn(
          {
            main: "hover:text-popover-foreground/50 data-[active=true]:text-primary inline-flex items-center gap-2 py-1.5 transition-colors data-[active=true]:font-medium [&_svg]:size-4",
            icon: buttonVariants({
              size: "icon",
              variant: "ghost",
            }),
            button: buttonVariants({
              variant: "secondary",
              className: "gap-1.5 [&_svg]:size-4",
            }),
          }[item.type ?? "main"],
          props.className,
        )}
        aria-label={item.type === "icon" ? item.label : undefined}
      >
        {item.icon}
        {item.type === "icon" ? undefined : item.text}
      </LinkItem>
    </NavigationMenuLink>
  );
};
