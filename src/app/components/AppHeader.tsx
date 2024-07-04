"use client";

import useShoppingQuery from "../api/useShoppingQuery";
import useTasksQuery from "../api/useTasksQuery";
import BasicLink from "./basic/BasicLink";
import BasicPill from "./basic/BasicPill";

export default function AppHeader({ initialShoppingList, initialTasks }) {
  const shoppingListQuery = useShoppingQuery(initialShoppingList);
  const tasksQuery = useTasksQuery(initialTasks);
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
      <div id="app-header-quick-section">
        <div className="tasks">
          {tasksQuery?.data
            .filter((i) => i.daysFromNow === 0)
            .map((i) => (
              <BasicPill variant="to-do" key={i.title}>
                {i.title}
              </BasicPill>
            ))}
        </div>
        <div className="shopping">
          {shoppingListQuery?.data
            .filter((i) => i.isSelected)
            .map((i) => (
              <BasicPill variant="to-shop" key={i.label}>
                {i.label}
              </BasicPill>
            ))}
        </div>
      </div>
    </>
  );
}
