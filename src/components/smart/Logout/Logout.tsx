import useUser from "@hooks/shared/useUser";
import useConfirmation from "@hooks/useConfirmation";
import { Avatar, Menu, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import { useSpotlight } from "@mantine/spotlight";
import {
  IconBarcode,
  IconChartLine,
  IconLogout,
  IconSearch,
} from "@tabler/icons";
import { Permissions } from "@utils/constants";
import { removeCookies } from "cookies-next";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";

import If from "../If";

export const logOutUz = {
  title: "Profildan chiqish",
  description: "Chiqish panelini boshqarish",
  children: "Bu profildan chindan xam chiqmoqchimisiz",
  menuLabel: "Ilovalar",
  menuProduct: "Maxsulotlar",
  menuStatiks: "Statistika",
  menuSearch: "Qidiruv",
  menuDanger: "Xavfli",
};

export const logOutEn = {
  title: "Logout",
  description: "Logout Control Panel",
  children: "Are you sure you want to leave this profile?",
  menuLabel: "Applications",
  menuProduct: "Products",
  menuStatiks: "Statistiks",
  menuSearch: "Search",
  menuDanger: "Dangerous",
};

const Logout = () => {
  const { logout } = useUser();
  const spotlight = useSpotlight();
  const router = useRouter();
  const { openConfirm } = useConfirmation();

  const openNotifDelete = () => {
    openConfirm(
      <Text size="sm">
        <FormattedMessage id="logout.children" />
      </Text>,
      {
        titleId: "logout.title",
        onConfirm: () => {
          removeCookies("token");
          removeCookies("shopId");
          removeCookies("isLoggedIn");
          logout();
        },
        onCancel: () => {
          showNotification({
            title: "Siz bekor qildingiz",
            message: "Hey there, your code is awesome! 🤥",
          });
        },
      }
    );
  };

  return (
    <Menu openDelay={100} closeDelay={400} closeOnEscape zIndex={999}>
      <Menu shadow="md" width={250} withArrow>
        <Menu.Target>
          <Avatar
            component="a"
            target="_blank"
            radius="xl"
            size="lg"
            sx={{ cursor: "pointer" }}
          />
        </Menu.Target>
        <Menu.Dropdown>
          <Menu.Label>
            <FormattedMessage id="logout.menuLabel" />
          </Menu.Label>
          <Menu.Item
            onClick={() => {
              router.push("/products");
            }}
            icon={<IconBarcode size={18} />}>
            <FormattedMessage id="logout.menuProduct" />
          </Menu.Item>
          <If hasPerm={Permissions.statistica.view}>
            <Menu.Item
              onClick={() => {
                router.push("/");
              }}
              icon={<IconChartLine size={18} />}>
              <FormattedMessage id="logout.menuStatiks" />
            </Menu.Item>
          </If>
          <Menu.Item
            icon={<IconSearch size={18} />}
            rightSection={
              <Text size="xs" color="dimmed">
                ⌘K
              </Text>
            }
            onClick={() => spotlight.openSpotlight()}>
            <FormattedMessage id="logout.menuSearch" />
          </Menu.Item>
          <Menu.Divider />
          <Menu.Label>
            <FormattedMessage id="logout.menuDanger" />
          </Menu.Label>
          <Menu.Item
            color="red"
            onClick={openNotifDelete}
            icon={<IconLogout size={18} />}>
            <FormattedMessage id="logout.title" />
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Menu>
  );
};

export default Logout;
