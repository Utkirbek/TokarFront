import requests from "./requests";

const loanFeatchers = {
  getLoan: async (
    page = 1,
    options = {
      perPage: 10,
    }
  ) => requests.get(`/loan?page=${page}&size=${options?.perPage}`),
  getLoanUserID: async (_: string, id: string) =>
    requests.get(`/loan/user/${id}`),
};
export default loanFeatchers;
