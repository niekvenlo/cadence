"use client";
import type { Task, NewTask } from "./types";

import styled from "styled-components";

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

const NewCadenceButtonWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-end;
`;

export default function Home() {
  const tasksQuery = useTasksQuery();
  const updateMutation = useTaskUpdateMutation();
  const completeMutation = useTaskCompleteMutation();

  // Copy of the selected task. Safe to mutate.
  const [selectedTask, setSelectedTask] = useState<Task | NewTask | null>(null);

  // Lists tasks that have _just_ been clicked.
  const [completedIds, setCompletedIds] = useState<string[]>([]);

  const mutateUpdateTask = async (task) => {
    await updateMutation.mutateAsync(task);
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
  return (
    <main>
      {!tasksQuery.data && <p>Loading...</p>}
      <NewCadenceButtonWrapper>
        <BasicButton
          onClick={() =>
            setSelectedTask({
              title: "",
              cadenceInDays: 30,
              daysFromNow: 30,
            })
          }
        >
          New cadence task
        </BasicButton>
      </NewCadenceButtonWrapper>
      <Flipper flipKey={tasksQuery.data}>
        <TaskCardGroup
          header="Overdue"
          groupColor="red"
          tasks={tasksQuery.data?.filter((t) => t.daysFromNow < 0) as Task[]}
          setSelectedTask={setSelectedTask}
          mutateCompleteTask={mutateCompleteTask}
          completedIds={completedIds}
        ></TaskCardGroup>
        <TaskCardGroup
          header="Today"
          groupColor="deeppink"
          tasks={tasksQuery.data?.filter((t) => t.daysFromNow === 0) as Task[]}
          setSelectedTask={setSelectedTask}
          mutateCompleteTask={mutateCompleteTask}
          completedIds={completedIds}
        ></TaskCardGroup>
        <TaskCardGroup
          header="In less than a week"
          groupColor="blue"
          tasks={
            tasksQuery.data?.filter(
              (t) => t.daysFromNow >= 1 && t.daysFromNow <= 7
            ) as Task[]
          }
          setSelectedTask={setSelectedTask}
          mutateCompleteTask={mutateCompleteTask}
          completedIds={completedIds}
        ></TaskCardGroup>
        <TaskCardGroup
          header="In less than a month"
          groupColor="purple"
          tasks={
            tasksQuery.data?.filter(
              (t) => t.daysFromNow > 7 && t.daysFromNow <= 31
            ) as Task[]
          }
          setSelectedTask={setSelectedTask}
          mutateCompleteTask={mutateCompleteTask}
          completedIds={completedIds}
        ></TaskCardGroup>
        <TaskCardGroup
          header="In a couple of months"
          groupColor="orange"
          tasks={
            tasksQuery.data?.filter(
              (t) => t.daysFromNow > 31 && t.daysFromNow <= 365
            ) as Task[]
          }
          setSelectedTask={setSelectedTask}
          mutateCompleteTask={mutateCompleteTask}
          completedIds={completedIds}
        ></TaskCardGroup>
      </Flipper>
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
