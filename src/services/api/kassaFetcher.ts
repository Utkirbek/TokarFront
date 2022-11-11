import requests from "./requests";

const kassaFetcher = {
  getKassa: async () => requests.get("/kassa"),
};
export default kassaFetcher;
