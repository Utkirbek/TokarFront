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
  getPayments: "/payments",
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
  searchUser = "searchUser",
  addAdmin = "addAdmin",
  searchAdmins = "searchAdmins",
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
  addOrders = "addOrders",
  updateOrders = "updateOrders",
  deleteOrders = "deletaOrders",
  getCurrency = "getCurrency",
  addCurrency = "addCurrency",
  updateCurrency = "updateCurrency",
  deleteCurrency = "deleteCurrency",
  addPayments = "addPayments",
  getPayments = "getPayments",
  deletePayments = "deletePayments",
  editPayments = "editPayments",
  update = "updateSpend",
  getKassa = "kassa",
  getSpend = "getSpend",
  addSpend = "addSpend",
  updateSpend = "updateSpend",
  deleteSpend = "deleteSpend",
  getSalary = "getSalary",
  addSalary = "addSalary",
  loan = "loan",
  getLoanUserID = "loanUserID",
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
  kassa: {
    view: "kassa.read",
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
  originalPrice: {
    view: "originalPrice.view",
  },
  all: "permissions.all",
};
