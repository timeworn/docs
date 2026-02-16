import NextLink from "next/link";
import type { ComponentProps, FC } from "react";

type LinkProps = ComponentProps<typeof NextLink>;

export const Link: FC<LinkProps> = ({ ...props }) => {
  return <NextLink prefetch={false} {...props} />;
};
