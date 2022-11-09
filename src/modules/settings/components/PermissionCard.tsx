import EmptyBox from "@assets/icons/EmptyBox/EmptyBox";
import WithLoading from "@hoc/WithLoading";
import { Card, Grid, Text, TextInput } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { showNotification, updateNotification } from "@mantine/notifications";
import PermissionText from "@modules/settings/components/PermissionText";
import useSettings from "@services/hooks/useSettings";
import { IconCheck, IconPencil, IconTrash } from "@tabler/icons";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { FormattedMessage, useIntl } from "react-intl";

type Props = {
  name: string;
  id: string;
};

const PermissionsCard: React.FC<Props> = ({ name, id }) => {
  const {
    useFetchAllPermissions,
    deletePermission,
    updatePermission,
  } = useSettings();
  const {
    data: permissions,
    error,
    mutate: refetch,
  } = useFetchAllPermissions();
  const intl = useIntl();
  const newPermRef = useRef<HTMLInputElement>(null);
  const permissionsQuery = useFetchAllPermissions();
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
        showNotification({
          id: "load-data",
          color: "teal",
          title: intl.formatMessage({ id: "perm.onSuccessTitle" }),
          message: intl.formatMessage({ id: "perm.onSuccessMessage" }),
          icon: <IconCheck size={16} />,
          autoClose: 2000,
        });
      },
      onError: () => {
        showNotification({
          id: "load-data",
          color: "red",
          title: intl.formatMessage({ id: "perm.onErrorTitle" }),
          message: intl.formatMessage({ id: "perm.onErrorMessage" }),
          autoClose: 3000,
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
      labels: { confirm: intl.formatMessage({id:"delete"}), cancel: intl.formatMessage({id:"cancel"}) },
      confirmProps: { color: "red" },
      onConfirm: () => {
        handleDelete(id);
        refetch();
      },
      onCancel: () => {
        showNotification({
          title: intl.formatMessage({id:"perm.cancelTitle"}),
          message: intl.formatMessage({id:"perm.cancelMessage"}),
        });
      },
  });

  return (
    <Grid.Col span="auto" lg={2} md={14} xs={8} sm={6}>
      <Card
        sx={{
          height:100,
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          background: "linear-gradient( 45deg, #13005a 40%, #350042 60%)",
          textAlign: "center",
          fontFamily: "revert",
        }}
      >
        <IconPencil
        onClick={() => handlePermissionUpdate(name, id)}
        cursor={"pointer"}
        style={{
          position: "absolute",
          top: 10,
          right:35,
          marginBottom: 25,
        }}
      />
       <IconTrash
        onClick={() => openDeleteModal(id)}
        cursor={"pointer"}
        style={{position:"absolute", top:10, right:10, color: "red", marginBottom:25, }}
      />
        <PermissionText name={intl.formatMessage({ id: `perms.${name}` })} />
      </Card>
    </Grid.Col>
  );
};

export default PermissionsCard;
