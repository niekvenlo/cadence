"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cx } from "../../utils";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  href: string;
};

export default function BasicLink({ href, className, children }: Props) {
  const isActive = usePathname() === href;
  return (
    <Link
      className={cx("basic-a", className)}
      data-active={isActive || null}
      href={href}
    >
      {children}
    </Link>
  );
}
