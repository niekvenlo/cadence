import type { NextApiRequest, NextApiResponse } from "next";

import { mockedServerSourceOfTruth } from "./mockedServerSourceOfTruth";

type ResponseData = Object[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json(mockedServerSourceOfTruth);
}
