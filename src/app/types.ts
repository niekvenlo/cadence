export type Task = {
  cadenceInDays: number;
  daysFromNow: number;
  id: string;
  nextEpochDay: number;
  title: string;
  type?: "NUDGE" | "STANDARD";
};
export type NewTask = {
  cadenceInDays: number;
  daysFromNow: number;
  id?: string;
  nextEpochDay?: number;
  title: string;
};
export type ShopItem = {
  label: string;
  timestamp: number;
  isSelected: boolean;
};
