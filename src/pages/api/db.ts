const JSONdb = require("simple-json-db");
const db = new JSONdb("src/pages/api/database.json");

export const getTasks = () => db.get("tasks");
export const setTasks = (tasks) => db.set("tasks", tasks);
