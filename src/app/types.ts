export type Task = {
  cadenceInDays: number;
  daysFromNow: number;
  id: string;
  nextEpochDay: number;
  title: string;
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
