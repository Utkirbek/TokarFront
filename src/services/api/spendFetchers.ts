import requests from "./requests";

const orderFetchers = {
  addSpend: async <T>(body: T) => await requests.post("/spend/add", body),
  deleteSpend: async (id: string) => requests.delete(`/spend/${id}`),
  getSpend: async () => requests.get(`/spend`),
  updateSpend: async (id: string, body: any | Object) =>
    requests.put(`/spend/${id}`, body),
};

export default orderFetchers;
