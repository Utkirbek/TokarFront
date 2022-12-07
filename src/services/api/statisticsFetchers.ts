import { getCookie } from "cookies-next";

import requests from "./requests";

const statisticsFetchers = {
  getStatistics: async () => {
    const shopId = getCookie("shopId");

    return requests.get(`/statistics/${shopId}/main`);
  },
  getProfitBar: async () => {
    const shopId = getCookie("shopId");

    return requests.get(`/statistics/${shopId}/bar`);
  },

  getStaffSalary: async () => {
    const shopId = getCookie("shopId");

    return requests.get(`/statistics/${shopId}/pie/staffSalary`);
  },

  getSpent: async () => {
    const shopId = getCookie("shopId");

    return requests.get(`/statistics/${shopId}/pie/spend`);
  },

  getIncome: async () => {
    const shopId = getCookie("shopId");

    return requests.get(`/statistics/${shopId}/pie/income`);
  },
};

export default statisticsFetchers;
