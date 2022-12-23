import EmptyBox from "@assets/icons/EmptyBox/EmptyBox";
import SearchAutoComplete from "@components/SearchAutoComplete";
import If from "@components/smart/If";
import useUser from "@hooks/shared/useUser";
import useConfirmation from "@hooks/useConfirmation";
import useNotification from "@hooks/useNotification";
import {
  ActionIcon,
  Box,
  Button,
  Drawer,
  Group,
  Table,
  Text,
} from "@mantine/core";
import { useMediaQuery, useToggle } from "@mantine/hooks";
import { showNotification } from "@mantine/notifications";
import adminFetchers from "@services/api/adminFetchers";
import useAdmins from "@services/hooks/useAdmins";
import { IconPencil, IconPlus, IconTrash } from "@tabler/icons";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import { Permissions } from "@/utils/constants";

import AdminCard from "./AdminCard";
import AdminsDrawer from "./AdminsDrawer";
import useAdminStyles from "./AdminStyle";
import AdminsDetails from "./batafsil/adminDetail";
import Salary from "./Salary";

function TableCard({ data }: { data: any }) {
  const { classes } = useAdminStyles();
  const { name } = useUser();
  const intl = useIntl();
  const [drawerOpen, toggleDrawerOpen] = useToggle();
  const [editItem, setEditItem] = useState<{ _id?: string }>({});
  const router = useRouter();
  const { deleteAdmin } = useAdmins();
  const isMobile = useMediaQuery("(max-width: 600px)");
  const {
    showSuccessNotification,
    showErrorNotification,
    showLoadingNotification,
  } = useNotification();
  const { openConfirm } = useConfirmation();
  const [searchResults, setSearchResults] = useState([]);

  const handleDelete = async function (id: string) {
    deleteAdmin(id, {
      onSuccess: () => {
        showSuccessNotification;
      },
      onError: () => {
        showErrorNotification;
      },
    });
  };

  const handleClick = useCallback(() => {
    toggleDrawerOpen(true);
    setEditItem({});
  }, []);

  const openDeleteModal = (id: string, name: string) =>
    openConfirm(
      <Text size="sm">
        <FormattedMessage
          id="admins.delete.modal.confirmation"
          values={{ name }}
        />
      </Text>,
      {
        titleId: intl.formatMessage({ id: "admins.delete.modal.title" }),
        onConfirm: async () => {
          showLoadingNotification;
          handleDelete(id);
        },

        onCancel: () => {
          showNotification({
            title: "Siz bekor qildingiz",
            message: "Siz Admini o'chirmadiz 🤥",
          });
        },
      }
    );

  const onEditClick = (item: any) => {
    setEditItem(item);
    toggleDrawerOpen();
  };

  const onClose = () => {
    toggleDrawerOpen();
    setEditItem({});
  };

  const rows = (searchResults.length > 0 ? searchResults : data).map(
    (item: any) => {
      return (
        <tr key={item._id}>
          <td>
            <Group spacing="sm">{item.name}</Group>
          </td>
          <td>{item.email}</td>
          <td>{item.role?.name}</td>
          <td>{item.salary_percent}%</td>
          <td>{item.earned_salary.toFixed(2)}</td>
          <td>
            <Group>
              <Salary inpStaff={item._id} />
            </Group>
          </td>

          <td className={classes.AdminTd}>
            {item.name == name ? (
              <ActionIcon>
                <IconTrash style={{ color: "red", cursor: "no-drop" }} />
              </ActionIcon>
            ) : (
              <If hasPerm={Permissions.admins.delete}>
                <ActionIcon>
                  <IconTrash
                    onClick={() => openDeleteModal(item._id, item.name)}
                    className={classes.AdminTrash}
                  />
                </ActionIcon>
              </If>
            )}
            <If hasPerm={Permissions.admins.edit}>
              <ActionIcon>
                <IconPencil
                  onClick={onEditClick.bind(null, item)}
                  className={classes.adminPencil}
                />
              </ActionIcon>
            </If>
          </td>
          <td>
            <Button
              variant="outline"
              onClick={() => {
                router.push("/admins", {
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

  return (
    <>
      <If hasPerm={Permissions.admins.create}>
        <Box className={classes.adminBox}>
          <SearchAutoComplete
            searchResults={searchResults}
            onSearchResults={setSearchResults}
            onClear={() => setSearchResults([])}
            fetcher={adminFetchers.getAdminsByTitle}
          />
          <Group
            position="right"
            mx={"xl"}
            my={"xl"}
            className={classes.drawerBtn}
          >
            <Button onClick={onClose} variant={"outline"}>
              <FormattedMessage id="admins.add.title" />
            </Button>
          </Group>
        </Box>
      </If>
      <If
        condition={data?.length === 0}
        elseChildren={
          <>
            <Table highlightOnHover className={classes.AdminTable}>
              <thead>
                <tr>
                  <th>
                    <FormattedMessage id="admins.name" />
                  </th>
                  <th>
                    <FormattedMessage id="admins.email" />
                  </th>
                  <th>
                    <FormattedMessage id="admins.role" />
                  </th>
                  <th>
                    <FormattedMessage id="admins.salary_percent" />
                  </th>
                  <th>
                    <FormattedMessage id="admins.giveSalary" />
                  </th>
                  <th>
                    <FormattedMessage id="admins.give_salary" />
                  </th>
                  <th>
                    <FormattedMessage id="admins.deleteEdit" />
                  </th>
                  <th>
                    <FormattedMessage id="admins.detail" />
                  </th>
                </tr>
              </thead>
              <tbody>{rows}</tbody>
            </Table>
            <Box className={classes.AdminCard}>
              <AdminCard
                data={data}
                openDeleteModal={openDeleteModal}
                editOnClick={onEditClick}
              />
            </Box>

            <AdminsDetails admins={data} />

            {isMobile && (
              <ActionIcon
                onClick={handleClick}
                variant="filled"
                sx={{
                  position: "fixed",
                  bottom: 60,
                  right: 20,
                  backgroundColor: "#1972C2",
                  borderRadius: "100px",
                }}
                size="xl"
              >
                <IconPlus />
              </ActionIcon>
            )}
          </>
        }
      >
        <EmptyBox />
      </If>

      <Drawer
        opened={drawerOpen}
        onClose={onClose}
        padding="xl"
        withOverlay={false}
        className={classes.admindrawer}
        position="right"
      >
        <AdminsDrawer editItem={editItem} handleClose={onClose} />
      </Drawer>
    </>
  );
}

export default TableCard;
