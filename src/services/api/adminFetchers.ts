import requests from "./requests";

const adminFetchers = {
  getAdmins: async () => requests.get("/admin"),
  deleteAdmin: async (id: string) => requests.delete(`/admin/${id}`),
};

export default adminFetchers;
