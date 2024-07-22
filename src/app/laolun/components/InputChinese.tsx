import { useRef, useState } from "react";
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
  const preventOnChange = useRef(false);
  const [isCompositionMode, setIsCompositionMode] = useState(false);

  return (
    <input
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
        }
      }}
      onCompositionEnd={(e) => {
        preventOnChange.current = false;
        setIsCompositionMode(false);
        onChange(e);
      }}
    />
  );
}
