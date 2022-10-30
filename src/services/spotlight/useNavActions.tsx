import { SpotlightAction } from "@mantine/spotlight";
import { IconHome } from "@tabler/icons";
import { removeCookies } from "cookies-next";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";

const useNavActions = () => {
  const intl = useIntl();
  const router = useRouter();

  return [
    {
      title: intl.formatMessage({ id: "statistics.title" }),
      description: intl.formatMessage({ id: "statistics.description" }),
      onTrigger: () => router.push("/"),
      icon: <IconHome size={18} />,
    },
    {
      title: intl.formatMessage({ id: "settings.title" }),
      description: intl.formatMessage({ id: "settings.description" }),
      onTrigger: () => router.push("/settings"),
      icon: <IconHome size={18} />,
    },
    {
      title: intl.formatMessage({ id: "customers.title" }),
      description: intl.formatMessage({ id: "customers.description" }),
      onTrigger: () => router.push("/users"),
      icon: <IconHome size={18} />,
    },
    {
      title: intl.formatMessage({ id: "products.title" }),
      description: intl.formatMessage({ id: "products.description" }),
      onTrigger: () => router.push("/products"),
      icon: <IconHome size={18} />,
    },
    {
      title: intl.formatMessage({ id: "logout.title" }),
      description: intl.formatMessage({ id: "logout.description" }),
      onTrigger: () => {
        removeCookies("token");
        router.push("/auth/sign-in");
      },
      icon: <IconHome size={18} />,
    },
  ] as SpotlightAction[];
};

export default useNavActions;
