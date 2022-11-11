import If from "@components/smart/If";
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
import { updateNotification } from "@mantine/notifications";
import useAdmins from "@services/hooks/useAdmins";
import useSettings from "@services/hooks/useSettings";
import { IconCheck, IconChevronDown, IconLock } from "@tabler/icons";
import { useIntl } from "react-intl";

const AdminsDrawer: React.FC<{
  handleClose: () => void;
  editItem: any;
}> = ({ handleClose, editItem }) => {
  const { editAdmin, addAdmin } = useAdmins();
  const { useGetAllRoles } = useSettings();
  const getRolesQuery = useGetAllRoles();
  const { data: roles } = getRolesQuery;

  const intl = useIntl();

  const form = useForm({
    initialValues: {
      name: editItem?.name ?? "",
      email: editItem?.email ?? "",
      password: editItem?.password ?? "",
      role: editItem?.role ?? "",
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
  }) => {
    if (!!editItem._id) {
      handleClose();
      editAdmin(
        {
          id: editItem._id,
          values,
        },
        {
          onSuccess: () => {
            updateNotification({
              id: "load-data",
              color: "teal",
              title: intl.formatMessage({
                id: "admins.update.success.ongoing",
              }),
              message: intl.formatMessage({
                id: "admins.update.success.message",
              }),
              icon: <IconCheck size={16} />,
              autoClose: 2000,
            });
          },
          onError: () => {
            updateNotification({
              id: "load-data",
              color: "red",
              title: intl.formatMessage({
                id: "admins.update.error.ongoing",
              }),
              message: intl.formatMessage({
                id: "admins.update.error.message",
              }),
              autoClose: false,
              disallowClose: false,
            });
          },
        }
      );
    } else {
      handleClose();
      addAdmin(values, {
        onSuccess: () => {
          updateNotification({
            id: "load-data",
            color: "teal",
            title: intl.formatMessage({
              id: "admins.add.success.ongoing",
            }),
            message: intl.formatMessage({
              id: "admins.add.success.message",
            }),
            icon: <IconCheck size={16} />,
            autoClose: 2000,
          });
        },
        onError: () => {
          updateNotification({
            id: "load-data",
            color: "teal",
            title: intl.formatMessage({
              id: "admins.add.error.ongoing",
            }),
            message: intl.formatMessage({
              id: "admins.add.error.message",
            }),
            icon: <IconCheck size={16} />,
            autoClose: 2000,
          });
        },
      });
    }
  };

  return (
    <Box mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Text size={"xl"} weight={700}>
          {!editItem._id
            ? intl.formatMessage({
                id: "admins.form.add.title",
              })
            : intl.formatMessage({
                id: "admins.form.edit.title",
              })}
        </Text>
        <TextInput
          withAsterisk
          name="name"
          label={intl.formatMessage({
            id: "admins.form.input.name.label",
          })}
          placeholder={intl.formatMessage({
            id: "admins.form.input.name.placeholder",
          })}
          {...form.getInputProps("name")}
          my={"sm"}
          required
        />
        <TextInput
          label={intl.formatMessage({
            id: "admins.form.input.email.label",
          })}
          placeholder={intl.formatMessage({
            id: "admins.form.input.email.placeholder",
          })}
          {...form.getInputProps("email")}
          my={"sm"}
          required
        />
        <If
          condition={!!roles}
          elseChildren={<Skeleton width="100%" height="40px" />}>
          <Select
            sx={{ width: "100%", margin: "20px  0" }}
            rightSection={<IconChevronDown size={14} />}
            rightSectionWidth={30}
            styles={{ rightSection: { pointerEvents: "none" } }}
            label={intl.formatMessage({
              id: "admins.form.input.role.label",
            })}
            placeholder={intl.formatMessage({
              id: "admins.form.input.role.placeholder",
            })}
            data={roles?.map((item: any) => ({
              value: item._id,
              label: item.name,
            }))}
            {...form.getInputProps("role")}
          />
        </If>

        <TextInput
          label={intl.formatMessage({
            id: "admins.form.input.password.label",
          })}
          placeholder={intl.formatMessage({
            id: "admins.form.input.password.placeholder",
          })}
          icon={<IconLock size={16} />}
          {...form.getInputProps("password")}
        />

        <Group position="right" mt="md">
          <Button type="submit">
            {!editItem._id
              ? intl.formatMessage({
                  id: "admins.form.add.submit",
                })
              : intl.formatMessage({
                  id: "admins.form.edit.submit",
                })}
          </Button>
        </Group>
      </form>
    </Box>
  );
};
export default AdminsDrawer;
