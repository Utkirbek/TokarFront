export { default as flattenMessages } from "./flattenMessages";

export const getNumber = (value: string | number, precision = 1): number => {
  if (typeof value === "string") {
    if (Number.isNaN(Number(value))) {
      return 0;
    }
    return Number(Number(value).toFixed(precision));
  }

  return Number(value.toFixed(precision));
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
      const newInt = int.slice(0, -2) + "00";
      const fixed = Number(newInt).toFixed(2);
      return +fixed;
    } else {
      return +strNum;
    }
  } else {
    if (strNum.length > 3) {
      const newInt = strNum.slice(0, -2) + "00";
      const fixed = Number(newInt).toFixed(2);
      return +fixed;
    } else {
      return num;
    }
  }
};

export const replaceThreeNumbWithK = (num: number | string): string => {
  if (typeof num === "string") {
    num = +num;
  }
  const strNum = num.toString();
  if (strNum.includes(".")) {
    const [int] = strNum.split(".");
    if (int.length > 3) {
      const newInt = int.slice(0, -3) + "k";
      return newInt;
    } else {
      return strNum;
    }
  }
  if (strNum.length > 3) {
    const newInt = strNum.slice(0, -3) + "k";
    return newInt;
  }
  return strNum;
};

export const isEmptyObject = (obj: any): boolean => {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
};

export const isValidString = (str: any): boolean => {
  return typeof str === "string" && str.trim().length > 0;
};
