import requests from "./requests";

const loanFeatchers = {
  getLoan: async () => requests.get("/loan"),
  getLoanUserID: async (_: string, id: string) =>
    requests.get(`/loan/user/${id}`),
};
export default loanFeatchers;
