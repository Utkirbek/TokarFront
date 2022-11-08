import {
  Box,
  Button,
  Group,
  MultiSelect,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import useRoles from "@services/hooks/useRoles";
import useSettings from "@services/hooks/useSettings";
import { IconCheck } from "@tabler/icons";
import { useState } from "react";

import WithLoading from "@/hoc/WithLoading";

const RolesDrawer: React.FC<{
  handleClose: () => void;
  editItem: any;
}> = ({ handleClose, editItem }) => {
  const [newPermissions, setNewPermissions] = useState<string[]>([]);
  const { editRole, addRole } = useRoles();
  const { useFetchAllPermissions } = useSettings();
  const getRolesQuery = useFetchAllPermissions();
  const { data: permissions } = getRolesQuery;

  const DefaultPermissions = editItem?.permissions?.map(
    (permission: any) => permission._id
  );

  const Permissions = permissions?.map((permission: any) => ({
    label: permission.name,
    value: permission._id,
  }));

  const form = useForm({
    initialValues: {
      name: editItem?.name ?? "",
      permissions: editItem?.permissions ?? [],
    },
    validate: {
      name: (value: string | any[]) =>
        value.length < 2 ? "Rol nomi 2ta belgidan ko'p bo'lishi kerak" : null,
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
    } else {
      showNotification({
        id: "load-data",
        loading: true,
        title: "Iltimos kuting",
        message: "Sizning mahsuloringiz qo'shilmoqda iltimos kuting",
        autoClose: false,
        disallowClose: true,
      });

      addRole(values, {
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
    }
  };

  return (
    <WithLoading query={getRolesQuery}>
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
          <MultiSelect
            defaultValue={DefaultPermissions ?? []}
            onChange={(value) => setNewPermissions(value)}
            data={Permissions}
            label="Rol uchun ruxsatlarni tanlang"
            placeholder="Ruxsatlarni tanlang"
            maxDropdownHeight={200}
          />
          <Group position="right" mt="md">
            <Button type="submit">
              {!editItem._id ? "Ro'yxatga Qo'shish" : "Saqlash"}
            </Button>
          </Group>
        </form>
      </Box>
    </WithLoading>
  );
};

export default RolesDrawer;
