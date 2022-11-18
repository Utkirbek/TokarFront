import { logOutUz } from "@components/smart/Logout/Logout";
import defaultLocaleUz from "@hooks/defaultLocaleUz";
import { adminsLocaleUz } from "@modules/admins/locale";
import { signInLocaleUz } from "@modules/auth/locale";
import { kassaLocaleUz } from "@modules/kassa/KassaTable";
import { loanLocaleUz } from "@modules/loan/locale";
import tableNameData from "@modules/orders/const/tableTitleName";
import { orderLocaleUz } from "@modules/orders/locale";
import { paymentsLocaleUz } from "@modules/payments/locale";
import { productsLocaleUz } from "@modules/products/locale/locale";
import { rolesLocaleUz } from "@modules/roles/locale";
import { permissionsLocaleUz } from "@modules/settings/locale";
import { expensesLocaleUz } from "@modules/spend/locale";
import { usersLocaleUz } from "@modules/users/locale/locale";
import { checkTilUz, userTilUz } from "@modules/users/locale/localetil";

import { commonUz } from "./common/common";

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
  userTil: userTilUz,
  checks: checkTilUz,
  orderTil: tableNameData,
  loans: loanLocaleUz,
  payments: paymentsLocaleUz,
  sthWentWrong: "Xatolik yuz berdi",
  emptyBox: "Sizng obringizda maxsulot qolmadi",
  pageNotFound: "sahifa topilmadi",

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
  notification: {
    loading: "Yuklanmoqda",
    success: "Muaffaqiyatli",
    error: "Xatolik",
    warning: "Diqqat",
    info: "Ma'lumot",
    noData: "Ma'lumot mavjud emas",
    loadingDescription: "Iltimos kuting",
    successDescription: "Muaffaqiyatli amalga oshirildi",
    errorDescription: "Xatolik yuz berdi",
    warningDescription: "Diqqat",
    infoDescription: "Ma'lumot",
  },

  confirmation: {
    title: "Siz rostdan ham ushbu amalni bajarmoqchimisiz?",
    message: "Bu amalni qaytarib bo'lmaydi",
    confirm: "Ha",
    cancel: "Yo'q",
  },
  
};

export default uz;
