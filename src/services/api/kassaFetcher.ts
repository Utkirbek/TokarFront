import requests from "./requests";

const kassaFetcher = {
  getKassa: async (
    page = 1,
    options = {
      perPage: 10,
    }
  ) => requests.get(`/kassa?page=${page}&size=${options?.perPage}`),
};
export default kassaFetcher;
