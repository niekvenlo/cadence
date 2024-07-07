"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cx } from "../../utils";
import type { ReactNode } from "react";

type Props = {
  children: ReactNode;
  className?: string;
  href: string;
  matchSection?: boolean;
};

export default function BasicLink({
  href,
  className,
  children,
  matchSection,
}: Props) {
  const isActive = usePathname() === href;
  const isActiveSection = usePathname()?.startsWith(href);
  const isMatch = matchSection ? isActiveSection : isActive;
  return (
    <Link
      className={cx("basic-a", className)}
      data-active={isMatch || null}
      href={href}
    >
      {children}
    </Link>
  );
}
