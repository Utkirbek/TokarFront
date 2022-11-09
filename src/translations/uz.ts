const uz = {
  loading: "Yuklanmoqda",
  delete: "O'chirish",
  cancel:"Bekor qilish",
  sthWentWrong: "Xatolik yuz berdi",
  admins: {
    delete: {
      success: {
        ongoing: "O'chirish bajarilmoqda",
        message: "Foydalanuvchi udalit qilindi",
      },
      error: {
        ongoing: "O'chirishda xatolik",
        message: "Foydalanuvchi o'chirilmadi",
      },
      modal: {
        title: "Siz ushbu foydalanuvchini o'chirmoqchimisiz",
        confirmation:
          "{name} ismli ishchingiz sizni tizimdan o'chib ketadi, Rozimisiz?",
        buttons: {
          cancel: "Bekor qilish",
          confirm: "O'chirish",
        },
      },
    },
    update: {
      success: {
        ongoing: "Yangilash bajarilmoqda",
        message: "Foydalanuvchi yangilandi",
      },
      error: {
        ongoing: "Yangilashda xatolik",
        message: "Foydalanuvchi yangilanmadi",
      },
      modal: { title: "Foydalanuvchi ma'lumotlarini yangilash" },
    },
    add: {
      title: "Yangi Admin qo'shish",
      success: {
        ongoing: "Qo'shish bajarilmoqda",
        message: "Foydalanuvchi qo'shildi",
      },
      error: {
        ongoing: "Qo'shishda xatolik",
        message: "Foydalanuvchi qo'shilmadi",
      },
      modal: { title: "Yangi foydalanuvchi qo'shish" },
    },
    form: {
      add: {
        title: "Yangi Admin qo'shish",
        submit: "Qo'shish",
      },
      edit: {
        title: "Admin ma'lumotlarini yangilash",
        submit: "Yangilash",
      },
      input: {
        name: {
          label: "Ism",
          placeholder: "Ismingizni kiriting",
        },
        email: {
          label: "Email",
          placeholder: "Emailingizni kiriting",
        },
        password: {
          label: "Parol",
          placeholder: "Parolingizni kiriting",
        },
        role: {
          label: "Rol",
          placeholder: "Rolingizni tanlang",
        },
      },
    },

    title: "Adminlar",
    name: "Ism",
    email: "Elektron pochta",
    role: "Rol",
    deleteEdit: "O'chirish/tahrirlash",
  },
  emptyBox: {
    boxTitle: "Sizng obringizda maxsulot qolmadi",
  },
  settings: {
    title: "Sozlamalar",
    description: "Dastur sozlamalari",
  },
  customers: {
    title: "Klientlar",
    description: "Klientlar boshqaruv paneli",
  },
  products: {
    title: "Mahsulotlar",
    description: "Mahsulotlar boshqaruv paneli",
    details: "Batafsil",

    form: {
      currencyPlaceholder: "Valyuta turini tanlang",
      currencyLabel: "Valyuta",
    },
  },
  addProductsForm: {
    showNotifTitle: "Iltimos kuting...",
    showNotifMessage: "Sizning mahsuloringiz yangilanmoqda iltimos kuting",
    updateNotifTitle: "Muaffaqiyatli",
    updateNotifMessage: "Sizning mahsuloringiz Yangilandi",
    updataNotifErrorTitle: "Xatolik",
    updataNotifErrorMessage: "Xatolik! Mahsulot Qo'shilmadi",
  },
  productDetail: {
    titleHead: "Mahsulot haqida batafsil malumot",
    productImage: "Bu yerda Mahsulot rasmi bolishi kerak",
    productName: "Mahsulot Nomi",
    productCode: "Mahsulot Kodi",
    productPrice: "Mahsulot Narxi",
    productTotal: "Mahsulot Ombordagi soni",
    createProduct: "Yaratilgan Vaqti",
    updateProduct: "Yangilangan Vaqti",
  },
  statistics: {
    title: "Statistika",
    description: "Statistika ma'lumotlari",
  },
  orders: {
    title: "Buyurtmalar",
    description: "Buyurtmalar haqida ma'lumotlar portali",
  },
  OrdersDetail: {
    titleHead: "Buyurtmalar haqida batafsil ma'lumot",
    ordersSalesmen: "Sotuvchi",
    ordersProductId: "maxsulot codi",
    ordersQuantity: "maxsulot soni",
    ordersPrice: "maxsulot narxi",
    createOrder: "Yaratilgan Vaqti",
    updateOrder: "Yangilangan Vaqti",
    paymentOrder: "jami narxi",
    orderUser: "Xaridor",
  },
  logout: {
    title: "Chiqish",
    description: "Profildan chiqish",
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
  tableHead: {
    name: "Mahsulot Nomi",
    code: "Kodi",
    price: "Narxi",
    quantity: "Jami",
    discount: "Chegirma",
    valyuta: "Pul Birligi",
    paymentType: "To'lov turi",
    action: "Tahrirlash / O'chirish",
    details: "Ko'prog'ini Ko'rish",
  },
  openDeleteModal: {
    title: "Siz bu mahsulotni chindanham o'chirmoqchimisiz",

    add: "+ Yangi mahsulot qo'shish",
  },
  sotish: {
    sotiw: "Sotish",
  },
  foydalanuvchi: {
    foydalanuv: "Foydalanuvchilar chiqadi",
    kuni: "Necha kunga",
  },

  roles: {
    title: "Rollar",
    addRoles: "+ Rol qo'shish",
    name: "Nomi",
    deleteConfirmation:
      "{name} Ushbu ishchingiz sizni tizimdan o'chib ketadi, bu ishni ortga qaytarib bo'lmaydi, shunda ham ishonchingiz komilmi?",
    deleteSuccessMessage: "Foydalanuvchi udalit qilindi",
    deletEdit: "O'chirish va tahrirlash",
  },
  perm: {
    allow: "Ruxsat Etilgan Amallar",
    newAllow: "Yangi ruxsat",
    addTitle: "Yangi huquq qo'shish",
    addInputLabel: "Huquq nomi",
    addInputPlholder: "Huquq nomini kiriting",
    updateTitle: "Huquqni o'zgartirish",
    updateInputLabel: "Huquq nomini o'zgartirish",
    updateInputPlholder: "Yangi huquq nomini kiriting",
    yes: "Saqlash",
    no: "Bekor qilish",
    onSuccessTitle: "Ruxsat o'chirilmoqda",
    onSuccessMessage:
      "Bu malumot o'chirilgandan keyin qayta yuklashni iloji yo'q. Yangi ruxsat qo'shasiz",
    onErrorTitle: "Xatolik",
    onErrorMessage: "Xatolik Yuz berdi",
    modalTitle: "Ruxsatni o'chirish",
    modalText: "Siz bu ruxsatni chindanham o'chirmoqchimisiz",
    cancelTitle:"Siz bekor qildingiz",
    cancelMessage:"Siz bu ruxsatni rostdan ham o'chirmadingiz!"
  },

  perms: {
    a:"a",
    permissions: {
      view: "Ruxsatlarni ko'rish",
      all: "Barcha ruxsatlar",
      add: "Ruxsat qo'shish",
      edit: "Ruxsatni tahrirlash",
      delete: "Ruxsatni o'chirish",
    },
    accounting: { view: "Akkauntlarni ko'rish" },
    products: {
      originalPrice: "Mahsulotning asl narxi",
      delete: "Mahsulotlarni o'chirish",
      view: "Mahsulotlarni ko'rish",
      edit: "Mahsulotlarni tahrirlash",
      create: "Mahsulotlarni yaratish",
      add: "Mahsulotlarni qo'shish",
    },
    settings: {
      view: "Sozlamalarni ko'rish",
      edit: "Sozlamalarni tahrirlash",
      add: "Sozlamalarni qo'shish",
      delete: "Sozlamalarni o'chirish",
    },
    admins: {
      view: "Adminlarni ko'rish",
      edit: "Adminlarni tahrirlash",
      add: "Adminlarni qo'shish",
      delete: "Adminlarni o'chirish",
    },

    statistics: {
      view: "Statistikani ko'rish",
      edit: "Statistikani tahrirlash",
      add: "Statistikani qo'shish",
      delete: "Statistikani o'chirish",
      costs: "Xarajatlarni ko'rish",
    },
    users: {
      view: "Foydalanuvchilarni ko'rish",
      edit: "Foydalanuvchilarni tahrirlash",
      add: "Foydalanuvchilarni qo'shish",
      delete: "Foydalanuvchilarni o'chirish",
    },
  },
};

export default uz;
