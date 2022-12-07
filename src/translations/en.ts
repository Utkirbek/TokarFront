import { logOutEn } from "@components/smart/Logout/Logout";
import defaultLocaleEn from "@hooks/defaultLocaleEn";
import { adminsLocaleEn } from "@modules/admins/locale";
import { signInLocaleEn } from "@modules/auth/locale";
import { kassaLocaleEn } from "@modules/kassa/KassaTable";
import { loanLocaleEn } from "@modules/loan/locale";
import { orderLocaleEn } from "@modules/orders/locale";
import { paymentsLocaleEn } from "@modules/payments/locale";
import { productsLocaleEn } from "@modules/products/locale/locale";
import { rolesLocaleEn } from "@modules/roles/locale";
import { permissionsLocaleEn } from "@modules/settings/locale";
import { shopLocalEn } from "@modules/shopes/locale/locale";
import { expensesLocaleEn } from "@modules/spend/locale";
import { usersLocaleEn } from "@modules/users/locale/locale";

import { commonEn } from "./common/common";

const en = {
  ...commonEn,
  default: defaultLocaleEn,
  users: usersLocaleEn,
  expenses: expensesLocaleEn,
  orders: orderLocaleEn,
  signIn: signInLocaleEn,
  perms: permissionsLocaleEn,
  logout: logOutEn,
  products: productsLocaleEn,
  kassa: kassaLocaleEn,
  roles: rolesLocaleEn,
  admins: adminsLocaleEn,
  loans: loanLocaleEn,
  payments: paymentsLocaleEn,
  shopes: shopLocalEn,
  sthWentWrong: "Something went wrong",
  emptyBox: "There is no product left in your work",
  serverError: "Server Error",
  pageNotFound: "Page Not Found",
  saveCurrency: "Save",
  currencyPerm: "Valyuta",
  imgUploader: "Drag images here or click to select files",

  settings: {
    title: "Settings",
    description: "Program Settings",
  },
  spends: {
    title: "Spends",
    description: "Spends settings",
  },
  customers: {
    title: "Clients",
    description: "Customer Control Panel",
  },
  statistics: {
    title: "Statistics",
    description: "Statistical information",
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
