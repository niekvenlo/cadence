"use client";

import { useRef, useEffect, useState } from "react";
import { cx } from "../../utils";

type Props = {
  children: React.ReactNode;
  className?: string;
  closeOnBackdropClick?: boolean;
  options: string[];
  selectedOption: string;
  onSelect: (newSelectedOption: string) => void;
};

export default function BasicSelect({
  children,
  className,
  closeOnBackdropClick = true,
  options,
  selectedOption,
  onSelect,
}: Props) {
  const dialogRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
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
    <div className={cx("basic-select", className)}>
      <dialog
        ref={dialogRef}
        onClick={({ target }) => {
          if (!closeOnBackdropClick) return;
          if (!(target instanceof HTMLElement)) return;
          if (target?.nodeName === "DIALOG") {
            setIsOpen(false);
          }
        }}
      >
        <button
          className="close-button"
          onClick={() => setIsOpen(false)}
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
        <section>
          <h1>Select one</h1>
          <button
            className="entrypoint internal"
            onClick={() => setIsOpen(true)}
          >
            {children}
            <select />
          </button>
          <ul>
            {options.map((o) => (
              <li className={cx({ selected: o === selectedOption })}>{o}</li>
            ))}
          </ul>
        </section>
      </dialog>
      <button className="entrypoint" onClick={() => setIsOpen(true)}>
        {children}
        <select />
      </button>
    </div>
  );
}
