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
};

export default statisticsFetchers;
