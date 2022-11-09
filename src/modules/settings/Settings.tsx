import EmptyBox from "@assets/icons/EmptyBox/EmptyBox";
import WithLoading from "@hoc/WithLoading";
import { Card, Grid, Text, TextInput } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { showNotification, updateNotification } from "@mantine/notifications";
import useSettings from "@services/hooks/useSettings";
import { IconCheck, IconPencil, IconTrash } from "@tabler/icons";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRef } from "react";
import Permissions from "@modules/settings/components/Permissions";

import { FormattedMessage, useIntl } from "react-intl";

import Roles from "./components/Roles";

const Settings: NextPage = () => {
  const DashLayout = dynamic(() => import("@modules/layout/DashLayout"), {
    ssr: false,
  });
  const newPermRef = useRef<HTMLInputElement>(null);
  const intl = useIntl();

  const {
    useFetchAllPermissions,
    addPermission,
    deletePermission,
    updatePermission,
  } = useSettings();
  const {
    data: permissions,
    error,
    mutate: refetch,
  } = useFetchAllPermissions();
  const permissionsQuery = useFetchAllPermissions();

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

  return (
    <DashLayout>
      <WithLoading query={permissionsQuery}>
        <h1>
          <FormattedMessage id="perm.allow" />
        </h1>
        <Grid>
          <Grid.Col span={3} lg={4} md={9} xs={10} sm={6}>
            <Card
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
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
          <Permissions />
        </Grid>
      </WithLoading>
    </DashLayout>
  );
};

export default Settings;
