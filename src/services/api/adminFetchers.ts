import requests from "./requests";

const adminFetchers = {
  getAdmins: async () => requests.get("/admin"),
  deleteAdmin: async (id: string) => requests.delete(`/admin/${id}`),
  updeteAdmin: async (id: string, body: string) =>
    requests.put(`/admin/${id}`, body),
  addAdmin: async <T>(body: T) => await requests.post("/admin/add", body),
};

export default adminFetchers;
