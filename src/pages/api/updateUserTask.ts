import type { NextApiRequest, NextApiResponse } from "next";

import { mockedServerSourceOfTruth } from "./mockedServerSourceOfTruth";
import { getEpochDayNow } from "../../app/utils";

type ResponseData = Object[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const taskToUpdate = JSON.parse(`${req.query.taskJson}`);
  const idx = mockedServerSourceOfTruth.findIndex(
    (task) => task.id === taskToUpdate.id
  );
  if (idx < 0) {
    // If the task is new, we add it:
    mockedServerSourceOfTruth.push({
      ...taskToUpdate,
      id: crypto.randomUUID(),
      nextEpochDay: getEpochDayNow() + taskToUpdate.cadenceInDays,
    });
  } else {
    // Otherwise we update the existing task
    const task = mockedServerSourceOfTruth[idx];
    mockedServerSourceOfTruth[idx] = {
      ...task,
      ...taskToUpdate,
    };
  }
  res.status(200).json(mockedServerSourceOfTruth);
}
