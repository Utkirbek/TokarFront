import useUser from "@hooks/shared/useUser";
import { SpotlightAction } from "@mantine/spotlight";
import { IconHome } from "@tabler/icons";
import { removeCookies } from "cookies-next";
import { useRouter } from "next/router";
import { useMemo } from "react";
import { useIntl } from "react-intl";

const useNavActions = () => {
  const intl = useIntl();
  const router = useRouter();
  const { logout } = useUser();

  const actions: SpotlightAction[] = useMemo(() => {
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
        title: intl.formatMessage({ id: "orders.title" }),
        description: intl.formatMessage({ id: "orders.description" }),
        onTrigger: () => router.push("/orders"),
        icon: <IconHome size={18} />,
      },
      {
        title: intl.formatMessage({ id: "logout.title" }),
        description: intl.formatMessage({ id: "logout.description" }),
        onTrigger: () => {
          window?.localStorage?.clear?.();
          removeCookies("token");
          removeCookies("shopId");
          removeCookies("isLoggedIn");
          logout();
          router.push("/auth/sign-in");
        },
        icon: <IconHome size={18} />,
      },
    ];
  }, [intl, router]);

  return actions;
};

export default useNavActions;
