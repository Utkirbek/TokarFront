import EmptyBox from "@assets/icons/EmptyBox/EmptyBox";
import If from "@components/smart/If";
import WithLoading from "@hoc/WithLoading";
import { Card, Grid, Text, TextInput } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { showNotification, updateNotification } from "@mantine/notifications";
import useSettings from "@services/hooks/useSettings";
import { IconCheck, IconPencil, IconTrash } from "@tabler/icons";
import { Permissions } from "@utils/constants";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import Roles from "./components/Roles";

const DashLayout = dynamic(() => import("@modules/layout/DashLayout"), {
  ssr: false,
});

const Settings: NextPage = () => {
  const newPermRef = useRef<HTMLInputElement>(null);
  const intl = useIntl();

  const {
    useGetAllPermissions,
    addPermission,
    deletePermission,
    updatePermission,
  } = useSettings();
  const { data: permissions, error, mutate: refetch } = useGetAllPermissions();
  const permissionsQuery = useGetAllPermissions();

  if (permissionsQuery.data?.length === 0) return <EmptyBox />;

  const handleUPermissionAdd = () => {
    openConfirmModal({
      title: intl.formatMessage({ id: "perm.addTitle" }),
      children: (
        <TextInput
          label={intl.formatMessage({ id: "perm.addInputLabel" })}
          placeholder={intl.formatMessage({ id: "perm.addInputPlholder" })}
          data-autofocus
          ref={newPermRef}
          required
        />
      ),
      onConfirm: async () => {
        if (newPermRef.current?.value) {
          await addPermission({
            name: newPermRef.current?.value,
          });
          permissionsQuery.mutate();
        }
      },
      labels: {
        confirm: intl.formatMessage({ id: "perm.yes" }),
        cancel: intl.formatMessage({ id: "perm.no" }),
      },
    });
  };

  const handlePermissionUpdate = (name: string, id: string) => {
    openConfirmModal({
      title: intl.formatMessage({ id: "perm.updateTitle" }),
      children: (
        <TextInput
          label={intl.formatMessage({ id: "perm.updateInputLabel" })}
          placeholder={intl.formatMessage({ id: "perm.updateInputPlholder" })}
          data-autofocus
          ref={newPermRef}
          required
          defaultValue={name}
        />
      ),
      onConfirm: async () => {
        await updatePermission({
          name: newPermRef.current?.value,
          id: id,
        });
        refetch();
      },
      labels: {
        confirm: intl.formatMessage({ id: "perm.yes" }),
        cancel: intl.formatMessage({ id: "perm.no" }),
      },
    });
  };

  const handleDelete = async function (id: string) {
    deletePermission(id, {
      onSuccess: () => {
        updateNotification({
          id: "load-data",
          color: "teal",
          title: intl.formatMessage({ id: "perm.onSuccessTitle" }),
          message: intl.formatMessage({ id: "perm.onSuccessMessage" }),
          icon: <IconCheck size={16} />,
          autoClose: 2000,
        });
      },
      onError: () => {
        updateNotification({
          id: "load-data",
          color: "red",
          title: intl.formatMessage({ id: "perm.onErrorTitle" }),
          message: intl.formatMessage({ id: "perm.onErrorMessage" }),
          autoClose: false,
          disallowClose: false,
        });
      },
    });
  };
  const openDeleteModal = (id: string) =>
    openConfirmModal({
      title: intl.formatMessage({ id: "perm.modalTitle" }),
      centered: true,
      children: (
        <Text size="sm">
          <FormattedMessage id="perm.modalText" />
        </Text>
      ),
      labels: { confirm: "O'chirish", cancel: "Orqaga qaytish" },
      confirmProps: { color: "red" },
      onConfirm: () => {
        handleDelete(id);
        refetch();
      },
      onCancel: () => {
        showNotification({
          title: "Siz bekor qildingiz",
          message: "Hey there, your code is awesome! 🤥",
        });
      },
    });
  console.log(permissions, error);

  return (
    <DashLayout>
      <If hasPerm={Permissions.settings.view}>
        <h1>
          <FormattedMessage id="perm.allow" />
        </h1>
        <Grid>
          <Grid.Col span={3} lg={2} md={3} xs={12} sm={6}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
                height: 93,
              }}
              onClick={handleUPermissionAdd}
            >
              <Text>
                <FormattedMessage id="perm.newAllow" />
              </Text>
              <lord-icon
                src="https://cdn.lordicon.com/zgogqkqu.json"
                trigger="hover"
                style={{
                  width: "1.6rem",
                  height: "1.6rem",
                  marginLeft: "auto",
                }}
              ></lord-icon>
            </Card>
          </Grid.Col>
          {permissions.map((permission: { name: string; _id: string }) => (
            <Grid.Col
              key={permission._id}
              span={3}
              lg={2}
              md={3}
              xs={12}
              sm={6}
            >
              <Card
                style={{
                  background:
                    "linear-gradient( 45deg, #13005a 40%, #350042 60%)",
                  textAlign: "center",
                  fontFamily: "revert",
                  padding: "10px 20px 20px",
                }}
              >
                <IconPencil
                  onClick={() =>
                    handlePermissionUpdate(permission.name, permission._id)
                  }
                  cursor={"pointer"}
                  style={{
                    position: "absolute",
                    right: 20,
                    marginRight: 20,
                    marginBottom: 10,
                  }}
                />
                <IconTrash
                  onClick={() => openDeleteModal(permission._id)}
                  cursor={"pointer"}
                  style={{ marginLeft: 150, marginBottom: 10, color: "red" }}
                />
                <Text>{permission.name}</Text>
              </Card>
            </Grid.Col>
          ))}
        </Grid>
      </If>
    </DashLayout>
  );
};

export default Settings;
