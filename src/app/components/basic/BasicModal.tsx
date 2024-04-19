"use client";
import styled from "styled-components";
import { useRef, useEffect } from "react";

const CloseButton = styled.button`
  position: absolute;
  translate: 3em -3em;
  padding: 0.5em;
  width: 3em;
  height: 3em;
  background: unset;
  border: none;
  cursor: pointer;
`;

export default function BasicModal({
  children,
  isOpen,
  closeOnBackdropClick,
  requestClose,
}: {
  children: React.ReactNode;
  isOpen?: boolean;
  closeOnBackdropClick?: boolean;
  requestClose: () => void;
}) {
  const dialogRef = useRef(null);
  useEffect(() => {
    const dialog = dialogRef.current as unknown as HTMLDialogElement;
    if (!dialog) return;
    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);
  return (
    <dialog
      ref={dialogRef}
      onClick={({ target }) => {
        if (!closeOnBackdropClick) return;
        if (!(target instanceof HTMLElement)) return;
        if (target?.nodeName === "DIALOG") {
          requestClose();
        }
      }}
    >
      <CloseButton
        onClick={() => requestClose()}
        aria-label="Close"
        aria-hidden="true"
      >
        <svg viewBox="0 0 44 44" aria-hidden="true" focusable="false">
          <path d="M0.549989 4.44999L4.44999 0.549988L43.45 39.55L39.55 43.45L0.549989 4.44999Z" />
          <path d="M39.55 0.549988L43.45 4.44999L4.44999 43.45L0.549988 39.55L39.55 0.549988Z" />
        </svg>
      </CloseButton>
      <section>{children}</section>
    </dialog>
  );
}
