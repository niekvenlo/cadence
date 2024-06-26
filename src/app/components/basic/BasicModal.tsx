"use client";

import { useRef, useEffect } from "react";
import { cx } from "../../utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  isOpen?: boolean;
  closeOnBackdropClick?: boolean;
  requestClose: () => void;
};

export default function BasicModal({
  children,
  className,
  isOpen,
  closeOnBackdropClick,
  requestClose,
}: Props) {
  const dialogRef = useRef(null);
  useEffect(() => {
    const dialog = dialogRef.current as unknown as
      | HTMLDialogElement
      | undefined;
    if (!dialog) return;
    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);
  return (
    <dialog
      className={cx("basic-modal", className)}
      ref={dialogRef}
      onClick={({ target }) => {
        if (!closeOnBackdropClick) return;
        if (!(target instanceof HTMLElement)) return;
        if (target?.nodeName === "DIALOG") {
          requestClose();
        }
      }}
    >
      <button
        className="close-button"
        onClick={() => requestClose()}
        aria-label="Close"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 44 44"
          aria-hidden="true"
          focusable="false"
          fill="currentColor"
        >
          <path d="M0.549989 4.44999L4.44999 0.549988L43.45 39.55L39.55 43.45L0.549989 4.44999Z" />
          <path d="M39.55 0.549988L43.45 4.44999L4.44999 43.45L0.549988 39.55L39.55 0.549988Z" />
        </svg>
      </button>
      <section>{children}</section>
    </dialog>
  );
}
