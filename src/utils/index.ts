export { default as flattenMessages } from "./flattenMessages";

export const getNumber = (value: string | number): number => {
  if (typeof value === "string") {
    if (Number.isNaN(Number(value))) {
      return 0;
    }
    return Number(Number(value).toFixed(1));
  }

  return Number(value.toFixed(1));
};

export const floorLastThreeDigits = (num: number | string): number => {
  if (!num) return +num;

  if (typeof num === "string") {
    num = +num;
  }
  const strNum = num.toString();
  if (strNum.includes(".")) {
    const [int] = strNum.split(".");
    if (int.length > 3) {
      const newInt = int.slice(0, -3) + "000";
      const fixed = Number(newInt).toFixed(2);
      return +fixed;
    } else {
      return +strNum;
    }
  } else {
    if (strNum.length > 3) {
      const newInt = strNum.slice(0, -3) + "000";
      const fixed = Number(newInt).toFixed(2);
      return +fixed;
    } else {
      return num;
    }
  }
};
