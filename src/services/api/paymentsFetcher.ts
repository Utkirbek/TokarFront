import { getCookie } from "cookies-next";

import requests from "./requests";

const paymentsFetchers = {
  deletePayments: async (id: string) => {
    const shopId = getCookie("shopId");

    return requests.delete(`/payment/${shopId}/${id}`);
  },
  addPayments: async <T>(body: T) => {
    const shopId = getCookie("shopId");

    return await requests.post(`/payment/${shopId}/add`, body);
  },
  getPayment: async (page = 1, perPage = 10) => {
    const shopId = getCookie("shopId");

    return requests.get(`/payment/${shopId}/?page=${page}&size=${perPage}`);
  },
};

export default paymentsFetchers;
