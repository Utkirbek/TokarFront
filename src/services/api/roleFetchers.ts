import requests from "./requests";

const roleFetchers = {
  getRoles: async () => requests.get("/role"),
  deleteRole: async (id: string) => requests.delete(`/role/${id}`),
  updateRole: async (id: string, values: Object) =>
    requests.put(`/role/${id}`, values),
  addRole: async <T>(body: T) => await requests.post("/role/add", body),
};

export default roleFetchers;
