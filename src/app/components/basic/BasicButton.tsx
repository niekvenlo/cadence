"use client";

import type { ReactNode } from "react";
import { cx } from "../../utils";

type Props = {
  children: ReactNode;
  className?: string;
  isDisabled?: boolean;
  variant?: "primary" | "accent" | "look-like-a-link";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function BasicButton({
  children,
  className,
  isDisabled,
  variant,
  onClick,
}: Props) {
  return (
    <button
      className={cx("basic-button", className)}
      data-variant={variant}
      onClick={onClick}
      disabled={isDisabled}
    >
      {children}
    </button>
  );
}
