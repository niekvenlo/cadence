import type { Task } from "../types";

import { Flipped } from "react-flip-toolkit";

import TaskCard from "./TaskCard";

type Props = {
  completedIds: string[];
  group:
    | "overdue"
    | "today"
    | "less than a week"
    | "less than a month"
    | "in a couple of months";
  mutateCompleteTask: (task: Task) => void;
  setSelectedTask: (task: Task) => void;
  tasks?: Task[];
};

function TaskCardGroup({
  completedIds,
  group,
  mutateCompleteTask,
  setSelectedTask,
  tasks = [],
}: Props) {
  return (
    <>
      <Flipped flipId={headers[group]} key={headers[group]}>
        <h1>{headers[group]}</h1>
      </Flipped>
      {tasks.length < 1 && (
        <div className="no-tasks">No tasks in this group</div>
      )}
      {tasks
        .sort((a, b) => (a.cadenceInDays > b.cadenceInDays ? -1 : 1))
        .map((task) => (
          <Flipped key={task.id} flipId={task.id}>
            <TaskCard
              title={task.title}
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

const headers = {
  overdue: "Overdue",
  today: "Today",
  "less than a week": "In less than a week",
  "less than a month": "In less than a month",
  "in a couple of months": "In a couple of months",
};

export default TaskCardGroup;
