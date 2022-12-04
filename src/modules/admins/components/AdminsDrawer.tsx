import If from "@components/smart/If";
import useNotification from "@hooks/useNotification";
import {
  Box,
  Button,
  Group,
  PasswordInput,
  Select,
  Skeleton,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import useAdmins from "@services/hooks/useAdmins";
import useSettings from "@services/hooks/useSettings";
import { IconChevronDown, IconLock } from "@tabler/icons";
import { FormattedMessage, useIntl } from "react-intl";

const AdminsDrawer: React.FC<{
  handleClose: () => void;
  editItem: any;
}> = ({ handleClose, editItem }) => {
  const { editAdmin, addAdmin } = useAdmins();
  const { useGetAllRoles } = useSettings();
  const getRolesQuery = useGetAllRoles();
  const { data: roles } = getRolesQuery;
  const {
    showSuccessNotification,
    showErrorNotification,
    showLoadingNotification,
  } = useNotification();

  const intl = useIntl();

  const Roles = roles?.map((item: any) => ({
    label: intl.formatMessage({ id: `roles.roles.${item.name}` }),
    value: item._id,
  }));

  const form = useForm({
    initialValues: {
      name: editItem?.name ?? "",
      email: editItem?.email ?? "",
      password: "",
      role: editItem?.role?._id ?? "",
      salary_percent: editItem?.salary_percent ?? "",
    },
    validate: {
      name: (value: string | any[]) =>
        value.length < 2 ? "Ismingiz 2ta belgidan ko'p bo'lishi kerak" : null,
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : "No to'g'ri email",
      password: (value: string | null[]) =>
        value.length >= 8 ? null : "Parol 8ta belgidan ko'p bo'lishi kerak",
    },
  });

  const handleSubmit = async (values: {
    name: string;
    email: string;
    role: string;
    password: string;
    salary_percent: string;
  }) => {
    showLoadingNotification();
    if (!!editItem._id) {
      handleClose();
      editAdmin(
        {
          id: editItem._id,
          values: values,
        },
        {
          onSuccess: () => {
            showSuccessNotification;
          },
          onError: () => {
            showErrorNotification;
          },
        }
      );
    } else {
      handleClose();
      addAdmin(values, {
        onSuccess: () => {
          showSuccessNotification;
        },
        onError: () => {
          showErrorNotification;
        },
      });
    }
  };

  return (
    <Box mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Text size={"xl"} weight={700}>
          <FormattedMessage
            id="admins.addEdit"
            values={{ isNew: !editItem._id }}
          />
        </Text>
        <TextInput
          withAsterisk
          name="name"
          label={intl.formatMessage({
            id: "admins.input.name.label",
          })}
          placeholder={intl.formatMessage({
            id: "admins.input.name.placeholder",
          })}
          {...form.getInputProps("name")}
          my={"sm"}
          required
        />
        <TextInput
          label={intl.formatMessage({
            id: "admins.input.email.label",
          })}
          placeholder={intl.formatMessage({
            id: "admins.input.email.placeholder",
          })}
          {...form.getInputProps("email")}
          my={"sm"}
          required
        />
        <If
          condition={!!roles}
          elseChildren={<Skeleton width="100%" height="40px" />}
        >
          <Select
            sx={{ width: "100%", margin: "20px  0" }}
            rightSection={<IconChevronDown size={14} />}
            rightSectionWidth={30}
            styles={{ rightSection: { pointerEvents: "none" } }}
            label={intl.formatMessage({
              id: "admins.input.role.label",
            })}
            placeholder={intl.formatMessage({
              id: "admins.input.role.placeholder",
            })}
            data={Roles}
            {...form.getInputProps("role")}
          />
        </If>
        <TextInput
          label={intl.formatMessage({
            id: "admins.salary",
          })}
          placeholder={intl.formatMessage({
            id: "admins.salary",
          })}
          {...form.getInputProps("salary_percent")}
          my={"sm"}
          required
        />

        <PasswordInput
          label={intl.formatMessage({
            id: "admins.input.password.label",
          })}
          placeholder={intl.formatMessage({
            id: "admins.input.password.placeholder",
          })}
          icon={<IconLock size={16} />}
          {...form.getInputProps("password")}
        />

        <Group position="right" mt="md">
          <Button type="submit">
            <FormattedMessage
              id="admins.saveEdit"
              values={{ isNew: !editItem._id }}
            />
          </Button>
        </Group>
      </form>
    </Box>
  );
};
export default AdminsDrawer;
