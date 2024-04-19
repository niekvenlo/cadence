import type { Task } from "../types";
import { getEpochDayNow } from "../utils";

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
