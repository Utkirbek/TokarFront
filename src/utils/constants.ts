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
  getUserID = "getUserID",
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
  getSitatisticsSpend = "getSitatisticsSpend",
  getSitatisticsIncome = "getSitatisticsIncome",
  getSitatisticsStaffSalary = "getSitatisticsStaffSalary",
  getLoanUserID = "loanUserID",
  statistics = "statistics",
  userId = "user",
  getShop = "getShop",
  addShop = "addShop",
  updateShop = "updateShop",
  deleteShop = "deleteShop",
}

export const Permissions = {
  products: {
    edit: "products.edit",
    create: "product.create",
    delete: "products.delete",
    sell: "product.sell",
    add: {
      originalPrice: "perms.products.add.originalPrice",
      price: "perms.products.add.price",
    },
    name: "product.name",
    code: "product.code",
    originalPrice: "product.originalPrice",
    price: "product.price",
    quantity: "product.quantity",
    action: "product.action",
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
    image: "user.image",
    name: "users.name",
    phone: "users.phone",
    workplace: "users.workplace",
    extra: "users.extra",
    action: "users.action",
    view: "users_view",
    create: "users.create",
    edit: "users.edit",
    delete: "users.delete",
  },
  payments: {
    view: "payments.view",
  },
  statistica: {
    view: "statistics.view",
  },
  settings: {
    view: "settings_view",
  },
  accounting: {
    view: "accounting.view",
  },
  originalPrice: {
    view: "originalPrice.view",
  },
  roles: {
    view: "roles.view",
  },
  orders: {
    view: "orders.view",
    delete: "orders_delete",
    salesman: "orders.salesman",
    user: "orders.user",
    quantity: "orders.quantity",
    createAt: "orders.createAT",
    updateAT: "orders.updateAT",
    action: "orders.action",
  },
  loans: {
    view: "loans.view",
  },
  shop: {
    create: "shop.create",
  },
  all: "permissions.all",
  sidebar: {
    statistics: {
      view: "statistics.view",
    },
    admins: {
      view: "admins.view",
    },
    shop: "shop.view",
  },
  profit: {
    view: "profit.view",
  },
};
