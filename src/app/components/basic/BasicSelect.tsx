"use client";

import React, { useRef, useEffect, useState } from "react";
import { cx } from "../../utils";

type Props = {
  children?: React.ReactNode;
  context?: React.ReactNode;
  className?: string;
  closeOnBackdropClick?: boolean;
  columnCount?: 1 | 2 | 3 | 4 | 5;
  options: string[];
  selectedOption: string;
  onSelect: (newSelectedOption: string) => void;
};

export default function BasicSelect({
  children,
  className,
  closeOnBackdropClick = true,
  columnCount = 1,
  options,
  selectedOption,
  context,
  onSelect,
}: Props) {
  const dialogRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);
  const setOpen = () => setIsOpen(true);
  const setClosed = () => setIsOpen(false);
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
        className="basic-modal"
        style={{ "--basic-select-columns": columnCount } as React.CSSProperties}
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
          onClick={setClosed}
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
          <div onClick={setClosed}>
            <button className="entrypoint internal">
              {children || selectedOption}
            </button>
          </div>
          {context}
          <div className="options">
            {options.map((o) => (
              <button
                key={o}
                onClick={() => {
                  onSelect(o);
                  setClosed();
                }}
                className={cx({ selected: o === selectedOption.toString() })}
              >
                {o}
              </button>
            ))}
          </div>
        </section>
      </dialog>
      <button className="entrypoint" onClick={setOpen}>
        {children || selectedOption}
      </button>
    </div>
  );
}
