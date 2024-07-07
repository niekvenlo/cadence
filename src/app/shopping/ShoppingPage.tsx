"use client";

import { useState } from "react";

import useShoppingQuery from "../api/useShoppingQuery";

import Slider from "../components/basic/Slider";
import useShopToggleMutation from "../api/useShopToggleMutation";
import BasicButton from "../components/basic/BasicButton";
import BasicModal from "../components/basic/BasicModal";
import ShopModal from "../components/ShopModal";

export default function CadencePage({ initialList }) {
  const shoppingListQuery = useShoppingQuery(initialList);
  const toggleMutation = useShopToggleMutation();

  const [processing, setProcessing] = useState<string[]>([]);

  const [newLabel, setNewLabel] = useState<string | null>(null);

  const toggleByLabel = async (label) => {
    if (processing.includes(label)) {
      return;
    }
    setProcessing((processing) => [...processing, label]);
    await new Promise((r) => setTimeout(r, Math.random() * 600));
    toggleMutation.mutateAsync(label);
    setProcessing((processing) => processing.filter((l) => l !== label));
  };

  return (
    <main id="shopping-page">
      {shoppingListQuery.isLoading && <p>Loading...</p>}
      {toggleMutation.isError ? toggleMutation.error.message : ""}
      <div className="sliders">
        {shoppingListQuery.data.map(({ label, isSelected, timestamp }) => (
          <Slider
            key={label}
            onToggle={() => toggleByLabel(label)}
            label={label}
            isSelected={isSelected}
            isProcessing={processing.includes(label)}
            lastChangedTs={timestamp}
          />
        ))}
      </div>
      <BasicModal
        isOpen={newLabel !== null}
        closeOnBackdropClick
        requestClose={() => setNewLabel(null)}
      >
        <ShopModal newLabel={newLabel} setNewLabel={setNewLabel} />
      </BasicModal>
      <div id="page-buttons-wrapper">
        <BasicButton variant="primary" onClick={() => setNewLabel("")}>
          New shopping item
        </BasicButton>
      </div>
    </main>
  );
}
