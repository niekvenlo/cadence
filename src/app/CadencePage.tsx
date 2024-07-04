"use client";
import type { Task, NewTask, ShopItem } from "./types";

import { useState } from "react";
import { Flipper } from "react-flip-toolkit";

import useTasksQuery from "./api/useTasksQuery";
import useTaskUpdateMutation from "./api/useTaskUpdateMutation";
import useTaskCompleteMutation from "./api/useTaskCompleteMutation";

import BasicButton from "./components/basic/BasicButton";
import BasicModal from "./components/basic/BasicModal";
import EditModal from "./components/EditModal";
import TaskCardGroup from "./components/TaskCardGroup";

import { delay } from "./utils";
import { HIGHLIGHT_DELAY } from "./constants";

type Props = {
  initialTasks: Task[];
};

export default function CadencePage({ initialTasks }: Props) {
  const tasksQuery = useTasksQuery(initialTasks);
  const updateMutation = useTaskUpdateMutation();
  const completeMutation = useTaskCompleteMutation();

  // Copy of the selected task. Safe to mutate.
  const [selectedTask, setSelectedTask] = useState<Task | NewTask | null>(null);

  const [isFilterActive, setIsFilterActive] = useState(true);

  // Lists tasks that have _just_ been clicked.
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  const mutateUpdateTask = async (task: Task) => {
    const { daysFromNow, ...rest } = task;
    await updateMutation.mutateAsync(rest);
    setSelectedTask(null);
    return;
  };
  const mutateCompleteTask = async (task) => {
    const id = task?.id || "";
    setCompletedIds([...completedIds, id]);
    await completeMutation.mutateAsync(id);
    setSelectedTask(null);
    await delay(HIGHLIGHT_DELAY);
    setCompletedIds(completedIds.filter((cId) => cId === id));
    return;
  };

  const forOverdue = tasksQuery.data?.filter((t) => t.daysFromNow < 0);
  const forToday = tasksQuery.data?.filter((t) => t.daysFromNow === 0);
  const forLessThanAWeek = tasksQuery.data?.filter(
    (t) =>
      t.daysFromNow >= 1 &&
      t.daysFromNow <= 7 &&
      (t.cadenceInDays > 7 || !isFilterActive)
  );
  const forLessThanAMonth = tasksQuery.data?.filter(
    (t) =>
      t.daysFromNow > 7 &&
      t.daysFromNow <= 31 &&
      (t.cadenceInDays > 31 || !isFilterActive)
  );
  const forInACoupleOfMonths = tasksQuery.data?.filter(
    (t) => t.daysFromNow > 31 && t.daysFromNow <= 365
  ) as Task[];
  return (
    <main id="cadence">
      {tasksQuery.isLoading && <p>Loading...</p>}
      <div id="new-cadence-button-wrapper">
        <BasicButton
          variant="primary"
          onClick={() => setIsFilterActive((t) => !t)}
        >
          Toggle filter
        </BasicButton>
        <BasicButton
          variant="accent"
          onClick={() =>
            setSelectedTask({
              title: "",
              cadenceInDays: 30,
              daysFromNow: 3,
            })
          }
        >
          New cadence task
        </BasicButton>
      </div>
      <div id="cadence-cards">
        <Flipper flipKey={tasksQuery.data}>
          <TaskCardGroup
            group="overdue"
            tasks={forOverdue}
            setSelectedTask={setSelectedTask}
            mutateCompleteTask={mutateCompleteTask}
            completedIds={completedIds}
          />
          <TaskCardGroup
            group="today"
            tasks={forToday}
            setSelectedTask={setSelectedTask}
            mutateCompleteTask={mutateCompleteTask}
            completedIds={completedIds}
          />
          <TaskCardGroup
            group="less than a week"
            tasks={forLessThanAWeek}
            setSelectedTask={setSelectedTask}
            mutateCompleteTask={mutateCompleteTask}
            completedIds={completedIds}
          />
          <TaskCardGroup
            group="less than a month"
            tasks={forLessThanAMonth}
            setSelectedTask={setSelectedTask}
            mutateCompleteTask={mutateCompleteTask}
            completedIds={completedIds}
          />
          <TaskCardGroup
            group="in a couple of months"
            tasks={forInACoupleOfMonths}
            setSelectedTask={setSelectedTask}
            mutateCompleteTask={mutateCompleteTask}
            completedIds={completedIds}
          />
        </Flipper>
      </div>
      <br />
      <br />
      <BasicModal
        isOpen={selectedTask !== null}
        closeOnBackdropClick
        requestClose={() => setSelectedTask(null)}
      >
        <EditModal
          selectedTask={selectedTask}
          setSelectedTask={setSelectedTask}
          mutateCompleteTask={mutateCompleteTask}
          mutateUpdateTask={mutateUpdateTask}
        ></EditModal>
      </BasicModal>
    </main>
  );
}
