import requests from "./requests";

const orderFetchers = {
  addOrders: async <T>(body: T) => await requests.post("/Orders/add", body),
  deleteOrders: async (id: string) => requests.delete(`/Orders/${id}`),
  getOrders: async () => requests.get(`/Orders`),
  updateOrders: async (id: string, body: any | Object) =>
    requests.put(`/Orders/${id}`, body),
};

export default orderFetchers;
