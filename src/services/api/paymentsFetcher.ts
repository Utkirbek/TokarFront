import requests from "./requests";

const paymentsFetchers = {
  deletePayments: async (id: string) => requests.delete(`/payment/${id}`),
  addPayments: async <T>(body: T) => await requests.post("/payment/add", body),
  getPayment: async (page = 1, perPage = 10) =>
    requests.get(`/payment/?page=${page}&size=${perPage}`),
};

export default paymentsFetchers;
