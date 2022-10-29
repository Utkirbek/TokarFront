import {
  Box,
  Button,
  Group,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import useAdmins from "@services/hooks/useAdmins";
import { IconCheck, IconLock } from "@tabler/icons";

const AdminsDrawer: React.FC<{
  handleClose: () => void;
  editItem: any;
}> = ({ handleClose, editItem }) => {
  const { editAdmin, addAdmin } = useAdmins();

  const form = useForm({
    initialValues: {
      name: editItem?.name ?? "",
      email: editItem?.email ?? "",
      role: editItem?.role ?? "",
      password: editItem?.password ?? "",
    },
    validate: {
      name: (value: string | any[]) =>
        value.length < 2 ? "Ismingiz 2ta belgidan ko'p bo'lishi kerak" : null,
      email: (value: string) =>
        /^\S+@\S+$/.test(value) ? null : "Invalid email",
      role: (value: string | null[]) =>
        value.length < 2 ? "Ismingiz 2ta belgidan ko'p bo'lishi kerak" : null,
      password: (value: string | null[]) =>
        value.length >= 8 ? null : "Password is not valid",
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
              title: "Muaffaqiyatli",
              message: "Sizning mahsuloringiz Yangilandi",
              icon: <IconCheck size={16} />,
              autoClose: 2000,
            });
          },
        }
      );
    }
    showNotification({
      id: "load-data",
      loading: true,
      title: "Iltimos kuting",
      message: "Sizning mahsuloringiz qo'shilmoqda iltimos kuting",
      autoClose: false,
      disallowClose: true,
    });

    addAdmin(values, {
      onSuccess: () => {
        updateNotification({
          id: "load-data",
          color: "teal",
          title: "Muaffaqiyatli",
          message: "Sizning mahsuloringiz Qo'shildi",
          icon: <IconCheck size={16} />,
          autoClose: 2000,
        });
      },
    });
  };
  return (
    <Box mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Text size={"xl"} weight={700}>
          {!editItem._id ? "Yangi Mahsulot qo'shish" : "Tahrirlash"}
        </Text>
        <TextInput
          withAsterisk
          name="name"
          label="Ismi"
          placeholder="Admin ismini kirting"
          {...form.getInputProps("name")}
          my={"sm"}
          required
        />
        <TextInput
          label="Elektron pochta"
          placeholder="Elektron pochtangizni kirting"
          {...form.getInputProps("email")}
          my={"sm"}
          required
        />
        <TextInput
          label="Admin"
          placeholder="Qandey darajada"
          {...form.getInputProps("role")}
          my={"sm"}
          required
        />
        <PasswordInput
          label="Parolingizni kirting"
          placeholder="Parolingizni kirting"
          name="password"
          icon={<IconLock size={16} />}
          {...form.getInputProps("password")}
        />

        <Group position="right" mt="md">
          <Button type="submit">
            {!editItem._id ? "Ro'yxatga Qo'shish" : "Saqlash"}
          </Button>
        </Group>
      </form>
    </Box>
  );
};
export default AdminsDrawer;
