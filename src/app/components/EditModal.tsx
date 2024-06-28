"use client";

import BasicButton from "./basic/BasicButton";

function EditModal({
  mutateCompleteTask,
  mutateUpdateTask,
  selectedTask,
  setSelectedTask,
}) {
  const updateCadence = (cadence: string | number) => {
    const number = cadence ? Number(cadence) : null;
    setSelectedTask({
      ...selectedTask,
      cadenceInDays: number,
    });
  };

  if (!selectedTask) return null;

  const isNewTask = selectedTask.id === undefined;
  const isValidTask = selectedTask.cadenceInDays > 0;

  return (
    <div id="edit-modal">
      <div className="flex">
        <input
          className="title-input"
          autoFocus
          type="text"
          value={selectedTask.title}
          onChange={(e) =>
            setSelectedTask({ ...selectedTask, title: e.target.value })
          }
        ></input>
      </div>
      <p>
        {Math.abs(selectedTask.daysFromNow)} days{" "}
        {selectedTask.daysFromNow > 0 ? "from now" : "overdue"}
      </p>
      <div className="flex">
        repeats every
        <input
          className="cadence-input"
          type="number"
          value={selectedTask.cadenceInDays}
          onChange={(e) => updateCadence(e.target.value)}
        />
        days
      </div>
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
