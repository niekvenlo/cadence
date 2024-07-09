"use server";

import fs from "fs/promises";

const jsonFilePath = "src/app/zhongwen/phrases.json";

const read = async () => JSON.parse(await fs.readFile(jsonFilePath, "utf-8"));
const write = (data) =>
  fs.writeFile(jsonFilePath, JSON.stringify(data, null, 2), "utf-8");

export async function create() {
  console.log("writing");
  await write({ example: "4" });
  console.log("success");
}
