import ImageUploader from "@components/ImageUploader";
import If from "@components/smart/If";
import useNotification from "@hooks/useNotification";
import {
  ActionIcon,
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
import useCurrency from "@services/hooks/useCurrency";
import useProducts from "@services/hooks/useProducts";
import { IconChevronDown, IconTrash } from "@tabler/icons";
import { Permissions } from "@utils/constants";
import { nanoid } from "nanoid";
import { useRef } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import unit from "./constants/dataUnit";
import PriceGroup from "./PriceGroup";
import useStyles from "./style/inputStyle";

export interface FormAddProps {
  image: string;
  currency: string;
  title: string;
  code: string | number;
  originalPrice: number;
  price: string | number;
  unit: string;
  quantity: string | number;
  description: string;
  discounts: { price: number; quantity: number }[];
  minQuantity: number;
  sellingCurrency: string;
}

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
  const {
    showLoadingNotification,
    showSuccessNotification,
    showErrorNotification,
  } = useNotification();

  const form = useForm<FormAddProps>({
    initialValues: {
      title: editItem?.title || "",
      code: editItem?.code ?? "",
      originalPrice: editItem?.originalPrice ?? null,
      price: editItem?.price ?? null,
      unit: editItem?.unit || "D",
      quantity: editItem?.quantity ?? 1,
      description: editItem?.description || "",
      discounts: editItem?.discounts ?? [],
      currency: editItem?.currency?._id || "63635d7850b0f6000826a6ac",
      sellingCurrency:
        editItem?.sellingCurrency?._id || "63635d7850b0f6000826a6ac",
      minQuantity: editItem?.minQuantity ?? 5,
      image: editItem?.image || "",
    },
  });

  const handleSubmit = async (values: FormAddProps) => {
    showLoadingNotification();
    if (!!editItem._id) {
      console.log(values, imagesRef.current?.join?.(","));
      editProduct(
        {
          id: editItem._id,
          values: {
            ...values,
            image: imagesRef.current?.join?.(",") || editItem.image,
            discounts: values.discounts?.map((item) => ({
              price: item.price,
              quantity: item.quantity,
            })),
          },
        },
        {
          onSuccess: () => showSuccessNotification(),
          onError: () => showErrorNotification(),
        }
      );
      handleClose();
    } else {
      addProduct(
        {
          ...values,
          price: values.price ?? 0,
          originalPrice: values.originalPrice ?? 0,
          discounts: values.discounts?.map((item) => ({
            price: item.price,
            quantity: item.quantity,
          })),
          image: imagesRef.current?.join?.(",") ?? "",
        },
        {
          onSuccess: () => {
            showSuccessNotification();
          },
          onError: () => showErrorNotification(),
        }
      );
      handleClose();
    }
  };

  const discountFields = form.values.discounts?.map(
    (discount: any, index: number) => (
      <Group key={discount.key + index} mt={"xs"}>
        <NumberInput
          label={intl.formatMessage({ id: "products.form.limitLabel" })}
          placeholder={intl.formatMessage({
            id: "products.form.limitLabel",
          })}
          {...form.getInputProps(`discounts.${index}.price`)}
          precision={2}
          min={0}
          hideControls
        />
        <NumberInput
          label={intl.formatMessage({ id: "products.form.limitNumbLabel" })}
          placeholder={intl.formatMessage({
            id: "products.form.limitNumbLabel",
          })}
          {...form.getInputProps(`discounts.${index}.quantity`)}
          min={0}
          hideControls
        />
        <ActionIcon
          color="red"
          mt={20}
          onClick={() => form.removeListItem("discounts", index)}
        >
          <IconTrash />
        </ActionIcon>
      </Group>
    )
  );

  return (
    <Box sx={{ maxWidth: 440, height: "auto" }} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          className={classes.inputStyle}
          withAsterisk
          label={intl.formatMessage({ id: "products.form.prodLabel" })}
          placeholder={intl.formatMessage({
            id: "products.form.prodPlaceholder",
          })}
          {...form.getInputProps("title")}
          required
        />

        <Box sx={{ maxHeight: "160px" }}>
          <ImageUploader urlsRef={imagesRef} dropzoneProps={{ pb: 0 }} />
          <Button
            variant="outline"
            sx={{ float: "right", margin: "10px 0" }}
            hidden
          >
            <FormattedMessage id="products.form.takePicture" />
          </Button>
        </Box>
        <TextInput
          className={classes.inputStyle}
          label={intl.formatMessage({ id: "products.form.codeLabel" })}
          placeholder={intl.formatMessage({ id: "products.form.codeLabel" })}
          {...form.getInputProps("code")}
          required
        />

        <If hasPerm={Permissions.products.add.originalPrice}>
          <If
            condition={!!currencies}
            elseChildren={<Skeleton width="100%" height="40px" />}
          >
            <PriceGroup
              currencies={currencies}
              priceLabel={intl.formatMessage({ id: "products.form.orgLabel" })}
              pricePlaceholder={intl.formatMessage({
                id: "products.form.orgLabel",
              })}
              form={form}
              registerType="originalPrice"
              currencyRegisterType="currency"
            />
          </If>
        </If>

        <If hasPerm={Permissions.products.add.price}>
          <If
            condition={!!currencies}
            elseChildren={<Skeleton width="100%" height="40px" />}
          >
            <PriceGroup
              currencies={currencies}
              priceLabel={intl.formatMessage({ id: "products.form.saleLabel" })}
              pricePlaceholder={intl.formatMessage({
                id: "products.form.salePlaceholder",
              })}
              form={form}
              registerType="price"
              currencyRegisterType="sellingCurrency"
            />
          </If>
        </If>

        <Select
          sx={{ width: "100%", margin: "20px  0" }}
          rightSection={<IconChevronDown size={14} />}
          rightSectionWidth={30}
          placeholder={intl.formatMessage({
            id: "products.form.measure",
          })}
          styles={{ rightSection: { pointerEvents: "none" } }}
          label={intl.formatMessage({ id: "products.form.measure" })}
          data={unit?.map((item: any) => ({
            value: item.value,
            label: item.label,
          }))}
          {...form.getInputProps("unit")}
        />

        <TextInput
          className={classes.inputStyle}
          label={intl.formatMessage({ id: "products.form.howLabel" })}
          placeholder={intl.formatMessage({ id: "products.form.howLabel" })}
          {...form.getInputProps("quantity")}
          required
        />
        <TextInput
          className={classes.inputStyle}
          label={intl.formatMessage({ id: "products.form.prodInfo" })}
          placeholder={intl.formatMessage({ id: "products.form.prodInfo" })}
          {...form.getInputProps("description")}
        />
        <NumberInput
          label={intl.formatMessage({ id: "products.form.minQuantity" })}
          placeholder={intl.formatMessage({
            id: "products.form.minQuantity",
          })}
          min={0}
          hideControls
          {...form.getInputProps("minQuantity")}
        />
        <Box>{discountFields}</Box>
        <Group position="right">
          <Button
            variant="outline"
            sx={{ float: "right", margin: "10px 0" }}
            onClick={() => {
              form.insertListItem("discounts", {
                price: 0,
                quantity: 0,
                key: nanoid(),
              });
            }}
          >
            <FormattedMessage id="products.form.addDiscount" />
          </Button>
        </Group>

        <Button type="submit" fullWidth>
          <FormattedMessage id="addSmth" values={{ isNew: !editItem._id }} />
        </Button>
      </form>
    </Box>
  );
};
export default FormProduct;
