"use client";

import styled from "styled-components";

import BasicButton from "./basic/BasicButton";

const EditModalWrapper = styled.div`
  min-height: 20em;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const Flex = styled.div`
  align-items: center;
  display: flex;
  flex-direction: row;
  gap: 0.4em;
`;

const CommonCadenceLink = styled.a`
  cursor: pointer;
`;

const EditModalTitleInput = styled.input`
  color: hsl(var(--foreground-hsl));
  flex-grow: 1;
  font-size: 1.1em;
  font-weight: bold;
  padding: 0.5em 1em;
`;

const EditModalCadenceInput = styled.input`
  flex-basis: 0;
  font-size: 1.1em;
  padding: 0.5em 1em;
`;

const EditModalFinalButtons = styled.div`
  display: flex;
  gap: 0.3em;
  justify-content: end;
`;

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
    <EditModalWrapper>
      <Flex>
        <EditModalTitleInput
          autoFocus
          type="text"
          value={selectedTask.title}
          onChange={(e) =>
            setSelectedTask({ ...selectedTask, title: e.target.value })
          }
        ></EditModalTitleInput>
      </Flex>
      <p>
        {Math.abs(selectedTask.daysFromNow)} days{" "}
        {selectedTask.daysFromNow > 0 ? "from now" : "overdue"}
      </p>
      <Flex>
        repeats every
        <EditModalCadenceInput
          type="number"
          value={selectedTask.cadenceInDays}
          onChange={(e) => updateCadence(Number(e.target.value))}
        ></EditModalCadenceInput>
        days
      </Flex>
      <Flex>
        Common cadences:
        {[1, 10, 30, 60, 100, 200].map((cadence) => (
          <CommonCadenceLink
            onClick={() => updateCadence(cadence)}
            key={cadence}
          >
            {cadence}d
          </CommonCadenceLink>
        ))}
      </Flex>

      <EditModalFinalButtons>
        <BasicButton onClick={() => setSelectedTask(null)}>Cancel</BasicButton>
        <BasicButton onClick={() => mutateCompleteTask(selectedTask)}>
          Mark task as complete
        </BasicButton>
        <BasicButton onClick={() => mutateUpdateTask(selectedTask)} isPrimary>
          Update
        </BasicButton>
      </EditModalFinalButtons>
    </EditModalWrapper>
  );
}

export default EditModal;
