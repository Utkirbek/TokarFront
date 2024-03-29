import {
  IconBarcode,
  IconBrandShopee,
  IconBusinessplan,
  IconChartLine,
  IconCoin,
  IconDiscount2,
  IconList,
  IconListDetails,
  IconMoneybag,
  IconReportMoney,
  IconSettingsAutomation,
  IconUserCircle,
  IconUsers,
} from "@tabler/icons";

const data = [
  {
    id: 1,
    link: "/",
    label: "statistics.title",
    icon: IconChartLine,
    permission: "statistics_view",
  },
  {
    id: 14312412,
    link: "/sales",
    label: "sales.title",
    icon: IconDiscount2,
    permission: "sales.view",
  },
  {
    id: 10,
    link: "/kassa",
    label: "kassa.title",
    icon: IconListDetails,
    permission: "kassa.view",
  },
  {
    id: 7,
    link: "/payments",
    label: "payments.title",
    icon: IconMoneybag,
    permission: "payments.view",
  },
  {
    id: 13,
    link: "/profit",
    label: "profit.sidebarTitle",
    icon: IconBusinessplan,
    permission: "profit.view",
  },
  {
    id: 3,
    link: "/spend",
    label: "spends.title",
    icon: IconReportMoney,
    permission: "spends_view",
  },
  {
    id: 11,
    link: "/loan",
    label: "loans.title",
    icon: IconCoin,
    permission: "loans.view",
  },
  {
    id: 2,
    link: "/admins",
    label: "admins.title",
    icon: IconUsers,
    permission: "admins_view",
  },

  {
    id: 4,
    link: "/users",
    label: "customers.title",
    icon: IconUserCircle,
    permission: "users_view",
  },
  {
    id: 5,
    link: "/products",
    label: "products.title",
    icon: IconBarcode,
    permission: "products_view",
  },

  {
    id: 8,
    link: "/orders",
    label: "orders.title",
    icon: IconList,
    permission: "orders_view",
  },

  {
    id: 12,
    link: "/shopes",
    label: "shopes.sidebarTitle",
    icon: IconBrandShopee,
    permission: "shop.view",
  },

  {
    id: 6,
    link: "/settings",
    label: "settings.title",
    icon: IconSettingsAutomation,
    permission: "settings_view",
  },
];
export default data;
