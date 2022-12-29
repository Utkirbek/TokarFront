import FormattedLocalTime from "@components/FormattedLocalTime";
import If from "@components/smart/If";
import TableHead from "@components/Table/TableHead";
import useConfirmation from "@hooks/useConfirmation";
import useNotification from "@hooks/useNotification";
import { ActionIcon, Box, Button, Pagination, Table } from "@mantine/core";
import useOrder from "@services/hooks/useOrder";
import { IconTrash } from "@tabler/icons";
import { Permissions } from "@utils/constants";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";

import OrdersDetails from "../modalOrder/Orderdetail";
import OrderCard from "./OrderCard";
import useStyles from "./orderStyle";

const OrdersTable = ({
  dataorder,
  page,
  onPageChange,
  total,
}: {
  dataorder: any;
  page: number;
  onPageChange: (page: number) => void;
  total: number;
}) => {
  const router = useRouter();
  const {
    showLoadingNotification,
    showSuccessNotification,
    showErrorNotification,
  } = useNotification();
  const { openConfirm } = useConfirmation();
  const { classes, cx } = useStyles();
  const { deleteOrder } = useOrder();

  const handleDelete = async function (id: string) {
    deleteOrder(id, {
      onSuccess: () => {
        showSuccessNotification();
      },
      onError: () => {
        showErrorNotification();
      },
    });
  };

  const openDeleteModal = (id: string, name: string) =>
    openConfirm(null, {
      onConfirm: async () => {
        showLoadingNotification();
        handleDelete(id);
      },
      onCancel: () => {
        showSuccessNotification();
      },
    });

  const rows = dataorder?.map((item: any) => {
    return (
      <tr key={item._id}>
        <td className={classes.orderTD}>
          <Link href={`/admins`} className={classes.orderUserLink}>
            {item?.salesman === null ? (
              <FormattedMessage id="orders.userNull" />
            ) : (
              item?.salesman?.name
            )}
          </Link>
        </td>

        <td className={classes.orderTD}>
          <Link
            href={`/users?details=${item?.user?._id || item?.user}`}
            className={classes.orderUserLink}
          >
            {item?.user ? (
              item?.user?.name || item?.user
            ) : (
              <FormattedMessage id="orders.userNull" />
            )}
          </Link>
        </td>
        <td className={classes.orderTD}>
          <Link href={`/payments`} className={classes.orderUserLink}>
            {item?.total.toFixed(2)}
          </Link>
        </td>
        <td className={classes.orderTD}>{item.code}</td>
        <td className={classes.orderTD}>
          <FormattedLocalTime date={item?.createdAt} />
        </td>
        <If hasPerm={Permissions.orders.delete}>
          <td>
            <ActionIcon>
              <IconTrash
                onClick={() => openDeleteModal(item._id, item.name)}
                className={classes.orderTrash}
              />
            </ActionIcon>
          </td>
        </If>
        <td>
          <Button
            className={classes.orderBtn}
            variant="outline"
            onClick={() => {
              router.push("/orders", {
                query: {
                  details: item._id,
                },
              });
            }}
          >
            <FormattedMessage id="more" />
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <>
      <Box className={classes.orderTable}>
        <Table sx={{ minWidth: 950 }} verticalSpacing="sm" highlightOnHover>
          <TableHead
            data={{
              ordersSalesmen: true,
              orderUser: true,
              paymentOrder: true,
              code: true,
              createOrder: true,
              orderAction: true,
            }}
            prefix="orders"
            permissionOf="no-check"
          />
          <tbody>{rows}</tbody>
        </Table>
      </Box>
      <Box className={classes.orderCard}>
        <OrderCard data={dataorder} openDeleteModal={openDeleteModal} />
      </Box>
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
        style={{ marginBottom: 50 }}
        total={total}
        size="sm"
        onChange={onPageChange}
      />
      <OrdersDetails orders={dataorder} />
    </>
  );
};

export default OrdersTable;
