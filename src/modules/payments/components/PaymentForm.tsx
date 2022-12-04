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
import datas from "@modules/products/components/buyCart/data";
import loanFeatchers from "@services/api/loanFetchers";
import usePayments from "@services/hooks/usePayments";
import useUsers from "@services/hooks/useUser";
import { IconChevronDown } from "@tabler/icons";
import { RequestQueryKeys } from "@utils/constants";
import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import useSWR from "swr";

import useStyles from "./paymentStyle";

export const FieldLoader = () => {
  return (
    <Box my={10}>
      <Skeleton height="10px" width={"60px"} my={10} />
      <Skeleton height="35px" width={"100%"} />
    </Box>
  );
};

const PaymentsForm: React.FC<{
  handleClose: () => void;
}> = ({ handleClose }) => {
  const [value, setValue] = useState<string | null>(null);

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

  const userLoanQuery = useSWR(
    value ? [RequestQueryKeys.getLoanUserID, value] : null,
    loanFeatchers.getLoanUserID
  );
  const { data: userLoan } = userLoanQuery;

  const userId = useUser();

  const form = useForm({
    initialValues: {
      amount: "",
      paymentMethod: "cash",
      salesman: userId._id,
      loan: "",
    },
  });

  const handleSubmit = async (values: {
    amount: any;
    paymentMethod: string;
    salesman: any;
    loan: any;
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
          <Text className={classes.paymentText}>
            <FormattedMessage id="payments.formTitle" />
          </Text>
          <WithLoading query={getUserQuery} FallbackLoadingUI={FieldLoader}>
            <Select
              className={classes.paymentSelect}
              rightSection={<IconChevronDown size={14} />}
              rightSectionWidth={30}
              placeholder={intl.formatMessage({
                id: "payments.user",
              })}
              styles={{ rightSection: { pointerEvents: "none" } }}
              label={intl.formatMessage({ id: "payments.user" })}
              data={users?.map((item: any) => ({
                value: item._id,
                label: item.name,
              }))}
              onChange={(val) => {
                setValue(val);
              }}
              value={value}
              required
            />
          </WithLoading>

          <WithLoading query={userLoanQuery} FallbackLoadingUI={FieldLoader}>
            <Select
              className={classes.paymentSelect}
              rightSection={<IconChevronDown size={14} />}
              rightSectionWidth={30}
              placeholder={intl.formatMessage({
                id: "payments.loanUser",
              })}
              styles={{ rightSection: { pointerEvents: "none" } }}
              label={intl.formatMessage({ id: "payments.loanUser" })}
              data={
                Array.isArray(userLoan?.loan)
                  ? userLoan?.loan
                      .filter((item: any) => Boolean(item.amount))
                      .map((item: any) => {
                        return {
                          label: item.amount,
                          value: item._id,
                        };
                      })
                  : []
              }
              required
              {...form.getInputProps("loan")}
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
          <Box my={30}>
            <Text my={10}>
              <FormattedMessage id="payments.select" />
            </Text>

            <SegmentedControl
              fullWidth
              color="orange"
              data={datas.map((item: { label: string; value: string }) => ({
                label: <FormattedMessage id={item.label} />,
                value: item.value,
              }))}
              {...form.getInputProps("paymentMethod")}
            />
          </Box>
          <Group position="right" mt="md">
            <Button type="submit">
              <FormattedMessage id="payments.btnSubmit" />
            </Button>
          </Group>
        </form>
      </Box>
    </>
  );
};
export default PaymentsForm;
