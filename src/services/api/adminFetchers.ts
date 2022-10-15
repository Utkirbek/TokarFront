import requests from "./requests";

const adminFetchers = {
  getAdmins: async () => requests.get("/admin"),
};

export default adminFetchers;
