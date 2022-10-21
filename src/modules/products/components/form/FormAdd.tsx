import { Box, Button, Group, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import productFetchers from "@services/api/productFetchers";
import { IconCheck } from "@tabler/icons";
import { RequestQueryKeys } from "@utils/constants";
import { useRouter } from "next/router";
import { title } from "process";
import { useRef } from "react";
import useSWR, { mutate, useSWRConfig } from "swr";

import ImageUploader from "./ImageUploader";

const FormProduct: React.FC<{
  handleClose: () => void;
  editItem: any;
}> = ({ handleClose, editItem }) => {
  const { mutate } = useSWRConfig();
  const router = useRouter();

  const {
    data,
    error,
    mutate: refetch,
  } = useSWR(RequestQueryKeys.getProducts, productFetchers.getProducts);

  // const handleUpdate = async (id: string) => {
  //   const res = await mutate(
  //     RequestQueryKeys.updateProducts,
  //     productFetchers.updateProducts(id, ""),
  //     {
  //       revalidate: true,
  //     }
  //   );
  //   refetch();
  //   console.log(res);
  // };

  const imageRef = useRef<string | null>(null);

  // console.log(imageRef);

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
        productFetchers.updateProducts(editItem._id, editItem),
        {
          revalidate: true,
        }
      );

      console.log(res);

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

  const isDisabled = (obj: Object) => {
    Object.values(obj).some((value) => value === "");
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
          withAsterisk
          label="Mahsulot Nomi"
          placeholder="Mahsulot nomini kiriting"
          {...form.getInputProps("title")}
          sx={{ margin: "15px 0" }}
          required
        />

        {/* bu yerda rasm yuklash */}
        <Box sx={{ maxHeight: "150px" }}>
          <ImageUploader
            sx={{ marginBlock: 5 }}
            // imageRef={imageRef}
          />
          <Button
            variant="outline"
            sx={{ float: "right", margin: "10px 0" }}
            hidden>
            Rasmni Olib Tashlash
          </Button>
        </Box>
        <TextInput
          label="Mahsulot Kodi"
          placeholder="Mahsulot Kodi"
          {...form.getInputProps("code")}
          sx={{ margin: "15px 0" }}
          required
        />
        <TextInput
          label="Mahsulot Narxi"
          placeholder="Mahsulot Narxi"
          {...form.getInputProps("price")}
          sx={{ margin: "15px 0" }}
          required
        />
        <TextInput
          label="Nechta mahsulot borligi"
          placeholder="Nechta mahsulot borligi"
          {...form.getInputProps("quantity")}
          sx={{ margin: "15px 0" }}
          required
        />
        <TextInput
          label="Tarif"
          placeholder="Mahsulotga tarif"
          {...form.getInputProps("description")}
          sx={{ margin: "15px 0" }}
          required
        />
        <Group position="right" mt="md">
          <Button type="submit">
            {!editItem ? "Saqlash" : "Ro'yxatga Qo'shish"}
          </Button>
        </Group>
      </form>
    </Box>
  );
};
export default FormProduct;
