import { useEffect, useState } from "react";
import { cx } from "../../utils";

type Props = {
  className?: string;
  isSelected?: boolean;
  isProcessing?: boolean;
  label: string;
  lastChangedTs?: number;
  onToggle: () => void;
};

function BasicSlider({
  className,
  isSelected,
  isProcessing,
  label,
  lastChangedTs,
  onToggle,
}: Props) {
  const timeLabel = useUpToDateLabel(lastChangedTs, getLabel);
  return (
    <button
      className={cx("basic-slider", className, { isSelected, isProcessing })}
      onClick={onToggle}
    >
      <span className="before">{timeLabel}</span>
      <span className="label">{label}</span>
      <span className="after">{timeLabel}</span>
    </button>
  );
}

function useUpToDateLabel(
  timestamp: number | undefined,
  labelGetter: (number: number | undefined) => string | null
) {
  const [label, setlabel] = useState<string | null>(null);
  useEffect(() => {
    const updateLabel = () => setlabel(labelGetter(timestamp));
    setTimeout(updateLabel, 100);
    const timer = setInterval(updateLabel, 10 * 1000);
    return () => clearInterval(timer);
  }, [timestamp, labelGetter, setlabel]);
  return label;
}

function getLabel(timestamp) {
  const MS_IN_MIN = 1000 * 60;
  const MS_IN_HOUR = MS_IN_MIN * 60;
  const MS_IN_DAY = MS_IN_HOUR * 24;
  if (!timestamp) {
    return null;
  }
  const now = Date.now();
  const diff = now - timestamp;
  if (diff < MS_IN_HOUR) {
    const mins = Math.ceil(diff / MS_IN_MIN);
    return `< ${mins}m`;
  }
  if (diff < MS_IN_DAY) {
    const hours = Math.ceil(diff / MS_IN_HOUR);
    return `< ${hours}h`;
  }
  if (diff < MS_IN_DAY) {
    return "In the last day";
  }
  return "Long ago";
}

export default BasicSlider;
