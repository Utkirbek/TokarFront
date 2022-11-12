import requests from "./requests";

const loanFeatchers = {
  getLoan: async () => requests.get("/loan"),
};
export default loanFeatchers;
