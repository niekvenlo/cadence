import BasicPill from "./basic/BasicPill";
import BasicButton from "./basic/BasicButton";
import { cx } from "../utils";

type Props = {
  cadenceInDays: number;
  daysFromNow: number;
  isPending: boolean;
  onComplete: () => void;
  onEdit: () => void;
  title: string;
};

function TaskCard({
  cadenceInDays,
  daysFromNow,
  isPending,
  onComplete,
  onEdit,
  title,
  ...flipperProps
}: Props) {
  const isRecentlyCompleted =
    daysFromNow / cadenceInDays > 0.7 && cadenceInDays > 4;
  return (
    <div className={cx({ isPending }, "card")} {...flipperProps}>
      <h2>{title}</h2>
      <BasicPill className="due">
        {daysFromNow > 0 && `in `}
        {`${Math.abs(daysFromNow)}d`}
        {daysFromNow < 0 && ` overdue`}
      </BasicPill>
      <BasicPill className="every" variant="subtle">
        every {cadenceInDays}d
      </BasicPill>
      {isRecentlyCompleted && (
        <BasicPill className="recently-complete" variant="success">
          recently completed
        </BasicPill>
      )}
      <div className="buttons">
        <BasicButton
          onClick={(e) => {
            e.stopPropagation();
            onComplete();
          }}
        >
          Mark as done
        </BasicButton>
        <BasicButton
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        >
          Edit
        </BasicButton>
      </div>
    </div>
  );
}

export default TaskCard;
