export const delay = (ms = 50) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getEpochDayNow = () => Math.floor(Date.now() / 8.64e7);
