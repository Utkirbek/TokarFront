import WithLoading from "@hoc/WithLoading";
import useNotification from "@hooks/useNotification";
import {
  Box,
  Button,
  Group,
  Select,
  Skeleton,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import useStyles from "@modules/products/components/form/style/inputStyle";
import useAdmins from "@services/hooks/useAdmins";
import useLoan from "@services/hooks/useLoan";
import usePayments from "@services/hooks/usePayments";
import { IconChevronDown } from "@tabler/icons";
import { FormattedMessage, useIntl } from "react-intl";

const Loader = () => {
  return (
    <Box my={10}>
      <Skeleton height="10px" width={"60px"} my={10} />
      <Skeleton
        height="35 .
      px"
      />
    </Box>
  );
};

const PaymentsForm: React.FC<{
  handleClose: () => void;
}> = ({ handleClose }) => {
  const { classes } = useStyles();
  const { addPayments } = usePayments();
  const intl = useIntl();
  const {
    showLoadingNotification,
    showSuccessNotification,
    showErrorNotification,
  } = useNotification();

  const { useFetchAdmins } = useAdmins();
  const getAdminsQuery = useFetchAdmins();
  const { data: admins } = getAdminsQuery;

  const { useLoanFeatchers } = useLoan();
  const getLoanQuery = useLoanFeatchers();
  const { data: loan } = getLoanQuery;

  const form = useForm({
    initialValues: {
      amount: "",
      paymentMethod: "",
      loan: "",
    },
  });

  const handleSubmit = async (values: {
    amount: any;
    paymentMethod: string;
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
      <Box sx={{ maxWidth: 440, height: "auto" }} mx="auto">
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Text sx={{ textAlign: "center", fontSize: "28px", fontWeight: 700 }}>
            <FormattedMessage id="payments.formTitle" />
          </Text>

          <WithLoading query={getAdminsQuery} FallbackLoadingUI={Loader}>
            <Select
              sx={{ width: "100%", margin: "20px  0" }}
              rightSection={<IconChevronDown size={14} />}
              rightSectionWidth={30}
              placeholder={intl.formatMessage({
                id: "payments.salesman",
              })}
              styles={{ rightSection: { pointerEvents: "none" } }}
              label={intl.formatMessage({ id: "payments.salesman" })}
              data={admins?.map((item: any) => ({
                value: item._id,
                label: item.name,
              }))}
              {...form.getInputProps("salesman")}
            />
          </WithLoading>
          <WithLoading query={getLoanQuery} FallbackLoadingUI={Loader}>
            <Select
              sx={{ width: "100%", margin: "20px  0" }}
              rightSection={<IconChevronDown size={14} />}
              rightSectionWidth={30}
              placeholder={intl.formatMessage({
                id: "payments.loanInput",
              })}
              styles={{ rightSection: { pointerEvents: "none" } }}
              label={intl.formatMessage({ id: "payments.loanInput" })}
              data={loan?.map((item: any) => ({
                value: item._id,
                label: item.amount,
              }))}
              {...form.getInputProps("loanInput")}
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
            data={["click", "Terminal", "Naqt", "Bo'lib To'lash"]}
            {...form.getInputProps("paymentMethod")}
          />

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
