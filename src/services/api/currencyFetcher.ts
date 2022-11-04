import requests from "./requests";

const currencyFetchers = {
  getCurrency: async () => requests.get("/currency"),
  deleteCurrenncy: async (id: string) => requests.delete(`/currency/${id}`),
  updeteCurrency: async (id: string, values: Object) =>
    requests.put(`/currency/${id}`, values),
  addCurrency: async <T>(body: T) => await requests.post("/currency/add", body),
};

export default currencyFetchers;
