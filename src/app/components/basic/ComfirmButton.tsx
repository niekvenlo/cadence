"use client";

import { useEffect, useState, type ReactNode } from "react";
import { cx } from "../../utils";
import BasicButton from "./BasicButton";

type Props = {
  children: ReactNode;
  className?: string;
  isDisabled?: boolean;
  variant?: "primary" | "accent" | "look-like-a-link";
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
};

export default function ConfirmButton({
  children,
  className,
  isDisabled,
  variant,
  onClick,
}: Props) {
  const [isClickedOnce, setIsClickedOnce] = useState(false);
  const safeOnClick = isClickedOnce ? onClick : () => setIsClickedOnce(true);
  useEffect(() => {
    let timer;
    if (isClickedOnce) {
      timer = setTimeout(() => setIsClickedOnce(false), 1000);
    }
    return () => clearTimeout(timer);
  }, [isClickedOnce]);
  return (
    <BasicButton
      className={cx("basic-button", className)}
      variant={isClickedOnce ? "accent" : variant}
      onClick={safeOnClick}
      isDisabled={isDisabled}
    >
      {children}
    </BasicButton>
  );
}
