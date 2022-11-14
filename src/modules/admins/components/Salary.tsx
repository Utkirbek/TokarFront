import { Button, TextInput } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import useSalary from "@services/hooks/useSalary";
import { useRef } from "react";
import { FormattedMessage, useIntl } from "react-intl";

const Salary: React.FC<{ inpStaff: any }> = ({ inpStaff }) => {
  const neWsalary = useRef<HTMLInputElement>(null);
  const { addSalary } = useSalary();
  const intl = useIntl();

  const openSalary = () => {
    openConfirmModal({
      title: intl.formatMessage({ id: "admins.adminSalaryTitle" }),
      children: (
        <TextInput
          label={intl.formatMessage({ id: "admins.adminSalaryMsg" })}
          placeholder={intl.formatMessage({ id: "admins.adminSalaryMsg" })}
          data-autofocus
          ref={neWsalary}
          required
        />
      ),
      onConfirm: async () => {
        if (neWsalary.current?.value) {
          await addSalary({
            amount: neWsalary.current?.value,
            staff: inpStaff,
          });
        }
      },
      labels: {
        confirm: intl.formatMessage({
          id: "admins.toPay",
        }),
        cancel: intl.formatMessage({
          id: "admins.back",
        }),
      },
    });
  };

  return (
    <Button variant={"outline"} onClick={openSalary}>
      <FormattedMessage id="admins.give_salary" />
    </Button>
  );
};

export default Salary;
