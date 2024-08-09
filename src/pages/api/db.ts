import { getEpochDayNow } from "../../app/utils";

const JSONdb = require("simple-json-db");
const db = new JSONdb("src/pages/api/database.json");

// CADENCE TASKS
export const getTasks = async () => {
  const response = await fetch("http://192.168.2.14:3333/api/v1/getTasks");
  const tasks = await response.json();

  // Auto-reschedule any overdue nudges
  // This is bad practice, of course. Getters should not have side-effects.
  const nudgesToReschedule = tasks.filter(
    (t) => t.type === "NUDGE" && t.nextEpochDay < getEpochDayNow()
  );
  if (nudgesToReschedule.length > 0) {
    nudgesToReschedule.forEach(
      (nudge) => (nudge.nextEpochDay = getEpochDayNow() + nudge.cadenceInDays)
    );
    setTasks(tasks);
  }
  return tasks;
};

export const setTasks = async (tasks) => {
  const response = await fetch("http://192.168.2.14:3333/api/v1/setTasks", {
    body: JSON.stringify(tasks),
  });
  db.set("tasks", tasks); // TODO: Remove
  return response.json();
};

// SHOPPING
export const getShopping = () => db.get("shopping");

export const toggleShopping = (label) => {
  const shoppingList = getShopping();
  const item = shoppingList.find((i) => i.label === label);
  if (!item) {
    throw new Error("unknown shopping item");
  }
  item.timestamp = Date.now();
  item.isSelected = !item.isSelected;
  db.set("shopping", shoppingList);
  return shoppingList;
};

export const addShoppingLabel = (label: string) => {
  const shoppingList = getShopping();
  shoppingList.push({
    label,
    timestamp: Date.now(),
    isSelected: true,
  });
  db.set("shopping", shoppingList);
  return shoppingList;
};
