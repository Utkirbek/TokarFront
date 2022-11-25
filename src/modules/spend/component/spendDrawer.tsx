import useNotification from "@hooks/useNotification";
import { Box, Button, Group, Select, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import useSpend from "@services/hooks/useSpend";
import { IconChevronDown } from "@tabler/icons";
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
          required
        />
        <Select
          sx={{ width: "100%", margin: "20px  0" }}
          rightSection={<IconChevronDown size={14} />}
          rightSectionWidth={30}
          placeholder={intl.formatMessage({
            id: "payments.select",
          })}
          styles={{ rightSection: { pointerEvents: "none" } }}
          label={intl.formatMessage({ id: "payments.select" })}
          data={["Click", "Naqt"]}
          {...form.getInputProps("paymentMethod")}
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
          style={{ margin: "20px 0" }}
          label={intl.formatMessage({ id: "expenses.spendType" })}
          placeholder={intl.formatMessage({
            id: "expenses.spendTypePlaceholder",
          })}
          {...form.getInputProps("spendType")}
          required
        />

        <Group position="right" mt="md">
          <Button type="submit">
            <FormattedMessage id="addSmth" values={{ isNew: !editItem._id }} />
          </Button>
        </Group>
      </form>
    </Box>
  );
};
export default SpendDrawer;
