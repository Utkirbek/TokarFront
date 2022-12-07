import { getCookie } from "cookies-next";

import requests from "./requests";

const loanFeatchers = {
  getLoan: async (
    page = 1,
    options = {
      perPage: 10,
    }
  ) => {
    const shopId = getCookie("shopId");

    return requests.get(
      `/loan/${shopId}/?page=${page}&size=${options?.perPage}`
    );
  },
  getLoanUserID: async (_: string, id: string) => {
    const shopId = getCookie("shopId");

    return requests.get(`/loan/${shopId}/user/${id}`);
  },
};
export default loanFeatchers;
