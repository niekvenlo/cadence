import type { NextApiRequest, NextApiResponse } from "next";

import { getEpochDayNow } from "../../app/utils";

import { getTasks, setTasks } from "./db";

type ResponseData = Object[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const taskId = req.query.taskId;
  const tasks = getTasks();
  const idx = tasks.findIndex((task) => task.id === taskId);
  if (!taskId || idx < 0) {
    res.status(404).json([{ error: "not found" }]);
    return;
  }
  const task = tasks[idx];
  tasks[idx] = {
    ...task,
    nextEpochDay: getEpochDayNow() + task?.cadenceInDays,
  };
  setTasks(tasks);
  res.status(200).json(tasks);
}
