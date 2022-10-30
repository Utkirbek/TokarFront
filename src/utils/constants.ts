export const appRoutes = {
  home: "/",
  login: "/auth/sign-in",
  addProduct: "/products",
  getProducts: "/products",
  updateProducts: "/products",
  deleteProducts: "/products",
  addAdmin: "/admin",
};

export enum RequestQueryKeys {
  login = "login",
  getAdmins = "admins",
  deleteAdmin = "deleteAdmin",
  addProduct = "addProduct",
  deleteProducts = "deleteProducts",
  getProducts = "getProducts",
  updateProducts = "updateProducts",
  updeteAdmin = "updeteAdmin",
  addAdmin = "addAdmin",
  searchProduct = "searchProduct",
}
