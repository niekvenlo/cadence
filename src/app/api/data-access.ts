const ROOT = "http://192.168.2.7:3000" || "http://localhost:3000";

/*
 * Handle API calls.
 */

export const basicFetch = async (url, { absolute = false }) => {
  const cacheBreaker = Math.random();
  const root = absolute ? "" : ROOT;
  const response = await fetch(root + url + `#${cacheBreaker}`, {
    cache: "no-store",
  });
  if (!response.ok) {
    throw new Error(
      "Network Error: Did you hot-reload? Server data is probably out-of-sync."
    );
  }
  return response.json();
};

export const getTasks = async () => {
  return basicFetch(`/api/getUserTasks`, {});
};

export const completeTask = async (taskId) => {
  return basicFetch(`/api/completeUserTask?taskId=${taskId}`, {});
};

export const updateTask = async (taskToUpdate) => {
  return basicFetch(
    `/api/updateUserTask?taskJson=${JSON.stringify(taskToUpdate)}`,
    {}
  );
};

export const fetchShoppingList = async () => {
  return basicFetch(`/api/getUserShopping`, {});
};
