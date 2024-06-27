"use client";

import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  variant?: "primary" | "look-like-a-link";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function BasicButton({ children, variant, onClick }: Props) {
  return (
    <button data-variant={variant} onClick={onClick}>
      {children}
    </button>
  );
}
