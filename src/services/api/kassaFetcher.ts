import requests from "./requests";

const kassaFetcher = {
  getKassa: async (page = 1, perPage = 10) =>
    requests.get(`/kassa/?page=${page}&size=${perPage}`),
};
export default kassaFetcher;
