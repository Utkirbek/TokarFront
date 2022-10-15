import requests from "./requests";

const authFetchers = {
  login: async <T>(body: T) => await requests.post("/admin/login", body),
};

export default authFetchers;
