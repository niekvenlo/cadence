"use client";

import { useEffect, useRef } from "react";
import BasicButton from "../components/basic/BasicButton";
import useShopNewLabelMutation from "../api/useShopNewLabelMutation";

function ShopModal({ newLabel, setNewLabel }) {
  const newLabelMutation = useShopNewLabelMutation();

  const mutateNewLabel = async (label: string) => {
    await newLabelMutation.mutateAsync(label);
    setNewLabel(null);
    return;
  };
  const inputRef = useRef(null);

  const isNotEditingLabel = newLabel === null;
  const isLabelInvalid = newLabel === null || newLabel.length < 2;

  useEffect(() => {
    const input = inputRef.current as unknown as HTMLInputElement | undefined;
    setTimeout(() => input?.focus(), 200);
  }, [isNotEditingLabel]);

  useEffect(() => {
    const input = inputRef.current as unknown as HTMLInputElement | undefined;
    setTimeout(() => input?.focus(), 200);
  }, [isNotEditingLabel]);

  if (isNotEditingLabel) return null;

  return (
    <div id="edit-modal">
      <div>
        <button className="basic-slider isSelected">
          <span className="before"></span>
          <span
            ref={inputRef}
            className="label"
            contentEditable
            onInput={(e) => setNewLabel(e.currentTarget.textContent)}
          />
          <span className="after"></span>
        </button>
      </div>
      <div id="final-buttons">
        <BasicButton onClick={() => setNewLabel(null)}>Cancel</BasicButton>
        <BasicButton
          onClick={() => mutateNewLabel(newLabel!)}
          variant="primary"
          isDisabled={isLabelInvalid}
        >
          Add {isLabelInvalid ? "" : newLabel} to shopping list
        </BasicButton>
      </div>
    </div>
  );
}

export default ShopModal;
