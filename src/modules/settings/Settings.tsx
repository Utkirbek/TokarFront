import EmptyBox from "@assets/icons/EmptyBox/EmptyBox";
import WithLoading from "@hoc/WithLoading";
import { Card, Grid, Text, TextInput } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import Permissions from "@modules/settings/components/Permissions";
import useSettings from "@services/hooks/useSettings";
import { NextPage } from "next";
import { useRef } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import LanguagePicker from "@/translations/language";

const Settings: NextPage = () => {
  const newPermRef = useRef<HTMLInputElement>(null);
  const intl = useIntl();

  const { useFetchAllPermissions, addPermission } = useSettings();
  const permissionsQuery = useFetchAllPermissions();

  if (permissionsQuery.data?.length === 0) return <EmptyBox />;

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
    <WithLoading query={permissionsQuery}>
      <div style={{ position: "absolute", top: 120, right: 15 }}>
        <LanguagePicker />
      </div>
      <h1>
        <FormattedMessage id="perms.perm.allow" />
      </h1>
      <Grid>
        <Grid.Col span={3} lg={3} md={9} xs={10} sm={6}>
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
        <Permissions />
      </Grid>
    </WithLoading>
  );
};

export default Settings;
