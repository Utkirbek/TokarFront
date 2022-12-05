import If from "@components/smart/If";
import TableHead from "@components/Table/TableHead";
import useConfirmation from "@hooks/useConfirmation";
import useNotification from "@hooks/useNotification";
import {
  ActionIcon,
  Button,
  Pagination,
  ScrollArea,
  Table,
} from "@mantine/core";
import useOrder from "@services/hooks/useOrder";
import { IconTrash } from "@tabler/icons";
import { Permissions } from "@utils/constants";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormattedDate, FormattedMessage, FormattedTime } from "react-intl";

import OrdersDetails from "../modalOrder/Orderdetail";
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
            className={classes.orderUserLink}>
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
        <td className={classes.orderTD}>
          <FormattedDate
            value={item?.createdAt}
            month="numeric"
            year="numeric"
            day="numeric"
          />
          ,&nbsp;
          <FormattedTime value={item?.createdAt} />
        </td>
        <td className={classes.orderTD}>
          <FormattedDate
            value={item?.updatedAt}
            month="numeric"
            year="numeric"
            day="numeric"
          />
          ,&nbsp;
          <FormattedTime value={item?.updatedAt} />
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
            }}>
            <FormattedMessage id="more" />
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <ScrollArea>
      <Table verticalSpacing="sm" highlightOnHover>
        <TableHead
          data={{
            ordersSalesmen: true,
            orderUser: true,
            paymentOrder: true,
            createOrder: true,
            updateOrder: true,
            orderAction: true,
          }}
          prefix="orders"
        />
        <tbody>{rows}</tbody>
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
      <OrdersDetails orders={dataorder} />
    </ScrollArea>
  );
};

export default OrdersTable;
