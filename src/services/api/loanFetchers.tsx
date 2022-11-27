import requests from "./requests";

const loanFeatchers = {
  getLoan: async (page = 1, perPage = 10) =>
    requests.get(`/loan/?page=${page}&size=${perPage}`),
  getLoanUserID: async (_: string, id: string) =>
    requests.get(`/loan/user/${id}`),
};
export default loanFeatchers;
