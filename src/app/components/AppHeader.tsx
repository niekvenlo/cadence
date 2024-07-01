"use client";

import useShoppingQuery from "../api/useShoppingQuery";
import BasicLink from "./basic/BasicLink";
import BasicPill from "./basic/BasicPill";

export default function AppHeader({ initialShoppingList }) {
  const shoppingListQuery = useShoppingQuery(initialShoppingList);
  return (
    <>
      <header id="app-header">
        <h1>Cadence</h1>
        <div className="links">
          <BasicLink href="/">Tasks</BasicLink>
          <BasicLink href="/shopping">Shopping</BasicLink>
          <BasicLink href="/chinese">读中文</BasicLink>
          <BasicLink href="/ai">AI</BasicLink>
        </div>
      </header>
      <div id="app-header-shopping-list">
        {shoppingListQuery?.data
          .filter((i) => i.isSelected)
          .map((i) => (
            <BasicPill variant="to-shop" key={i.label}>
              {i.label}
            </BasicPill>
          ))}
      </div>
    </>
  );
}
