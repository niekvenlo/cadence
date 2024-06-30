"use client";

import { useState } from "react";

import useShoppingQuery from "../api/useShoppingQuery";

import Slider from "../components/basic/Slider";
import useShopToggleMutation from "../api/useShopToggleMutation";

export default function CadencePage({ initialList }) {
  const shoppingListQuery = useShoppingQuery(initialList);
  const toggleMutation = useShopToggleMutation();

  const [processing, setProcessing] = useState<string[]>([]);

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
    <main style={{ minWidth: "80vw" }}>
      {processing}
      {toggleMutation.isError ? toggleMutation.error.message : ""}
      {shoppingListQuery.isLoading && <p>Loading...</p>}
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
    </main>
  );
}
