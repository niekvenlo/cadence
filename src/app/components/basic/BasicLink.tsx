"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cx } from "../../utils";

type Props = {
  children: string;
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
