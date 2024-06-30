"use client";

import { useEffect, useRef } from "react";
import BasicButton from "./basic/BasicButton";
import BasicSelect from "./basic/BasicSelect";

import { getEpochDayNow } from "../utils";

function EditModal({
  mutateCompleteTask,
  mutateUpdateTask,
  selectedTask,
  setSelectedTask,
}) {
  const inputRef = useRef(null);

  useEffect(() => {
    const input = inputRef.current as unknown as HTMLInputElement | undefined;
    setTimeout(() => input?.focus(), 200);
  }, [selectedTask]);

  const updateCadence = (cadence: string | number) => {
    const cadenceInDays = cadence ? Number(cadence) : null;
    setSelectedTask({
      ...selectedTask,
      cadenceInDays,
    });
  };
  const updateDaysFromNow = (daysFromNow: number) => {
    setSelectedTask({
      ...selectedTask,
      nextEpochDay: getEpochDayNow() + daysFromNow,
    });
  };

  if (!selectedTask) return null;

  const isNewTask = selectedTask.id === undefined;
  const isValidTask = selectedTask.cadenceInDays > 0;

  return (
    <div id="edit-modal">
      <div className="flex">
        <input
          ref={inputRef}
          className="title-input"
          autoFocus
          type="text"
          value={selectedTask.title}
          onChange={(e) =>
            setSelectedTask({ ...selectedTask, title: e.target.value })
          }
        ></input>
      </div>
      <BasicSelect
        options={Array.from({ length: selectedTask.cadenceInDays }).map(
          (_, i) => (i + 1).toString()
        )}
        selectedOption={selectedTask.daysFromNow}
        onSelect={(c) => updateDaysFromNow(Number(c))}
        columnCount={5}
      >
        {Math.abs(selectedTask.daysFromNow)} days{" "}
        {selectedTask.daysFromNow > 0 ? "from now" : "overdue"}
      </BasicSelect>

      <BasicSelect
        options={Array.from({ length: 400 }).map((_, i) => (i + 1).toString())}
        selectedOption={selectedTask.cadenceInDays}
        onSelect={(c) => updateCadence(Number(c))}
        columnCount={5}
      >
        Repeats every {selectedTask.cadenceInDays}{" "}
        {selectedTask.cadenceInDays === "1" ? "day" : "days"}
      </BasicSelect>
      <div className="flex">
        Common cadences:
        {[1, 10, 30, 60, 100, 200].map((cadence) => (
          <BasicButton
            variant="look-like-a-link"
            onClick={() => updateCadence(cadence)}
            key={cadence}
          >
            {cadence}
          </BasicButton>
        ))}
      </div>

      <div id="final-buttons">
        <BasicButton onClick={() => setSelectedTask(null)}>Cancel</BasicButton>
        {!isNewTask && (
          <BasicButton
            onClick={() => mutateCompleteTask(selectedTask)}
            isDisabled={!isValidTask}
          >
            Mark task as complete
          </BasicButton>
        )}
        <BasicButton
          onClick={() => mutateUpdateTask(selectedTask)}
          variant="primary"
          isDisabled={!isValidTask}
        >
          Submit
        </BasicButton>
      </div>
    </div>
  );
}

export default EditModal;
