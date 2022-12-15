import { Card, Grid, Text, TextInput } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import useSettings from "@services/hooks/useSettings";
import { Props } from "next/script";
import { useRef } from "react";
import { FormattedMessage, useIntl } from "react-intl";

export const AddCard = () => {
  const { addPermission, useFetchAllPermissions } = useSettings();
  const permissionsQuery = useFetchAllPermissions();
  const newPermRef = useRef<HTMLInputElement>(null);
  const intl = useIntl();

  const handleUPermissionAdd = () => {
    openConfirmModal({
      title: intl.formatMessage({ id: "perms.perm.addTitle" }),
      children: (
        <TextInput
          label={intl.formatMessage({ id: "perms.perm.addInputLabel" })}
          placeholder={intl.formatMessage({
            id: "perms.perm.addInputPlholder",
          })}
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
        confirm: intl.formatMessage({ id: "perms.perm.yes" }),
        cancel: intl.formatMessage({ id: "perms.perm.no" }),
      },
    });
  };

  return (
    <Grid.Col lg={3} md={3} xs={12} sm={6}>
      <Card
        sx={{
          display: "flex",
          alignItems: "center",
          cursor: "pointer",
          height: 100,
        }}
        onClick={handleUPermissionAdd}
      >
        <Text>
          <FormattedMessage id="perms.perm.newAllow" />
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
  );
};
