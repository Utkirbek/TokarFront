import EmptyBox from "@assets/icons/EmptyBox/EmptyBox";
import FormDrawer from "@components/Drawer/FormDrawer";
import FormattedLocalTime from "@components/FormattedLocalTime";
import If from "@components/smart/If";
import TableHead from "@components/Table/TableHead";
import useConfirmation from "@hooks/useConfirmation";
import useNotification from "@hooks/useNotification";
import {
  ActionIcon,
  Affix,
  Box,
  Button,
  Group,
  Pagination,
  ScrollArea,
  Table,
  Text,
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import usePayments from "@services/hooks/usePayments";
import { IconPlus, IconTrash } from "@tabler/icons";
import { memo } from "react";
import { FormattedMessage } from "react-intl";

import PaymentsForm from "./PaymentForm";
import useStyles from "./paymentStyle";

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
  const { classes } = useStyles();

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
          <FormattedLocalTime date={item?.createdAt} />
        </td>
        <td>
          <FormattedLocalTime date={item?.updatedAt} />
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
      <FormDrawer
        {...{ opened, toggleOpened }}
        title={<FormattedMessage id="payments.formTitle" />}
      >
        <ScrollArea
          style={{ height: "100%", paddingBottom: 60 }}
          scrollbarSize={2}
        >
          <PaymentsForm handleClose={() => toggleOpened(false)} />
        </ScrollArea>
      </FormDrawer>
      <Box className={classes.paymentsAdd}>
        <Group position="right" mx={"xl"} my={"xl"}>
          <Button onClick={handleOpenDrawer} variant={"outline"}>
            <FormattedMessage id="payments.create" />
          </Button>
        </Group>
      </Box>
      <Affix position={{ bottom: 60, right: 20 }}>
        <Box className={classes.paymentsAddIcon} onClick={handleOpenDrawer}>
          <IconPlus size={25} color={"#fff"} />
        </Box>
      </Affix>
      <If
        condition={data?.length === 0}
        elseChildren={
          <ScrollArea>
            <Table miw={800} verticalSpacing="sm" highlightOnHover>
              <TableHead data={tableHead} prefix="payments" />
              <tbody>{rows}</tbody>
            </Table>
          </ScrollArea>
        }
      >
        <EmptyBox />
      </If>
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
    </>
  );
}

export default memo(PaymentsTable);
