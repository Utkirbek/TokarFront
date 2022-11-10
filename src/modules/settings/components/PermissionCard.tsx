import { Card, Grid, Text, TextInput } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { showNotification, updateNotification } from "@mantine/notifications";
import PermissionText from "@modules/settings/components/PermissionText";
import useSettings from "@services/hooks/useSettings";
import { IconCheck, IconPencil, IconTrash } from "@tabler/icons";
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
          defaultValue={intl.formatMessage({ id: `perms.${name}` })}
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
    <Grid.Col span="auto" lg={3} md={14} xs={8} sm={6}>
      <Card
        sx={{
          height:100,
          display: "flex",
          alignItems: "center",
          justifyContent:"center",
          textAlign:"center",
          background: "linear-gradient( 45deg, #13005a 40%, #350042 60%)",
          fontFamily: "revert",
          padding:5,
        }}
      >
        <div style={{display:"flex", justifyContent:"center", gap:20, position:"absolute", bottom:10}}>
          <IconPencil
          onClick={() => handlePermissionUpdate(name, id)}
          style={{
            cursor:"pointer",
            // position: "absolute",
            // bottom: 10,
            // left:65,
          }}
        />
          <IconTrash
          onClick={() => openDeleteModal(id)} 
          style={{
            cursor:"pointer", 
            // position:"absolute", 
            // bottom:10, 
            // right:65, 
            color:"red", }}/>
        </div>
        <PermissionText name={intl.formatMessage({ id: `perms.${name}` })} />
      </Card>
      
    </Grid.Col>
  );
};

export default PermissionsCard;
