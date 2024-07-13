import type { NextApiRequest, NextApiResponse } from "next";

import { getEpochDayNow } from "../../app/utils";

import { getTasks, setTasks } from "./db";

type ResponseData = Object[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const taskToUpdate = JSON.parse(`${req.query.taskJson}`);
  const tasks = getTasks();
  const idx = tasks.findIndex((task) => task.id === taskToUpdate.id);
  if (idx < 0) {
    // If the task is new, we add it:
    tasks.push({
      ...taskToUpdate,
      id: crypto.randomUUID(),
      nextEpochDay: getEpochDayNow() + taskToUpdate.daysFromNow,
    });
  } else {
    // Otherwise we update the existing task
    const task = tasks[idx];
    tasks[idx] = {
      ...task,
      ...taskToUpdate,
    };
  }
  setTasks(tasks);
  res.status(200).json(tasks);
}
