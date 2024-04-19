import { getEpochDayNow } from "../../app/utils";

// Mocked server state.
// This array is generated on app load, so it is not stable across (hot-)reloads.

const epochDayNow = getEpochDayNow();
export const mockedServerSourceOfTruth = [
  {
    id: "0c917e8d-f25b-471f-89f8-fc8307c768cf",
    title: "Replace toothbrushes",
    nextEpochDay: epochDayNow - 6,
    cadenceInDays: 90,
  },
  {
    id: "4cd76dcc-8637-422e-acf0-730bc519dfd4",
    title: "Refill the salt in the dishwasher",
    nextEpochDay: epochDayNow + 32,
    cadenceInDays: 140,
  },
  {
    id: "f01d955c-b950-47b0-88ae-09554b7e5737",
    title: "Wash the bedsheets",
    nextEpochDay: epochDayNow + 2,
    cadenceInDays: 14,
  },
  {
    id: "aec808ac-b2dd-4b97-9673-adad313cdd0f",
    title: "Clean the sink with soda crystals",
    nextEpochDay: epochDayNow + 2,
    cadenceInDays: 7,
  },
  {
    id: "deb15cd0-bd56-4d33-a2de-95e439f1e362",
    title: "Clean the microwave",
    nextEpochDay: epochDayNow + 5,
    cadenceInDays: 40,
  },
  {
    id: "51158bb1-7d58-478c-9324-6d8fc0583c34",
    title: "Replace contact lenses",
    nextEpochDay: epochDayNow - 3,
    cadenceInDays: 30,
  },
  {
    id: "d8561ebc-5f78-4ad6-9af3-d5f97879c033",
    title: "Clean the oven",
    nextEpochDay: epochDayNow + 31,
    cadenceInDays: 40,
  },
  {
    id: "96085080-6147-44fd-9402-2b3051ff02fd",
    title: "Replace air filter",
    nextEpochDay: epochDayNow + 191,
    cadenceInDays: 400,
  },
  {
    id: "58c36c00-58df-4130-907f-f7869b701312",
    title: "Take pills 1) morning",
    nextEpochDay: getEpochDayNow(), // Always due today
    cadenceInDays: 1,
  },
  {
    id: "d2f18aab-2d92-4b91-83cb-2f1a24b008f5",
    title: "Take pills 2) evening",
    nextEpochDay: getEpochDayNow(), // Always due today
    cadenceInDays: 1,
  },
  {
    id: "9795df93-2207-4b19-b11a-0ccccdfb02cb",
    title: "Check for weird nose and ear hair",
    nextEpochDay: epochDayNow + 41,
    cadenceInDays: 50,
  },
  {
    id: "5ed8924b-5695-4812-b775-5112ebee7cb2",
    title: "Oil the sewing machine",
    nextEpochDay: epochDayNow + 179,
    cadenceInDays: 200,
  },
  {
    id: "2a05e50d-8127-4d6b-8eef-b56dfc893c44",
    title: "Refill the pill box",
    nextEpochDay: epochDayNow + 3,
    cadenceInDays: 7,
  },
  {
    id: "cef7d6f9-83c6-4253-b2b7-32f6ac367475",
    title: "Descale the coffee maker",
    nextEpochDay: epochDayNow + 56,
    cadenceInDays: 60,
  },
  //
];
