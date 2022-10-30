import useUser from "@hooks/shared/useUser";
import { Avatar, Menu, Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { useSpotlight } from "@mantine/spotlight";
import {
  IconLogout,
  IconReportMoney,
  IconSearch,
  IconUser,
} from "@tabler/icons";
import { removeCookies } from "cookies-next";
import { FormattedMessage } from "react-intl";

const Logout = () => {
  const { logout } = useUser();
  const spotlight = useSpotlight();

  const openNotifDelete = () => {
    openConfirmModal({
      title: "Profildan chiqish",
      centered: true,
      children: <Text size="sm">Bu profildan chindan xam chiqmoqchimisiz</Text>,
      labels: { confirm: "Ha", cancel: "Yo'q" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        removeCookies("token");
        logout();
      },

      onCancel: () => {
        showNotification({
          title: "Siz bekor qildingiz",
          message: "Hey there, your code is awesome! 🤥",
        });
      },
    });
  };

  return (
    <Menu openDelay={100} closeDelay={400}>
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
          <Menu.Label>Ilovalar</Menu.Label>
          <Menu.Item icon={<IconUser size={18} />}>Profilga kirish</Menu.Item>
          <Menu.Item icon={<IconReportMoney size={18} />}>Qarzdorlar</Menu.Item>
          <Menu.Item
            icon={<IconSearch size={18} />}
            rightSection={
              <Text size="xs" color="dimmed">
                ⌘K
              </Text>
            }
            onClick={() => spotlight.openSpotlight()}
          >
            Qidiruv
          </Menu.Item>
          <Menu.Divider />
          <Menu.Label>Xavfli</Menu.Label>
          <Menu.Item
            color="red"
            onClick={openNotifDelete}
            icon={<IconLogout size={18} />}
          >
            <FormattedMessage id="logout.title" />
          </Menu.Item>
        </Menu.Dropdown>
      </Menu>
    </Menu>
  );
};

export default Logout;
