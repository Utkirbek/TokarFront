import requests from "./requests";

const paymentsFetchers = {
  getPayments: async () => requests.get("/payment"),
  deletePayments: async (id: string) => requests.delete(`/payment/${id}`),
  addPayments: async <T>(body: T) => await requests.post("/payment/add", body),
};

export default paymentsFetchers;
