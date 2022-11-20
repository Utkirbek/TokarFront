import EmptyBox from "@assets/icons/EmptyBox/EmptyBox";
import Currency from "@components/currencyConvert/currency";
import ButtonToggleDark from "@components/darkmode/Darkmode";
import WithLoading from "@hoc/WithLoading";
import { Accordion, Grid } from "@mantine/core";
import Roles from "@modules/roles/Roles";
import Permissions from "@modules/settings/Permissions/components/Permissions";
import useSettings from "@services/hooks/useSettings";
import { NextPage } from "next";
import { FormattedMessage, useIntl } from "react-intl";

import LanguagePicker from "@/translations/language";

import { AddCard } from "./Permissions/components/PermissionAddCard";

const Settings: NextPage = () => {
  const intl = useIntl();

  const { useFetchAllPermissions } = useSettings();
  const permissionsQuery = useFetchAllPermissions();

  if (permissionsQuery.data?.length === 0) return <EmptyBox />;

  return (
    <WithLoading query={permissionsQuery}>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <ButtonToggleDark />
        <LanguagePicker />
      </div>
      <Accordion style={{ marginTop: 20 }}>
        <Accordion.Item
          value={intl.formatMessage({ id: "perms.perm.permissions" })}
        >
          <Accordion.Control>
            <FormattedMessage id="perms.perm.permissions" />
          </Accordion.Control>
          <Accordion.Panel>
            <h1>
              <FormattedMessage id="perms.perm.allow" />
            </h1>
            <Grid>
              <AddCard />
              <Permissions />
            </Grid>
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value={intl.formatMessage({ id: "roles.title" })}>
          <Accordion.Control>
            <FormattedMessage id="roles.title" />
          </Accordion.Control>
          <Accordion.Panel>
            <Roles />
          </Accordion.Panel>
        </Accordion.Item>
        <Accordion.Item value={intl.formatMessage({ id: "currencyPerm" })}>
          <Accordion.Control>
            <FormattedMessage id="currencyPerm" />
          </Accordion.Control>
          <Accordion.Panel>
            <Currency />
          </Accordion.Panel>
        </Accordion.Item>
      </Accordion>
    </WithLoading>
  );
};

export default Settings;
