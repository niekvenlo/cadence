import type { Task } from "../types";

import { Flipped } from "react-flip-toolkit";

import TaskCard from "./TaskCard";
import { cx } from "../utils";

type Props = {
  completedIds: string[];
  group:
    | "overdue"
    | "today"
    | "less than a week"
    | "less than a month"
    | "in a couple of months"
    | "search-results";
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
        <h1 className={cx({ crossOut: tasks.length < 1 })}>{headers[group]}</h1>
      </Flipped>
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
              isNudgeType={task.type === "NUDGE"}
            ></TaskCard>
          </Flipped>
        ))}
    </>
  );
}

const headers = {
  overdue: "Overdue",
  today: "Today",
  "less than a week": "In a few days",
  "less than a month": "In a few weeks",
  "in a couple of months": "In a couple of months",
  "search-results": "Search results",
};

export default TaskCardGroup;
