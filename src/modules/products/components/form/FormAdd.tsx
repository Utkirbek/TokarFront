import ImageUploader from "@components/ImageUploader";
import { Box, Button, Group, Select, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import useProducts from "@services/hooks/useProducts";
import { IconCheck, IconChevronDown } from "@tabler/icons";
import { useRouter } from "next/router";
import { useRef } from "react";

import useStyles from "./style/inputStyle";

const FormProduct: React.FC<{
  handleClose: () => void;
  editItem: any;
}> = ({ handleClose, editItem }) => {
  const imagesRef = useRef<string[]>([]);
  const router = useRouter();
  const { classes, cx } = useStyles();
  const { editProduct, addProduct } = useProducts();

  const form = useForm({
    initialValues: {
      title: editItem?.title ?? "",
      code: editItem?.code ?? "",
      price: editItem?.price ?? "",
      quantity: editItem?.quantity ?? "",
      description: editItem?.description ?? "",
      discounts: editItem?.discounts ?? [
        {
          price: "25",
          quantity: "100",
        },
        {
          price: "12",
          quantity: "20",
        },
      ],
    },
  });

  const handleSubmit = async (values: {
    title: string;
    code: string | Number;
    price: string | Number;
    quantity: string | Number;
    description: string;
    discounts: any;
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
      editProduct(
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
    } else {
      handleClose();
      addProduct(
        { ...values, image: imagesRef.current?.join(",") ?? "" },
        {
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
          onError: () => {
            updateNotification({
              id: "load-data",
              color: "red",
              title: "Xatolik",
              message: "Xatolik! Mahsulot Qo'shilmadi",
              autoClose: 2000,
              disallowClose: false,
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
  };

  return (
    <Box sx={{ maxWidth: 440, height: "auto" }} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Text
          sx={{
            fontSize: "24px",
            textAlign: "center",
            fontWeight: 700,
          }}>
          {!editItem._id ? "Yangi Mahsulot qo'shish" : "Tahrirlash"}
        </Text>
        <TextInput
          className={classes.inputStyle}
          withAsterisk
          label="Mahsulot Nomi"
          placeholder="Mahsulot nomini kiriting"
          {...form.getInputProps("title")}
          required
        />

        {/* bu yerda rasm yuklash */}
        <Box sx={{ maxHeight: "160px" }}>
          <ImageUploader
            urlsRef={imagesRef}
            dropzoneProps={{
              sx: {},
              pb: 0,
            }}
          />
          <Button
            variant="outline"
            sx={{ float: "right", margin: "10px 0" }}
            hidden>
            Rasmni Olib Tashlash
          </Button>
        </Box>
        <TextInput
          className={classes.inputStyle}
          label="Mahsulot Kodi"
          placeholder="Mahsulot Kodi"
          {...form.getInputProps("code")}
          required
        />
        <TextInput
          className={classes.inputStyle}
          label="Mahsulot Narxi"
          placeholder="Mahsulot Narxi"
          {...form.getInputProps("price")}
          required
        />
        <TextInput
          className={classes.inputStyle}
          label="Nechta mahsulot borligi"
          placeholder="Nechta mahsulot borligi"
          {...form.getInputProps("quantity")}
          required
        />
        <TextInput
          className={classes.inputStyle}
          label="Tarif"
          placeholder="Mahsulotga tarif"
          {...form.getInputProps("description")}
          sx={{}}
          required
        />
        <Select
          sx={{ width: "100%", margin: "20px  0" }}
          rightSection={<IconChevronDown size={14} />}
          rightSectionWidth={30}
          styles={{ rightSection: { pointerEvents: "none" } }}
          label={"Pull Birligini kiriting"}
          data={["UZS", "USD", "RUS", "EUR"]}
          defaultValue="1 hafta"
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
export default FormProduct;
