"use client";

import Link from "next/link";
import useShoppingQuery from "../api/useShoppingQuery";
import useTasksQuery from "../api/useTasksQuery";
import BasicLink from "./basic/BasicLink";
import BasicPill from "./basic/BasicPill";
import { cx } from "../utils";

export default function AppHeader({
  initialShoppingList,
  initialTasks,
  weather,
}) {
  const shoppingListQuery = useShoppingQuery(initialShoppingList);
  const tasksQuery = useTasksQuery(initialTasks);
  const todayTasks = tasksQuery?.data.filter((i) => i.daysFromNow === 0) ?? [];
  const selectedShopping =
    shoppingListQuery?.data.filter((i) => i.isSelected) ?? [];

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
        <Link className="tasks" href="/">
          {todayTasks.map((i) => (
            <BasicPill variant="to-do" key={i.title}>
              {i.title}
            </BasicPill>
          ))}
          {todayTasks.length < 1 && (
            <span className="none">all done today</span>
          )}
        </Link>
        <Link className="shopping" href="/shopping">
          {selectedShopping.map((i) => (
            <BasicPill variant="to-shop" key={i.label}>
              {i.label}
            </BasicPill>
          ))}
          {selectedShopping.length < 1 && (
            <span className="none">all done today</span>
          )}
        </Link>
      </div>
      <div id="app-header-weather-section">
        {weather.slice(5, 24).map((i) => (
          <div key={i.time}>
            <span>{Math.round(i.temp / 2) * 2}°</span>
            <span className={cx({ heavyPrecip: i.precip > 1 })}>
              {i.precip < 0.2 ? null : Math.floor(5 * i.precip) * 2}
            </span>
          </div>
        ))}
      </div>
    </>
  );
}
