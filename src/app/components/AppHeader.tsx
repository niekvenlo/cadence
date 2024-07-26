"use client";

import Link from "next/link";
import useShoppingQuery from "../api/useShoppingQuery";
import useTasksQuery from "../api/useTasksQuery";
import BasicLink from "./basic/BasicLink";
import BasicPill from "./basic/BasicPill";
import { cx } from "../utils";
import useWeatherQuery from "../api/useWeatherQuery";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

export default function AppHeader({
  initialShoppingList,
  initialTasks,
  initialWeather,
}) {
  const pathname = usePathname();
  const isZhongwenSection = pathname?.startsWith("/laolun");
  const shoppingListQuery = useShoppingQuery(initialShoppingList);
  const tasksQuery = useTasksQuery(initialTasks);
  const weatherQuery = useWeatherQuery(initialWeather);

  const todayTasks = tasksQuery?.data.filter((i) => i.daysFromNow <= 0) ?? [];
  const selectedShopping =
    shoppingListQuery?.data.filter((i) => i.isSelected) ?? [];

  return (
    <>
      <header id="app-header">
        <h1>Cadence</h1>
        <div className="links">
          <BasicLink href="/">Tasks</BasicLink>
          {/* <BasicLink href="/shopping">Shopping</BasicLink> */}
          {/* <BasicLink href="/chinese">Chinese</BasicLink> */}
          <BasicLink href="/laolun" matchSection>
            捞论
          </BasicLink>
          {/* <BasicLink href="/ai">AI</BasicLink> */}
          {/* <BasicLink href="/weather">Weather</BasicLink> */}
        </div>
      </header>
      {!isZhongwenSection ? (
        <>
          <div id="app-header-quick-section">
            <Link className="tasks" href="/">
              {todayTasks.map((i) => (
                <BasicPill variant="to-do" key={i.title}>
                  {i.title}
                  {i.daysFromNow !== 0 && " ❗"}
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
          <AppHeaderWeatherSection weather={weatherQuery?.data} />
        </>
      ) : (
        <div id="app-header-laolun-nav">
          <div>
            <BasicLink href="/laolun">捞论</BasicLink>
            <BasicLink href="/laolun/list">编辑</BasicLink>
            <BasicLink href="/laolun/pinyin">拼音</BasicLink>
            <BasicLink href="/laolun/chars">字符</BasicLink>
            <BasicLink href="/laolun/segments">木块</BasicLink>
          </div>
        </div>
      )}
    </>
  );
}

function AppHeaderWeatherSection({ weather }) {
  const [currentHour, setCurrentHour] = useState(new Date().getHours() + 1);
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentHour(new Date().getHours() + 1);
    }, 1000 * 60 * 10);
    return () => clearInterval(timer);
  }, []);
  const getIsCurrent = ({ startHour, endHour }) =>
    startHour < currentHour && (endHour >= currentHour || endHour < 5);
  return (
    <div id="app-header-weather-section">
      {weather.map((section) => (
        <div
          key={section.time}
          className={cx({ isCurrent: getIsCurrent(section) })}
        >
          <span className="temp">{section.temp}</span>
          <span
            title={`At least ${section.clouds}% cloudy, ${section.precip}mm of precipitation`}
            className={cx("precip", {
              heavyPrecip: (section.precip || 0) > 1,
              heavyClouds: section.clouds > 90,
              mediumClouds: section.clouds > 60 && section.clouds <= 90,
              smallClouds: section.clouds > 20 && section.clouds <= 60,
            })}
          >
            {section.precip <= 0.1 ? null : section.precip}
          </span>
          <span className="time">{section.time}</span>
        </div>
      ))}
    </div>
  );
}
