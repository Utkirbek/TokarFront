import requests from "./requests";

const shopFetchers = {
  getShop: async () => requests.get("/shop"),
  deleteShop: async (id: string) => requests.delete(`/shop/${id}`),
  updeteShop: async (id: string, values: Object) =>
    requests.put(`/shop/${id}`, values),
  addShop: async <T>(body: T) => await requests.post("/shop/add", body),
};

export default shopFetchers;
