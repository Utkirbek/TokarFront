import useNotification from "@hooks/useNotification";
import { ActionIcon, Card, Grid, Text, TextInput } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import PermissionText from "@modules/settings/Permissions/components/PermissionText";
import useSettings from "@services/hooks/useSettings";
import { IconPencil, IconTrash } from "@tabler/icons";
import { useRef } from "react";
import { FormattedMessage, useIntl } from "react-intl";

type Props = {
  name: string;
  id: string;
};

const PermissionsCard: React.FC<Props> = ({ name, id }) => {
  const { useFetchAllPermissions, deletePermission, updatePermission } =
    useSettings();
  const { showErrorNotification, showSuccessNotification } = useNotification();
  const {
    data: permissions,
    error,
    mutate: refetch,
  } = useFetchAllPermissions();
  const intl = useIntl();
  const newPermRef = useRef<HTMLInputElement>(null);

  const handlePermissionUpdate = (name: string, id: string) => {
    openConfirmModal({
      title: intl.formatMessage({ id: "perms.perm.updateTitle" }),
      children: (
        <TextInput
          label={intl.formatMessage({ id: "perms.perm.updateInputLabel" })}
          placeholder={intl.formatMessage({
            id: "perms.perm.updateInputPlholder",
          })}
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
        confirm: intl.formatMessage({ id: "perms.perm.yes" }),
        cancel: intl.formatMessage({ id: "perms.perm.no" }),
      },
    });
  };

  const handleDelete = async function (id: string) {
    deletePermission(id, {
      onSuccess: () => {
        showSuccessNotification();
      },
      onError: () => {
        showErrorNotification();
      },
    });
  };
  const openDeleteModal = (id: string) =>
    openConfirmModal({
      title: intl.formatMessage({ id: "perms.perm.modalTitle" }),
      centered: true,
      children: (
        <Text size="sm">
          <FormattedMessage id="perms.perm.modalText" />
        </Text>
      ),
      labels: {
        confirm: intl.formatMessage({ id: "delete" }),
        cancel: intl.formatMessage({ id: "cancel" }),
      },
      confirmProps: { color: "red" },
      onConfirm: () => {
        handleDelete(id);
        refetch();
      },
      onCancel: () => {
        showErrorNotification();
      },
    });

  return (
    <Grid.Col span="auto" lg={3} md={14} xs={8} sm={6}>
      <Card
        sx={{
          height: 100,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          background: "linear-gradient( 45deg, #13005a 40%, #350042 60%)",
          fontFamily: "revert",
          padding: 5,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 20,
            position: "absolute",
            bottom: 10,
          }}
        >
          <ActionIcon>
            <IconPencil
              onClick={() => handlePermissionUpdate(name, id)}
              style={{
                cursor: "pointer",
                color: "green",
              }}
            />
          </ActionIcon>
          <ActionIcon>
            <IconTrash
              onClick={() => openDeleteModal(id)}
              style={{
                cursor: "pointer",
                color: "red",
              }}
            />
          </ActionIcon>
        </div>
        <PermissionText name={intl.formatMessage({ id: `perms.${name}` })} />
      </Card>
    </Grid.Col>
  );
};

export default PermissionsCard;
