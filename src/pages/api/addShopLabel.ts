import type { NextApiRequest, NextApiResponse } from "next";

import { addShoppingLabel } from "./db";

type ResponseData = Object[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const label = req.query.label || "";
  const shoppingList = addShoppingLabel(label.toString());
  res.status(200).json(shoppingList);
}
