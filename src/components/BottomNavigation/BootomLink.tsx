import useUser from "@hooks/shared/useUser";
import useConfirmation from "@hooks/useConfirmation";
import { Box, Menu, Text } from "@mantine/core";
import { showNotification } from "@mantine/notifications";
import data from "@modules/layout/dataSidebar";
import { IconLogout } from "@tabler/icons";
import { removeCookies } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormattedMessage } from "react-intl";

import BottomStyle from "./BottomStyle";

const activeStyle = {
  background: "#1864AB",
  color: "white",
};
const BootomLink: React.FC<{
  setOpened: any;
}> = ({ setOpened }) => {
  const { classes, cx } = BottomStyle();
  const { logout } = useUser();
  const router = useRouter();
  const [activeId, setActiveId] = useState(null);
  const { openConfirm } = useConfirmation();
  function add({ id }: any) {
    setActiveId(id);
    setOpened(false);
  }
  const openNotifDelete = () => {
    openConfirm(
      <Text size="sm">
        <FormattedMessage id="logout.children" />
      </Text>,
      {
        titleId: "logout.title",
        onConfirm: () => {
          window?.localStorage?.clear?.();
          removeCookies("token");
          removeCookies("shopId");
          removeCookies("isLoggedIn");
          logout();
        },
        onCancel: () => {
          showNotification({
            title: "Siz bekor qildingiz",
            message: "Siz profildan chiqib ketishni rad etdingiz :)",
          });
        },
      }
    );
  };
  const links = data.map((item: any) => {
    return (
      <Box key={item.label}>
        <Link
          href={item.link}
          style={item.id === activeId ? activeStyle : {}}
          onClick={() => add(item.id)}
          className={cx(classes.link, {
            linkActive: item.link === router.pathname,
          })}
        >
          <item.icon stroke={1.5} />
          <Text style={{ marginLeft: "12px" }}>
            <FormattedMessage id={item.label} />
          </Text>
        </Link>
      </Box>
    );
  });
  return (
    <>
      {links}
      <Menu zIndex={999}>
        <Menu.Item
          color="red"
          onClick={openNotifDelete}
          icon={<IconLogout size={25} />}
        >
          <FormattedMessage id="logout.title" />
        </Menu.Item>
      </Menu>
    </>
  );
};

export default BootomLink;
