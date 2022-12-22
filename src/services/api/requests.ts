import axios from "axios";
import { getCookie } from "cookies-next";

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BASE_API_URL,
  timeout: 500000,
  headers: {
    "Accept": "application/json",
    "Content-Type": "application/json",
  },
});

instance.interceptors.request.use(function (config) {
  // Do something before request is sent
  let token = getCookie("token");

  return {
    ...config,
    headers: {
      authorization: token ? `Bearer ${token}` : null,
    },
  };
});

const responseBody = <T>(response: { data: T }) => response.data;

const requests = {
  get: (url: string) => instance.get(url).then(responseBody),
  post: <T>(url: string, body: T) =>
    instance.post(url, body).then(responseBody),
  put: <T>(url: string, body: T) => instance.put(url, body).then(responseBody),
  delete: <T>(url: string, body?: T) =>
    instance.delete(url, body || {}).then(responseBody),
};

export default requests;
