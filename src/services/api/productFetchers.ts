import requests from "./requests";

const productFetchers = {
  addProduct: async <T>(body: T) => await requests.post("/products/add", body),
  deleteProduct: async (id: string) => requests.delete(`/products/${id}`),
  getProducts: async (
    page = 1,
    options = {
      perPage: 10,
      minQuantity: false,
      noPrice: false,
    }
  ) =>
    requests.get(
      `/products?page=${page}&size=${options?.perPage}&minQuantity=${options?.minQuantity}&noPrice=${options?.noPrice}`
    ),
  updateProducts: async (id: string, body: any | Object) =>
    requests.put(`/products/${id}`, body),
  getProductById: async (id: string) => requests.get(`/products/${id}`),
  getProductByTitle: async (title: string) =>
    requests.get(`/products/search/${title}`),
};

export default productFetchers;
