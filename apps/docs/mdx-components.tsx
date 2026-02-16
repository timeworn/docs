import defaultMdxComponents from "fumadocs-ui/mdx";
import type { MDXComponents } from "mdx/types";
import * as AlertComponents from "@/components/ui/alert";

export function getMDXComponents(components?: MDXComponents): MDXComponents {
  return {
    ...AlertComponents,
    ...defaultMdxComponents,
    ...components,
  };
}
