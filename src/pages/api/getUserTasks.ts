import type { NextApiRequest, NextApiResponse } from "next";

import { getTasks } from "./db";

// Try to ensure we never receive out-of-date data.
export const dynamic = "force-dynamic";
export const revalidate = 0;

type ResponseData = Object[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  res.status(200).json(getTasks());
}
