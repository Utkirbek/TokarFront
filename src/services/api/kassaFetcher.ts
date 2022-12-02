import { getCookie } from "cookies-next";

import requests from "./requests";

const kassaFetcher = {
  getKassa: async (
    page = 1,
    options = {
      perPage: 10,
    }
  ) => {
    const shopId = getCookie("shopId");

    return requests.get(
      `/kassa/${shopId}?page=${page}&size=${options?.perPage}`
    );
  },
};
export default kassaFetcher;
