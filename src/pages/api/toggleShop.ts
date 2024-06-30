import type { NextApiRequest, NextApiResponse } from "next";

import { getEpochDayNow } from "../../app/utils";

import { toggleShopping } from "./db";

type ResponseData = Object[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const label = req.query.label;
  const shoppingList = toggleShopping(label);
  res.status(200).json(shoppingList);
}
