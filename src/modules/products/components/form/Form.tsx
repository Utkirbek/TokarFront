import { Box, Button, Group, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import productFetchers from "@services/api/productFetchers";
import { IconCheck } from "@tabler/icons";
import { RequestQueryKeys } from "@utils/constants";
import { useRouter } from "next/router";
import useSWR, { useSWRConfig } from "swr";

import ImageUploader from "./ImageUploader";

const FormProduct: React.FC<{ handleClose: () => void }> = ({
  handleClose,
}) => {
  const { mutate } = useSWRConfig();
  const {
    data,
    error,
    mutate: refetch,
  } = useSWR(RequestQueryKeys.getProducts, productFetchers.getProducts);

  const router = useRouter();
  const form = useForm({
    initialValues: {
      code: "",
      title: "",
      image: "https://i.postimg.cc/qRpDcpsy/Rainbow-Peppers-4ct.jpg",
      price: "",
      quantity: "",
      description: "",
      discounts: [
        {
          price: "25",
          quantity: "30",
        },
        {
          price: "25",
          quantity: "30",
        },
      ],
    },
    validate: {
      title: (value) => (value.length >= 1 ? null : "name is not valid"),
      code: (value) => (value.length >= 1 ? null : "code is not valid"),
      price: (value) => (value.length >= 0 ? null : "price is not valid"),
      quantity: (value) => (value.length >= 0 ? null : "quantity is not valid"),
      description: (value) =>
        value.length >= 0 ? null : "decription is not valid",
    },
  });

  const handleSubmit = async (values: {
    code: string;
    title: string;
    image: string;
    price: string;
    quantity: string;
    description: string;
    discounts: any;
  }) => {
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
    updateNotification({
      id: "load-data",
      color: "teal",
      title: "Muaffaqiyatli",
      message: "Sizning mahsuloringiz qo'shildi",
      icon: <IconCheck size={16} />,
      autoClose: 2000,
    });
    refetch();
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
          Yangi Mahsulot qo&apos;shish
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
          <ImageUploader sx={{ marginBlock: 5 }} />
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
          <Button type="submit">Ro&apos;yxatga Qo&apos;shish</Button>
        </Group>
      </form>
    </Box>
  );
};
export default FormProduct;
