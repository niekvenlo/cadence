export const delay = (ms = 50) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export const getEpochDayNow = () => Math.floor(Date.now() / 8.64e7);

export const cx = (...params) => {
  const classes = [] as string[];
  params.forEach((param) => {
    if (Array.isArray(param)) {
      classes.push(...param);
    }
    if (typeof param === "string") {
      classes.push(param);
    }
    if (
      typeof param === "object" &&
      Object.getPrototypeOf(param) === Object.getPrototypeOf({})
    ) {
      Object.entries(param).map(([key, value]) => {
        if (value === true) {
          classes.push(key);
        }
      });
    }
  });
  return classes.join(" ");
};
