import BasicPill from "./basic/BasicPill";
import BasicButton from "./basic/BasicButton";
import { cx } from "../utils";
import ConfirmButton from "./basic/ComfirmButton";

type Props = {
  cadenceInDays: number;
  daysFromNow: number;
  isPending: boolean;
  isNudgeType?: boolean;
  onComplete: () => void;
  onEdit: () => void;
  title: string;
};

function TaskCard({
  cadenceInDays,
  daysFromNow,
  isPending,
  isNudgeType,
  onComplete,
  onEdit,
  title,
  ...flipperProps
}: Props) {
  const isRecentlyCompleted =
    !isNudgeType && daysFromNow / cadenceInDays > 0.7 && cadenceInDays > 4;
  return (
    <div className={cx({ isPending, isNudgeType }, "card")} {...flipperProps}>
      <div className="title">{title}</div>
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
        <ConfirmButton
          onClick={(e) => {
            e.stopPropagation();
            onComplete();
          }}
          aria-label={`${title}: Mark as done`}
        >
          {isNudgeType ? "Delete" : "Mark as done"}
        </ConfirmButton>

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
