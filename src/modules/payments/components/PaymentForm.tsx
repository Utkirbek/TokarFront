import WithLoading from "@hoc/WithLoading";
import useUser from "@hooks/shared/useUser";
import useNotification from "@hooks/useNotification";
import {
  Box,
  Button,
  Group,
  SegmentedControl,
  Select,
  Skeleton,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import salesMethods from "@modules/products/components/buyCart/data";
import usePayments from "@services/hooks/usePayments";
import useUsers from "@services/hooks/useUser";
import { FormattedMessage, useIntl } from "react-intl";

import useStyles from "./paymentStyle";

export const FieldLoader = () => {
  return (
    <Box my={10}>
      <Skeleton height="10px" width={"60px"} my={10} />
      <Skeleton height="35px" width={"100%"} />
    </Box>
  );
};

export type PaymentMethod = "cash" | "terminal" | "click";

const PaymentsForm: React.FC<{
  handleClose: () => void;
}> = ({ handleClose }) => {
  const { classes } = useStyles();
  const intl = useIntl();
  const {
    showLoadingNotification,
    showSuccessNotification,
    showErrorNotification,
  } = useNotification();

  const { addPayments } = usePayments();
  const { useFetchUsers } = useUsers();

  const getUserQuery = useFetchUsers();
  const { data: users } = getUserQuery;

  const userId = useUser();

  const form = useForm({
    initialValues: {
      amount: 0,
      paymentMethod: "cash" as PaymentMethod,
      salesman: userId._id,
      userId: "",
    },
  });

  const handleSubmit = async (values: {
    amount: number;
    paymentMethod: PaymentMethod;
    salesman: string;
    userId: string;
  }) => {
    addPayments(values, {
      onSuccess: () => {
        showSuccessNotification();
        handleClose();
      },
      onError: () => {
        showErrorNotification();
      },
    });
    showLoadingNotification();
  };

  return (
    <>
      <Box className={classes.paymentBox} mx="auto">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <WithLoading query={getUserQuery} FallbackLoadingUI={FieldLoader}>
            <Select
              className={classes.paymentSelect}
              placeholder={intl.formatMessage({ id: "payments.user" })}
              styles={{ rightSection: { pointerEvents: "none" } }}
              label={intl.formatMessage({ id: "payments.user" })}
              data={users?.map((item: any) => ({
                value: item._id,
                label: item.name,
              }))}
              required
              {...form.getInputProps("userId")}
            />
          </WithLoading>

          <TextInput
            className={classes.inputStyle}
            withAsterisk
            label={intl.formatMessage({
              id: "payments.amount",
            })}
            placeholder={intl.formatMessage({
              id: "payments.amount",
            })}
            {...form.getInputProps("amount")}
            type="number"
            required
          />
          <Box my={10}>
            <Text my={10}>
              <FormattedMessage id="payments.select" />
            </Text>

            <SegmentedControl
              fullWidth
              color="orange"
              data={salesMethods.map(
                (item: { label: string; value: string }) => ({
                  label: <FormattedMessage id={item.label} />,
                  value: item.value,
                })
              )}
              {...form.getInputProps("paymentMethod")}
            />
          </Box>
          <Group position="right" mt="md">
            <Box className={classes.paymentsBtn}>
              <Button type="submit" className={classes.paymentsButton}>
                <FormattedMessage id="payments.btnSubmit" />
              </Button>
            </Box>
          </Group>
        </form>
      </Box>
    </>
  );
};
export default PaymentsForm;
