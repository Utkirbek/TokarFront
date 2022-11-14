import requests from "./requests";

const salaryFetchers = {
  getSalary: async (id: string) => requests.get("/admin/salary"),
  addSalary: async <T>(body: T) => await requests.post("/admin/salary", body),
};

export default salaryFetchers;
