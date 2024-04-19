import type { Task } from "../types";

import styled from "styled-components";
import { Flipped } from "react-flip-toolkit";

import TaskCard from "./TaskCard";

const TaskCardGroupTitle = styled.h3<{ $groupColor }>`
  background: ${(props) => props.$groupColor};
  color: white;
  margin-top: 1em;
  padding: 0.2em 1em;
  box-shadow: 1px 1px 1px grey;
`;

const TaskCardGroupNoTasks = styled.div`
  font-style: italic;
  padding: 1em;
  box-shadow: 1px 1px 1px grey;
`;

type Props = {
  completedIds: string[];
  groupColor: string;
  header: string;
  mutateCompleteTask: (task: Task) => void;
  setSelectedTask: (task: Task) => void;
  tasks: Task[];
};

function TaskCardGroup({
  completedIds,
  groupColor,
  header,
  mutateCompleteTask,
  setSelectedTask,
  tasks,
}: Props) {
  return (
    <>
      <Flipped flipId={header} key={header}>
        <TaskCardGroupTitle $groupColor={groupColor}>
          {header}
        </TaskCardGroupTitle>
      </Flipped>
      {tasks?.length < 1 && (
        <TaskCardGroupNoTasks>No tasks in this group</TaskCardGroupNoTasks>
      )}
      {tasks?.map((task) => (
        <Flipped key={task.id} flipId={task.id}>
          <TaskCard
            title={task.title}
            groupColor={groupColor}
            daysFromNow={task.daysFromNow}
            cadenceInDays={task.cadenceInDays}
            onEdit={() => setSelectedTask({ ...task })}
            onComplete={() => mutateCompleteTask(task)}
            isPending={completedIds.includes(task.id)}
          ></TaskCard>
        </Flipped>
      ))}
    </>
  );
}

export default TaskCardGroup;
