import {
  Box,
  Button,
  createStyles,
  Group,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import productFetchers from "@services/api/productFetchers";
import { IconCheck } from "@tabler/icons";
import { RequestQueryKeys } from "@utils/constants";
import { useRouter } from "next/router";
import { useRef } from "react";
import useSWR, { useSWRConfig } from "swr";

import ImageUploader from "./ImageUploader";
import useStyles from "./style/inputStyle";

const FormProduct: React.FC<{
  handleClose: () => void;
  editItem: any;
}> = ({ handleClose, editItem }) => {
  const { mutate } = useSWRConfig();
  const router = useRouter();
  const { classes, cx } = useStyles();
  const {
    data,
    error,
    mutate: refetch,
  } = useSWR(RequestQueryKeys.getProducts, productFetchers.getProducts);

  const imageRef = useRef<string | null>(null);
  const form = useForm({
    initialValues: {
      title: editItem?.title ?? "",
      image: editItem?.image ?? imageRef.current,
      code: editItem?.code ?? "",
      price: editItem?.price ?? "",
      quantity: editItem?.quantity ?? "",
      description: editItem?.description ?? "",
      discounts: editItem?.discounts ?? [
        {
          price: "25",
          quantity: "30",
        },
        {
          price: "25",
          quantity: "30",
        },
      ],

      validate: {
        title: (value: string | any[]) =>
          value.length >= 1 ? null : "name is not valid",
        price: (value: string | any[]) =>
          value.length >= 0 ? null : "price is not valid",
        quantity: (value: string | any[]) =>
          value.length >= 0 ? null : "quantity is not valid",
        description: (value: string | any[]) =>
          value.length >= 0 ? null : "decription is not valid",
      },
    },
  });

  const handleSubmit = async (values: {
    title: string;
    image: string;
    code: string;
    price: string;
    quantity: string;
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
      const res = await mutate(
        RequestQueryKeys.updateProducts,
        productFetchers.updateProducts(editItem._id, values),
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
    } else {
      showNotification({
        id: "load-data",
        loading: true,
        title: "Iltimos kuting",
        message: "Sizning mahsuloringiz qo'shilmoqda iltimos kuting",
        autoClose: false,
        disallowClose: true,
      });
      handleClose();
      const res = await mutate(
        RequestQueryKeys.addProduct,
        productFetchers.addProduct(values),
        {
          revalidate: true,
        }
      );
      refetch();
      updateNotification({
        id: "load-data",
        color: "teal",
        title: "Muaffaqiyatli",
        message: "Sizning mahsuloringiz qo'shildi",
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
        <Box sx={{ maxHeight: "150px" }}>
          <ImageUploader sx={{ marginBlock: 5 }} />
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
