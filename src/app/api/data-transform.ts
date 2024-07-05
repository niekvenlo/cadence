import type { Task } from "../types";
import { getEpochDayNow, round } from "../utils";

/*
 * Transform API responses into a more convenient format.
 */

/** Sort first by how far away the next due date is, then further by title. */
const sortTasks = (a, b) => {
  return a.nextEpochDay - b.nextEpochDay || (a.title < b.title ? -1 : 1);
};

export const transformTasks = (tasks) => {
  const epochDayNow = getEpochDayNow();
  return tasks
    .map((task) => ({
      ...task,
      daysFromNow: task.nextEpochDay - epochDayNow,
    }))
    .sort(sortTasks) as Task[];
};

export const transformWeather = (response) => {
  const {
    hourly: { time, temperature_2m, precipitation },
  } = response;
  const transformSection = (start, end) => {
    const startTime = time[start];
    const endTime = time[end];
    const maxTemp = Math.max(...temperature_2m.slice(start, end));
    const maxPrecip = Math.max(...precipitation.slice(start, end));
    return {
      time: `${new Date(startTime).getHours() + 1} - ${
        new Date(endTime).getHours() + 1
      }`,
      temp: round(maxTemp, 2),
      precip: round(maxPrecip * 10, 2),
    };
  };
  return [
    transformSection(6, 8),
    transformSection(9, 11),
    transformSection(12, 14),
    transformSection(15, 17),
    transformSection(18, 20),
    transformSection(21, 24),
  ];
};
