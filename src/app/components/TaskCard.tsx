import styled from "styled-components";

import BasicPill from "./basic/BasicPill";
import BasicButton from "./basic/BasicButton";

const CardWrapper = styled.div<{ $groupColor: string; $isPending: boolean }>`
  align-items: center;
  background: ${(props) => (props.$isPending ? "lightgreen" : "unset")};
  border-left: 10px solid ${(props) => props.$groupColor};
  box-shadow: 1px 1px 1px grey;
  cursor: pointer;
  display: grid;
  flex-direction: row;
  gap: 0 2.5em;
  grid-template-areas:
    "checkbox title title title ."
    "checkbox due due pills buttons";
  grid-template-columns: 30px repeat(4, 1fr);
  justify-content: space-between;
  padding: 1em;
`;

const CardCheckbox = styled.button<{ $isPending: boolean }>`
  background: ${(props) => (props.$isPending ? "green" : "white")};
  border: none;
  border-radius: 40%;
  cursor: pointer;
  grid-area: checkbox;
  height: 30px;
  width: 30px;
`;

const CardTitle = styled.div<{ $isRecentlyCompleted }>`
  grid-area: title;
  font-size: 1.1em;
  opacity: ${(props) => (props.$isRecentlyCompleted ? 0.6 : 1)};
  font-weight: 600;
`;

const CardCadence = styled.div`
  grid-area: due;
  display: flex;
  flex-direction: column;
`;

const CardPills = styled.div`
  grid-area: pills;
  justify-self: end;
`;

const CardButtons = styled.div`
  grid-area: buttons;
  justify-self: end;
`;

type Props = {
  cadenceInDays: number;
  groupColor: string;
  daysFromNow: number;
  isPending: boolean;
  onComplete: () => void;
  onEdit: () => void;
  title: string;
};

function TaskCard({
  cadenceInDays,
  groupColor,
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
    <CardWrapper
      {...flipperProps}
      onClick={onComplete}
      $isPending={isPending}
      $groupColor={groupColor}
    >
      <CardCheckbox
        $isPending={isPending}
        aria-label={`Mark as complete: ${title}`}
      ></CardCheckbox>
      <CardTitle $isRecentlyCompleted={isRecentlyCompleted}>{title}</CardTitle>
      <CardCadence>
        <span>
          {daysFromNow > 0 && `in `}
          {`${Math.abs(daysFromNow)}d`}
          {daysFromNow < 0 && ` overdue`}
        </span>
        <span>every {cadenceInDays}d</span>
      </CardCadence>
      <CardButtons>
        <BasicButton
          onClick={(e) => {
            e.stopPropagation();
            onEdit();
          }}
        >
          Edit
        </BasicButton>
      </CardButtons>
      <CardPills>
        {isRecentlyCompleted && <BasicPill>recently completed</BasicPill>}
      </CardPills>
    </CardWrapper>
  );
}

export default TaskCard;
