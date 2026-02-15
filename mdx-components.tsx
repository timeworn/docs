import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import * as AlertComponents from "@/components/ui/alert";
import * as ButtonComponents from "@/components/ui/button";
import * as CollapsibleComponents from "@/components/ui/collapsible";
import * as ImageComponents from "@/components/ui/image";
import * as LinkComponents from "@/components/ui/link";
import * as NavigationMenuComponents from "@/components/ui/navigation-menu";
import * as PopoverComponents from "@/components/ui/popover";
import * as ScrollAreaComponents from "@/components/ui/scroll-area";
import * as TimeComponents from "@/components/ui/time";
import * as TooltipComponents from "@/components/ui/tooltip";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...defaultMdxComponents,
    ...AlertComponents,
    ...ButtonComponents,
    ...CollapsibleComponents,
    ...ImageComponents,
    ...LinkComponents,
    ...NavigationMenuComponents,
    ...PopoverComponents,
    ...ScrollAreaComponents,
    ...TimeComponents,
    ...TooltipComponents,
    ...components,
  };
}
