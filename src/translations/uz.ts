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
import { shopLocalUz } from "@modules/shopes/locale/locale";
import { expensesLocaleUz } from "@modules/spend/locale";
import { usersLocaleUz } from "@modules/users/locale/locale";
import { checkTilUz, userTilUz } from "@modules/users/locale/localetil";

import { commonUz } from "./common/common";

const uz = {
  ...commonUz,
  default: defaultLocaleUz,
  users: usersLocaleUz,
  signIn: signInLocaleUz,
  expenses: expensesLocaleUz,
  orders: orderLocaleUz,
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
  emptyBox: "Hech qanday ma'lumot topilmadi!",
  serverError: "Server ishlamayapti",
  pageNotFound: "Sahifa topilmadi",
  saveCurrency: "Saqlash",
  currencyPerm: "Valyuta",
  imgUploader: "Iltimos faqat rasmlarni yuklang",
  shopes: shopLocalUz,

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
    name: "hafta",
  },

  OrdersDetail: {
    titleHead: "Buyurtmalar haqida batafsil ma'lumot",
    orderImage: "Maxsulot rasmi",
    orderTitleProduct: "Maxsulot nomi",
    ordersSalesmen: "Sotuvchi",
    ordersProductId: "Maxsulot codi",
    ordersQuantity: "Maxsulot soni",
    ordersQuantityAll: "Jami maxsulot soni",
    ordersPrice: "maxsulot narxi",
    createOrder: "Qo'shilgan Vaqti",
    updateOrder: "Yangilangan Vaqti",
    paymentOrder: "Jami narxi",
    orderUser: "Xaridor",
    userPhoneNumber: "Telefon raqami",
    userWorkplace: "Ish joyi",
    userExtra: "Qo'shimcha ma'lumot",
    orderAction: "Amallar",
  },
  buyCart: {
    datatitle: "Naqt pul",
    dataterminal: "Terminal",
    dataplastik: "Plastik",
    databolibtolash: "Bo'lib to'lash",
    jamiSuma: "Umumiy Narxi",
    sotish: "Sotish",
    kimga: "Kimga",
    maxsulotYoq: "Sizda mahsulot qolmadi",
    payDay: "Muddatni Kiriting",
    kodi: "kodi",
    som: "so'm",
  },
  detail: {
    mahsulotNomi: "Mahsulot Nomi",
    mahsulotKodi: "Mahsulot Kodi",
    asilNarxi: "Asl Narxi",
    sotuvdagiNarx: "Sotuvdagi Narxi",
    valyuta: "Qaysi Valyutada sotib olingani",
    obordagiSoni: "Ombordagi Soni",
    sotilganVaqti: "Sotilgan Vaqti",
    yangilanganVaqti: "Yangilangan Vaqti",
    tarifBoyicha: "Tarifi",
    toliqMalumot: "Batafsil",
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
