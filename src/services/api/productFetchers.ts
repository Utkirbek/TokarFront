import requests from "./requests";

const productFetchers = {
  addProduct: async <T>(body: T) => await requests.post("/products/add", body),
  deleteProduct: async (id: string) => requests.delete(`/products/${id}`),
  getProducts: async () => requests.get(`/products`),
  updateProducts: async (id: string, body: any | Object) =>
    requests.put(`/products/${id}`, body),
};

export default productFetchers;
