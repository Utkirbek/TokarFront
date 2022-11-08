import {
  IconBarcode,
  IconChartLine,
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
    link: "/users",
    label: "customers.title",
    icon: IconUserCircle,
    permission: "customers.view",
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
];
export default data;
