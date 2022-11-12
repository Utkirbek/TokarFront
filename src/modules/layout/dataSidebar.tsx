import {
  IconBarcode,
  IconChartLine,
  IconCoin,
  IconList,
  IconListDetails,
  IconSettingsAutomation,
  IconUserCircle,
  IconUsers,
} from "@tabler/icons";

const data = [
  {
    link: "/",
    label: "statistics.title",
    icon: IconChartLine,
    permission: "statistics.view",
  },
  {
    link: "/admins",
    label: "admins.title",
    icon: IconUsers,
    permission: "admins.view",
  },
  {
    link: "/spend",
    label: "spends.title",
    icon: IconUsers,
    permission: "spends.view",
  },
  {
    link: "/users",
    label: "customers.title",
    icon: IconUserCircle,
    permission: "users.view",
  },
  {
    link: "/products",
    label: "products.title",
    icon: IconBarcode,
    permission: "products.view",
  },
  {
    link: "/settings",
    label: "settings.title",
    icon: IconSettingsAutomation,
    permission: "settings.view",
  },
  {
    link: "/roles",
    label: "roles.title",
    icon: IconSettingsAutomation,
    permission: "roles.view",
  },
  {
    link: "/orders",
    label: "orders.title",
    icon: IconList,
    permission: "orders.view",
  },
  {
    link: "/kassa",
    label: "kassa.title",
    icon: IconListDetails,
    permission: "kassa.view",
  },
  {
    link: "/loan",
    label: "loans.title",
    icon: IconCoin,
    permission: "loans.view",
  },
];
export default data;
