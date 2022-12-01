import { getCookie } from "cookies-next";

import requests from "./requests";

const orderFetcher = {
  addOrders: async <T>(body: T) => {
    const shopId = getCookie("shopId");

    return await requests.post(`/orders/${shopId}/add`, body);
  },
  deleteOrders: async (id: string) => {
    const shopId = getCookie("shopId");

    return requests.delete(`/orders/${shopId}/${id}`);
  },
  getOrders: async (
    page = 1,
    options = {
      perPage: 10,
    }
  ) => {
    const shopId = getCookie("shopId");

    return requests.get(
      `/orders/${shopId}/?page=${page}&size=${options?.perPage}`
    );
  },
  updateOrders: async (id: string, body: any | Object) => {
    const shopId = getCookie("shopId");

    return requests.put(`/orders/${shopId}/${id}`, body);
  },
};

export default orderFetcher;
