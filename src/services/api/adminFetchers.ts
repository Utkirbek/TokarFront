import requests from "./requests";

const adminFetchers = {
  getAdmins: async () => requests.get("/admin"),
  deleteAdmin: async (id: string) => requests.delete(`/admin/${id}`),
  updeteAdmin: async (id: string, values: Object) =>
    requests.put(`/admin/${id}`, values),
  addAdmin: async <T>(body: T) => await requests.post("/admin/add", body),
  getAdminsByTitle: async (title: string) =>
    requests.get(`/admin/search/${title}`),
};

export default adminFetchers;
