import ImageUploader from "@components/ImageUploader";
import If from "@components/smart/If";
import {
  Box,
  Button,
  Group,
  NumberInput,
  Select,
  Skeleton,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { showNotification, updateNotification } from "@mantine/notifications";
import useCurrency from "@services/hooks/useCurrency";
import useProducts from "@services/hooks/useProducts";
import { IconCheck, IconChevronDown } from "@tabler/icons";
import { useRef } from "react";
import { useIntl } from "react-intl";

import useStyles from "./style/inputStyle";

const FormProduct: React.FC<{
  handleClose: () => void;
  editItem: any;
}> = ({ handleClose, editItem }) => {
  const imagesRef = useRef<string[]>([]);
  const { classes } = useStyles();
  const { editProduct, addProduct } = useProducts();
  const intl = useIntl();
  const { useFetchCurrency } = useCurrency();
  const getCurrencyQuery = useFetchCurrency();
  const { data: currencies, error: currencyError } = getCurrencyQuery;

  const form = useForm({
    initialValues: {
      title: editItem?.title ?? "",
      code: editItem?.code ?? "",
      originalPrice: editItem?.originalPrice ?? "",
      price: editItem?.price ?? "",
      quantity: editItem?.quantity ?? "",
      description: editItem?.description ?? "",
      discounts: editItem?.discounts ?? [{ price: 0, quantity: 0 }],
      currency: editItem?.currency ?? "63635d7850b0f6000826a6ac",
    },
  });

  const handleSubmit = async (values: {
    currency: any;
    title: any;
    code: any;
    originalPrice: any;
    price: any;
    quantity: any;
    description: any;
    discounts: any;
  }) => {
    if (!!editItem._id) {
      showNotification({
        id: "load-data",
        loading: true,
        title: intl.formatMessage({ id: "addProductsForm.showNotifTitle" }),
        message: intl.formatMessage({ id: "addProductsForm.showNotifMessage" }),
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
              title: intl.formatMessage({
                id: "addProductsForm.updateNotifTitle",
              }),
              message: intl.formatMessage({
                id: "addProductsForm.updateNotifMessage",
              }),
              icon: <IconCheck size={16} />,
              autoClose: 2000,
            });
          },
        }
      );
    } else {
      handleClose();
      addProduct(
        {
          ...values,
          image: imagesRef.current?.join(",") ?? "",
        },
        {
          onSuccess: () => {
            updateNotification({
              id: "load-data",
              color: "teal",
              title: intl.formatMessage({
                id: "addProductsForm.updateNotifTitle",
              }),
              message: intl.formatMessage({
                id: "addProductsForm.updateNotifMessage",
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
                id: "addProductsForm.updataNotifError",
              }),
              message: intl.formatMessage({
                id: "addProductsForm.updataNotifErrorMessage",
              }),
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
      title: intl.formatMessage({ id: "addProductsForm.showNotifTitle" }),
      message: intl.formatMessage({ id: "addProductsForm.showNotifMessage" }),
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

        <If
          condition={!!currencies}
          elseChildren={<Skeleton width="100%" height="40px" />}>
          <Select
            sx={{ width: "100%", margin: "20px  0" }}
            rightSection={<IconChevronDown size={14} />}
            rightSectionWidth={30}
            placeholder={intl.formatMessage({
              id: "products.form.currencyPlaceholder",
            })}
            styles={{ rightSection: { pointerEvents: "none" } }}
            label={intl.formatMessage({ id: "products.form.currencyLabel" })}
            data={currencies?.map((item: any) => ({
              value: item._id,
              label: item.name,
            }))}
            {...form.getInputProps("currency")}
          />
        </If>
        <TextInput
          className={classes.inputStyle}
          label="Mahsulot Asl Narxi"
          placeholder="Mahsulot Asl narxi"
          {...form.getInputProps("originalPrice")}
        />

        <TextInput
          className={classes.inputStyle}
          label="Mahsulot Sotuvdagi Narxi"
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
          label="Mahsulotga tavsif"
          placeholder="Mahsulotga tavsif"
          {...form.getInputProps("description")}
          required
        />
        <Box>
          <NumberInput
            label="Chegirmadagi Narxi"
            placeholder="Chegirmadagi Narxiini kiriting"
            {...form.getInputProps("discounts.price")}
          />
          <NumberInput
            label="Chegirmadagi Soni"
            placeholder="Chegirmadagi soni"
            {...form.getInputProps("discounts.quantity")}
          />
        </Box>

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
