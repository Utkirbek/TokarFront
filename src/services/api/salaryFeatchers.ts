import requests from "./requests";

const userSalaryFeatchers = {
  getSalaryUserID: async <T>(body: T) =>
    await requests.post("/admin/salary", body),
};
export default userSalaryFeatchers;
