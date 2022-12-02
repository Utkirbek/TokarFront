import { getCookie } from "cookies-next";

import requests from "./requests";

const statisticFetchers = {
  getStatistic: async () => {
    const shopId = getCookie("shopId");

    return requests.get(`/statistics/${shopId}/main`);
  },
};

export default statisticFetchers;
