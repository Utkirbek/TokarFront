import requests from "./requests";

const productFetchers = {
  addProduct: async <T>(body: T) => await requests.post("/products/add", body),
  deleteProduct: async (id: string) => requests.delete(`/products/${id}`),
  getProducts: async (page = 1, perPage = 10) =>
    requests.get(`/products?page=${page}&size=${perPage}`),
  updateProducts: async (id: string, body: any | Object) =>
    requests.put(`/products/${id}`, body),
  getProductById: async (id: string) => requests.get(`/products/${id}`),
  getProductByTitle: async (title: string) =>
    requests.get(`/products/search/${title}`),
};

export default productFetchers;
