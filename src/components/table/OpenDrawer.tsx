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
import adminFetchers from "@services/api/adminFetchers";
import { IconCheck } from "@tabler/icons";
import { RequestQueryKeys } from "@utils/constants";
import useSWR, { useSWRConfig } from "swr";

const TableDrawer: React.FC<{
  handleClose: () => void;
  editItem: any;
}> = ({ handleClose, editItem }) => {
  const { mutate } = useSWRConfig();

  const {
    data,
    error,
    mutate: refetch,
  } = useSWR(RequestQueryKeys.getAdmins, adminFetchers.getAdmins);
  const form = useForm({
    initialValues: {
      name: editItem?.name ?? "",
      email: editItem?.email ?? "",
      role: editItem?.role ?? "",
      password: editItem?.password ?? "",
      phone: editItem?.phone ?? "",
      image: editItem?.image ?? "",

      validate: {
        name: (value: string | any[]) =>
          value.length < 2 ? "Name must have at least 2 letters" : null,
        email: (value: string) =>
          /^\S+@\S+$/.test(value) ? null : "Invalid email",
        phone: (value: string | any[]) =>
          value.length < 9 ? "Name must have at least 2 letters" : null,
        password: (value: string | any[]) =>
          value.length < 8 ? "Name must have at least 2 letters" : null,
        rol: (value: string | any[]) =>
          value.length < 2 ? "Name must have at least 2 letters" : null,
      },
    },
  });

  const handleSubmit = async (values: {
    name: string;
    email: string;
    role: string;
    password: string;
    phone: Number | string;
  }) => {
    showNotification({
      id: "load-data",
      loading: true,
      title: "Iltimos kuting",
      message: "Sizning mahsuloringiz yangilanmoqda iltimos kuting",
      autoClose: false,
      disallowClose: true,
    });
    handleClose();
    const res = await mutate(
      RequestQueryKeys.updeteAdmin,
      adminFetchers.updeteAdmin(editItem._id, values),
      {
        revalidate: true,
      }
    );

    refetch();

    updateNotification({
      id: "load-data",
      color: "teal",
      title: "Muaffaqiyatli",
      message: "Sizning mahsuloringiz Yangilandi",
      icon: <IconCheck size={16} />,
      autoClose: 2000,
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
        <TextInput
          label="Telefo'n no'mer"
          placeholder="Telefo'n nomerizni kirting"
          {...form.getInputProps("phone")}
          my={"sm"}
          required
        />
        <PasswordInput
          placeholder="Parol"
          label="Parolni kirting"
          {...form.getInputProps("password")}
          my={"sm"}
          withAsterisk
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
export default TableDrawer;
