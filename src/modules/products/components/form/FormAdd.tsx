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
import { randomId } from "@mantine/hooks";
import useCurrency from "@services/hooks/useCurrency";
import useProducts from "@services/hooks/useProducts";
import { IconChevronDown, IconTrash } from "@tabler/icons";
import { Permissions } from "@utils/constants";
import { useRef } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import unit from "./constants/dataUnit";
import useStyles from "./style/inputStyle";

interface FormAddProps {
  image: string;
  currency: string;
  title: string;
  code: string | number;
  originalPrice: string | number;
  price: string | number;
  unit: string;
  quantity: string | number;
  description: string;
  discounts: { price: number; quantity: number }[];
  minQuantity: number;
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
      title: editItem?.title ?? "",
      code: editItem?.code ?? "",
      originalPrice: editItem?.originalPrice ?? "",
      price: editItem?.price ?? "",
      unit: editItem?.unit ?? "D",
      quantity: editItem?.quantity ?? "",
      description: editItem?.description ?? "",
      discounts: editItem?.discounts ?? [
        { price: 0, quantity: 0, key: randomId() },
      ],
      currency: editItem?.currency ?? "63635d7850b0f6000826a6ac",
      minQuantity: editItem?.minQuantity ?? 5,
      image: editItem?.image ?? "",
    },
  });

  const handleSubmit = async (values: FormAddProps) => {
    showLoadingNotification();
    if (!!editItem._id) {
      editProduct(
        {
          id: editItem._id,
          values: {
            ...values,
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
          discounts: values.discounts?.map((item) => ({
            price: item.price,
            quantity: item.quantity,
          })),
          image: imagesRef.current?.join(",") ?? "",
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

  const discountFields = form.values.discounts.map(
    (discount: any, index: number) => (
      <Group key={discount.key} mt={"xs"}>
        <NumberInput
          label={intl.formatMessage({ id: "products.form.limitLabel" })}
          placeholder={intl.formatMessage({
            id: "products.form.limitLabel",
          })}
          {...form.getInputProps(`discounts.${index}.price`)}
          hideControls
        />
        <NumberInput
          label={intl.formatMessage({ id: "products.form.limitNumbLabel" })}
          placeholder={intl.formatMessage({
            id: "products.form.limitNumbLabel",
          })}
          {...form.getInputProps(`discounts.${index}.quantity`)}
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
        <Text
          sx={{
            fontSize: "24px",
            textAlign: "center",
            fontWeight: 700,
          }}
        >
          <FormattedMessage
            id="products.addEdit"
            values={{ isNew: !editItem._id }}
          />
        </Text>
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

        <If
          condition={!!currencies}
          elseChildren={<Skeleton width="100%" height="40px" />}
        >
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
        <If hasPerm={Permissions.products.add.originalPrice}>
          <TextInput
            className={classes.inputStyle}
            label={intl.formatMessage({ id: "products.form.orgLabel" })}
            placeholder={intl.formatMessage({ id: "products.form.orgLabel" })}
            {...form.getInputProps("originalPrice")}
          />
        </If>

        <If hasPerm={Permissions.products.add.price}>
          <TextInput
            className={classes.inputStyle}
            label={intl.formatMessage({ id: "products.form.saleLabel" })}
            placeholder={intl.formatMessage({
              id: "products.form.salePlaceholder",
            })}
            {...form.getInputProps("price")}
          />
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
                key: randomId(),
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
