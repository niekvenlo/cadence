import { delay } from "../utils";

const ROOT = 'http://localhost:3000' || 'http://penguin.termina.linux.test:3000';

/*
 * Handle API calls.
 */

const basicFetch = async (url) => {
  // await delay(Math.random() * 2001); // arbitrary delay
  const cacheBreaker = Math.random();
  const response = await fetch(ROOT + url + `#${cacheBreaker}`, { mode: 'no-cors', cache: "no-store" });
  if (!response.ok) {
    throw new Error(
      "Network Error: Did you hot-reload? Server data is probably out-of-sync."
    );
  }
  return response.json();
};

export const getTasks = async () => {
  return basicFetch(`/api/getUserTasks`);
};

export const completeTask = async (taskId) => {
  return basicFetch(`/api/completeUserTask?taskId=${taskId}`);
};

export const updateTask = async (taskToUpdate) => {
  return basicFetch(
    `/api/updateUserTask?taskJson=${JSON.stringify(taskToUpdate)}`
  );
};
