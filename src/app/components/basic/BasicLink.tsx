import styled from "styled-components";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ActiveLink = styled(Link)`
  cursor: default;
  font-size: 1.2em;
  font-weight: bold;
  text-decoration: none;
`;

const DefaultLink = styled(Link)`
  text-decoration: underline;
`;

export default function BasicLink({ href, children }) {
  const isActive = usePathname() === href;
  if (isActive) {
    return <ActiveLink href={href}>{children}</ActiveLink>;
  }
  return <DefaultLink href={href}>{children}</DefaultLink>;
}
