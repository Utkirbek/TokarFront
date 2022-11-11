import useNotification from "@hooks/useNotification";
import { Box, Button, Group, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import useSpend from "@services/hooks/useSpend";
import { FormattedMessage, useIntl } from "react-intl";

const SpendDrawer: React.FC<{
  handleClose: () => void;
  editItem: any;
}> = ({ handleClose, editItem }) => {
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
      paymentMethod: editItem?.paymentMethod ?? "",
      description: editItem?.description ?? "",
      spendType: editItem?.spendType ?? "",
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
      onSuccess: () => {
        showSuccessNotification();
      },
      onError: () => {
        showErrorNotification();
      },
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
            id={!editItem._id ? "expenses.add" : "expenses.edit"}
          />
        </Text>
        <TextInput
          label={intl.formatMessage({ id: "expenses.amount" })}
          placeholder={intl.formatMessage({ id: "expenses.amountPlaceholder" })}
          {...form.getInputProps("amount")}
          required
        />
        <TextInput
          label={intl.formatMessage({ id: "expenses.type" })}
          placeholder={intl.formatMessage({ id: "expenses.typePlaceholder" })}
          {...form.getInputProps("paymentMethod")}
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
        <TextInput
          label={intl.formatMessage({ id: "expenses.reason" })}
          placeholder={intl.formatMessage({ id: "expenses.reasonPlaceholder" })}
          {...form.getInputProps("spendType")}
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
export default SpendDrawer;