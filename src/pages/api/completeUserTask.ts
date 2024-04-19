import type { NextApiRequest, NextApiResponse } from "next";

import { getEpochDayNow } from "../../app/utils";

import { mockedServerSourceOfTruth } from "./mockedServerSourceOfTruth";

type ResponseData = Object[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const taskId = req.query.taskId;
  const idx = mockedServerSourceOfTruth.findIndex((task) => task.id === taskId);
  if (!taskId || idx < 0) {
    res.status(404).json([{ error: "not found" }]);
    return;
  }
  const task = mockedServerSourceOfTruth[idx];
  mockedServerSourceOfTruth[idx] = {
    ...task,
    nextEpochDay: getEpochDayNow() + task?.cadenceInDays,
  };
  res.status(200).json(mockedServerSourceOfTruth);
}
