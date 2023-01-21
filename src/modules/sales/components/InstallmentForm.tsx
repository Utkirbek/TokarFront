import "dayjs/locale/uz-latn";

import { SelectWithCreate } from "@components/SelectWithCreate";
import If from "@components/smart/If";
import WithLoading from "@hoc/WithLoading";
import { selectIsInstallment } from "@hooks/shared/selectors";
import useSalesState from "@hooks/shared/useSales";
import { NumberInput } from "@mantine/core";
import { DatePicker } from "@mantine/dates";
import { FieldLoader } from "@modules/payments/components/PaymentForm";
import useUsers from "@services/hooks/useUser";
import React, { memo } from "react";
import { useIntl } from "react-intl";
import { useCart } from "react-use-cart";

import { useSalesFormContext } from "../Sales";

interface InstallmentFormProps {}

const InstallmentForm: React.FC<InstallmentFormProps> = () => {
  const form = useSalesFormContext();
  const intl = useIntl();
  const isInstallment = useSalesState(selectIsInstallment);
  const { isEmpty } = useCart();

  const { useFetchUsers, addUser } = useUsers();
  const fetchUsersQuery = useFetchUsers();

  return (
    <form>
      <If condition={!isEmpty}>
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
      </If>
      <If condition={isInstallment}>
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
      </If>
    </form>
  );
};

export default memo(InstallmentForm);
