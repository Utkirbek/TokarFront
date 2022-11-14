import requests from "./requests";

const loanFeatchers = {
  getLoan: async () => requests.get("/loan"),
  getLoanUserID: async () => requests.get("/loan/user"),
};
export default loanFeatchers;
