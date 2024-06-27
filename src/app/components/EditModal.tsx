"use client";

import BasicButton from "./basic/BasicButton";

function EditModal({
  mutateCompleteTask,
  mutateUpdateTask,
  selectedTask,
  setSelectedTask,
}) {
  const updateCadence = (cadence) =>
    setSelectedTask({
      ...selectedTask,
      cadenceInDays: Math.max(1, cadence),
    });

  if (!selectedTask) return null;

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
          onChange={(e) => updateCadence(Number(e.target.value))}
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
        <BasicButton onClick={() => mutateCompleteTask(selectedTask)}>
          Mark task as complete
        </BasicButton>
        <BasicButton
          onClick={() => mutateUpdateTask(selectedTask)}
          variant="primary"
        >
          Submit
        </BasicButton>
      </div>
    </div>
  );
}

export default EditModal;
