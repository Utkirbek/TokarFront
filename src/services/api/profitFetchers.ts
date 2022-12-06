import { getCookie } from "cookies-next";

import requests from "./requests";

const profitFetcher = {
  getProfit: async (
    page = 1,
    options = {
      perPage: 10,
    }
  ) => {
    const shopId = getCookie("shopId");

    return requests.get(
      `/profit/${shopId}?page=${page}&size=${options?.perPage}`
    );
  },
};
export default profitFetcher;
