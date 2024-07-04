"server/client";

import { ReactNode } from "react";
import { cx } from "../../utils";

type Props = {
  variant?: "success" | "subtle" | "to-shop" | "to-do";
  className?: string;
  children?: ReactNode;
};

export default function BasicPill({
  variant,
  className,
  children,
  ...props
}: Props) {
  return (
    <span
      {...props}
      className={cx("basic-pill", className)}
      data-variant={variant}
    >
      <span>{children}</span>
    </span>
  );
}
