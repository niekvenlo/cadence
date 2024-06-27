"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

type Props = {
  children: string;
  href: string;
};

export default function BasicLink({ href, children }: Props) {
  const isActive = usePathname() === href;
  return (
    <Link data-active={isActive || null} href={href}>
      {children}
    </Link>
  );
}
