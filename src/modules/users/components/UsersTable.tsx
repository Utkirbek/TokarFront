import SearchAutoComplete from "@components/SearchAutoComplete";
import If from "@components/smart/If";
import TableHead from "@components/Table/TableHead";
import useConfirmation from "@hooks/useConfirmation";
import useNotification from "@hooks/useNotification";
import {
  ActionIcon,
  Affix,
  Avatar,
  Box,
  Button,
  Drawer,
  Group,
  ScrollArea,
  Table,
  useMantineTheme,
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import userFetcher from "@services/api/userFetcher";
import useUsers from "@services/hooks/useUsers";
import { IconPencil, IconTrash, IconUserPlus } from "@tabler/icons";
import { Permissions } from "@utils/constants";
import { getCoverImage } from "@utils/getters";
import { useRouter } from "next/router";
import { memo, useCallback, useState } from "react";
import { FormattedMessage } from "react-intl";

import UserDetails from "../batafsil";
import { usersTableHead } from "../constants";
import NewUser from "../NewUser";
import UserCard from "./UserCard";
import UserStyle from "./UserStle";

function UsersTable({ data }: any) {
  const {
    showLoadingNotification,
    showSuccessNotification,
    showErrorNotification,
  } = useNotification();
  const router = useRouter();
  const theme = useMantineTheme();
  const { openConfirm } = useConfirmation();
  const { deleteUser } = useUsers();
  const [editItem, setEditItem] = useState({});
  const [opened, toggleOpened] = useToggle();
  const [searchResults, setSearchResults] = useState([]);
  const { classes } = UserStyle();

  const rows = (searchResults.length > 0 ? searchResults : data).map(
    (item: any) => {
      const handleEdit = () => {
        setEditItem(item);
        toggleOpened();
      };

      const onDeleteClick = () => {
        openConfirm(null, {
          onConfirm: () => {
            showLoadingNotification();
            deleteUser(item._id, {
              onSuccess: () => {
                showSuccessNotification();
              },
              onError: () => {
                showErrorNotification();
              },
            });
          },
        });
      };

      return (
        <tr key={item._id}>
          <td>
            <Group spacing="sm">
              <Avatar size={40} src={getCoverImage(item.image)} radius={26} />
            </Group>
          </td>
          <td>{item.name}</td>
          <td>{item.phone}</td>
          <td>{item.workplace}</td>
          <td>{item.extra}</td>
          <If hasPerm={Permissions.users.action}>
            <td
              style={{
                display: "flex",
                justifyContent: "start",
                gap: 10,
                paddingBottom: "25px",
                alignItems: "center",
              }}
            >
              <If hasPerm={Permissions.users.delete}>
                <ActionIcon>
                  <IconTrash
                    color="red"
                    style={{ cursor: "pointer" }}
                    onClick={onDeleteClick}
                  />
                </ActionIcon>
              </If>
              <If hasPerm={Permissions.users.edit}>
                <ActionIcon>
                  <IconPencil
                    style={{ cursor: "pointer", marginRight: "-10px" }}
                    onClick={handleEdit}
                  />
                </ActionIcon>
              </If>
            </td>
          </If>
          <td>
            <Button
              variant="outline"
              onClick={() => {
                router.push("/user", {
                  query: {
                    details: item._id,
                  },
                });
              }}
            >
              <FormattedMessage id="more" />
            </Button>
          </td>
        </tr>
      );
    }
  );
  const handleAddNew = useCallback(() => {
    toggleOpened();
    setEditItem({});
  }, [toggleOpened]);

  return (
    <>
      <Box className={classes.userHead}>
        <Box className={classes.userSerch} style={{ zIndex: 1 }}>
          <SearchAutoComplete
            searchResults={searchResults}
            onSearchResults={setSearchResults}
            onClear={() => setSearchResults([])}
            fetcher={userFetcher.getUsersByTitle}
          />
        </Box>

        <Box>
          <Box className={classes.userAdd}>
            <If hasPerm={Permissions.users.create}>
              <Group position="right" mx={"xl"}>
                <Button
                  className={classes.tex}
                  onClick={handleAddNew}
                  variant={"outline"}
                >
                  <FormattedMessage id="users.addNew" />
                </Button>
              </Group>
            </If>
          </Box>
          <Affix position={{ bottom: 60, right: 20 }}>
            <Box className={classes.userAddIcon} onClick={handleAddNew}>
              <IconUserPlus size={25} color={"#fff"} />
            </Box>
          </Affix>
        </Box>
      </Box>

      <Drawer
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        opened={opened}
        onClose={() => toggleOpened(false)}
        size="xl"
        position="right"
        sx={{ height: "120vh" }}
      >
        <NewUser handleClose={() => toggleOpened(false)} editItem={editItem} />
      </Drawer>

      <ScrollArea>
        <Box className={classes.userTable}>
          <Table sx={{ minWidth: 800 }} verticalSpacing="sm" highlightOnHover>
            <TableHead data={usersTableHead} prefix="users" />
            <tbody>{rows}</tbody>
          </Table>
        </Box>

        <UserDetails />
        <Box className={classes.userCard}>
          <UserCard data={data} />
        </Box>
      </ScrollArea>
    </>
  );
}

export default memo(UsersTable);
