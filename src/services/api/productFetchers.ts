import requests from "./requests";

const productFetchers = {
  addProduct: async <T>(body: T) => await requests.post("/products/add", body),
  deleteProduct: async (id: string) => requests.delete(`/products/${id}`),
  getProducts: async () => requests.get(`/products`),
};

export default productFetchers;