import { logOutUz } from "@components/smart/Logout/Logout";
import defaultLocaleUz from "@hooks/defaultLocaleUz";
import { adminsLocaleUz } from "@modules/admins/locale";
import { signInLocaleUz } from "@modules/auth/locale";
import { kassaLocaleUz } from "@modules/kassa/KassaTable";
import { loanLocaleUz } from "@modules/loan/locale";
import { orderLocaleUz } from "@modules/orders/locale";
import { paymentsLocaleUz } from "@modules/payments/locale";
import { productsLocaleUz } from "@modules/products/locale/locale";
import { rolesLocaleUz } from "@modules/roles/locale";
import { permissionsLocaleUz } from "@modules/settings/locale";
import { expensesLocaleUz } from "@modules/spend/locale";
import { usersLocaleUz } from "@modules/users/locale/locale";

import commonUz from "./uz/common";

const uz = {
  ...commonUz,
  default: defaultLocaleUz,
  users: usersLocaleUz,
  expenses: expensesLocaleUz,
  orders: orderLocaleUz,
  signIn: signInLocaleUz,
  perms: permissionsLocaleUz,
  logout: logOutUz,
  products: productsLocaleUz,
  kassa: kassaLocaleUz,
  roles: rolesLocaleUz,
  admins: adminsLocaleUz,
  loans: loanLocaleUz,
  payments: paymentsLocaleUz,
  sthWentWrong: "Xatolik yuz berdi",
  emptyBox: "Sizng obringizda maxsulot qolmadi",

  settings: {
    title: "Sozlamalar",
    description: "Dastur sozlamalari",
  },
  spends: {
    title: "Xarajatlar",
    description: "Xarajatlar sozlamalari",
  },
  customers: {
    title: "Klientlar",
    description: "Klientlar boshqaruv paneli",
  },
  statistics: {
    title: "Statistika",
    description: "Statistika ma'lumotlari",
  },

  useNotify: {
    loadTitle: "Bajarilmoqda",
    loadMsg: "Iltimos kuting",
    successTitle: "Muaffaqiyatli",
    successMsg: "Muaffaqiyatli Tugatildi",
    censelTitle: "Siz bekor Qildingiz",
    censelMsg: "Amalingiz Oz holicha qildirildi",
    BackTo: "Siz orqaga tugmasini tanladingiz",
    errorTitle: "Xatolik",
    errorMsg: "Xatolik Berdi",
    cancel: "Bekor qilish",
    confirm: "O'chirish",
  },
};

export default uz;
