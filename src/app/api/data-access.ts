import { delay } from "../utils";

/*
 * Handle API calls.
 */

const basicFetch = async (url) => {
  await delay(Math.random() * 621); // arbitrary delay
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(
      "Network Error: Did you hot-reload? Server data is probably out-of-sync."
    );
  }
  return response.json();
};

export const getTasks = async () => {
  return basicFetch("/api/getUserTasks");
};

export const completeTask = async (taskId) => {
  return basicFetch(`/api/completeUserTask?taskId=${taskId}`);
};

export const updateTask = async (taskToUpdate) => {
  return basicFetch(
    `/api/updateUserTask?taskJson=${JSON.stringify(taskToUpdate)}`
  );
};
