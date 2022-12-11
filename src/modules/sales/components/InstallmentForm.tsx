import "dayjs/locale/uz-latn";

import { SelectWithCreate } from "@components/SelectWithCreate";
import WithLoading from "@hoc/WithLoading";
import { NumberInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { FieldLoader } from "@modules/payments/components/PaymentForm";
import useUsers from "@services/hooks/useUser";
import React from "react";
import { useIntl } from "react-intl";

import { useSalesFormContext } from "../Sales";

interface InstallmentFormProps {}

const InstallmentForm: React.FC<InstallmentFormProps> = () => {
  const form = useSalesFormContext();
  const intl = useIntl();

  const { useFetchUsers, addUser } = useUsers();
  const fetchUsersQuery = useFetchUsers();

  return (
    <form>
      <WithLoading query={fetchUsersQuery} FallbackLoadingUI={FieldLoader}>
        <SelectWithCreate
          label="products.buyCart.whom"
          placeholder="products.buyCart.whom"
          data={fetchUsersQuery.data?.map((user: any) => {
            return {
              value: user._id,
              label: user.name,
            };
          })}
          registerAs="customer"
          form={form}
          onCreate={(value) => {
            //TODO modal chiqarib user yaratish imkonini shu yerda berish kerak
          }}
        />
      </WithLoading>
      <NumberInput
        {...form.getInputProps("initialPaymentAmount")}
        label={intl.formatMessage({ id: "products.buyCart.initialPayment" })}
        hideControls
      />

      <DatePicker
        locale="uz-latn"
        dropdownType="modal"
        placeholder={intl.formatMessage({ id: "products.buyCart.date" })}
        label={intl.formatMessage({ id: "products.buyCart.date" })}
        {...form.getInputProps("paymentDate")}
      />
    </form>
  );
};

export default InstallmentForm;
