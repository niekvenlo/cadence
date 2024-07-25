import { useEffect, useRef, useState } from "react";
import { cx } from "../../utils";
import "./laolun-component-styles.css";

/**
 * Input component that plays nice with kanji input.
 */
export function InputChinese({
  className = undefined,
  value,
  onChange,
  ...rest
}) {
  const inputRef = useRef<HTMLInputElement>(null);
  const caretRef = useRef(-1);
  const preventOnChange = useRef(false);
  const [isCompositionMode, setIsCompositionMode] = useState(false);
  const [key, setKey] = useState(0);
  useEffect(() => {
    const inputDomElement = inputRef.current;
    if (!inputDomElement) {
      return;
    }
    inputDomElement.value = value;
    inputDomElement.focus();
    inputDomElement.setSelectionRange(caretRef.current, caretRef.current);
  }, [inputRef, key, value]);

  return (
    <input
      key={key}
      ref={inputRef}
      defaultValue={value}
      {...rest}
      className={cx("input-chinese", className, { isCompositionMode })}
      onCompositionStart={() => {
        preventOnChange.current = true;
        setIsCompositionMode(true);
      }}
      onChange={(e) => {
        if (!preventOnChange.current) {
          onChange(e);
          caretRef.current = inputRef.current?.selectionStart ?? -1;
          setKey((k) => k + 1);
        }
      }}
      onCompositionEnd={(e) => {
        preventOnChange.current = false;
        setIsCompositionMode(false);
      }}
    />
  );
}
