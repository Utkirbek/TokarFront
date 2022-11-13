import If from "@components/smart/If";
import { Button, Drawer, Group, useMantineTheme } from "@mantine/core";
import { Permissions } from "@utils/constants";
import React, { useCallback } from "react";
import { FormattedMessage } from "react-intl";

import NewUser from "../NewUser";

type Props = {
  opened: boolean;
  toggleOpened: (bool?: boolean) => void;
  editItem: any;
  setEditItem: (item: any) => void;
};

const UsersDrawer: React.FC<Props> = ({
  opened,
  toggleOpened,
  editItem,
  setEditItem,
}) => {
  const theme = useMantineTheme();

  const handleAddNew = useCallback(() => {
    toggleOpened();
    setEditItem({});
  }, [setEditItem, toggleOpened]);

  return (
    <>
      <Group position="right" mx={"xl"}>
        <If hasPerm={Permissions.users.create}>
          <Button onClick={handleAddNew} variant={"outline"}>
            <FormattedMessage id="users.addNew" />
          </Button>
        </If>
      </Group>
      <Drawer
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        opened={opened}
        onClose={() => toggleOpened(false)}
        padding="xl"
        size="xl"
        position="right"
        sx={{ height: "120vh" }}
      >
        <NewUser handleClose={() => toggleOpened(false)} editItem={editItem} />
      </Drawer>
    </>
  );
};

export default UsersDrawer;
