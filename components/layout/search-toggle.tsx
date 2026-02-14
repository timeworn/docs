"use client";
import type { ComponentProps, FC } from "react";
import { Search } from "lucide-react";
import { useSearchContext } from "fumadocs-ui/contexts/search";
import { useI18n } from "fumadocs-ui/contexts/i18n";
import { cn } from "../../lib/utils";
import { Button, type ButtonProps, buttonVariants } from "../ui/button";

interface SearchToggleProps extends ButtonProps {
  hideIfDisabled?: boolean;
}

export const SearchToggle: FC<SearchToggleProps> = ({
  hideIfDisabled,
  size = "icon",
  variant = "outline",
  ...props
}) => {
  const { setOpenSearch, enabled } = useSearchContext();
  if (hideIfDisabled && !enabled) return null;

  return (
    <Button
      className={props.className}
      size={size}
      variant={variant}
      data-search=""
      aria-label="Open Search"
      onClick={() => {
        setOpenSearch(true);
      }}
    >
      <Search />
    </Button>
  );
};

export function LargeSearchToggle({
  hideIfDisabled,
  ...props
}: ComponentProps<"button"> & {
  hideIfDisabled?: boolean;
}) {
  const { enabled, hotKey, setOpenSearch } = useSearchContext();
  const { text } = useI18n();
  if (hideIfDisabled && !enabled) return null;

  return (
    <Button
      data-search-full=""
      {...props}
      variant="outline"
      className={cn("inline-flex items-center gap-2 text-sm", props.className)}
      onClick={() => {
        setOpenSearch(true);
      }}
    >
      <Search className="size-4" />
      {text.search}
      <div className="ms-auto inline-flex gap-0.5">
        {hotKey.map((k, i) => (
          <kbd key={i} className="bg-fd-background rounded-md border px-1.5">
            {k.display}
          </kbd>
        ))}
      </div>
    </Button>
  );
}
