import { getCookie } from "cookies-next";

import requests from "./requests";


const userSalaryFeatchers = {
  getSalaryUserID: async <T>(body: T) =>{
    const shopId = getCookie("shopId");
    return await requests.post(`/admin/${shopId}/salary`, body)},
}
export default userSalaryFeatchers;
