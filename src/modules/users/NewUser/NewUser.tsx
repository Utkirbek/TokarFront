import ImageUploader from "@components/ImageUploader";
import { Box, Button, Group, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import useStyles from "@modules/products/components/form/style/inputStyle";
import userFetchers from "@services/api/userFetcher";
import { IconCheck } from "@tabler/icons";
import { RequestQueryKeys } from "@utils/constants";
import { useRef } from "react";
import { useSWRConfig } from "swr";

const NewUser: React.FC<{
  handleClose: () => void;
  editItem: any;
}> = ({ handleClose, editItem }) => {
  const imagesRef = useRef<string[]>([]);
  const { mutate } = useSWRConfig();
  const { classes } = useStyles();
  const form = useForm({
    initialValues: {
      name: editItem?.name ?? "",
      phone: editItem?.phone ?? "",
      workplace: editItem?.workplace ?? "",
      extra: editItem?.extra ?? "",
    },
  });

  const handleSubmit = async (values: {
    name: string;
    phone: string;
    workplace: string;
    extra?: string;
  }) => {
    if (!!editItem._id) {
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
        RequestQueryKeys.updateUsers,
        userFetchers.updateUsers(editItem._id, {
          ...values,
          image: imagesRef.current?.join(",") ?? "",
        }),
        {
          revalidate: true,
        }
      );
      mutate(RequestQueryKeys.getUsers);
      updateNotification({
        id: "load-data",
        color: "teal",
        title: "Muaffaqiyatli",
        message: "Foydalanuvchi yangilandi",
        icon: <IconCheck size={16} />,
        autoClose: 2000,
      });
    } else {
      showNotification({
        id: "load-data",
        loading: true,
        title: "Iltimos kuting",
        message: "Foydalanuvchi yangilanmoqda Kuting ...",
        autoClose: false,
        disallowClose: true,
      });
      handleClose();
      const res = await mutate(
        RequestQueryKeys.addUsers,
        userFetchers.addUsers({
          ...values,
          image: imagesRef.current?.join(",") ?? "",
        }),
        {
          revalidate: true,
        }
      );
      mutate(RequestQueryKeys.getUsers);
      updateNotification({
        id: "load-data",
        color: "teal",
        title: "Muaffaqiyatli",
        message: "Foydalanuvchi Qoshildi",
        icon: <IconCheck size={16} />,
        autoClose: 2000,
      });
    }
  };

  return (
    <Box sx={{ maxWidth: 440 }} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Text
          sx={{
            fontSize: "24px",
            textAlign: "center",
            fontWeight: 700,
          }}
        >
          {!editItem._id ? "Yangi Foydalanuvchi qo'shish" : "Tahrirlash"}
        </Text>
        <TextInput
          className={classes.inputStyle}
          withAsterisk
          label="Ismi"
          placeholder="Foydalanuvchi nomini kiriting"
          {...form.getInputProps("name")}
          required
        />

        <Box sx={{ maxHeight: "160px", marginBottom: "40px" }}>
          <ImageUploader
            urlsRef={imagesRef}
            dropzoneProps={{
              pb: 0,
            }}
          />
          <Button
            variant="outline"
            sx={{ float: "right", margin: "10px 0" }}
            hidden
          >
            Rasmni Olib Tashlash
          </Button>
        </Box>
        <TextInput
          className={classes.inputStyle}
          label="Telefon Raqami"
          placeholder=" Telefon Raqami"
          {...form.getInputProps("phone")}
          required
        />

        <TextInput
          className={classes.inputStyle}
          label="Ishlash manzili"
          placeholder="Ish joyi"
          {...form.getInputProps("workplace")}
          required
        />
        <TextInput
          className={classes.inputStyle}
          label="Qo'shimcha malumot"
          placeholder="Qo'shimcha malumot"
          {...form.getInputProps("extra")}
          required
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
export default NewUser;
