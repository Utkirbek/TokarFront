import useNotification from "@hooks/useNotification";
import {
  Box,
  Button,
  Group,
  MultiSelect,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import useRoles from "@services/hooks/useRoles";
import useSettings from "@services/hooks/useSettings";
import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import WithLoading from "@/hoc/WithLoading";

import useRolesStyles from "./rolesStyle";

const RolesDrawer: React.FC<{
  handleClose: () => void;
  editItem: any;
}> = ({ handleClose, editItem }) => {
  const intl = useIntl();
  const [newPermissions, setNewPermissions] = useState<string[]>([]);
  const { classes } = useRolesStyles();
  const { editRole, addRole } = useRoles();
  const { useFetchAllPermissions } = useSettings();
  const getRolesQuery = useFetchAllPermissions();
  const { data: permissions } = getRolesQuery;
  const { showSuccessNotification, showLoadingNotification } =
    useNotification();

  const DefaultPermissions = editItem?.permissions?.map(
    (permission: any) => permission._id
  );

  const Permissions = permissions?.map((permission: any) => ({
    label: intl.formatMessage({ id: `perms.${permission.name}` }),
    value: permission._id,
  }));

  const form = useForm({
    initialValues: {
      name: editItem?.name ?? "",
      permissions: editItem?.permissions ?? [],
    },
    validate: {
      name: (value: string | any[]) =>
        value.length < 2 ? intl.formatMessage({ id: "roles.validate" }) : null,
    },
  });

  const handleSubmit = async (values: {
    name: string;
    permissions: string[];
  }) => {
    if (!!editItem?._id) {
      handleClose();
      editRole(
        {
          id: editItem._id,
          values: { name: values?.name, permissions: newPermissions },
        },
        {
          onSuccess: () => {
            showSuccessNotification;
          },
        }
      );
    } else {
      showLoadingNotification;

      addRole(values, {
        onSuccess: () => {
          showSuccessNotification;
        },
      });
    }
  };

  return (
    <WithLoading query={getRolesQuery}>
      <Box mx="auto">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Text size={"xl"} weight={700}>
            <FormattedMessage
              id="roles.addRole"
              values={{ isNew: !editItem._id }}
            />
          </Text>
          <TextInput
            withAsterisk
            name="name"
            label={intl.formatMessage({ id: "roles.inputLabel" })}
            placeholder={intl.formatMessage({ id: "roles.inputPlaceholder" })}
            {...form.getInputProps("name")}
            my={"sm"}
            required
          />
          <MultiSelect
            defaultValue={DefaultPermissions ?? []}
            onChange={(value) => setNewPermissions(value)}
            data={Permissions}
            label={intl.formatMessage({ id: "roles.selectLabel" })}
            placeholder={intl.formatMessage({ id: "roles.selectPlaceholder" })}
            maxDropdownHeight={200}
          />
          <Group position="right" mt="md">
            <Box className={classes.rolbtn}>
              <Button type="submit" className={classes.rolbutton}>
                <FormattedMessage
                  id="addSmth"
                  values={{ isNew: !editItem._id }}
                />
              </Button>
            </Box>
          </Group>
        </form>
      </Box>
    </WithLoading>
  );
};

export default RolesDrawer;
