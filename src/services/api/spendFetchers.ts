import { getCookie } from "cookies-next";

import requests from "./requests";

const orderFetchers = {
  addSpend: async <T>(body: T) => {
    const shopId = getCookie("shopId");
    return await requests.post(`/spend/${shopId}/add`, body);
  },
  deleteSpend: async (id: string) => {
    const shopId = getCookie("shopId");
    return requests.delete(`/spend/${shopId}/${id}`);
  },
  getSpend: async () => {
    const shopId = getCookie("shopId");
    return requests.get(`/spend/${shopId}`);
  },
  updateSpend: async (id: string, body: any | Object) => {
    const shopId = getCookie("shopId");
    return requests.put(`/spend/${shopId}/${id}`, body);
  },
};

export default orderFetchers;
