import { getCookie } from "cookies-next";

import requests from "./requests";

const statisticsFetchers = {
  getStatistics: async (filterShopId?: string) => {
    const shopId = getCookie("shopId");

    return requests.get(`/statistics/${filterShopId || shopId}/main`);
  },
  getProfitBar: async ({
    filterShopId,
    isAllTrue,
  }: {
    filterShopId?: string;
    isAllTrue: boolean;
  }) => {
    const shopId = getCookie("shopId");

    return requests.get(
      `/statistics/${filterShopId || shopId}/bar${
        isAllTrue ? "?isAll=true" : ""
      }`
    );
  },

  getStaffSalary: async (filterShopId?: string) => {
    const shopId = getCookie("shopId");

    return requests.get(
      `/statistics/${filterShopId || shopId}/pie/staffSalary`
    );
  },

  getSpent: async (filterShopId?: string) => {
    const shopId = getCookie("shopId");

    return requests.get(`/statistics/${filterShopId || shopId}/pie/spend`);
  },

  getIncome: async (filterShopId?: string) => {
    const shopId = getCookie("shopId");

    return requests.get(`/statistics/${filterShopId || shopId}/pie/income`);
  },

  fetchAllStatistics: async (filterShopId?: string) => {
    const shopId = getCookie("shopId");

    return Promise.all([
      requests.get(`/statistics/${filterShopId || shopId}/main`),
      requests.get(`/statistics/${filterShopId || shopId}/bar`),
      requests.get(`/statistics/${filterShopId || shopId}/pie/staffSalary`),
      requests.get(`/statistics/${filterShopId || shopId}/pie/spend`),
      requests.get(`/statistics/${filterShopId || shopId}/pie/income`),
    ]);
  },
};

export default statisticsFetchers;
