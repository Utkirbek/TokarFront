export { default as flattenMessages } from "./flattenMessages";

export const getNumber = (value: string | number | null | undefined) => {
  if (typeof value === "string") {
    if (Number.isNaN(Number(value))) {
      return 0;
    }
    return +value.replace(/[^0-9]/g, "");
  }

  return value;
};
