import { logOutEn } from "@components/smart/Logout/Logout";
import { signInLocaleEn } from "@modules/auth/locale";
import { kassaLocaleEn } from "@modules/kassa/KassaTable";
import { orderLocaleEn } from "@modules/orders/locale";
import { productsLocaleEn } from "@modules/products/locale/locale";
import { rolesLocaleEn } from "@modules/roles/locale";
import { permissionsLocaleEn } from "@modules/settings/locale";
import { expensesLocaleEn } from "@modules/spend/locale";
import { usersLocaleEn } from "@modules/users/locale/locale";

import commonUz from "./uz/common";

const en = {
  ...commonUz,
  users: usersLocaleEn,
  expenses: expensesLocaleEn,
  orders: orderLocaleEn,
  signIn: signInLocaleEn,
  perms: permissionsLocaleEn,
  logout: logOutEn,
  products: productsLocaleEn,
  kassa: kassaLocaleEn,
  roes: rolesLocaleEn,
  sthWentWrong: "Something went wrong",
  action: "Action",

  home: {
    errorLoading: "Error loading",
  },

  admins: {
    adminSalaryTitle: "To pay",
    adminSalaryMsg: "Enter the salary",
    toPay: "To Pay",
    salary: "Maosh",
    back: "Back ",
    deleteConfirmation:
      "{name} This worker will log you out, it can't be undone, are you sure?",
    deleteSuccessMessage: "The user has been removed",
    addAdmins: "+ Add admin",
    name: "Name",
    email: "Email",
    role: "Role",
    deletEdit: "Delete and edit",
    updateNotifTitle: "Deleted successfully",
    updateNotifMessage: "An error occurred during deletion",
    showNotifTitle: "Please wait",
    showNotifMessage: "The user is being redirected",
    deleteModalTitle: "Do you want to delete this user",
    confirm: "Confirmation",
    cancel: "Cancellation",
    canselTitle: "You have canceled",
  },
  emptyBox: "There is no product left in your work",
  settings: {
    title: "Settings",
    description: "Program Settings",
  },
  customers: {
    title: "Clients",
    description: "Customer Control Panel",
  },

  stats: {
    title: "Statistics",
    description: "Statistical information",
  },

  detail: {
    mahsulotNomi: "Product Name",
    mahsulotKodi: "Product Code",
    asilNarxi: "Original Price",
    sotuvdagiNarx: "Sale price",
    valyuta: "In which currency it was purchased",
    obordagiSoni: "Number in warehouse",
    sotilganVaqti: "Time Sold",
    yangilanganVaqti: "Updated Time",
    tarifBoyicha: "Tariff",
    toliqMalumot: "More",
  },
  roles: {
    title: "Roles",
    addRole: "+ Add role",
    name: "Name",
    deleteConfirmation:
      "{name} This worker will log you out, it can't be undone, are you sure?",
    deleteSuccessMessage: "The user has been removed",
    deletEdit: "Delete and edit",
  },
  useNotify: {
    loadTitle: "Succseful",
    loadMsg: "Please Wait",
    successTitle: "On Secselul",
    successMsg: "Saccsess Added",
    censelTitle: "You have canceled",
    censelMsg: "Your deed has been reduced to nothing",
    errorTitle: "Error",
    errorMsg: "An Error Cccurred",
    cancel: "Cancel",
    confirm: "Delete",
  },
};

export default en;
