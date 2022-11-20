import requests from "./requests";

const userFetcher = {
  getUsers: async () => requests.get(`/user`),
  getUserID: async (id: string) => requests.get(`/user/loan/${id}`),
  addUsers: async <T>(body: T) => await requests.post("/user/add", body),
  deleteUsers: async (id: string) => requests.delete(`/user/${id}`),
  updateUsers: async (id: string, body: any | Object) =>
    requests.put(`/user/${id}`, body),
  getUsersId: async (id: string) => requests.get(`/user/${id}`),
  getUsersByTitle: async (title: string) =>
    requests.get(`/user/search/${title}`),
};

export default userFetcher;
