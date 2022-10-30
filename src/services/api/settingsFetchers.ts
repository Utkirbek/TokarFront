import requests from "./requests";

const settingsFetchers = {
  addPermission: async (name: string) => {
    return await requests.post("/permission/add", { name });
  },
  updatePermission: async (id: string, name: string) => {
    return await requests.put(`/permission/${id}`, { name });
  },
  getAllPermissions: async () => {
    return await requests.get("/permission");
  },
  deletePermission: async (id: string) => {
    return await requests.delete(`/permission/${id}`);
  },

  // Roles
  addRole: async (name: string, permissions: string[]) => {
    return await requests.post("/role/add", { name, permissions });
  },
  updateRole: async (id: string, name: string, permissions: string[]) => {
    return await requests.put(`/role/${id}`, { name, permissions });
  },
  getAllRoles: async () => {
    return await requests.get("/role");
  },
  deleteRole: async (id: string) => {
    return await requests.delete(`/role/${id}`);
  },
};

export default settingsFetchers;
