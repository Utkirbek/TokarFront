import EmptyBox from "@assets/icons/EmptyBox/EmptyBox";
import FormDrawer from "@components/Drawer/FormDrawer";
import If from "@components/smart/If";
import TableHead from "@components/Table/TableHead";
import useConfirmation from "@hooks/useConfirmation";
import useNotification from "@hooks/useNotification";
import {
  ActionIcon,
  Button,
  Group,
  Pagination,
  ScrollArea,
  Table,
  Text,
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import usePayments from "@services/hooks/usePayments";
import { IconTrash } from "@tabler/icons";
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

function PaymentsTable({ data, page, onPageChange, total }: any) {
  const [opened, toggleOpened] = useToggle();
  const {
    showLoadingNotification,
    showSuccessNotification,
    showErrorNotification,
  } = useNotification();
  const { deletePayment } = usePayments();

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

  const rows = data?.map((item: any) => {
    return (
      <tr key={item._id}>
        <td>{item.salesman?.name}</td>
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
        <td>
          <FormattedMessage id={`payments.${item.paymentMethod}`} />
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

  const handleOpenDrawer = () => {
    toggleOpened(true);
  };

  return (
    <>
      <FormDrawer {...{ opened, toggleOpened }}>
        <ScrollArea
          style={{ height: "100%", paddingBottom: 60 }}
          scrollbarSize={2}>
          <PaymentsForm handleClose={() => toggleOpened(false)} />
        </ScrollArea>
      </FormDrawer>
      <Group position="right" mx={"xl"} my={"xl"}>
        <Button onClick={handleOpenDrawer} variant={"outline"}>
          <FormattedMessage id="payments.create" />
        </Button>
      </Group>

      <If
        condition={data?.length === 0}
        elseChildren={
          <ScrollArea>
            <Table verticalSpacing="sm" highlightOnHover>
              <TableHead data={tableHead} prefix="payments" />
              <tbody>{rows}</tbody>;
            </Table>
            <Pagination
              my={10}
              page={page}
              styles={(theme) => ({
                item: {
                  "&[data-active]": {
                    backgroundImage: theme.fn.gradient({
                      from: "red",
                      to: "yellow",
                    }),
                  },
                },
              })}
              total={total}
              onChange={onPageChange}
            />
          </ScrollArea>
        }>
        <EmptyBox />
      </If>
    </>
  );
}

export default memo(PaymentsTable);
