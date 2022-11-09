export const appRoutes = {
  home: "/",
  login: "/auth/sign-in",
  addProduct: "/products",
  getProducts: "/products",
  updateProducts: "/products",
  getUsers: "/user",
  deleteUser: "/user",
  updateUser: "/user",
  addUser: "/user",
  deleteProducts: "/products",
  addAdmin: "/admin",
};


export enum RequestQueryKeys {
    login = "login",
    getAdmins = "admins",
    deleteAdmin = "deleteAdmin",
    updeteAdmin = "updeteAdmin",
    addProduct = "addProduct",
    deleteProducts = "deleteProducts",
    getProducts = "getProducts",
    updateProducts = "updateProducts",
    getUsers = "getUsers",
    deleteUsers = "deleteUsers",
    addUsers = "addUsers",
    updateUsers = "updateUsers",
    addAdmin = "addAdmin",
    searchProduct = "searchProduct",
    getAllPermissions = "getAllPermissions",
    addPermission = "addPermission",
    updatePermission = "updatePermission",
    deletePermission = "deletePermission",
    getAllRoles = "getAllRoles",
    addRole = "addRole",
    updateRole = "updateRole",
    deleteRole = "deleteRole",
    getOrders = "getOrders",
    getCurrency = "getCurrency",
    addCurrency = "addCurrency",
    updateCurrency = "updateCurrency",
    deleteCurrency = "deleteCurrency",
    getSpend = "getSpend",
    addSpend = "addSpend",
    update = "updateSpend",
    deleteSpend = "deleteSpend",
    updateSpend = "updateSpend"
}

export const Permissions = {
  products: {
    edit: "products.edit",
    create: "products.create",
    delete: "products.delete",
    sell: "products.sell",
  },
  spends: {
    edit: "spends.edit",
    create: "spends.create",
    delete: "spends.delete",
    view: "spends.read",
  },
  admins: {
    view: "admins.read",
    delete: "admins.delete",
    create: "admins.create",
    edit: "admins.edit",
  },
  users: {
    view: "admins.view",
    create: "admins.create",
    edit: "admins.edit",
    delete: "admins.delete",
    action: "action.view",
  },
  statistica: {
    view: "statistics.view",
  },
  settings: {
    view: "settings.view",
  },
  accounting: {
    view: "accounting.view",
  },
  all: "permissions.all",
};
