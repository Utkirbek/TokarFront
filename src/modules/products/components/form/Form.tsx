import { Box, Button, Group, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import productFetchers from "@services/api/productFetchers";
import { RequestQueryKeys } from "@utils/constants";
import { useRouter } from "next/router";
import { useSWRConfig } from "swr";

const FormProduct = () => {
  const { mutate } = useSWRConfig();

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
      title: (value) => (value.length >= 8 ? null : "name is not valid"),
      code: (value) => (value.length >= 1 ? null : "code is not valid"),
      price: (value) => (value.length >= 0 ? null : "price is not valid"),
      quantity: (value) => (value.length >= 0 ? null : "quantity is not valid"),
      description: (value) =>
        value.length >= 8 ? null : "decription is not valid",
    },
  });

  console.log(form.values);

  const handleSubmit = async (
    values: {
      code: string;
      title: string;
      image: string;
      price: string;
      quantity: string;
      description: string;
      discounts: any;
    },
    event: any
  ) => {
    event.preventDefault();
    const res = await mutate(
      RequestQueryKeys.addProduct,
      productFetchers.addProduct(values),
      false
    );
    console.log(res);
  };

  return (
    <Box sx={{ maxWidth: 440, overflow: "inherit" }} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Text sx={{ fontSize: "32px", textAlign: "center", fontWeight: 700 }}>
          Yangi Mahsulot qo&apos;shish
        </Text>
        <TextInput
          withAsterisk
          label="Mahsulot Nomi"
          placeholder="Mahsulot nomini kiriting"
          {...form.getInputProps("title")}
          sx={{ margin: "20px 0" }}
          required
        />

        {/* bu yerda rasm yuklash */}
        {/* <Box sx={{ maxHeight: "150px" }}>
          <ImageUploader sx={{ marginBlock: 10 }} />
          <Button variant="outline" sx={{ float: "right", margin: "10px 0" }}>
            Rasmni Olib Tashlash
          </Button>
        </Box> */}
        <TextInput
          label="Mahsulot Kodi"
          placeholder="Mahsulot Kodi"
          {...form.getInputProps("code")}
          sx={{ margin: "25px 0" }}
          required
        />
        <TextInput
          label="Mahsulot Narxi"
          placeholder="Mahsulot Narxi"
          {...form.getInputProps("price")}
          sx={{ margin: "20px 0" }}
          required
        />
        <TextInput
          label="Nechta mahsulot borligi"
          placeholder="Nechta mahsulot borligi"
          {...form.getInputProps("quantity")}
          sx={{ margin: "20px 0" }}
          required
        />
        <TextInput
          label="Tarif"
          placeholder="Mahsulotga tarif"
          {...form.getInputProps("description")}
          sx={{ margin: "20px 0" }}
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
function authorize(res: any) {
  throw new Error("Function not implemented.");
}
