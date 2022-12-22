import { getCookie } from "cookies-next";

import requests from "./requests";

const salaryFetchers = {
  
  getSalary: async (id: string) => {
    const shopId = getCookie("shopId");
    return requests.get("/admin/salary")},
  addSalary: async <T>(body: T) => {
    const shopId = getCookie("shopId");
    return await requests.post("/admin/salary", body)},
};

export default salaryFetchers;
