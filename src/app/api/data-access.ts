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

export const fetchWeather = async () => {
  const url = new URL("https://api.open-meteo.com/v1/forecast");
  const params = {
    latitude: 52.374, // AMS
    longitude: 4.8897, // AMS
    hourly: ["temperature_2m", "precipitation", "cloud_cover"],
    timezone: "auto",
    forecast_days: 3,
  };
  Object.entries(params).forEach(([k, v]) => {
    url.searchParams.append(k, v.toString());
  });

  return basicFetch(url.href, { absolute: true });
};
