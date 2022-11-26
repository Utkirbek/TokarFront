import EmptyBox from "@assets/icons/EmptyBox/EmptyBox";
import FormDrawer from "@components/Drawer/FormDrawer";
import TableHead from "@components/Table/TableHead";
import useConfirmation from "@hooks/useConfirmation";
import useNotification from "@hooks/useNotification";
import {
  ActionIcon,
  Button,
  Group,
  ScrollArea,
  Table,
  Text,
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import usePayments from "@services/hooks/usePayments";
import { IconTrash } from "@tabler/icons";
import Link from "next/link";
import { memo } from "react";
import { FormattedDate, FormattedMessage, FormattedTime } from "react-intl";

import PaymentsForm from "./PaymentForm";

const tableHead = {
  salesman: true,
  amount: true,
  loan: true,
  payment: true,
  createdAt: true,
  updatedAt: true,
  action: true,
};

function PaymentsTable({ data }: { data: any }) {
  const {
    showLoadingNotification,
    showSuccessNotification,
    showErrorNotification,
  } = useNotification();
  const { deletePayment } = usePayments();

  const [opened, toggleOpened] = useToggle();
  const { openConfirm } = useConfirmation();

  const openDeleteModal = (id: string) => {
    openConfirm(null, {
      onConfirm: () => {
        showLoadingNotification();
        deletePayment(id, {
          onSuccess: () => showSuccessNotification(),
          onError: () => showErrorNotification(),
        });
      },
    });
  };

  if (data?.length === 0) return <EmptyBox />;

  const handleOpenDrawer = () => {
    toggleOpened(true);
  };

  const rows = data?.map((item: any) => {
    return (
      <tr key={item._id}>
        <td>
          <Link
            href={"/admins"}
            style={{
              borderBottom: "1px solid #1983FF",
              textDecoration: "none",
            }}
          >
            {item.salesman.name}
          </Link>
        </td>
        <td>{item.amount}</td>
        <td>
          {!!item.loan ? (
            <Text>
              <FormattedMessage id="payments.debt" />
            </Text>
          ) : (
            <Text>
              <FormattedMessage id="payments.trade" />
            </Text>
          )}
        </td>
        <td>{item.paymentMethod}</td>
        <td>
          <FormattedTime value={data?.updatedAt} />
          ,&nbsp;
          <FormattedDate
            value={data?.updatedAt}
            month="numeric"
            year="numeric"
            day="numeric"
          />
        </td>
        <td>
          <FormattedTime value={data?.updatedAt} />
          ,&nbsp;
          <FormattedDate
            value={data?.updatedAt}
            month="numeric"
            year="numeric"
            day="numeric"
          />
        </td>

        <td>
          <ActionIcon>
            <IconTrash
              style={{ color: "red", cursor: "pointer" }}
              onClick={() => openDeleteModal(item._id)}
            />
          </ActionIcon>
        </td>
      </tr>
    );
  });

  return (
    <>
      <FormDrawer {...{ opened, toggleOpened }}>
        <ScrollArea
          style={{ height: "100%", paddingBottom: 60 }}
          scrollbarSize={2}
        >
          <PaymentsForm handleClose={() => toggleOpened(false)} />
        </ScrollArea>
      </FormDrawer>
      <Group position="right" mx={"xl"} my={"xl"}>
        <Button onClick={handleOpenDrawer} variant={"outline"}>
          <FormattedMessage id="payments.create" />
        </Button>
      </Group>

      <ScrollArea>
        <Table verticalSpacing="sm" highlightOnHover>
          <TableHead data={tableHead} prefix="payments" />
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
    </>
  );
}

export default memo(PaymentsTable);
