import useNotification from "@hooks/useNotification";
import {
  Box,
  Button,
  Group,
  SegmentedControl,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import salesMethods from "@modules/products/components/buyCart/data";
import useSpend from "@services/hooks/useSpend";
import { FormattedMessage, useIntl } from "react-intl";

import { useSpendStyles } from "./useSpendStyles";

const expenseTypes = [
  { label: "Sarmoya", value: "invest" },
  { label: "Xarajat", value: "spend" },
];

const SpendDrawer: React.FC<{
  handleClose: () => void;
  editItem: any;
}> = ({ handleClose, editItem }) => {
  const { classes } = useSpendStyles();
  const intl = useIntl();
  const { editSpend, addSpend } = useSpend();
  const {
    showLoadingNotification,
    showSuccessNotification,
    showErrorNotification,
  } = useNotification();

  const form = useForm({
    initialValues: {
      amount: editItem?.amount ?? "",
      paymentMethod: editItem?.paymentMethod ?? "cash",
      description: editItem?.description ?? "",
      spendType: editItem?.spendType ?? "spend",
    },
  });

  const handleSubmit = async (values: {
    amount: string;
    paymentMethod: string;
    description: string;
    spendType: string;
  }) => {
    handleClose();
    showLoadingNotification();

    const eventHandlers = {
      onSuccess: () => showSuccessNotification(),
      onError: () => showErrorNotification(),
    };

    if (!!editItem._id) editSpend({ id: editItem._id, values }, eventHandlers);
    else addSpend(values, eventHandlers);
  };

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
            id="expenses.addEdit"
            values={{ isNew: !editItem._id }}
          />
        </Text>
        <TextInput
          label={intl.formatMessage({ id: "expenses.amount" })}
          placeholder={intl.formatMessage({ id: "expenses.amountPlaceholder" })}
          {...form.getInputProps("amount")}
          type="number"
          required
        />

        <TextInput
          label={intl.formatMessage({ id: "expenses.comment" })}
          placeholder={intl.formatMessage({
            id: "expenses.commentPlaceholder",
          })}
          {...form.getInputProps("description")}
          required
        />

        <SegmentedControl
          mt={15}
          fullWidth
          color="green"
          data={expenseTypes.map((item: { label: string; value: string }) => ({
            label: <FormattedMessage id={item.label} />,
            value: item.value,
          }))}
          {...form.getInputProps("spendType")}
        />

        <SegmentedControl
          mt={15}
          fullWidth
          color="orange"
          data={salesMethods.map((item: { label: string; value: string }) => ({
            label: <FormattedMessage id={item.label} />,
            value: item.value,
          }))}
          {...form.getInputProps("paymentMethod")}
        />

        <Group position="right" mt="md">
          <Box className={classes.btnResponse}>
            <Button type="submit" className={classes.spendButton}>
              <FormattedMessage
                id="addSmth"
                values={{ isNew: !editItem._id }}
              />
            </Button>
          </Box>
        </Group>
      </form>
    </Box>
  );
};
export default SpendDrawer;
