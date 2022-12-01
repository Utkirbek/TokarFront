import requests from "./requests";

const orderFetcher = {
  addOrders: async <T>(body: T) => await requests.post("/Orders/add", body),
  deleteOrders: async (id: string) => requests.delete(`/Orders/${id}`),
  getOrders: async (
    page = 1,
    options = {
      perPage: 10,
    }
  ) => requests.get(`/Orders?page=${page}&size=${options?.perPage}`),
  updateOrders: async (id: string, body: any | Object) =>
    requests.put(`/Orders/${id}`, body),
};

export default orderFetcher;
