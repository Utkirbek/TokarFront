import SearchAutoComplete from "@components/SearchAutoComplete";
import If from "@components/smart/If";
import TableHead from "@components/Table/TableHead";
import useConfirmation from "@hooks/useConfirmation";
import useNotification from "@hooks/useNotification";
import {
  ActionIcon,
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
import useStyles from "@modules/products/components/ProductsTable/styles/ProductTableStyle";
import userFetcher from "@services/api/userFetcher";
import useUsers from "@services/hooks/useUsers";
import { IconPencil, IconTrash } from "@tabler/icons";
import { Permissions } from "@utils/constants";
import { getCoverImage } from "@utils/getters";
import { useRouter } from "next/router";
import { memo, useCallback, useState } from "react";
import { FormattedMessage } from "react-intl";

import UserDetails from "../batafsil";
import { usersTableHead } from "../constants";
import NewUser from "../NewUser";

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
  const { classes } = useStyles();

  const { useFetchUsers } = useUsers();

  const usersQuery = useFetchUsers();
  const { data: user } = usersQuery;
  const rows = (searchResults.length > 0 ? searchResults : data).map(
    (item: any) => {
      const handleEdit = () => {
        setEditItem(item);
        toggleOpened();
      };

      // eslint-disable-next-line react-hooks/rules-of-hooks
      const theme = useMantineTheme();

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
          <td
            style={{
              display: "flex",
              justifyContent: "start",
              gap: 10,
              paddingBottom: "25px",
              alignItems: "center",
            }}>
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
          <td>
            <Button
              variant="outline"
              onClick={() => {
                router.push("/user", {
                  query: {
                    details: item._id,
                  },
                });
              }}>
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
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
        }}>
        <SearchAutoComplete
          searchResults={searchResults}
          onSearchResults={setSearchResults}
          onClear={() => setSearchResults([])}
          fetcher={userFetcher.getUsersByTitle}
        />
        <If hasPerm={Permissions.users.create}>
          <Group position="right" mx={"xl"}>
            <Button
              className={classes.tex}
              onClick={handleAddNew}
              variant={"outline"}>
              <FormattedMessage id="users.addNew" />
            </Button>
          </Group>
        </If>
      </Box>

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
        sx={{ height: "120vh" }}>
        <NewUser
          handleClose={() => toggleOpened(false)}
          editItem={editItem}
          data={user}
        />
      </Drawer>

      <ScrollArea>
        <Table sx={{ minWidth: 800 }} verticalSpacing="sm" highlightOnHover>
          <TableHead data={usersTableHead} prefix="users" />
          <tbody>{rows}</tbody>
        </Table>
        <UserDetails />
      </ScrollArea>
    </>
  );
}

export default memo(UsersTable);
