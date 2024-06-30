const JSONdb = require("simple-json-db");
const db = new JSONdb("src/pages/api/database.json");

// CADENCE TASKS
export const getTasks = () => db.get("tasks");

export const setTasks = (tasks) => db.set("tasks", tasks);

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
