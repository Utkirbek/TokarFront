import If from "@components/smart/If";
import TableHead from "@components/Table/TableHead";
import useConfirmation from "@hooks/useConfirmation";
import useNotification from "@hooks/useNotification";
import { ActionIcon, Button, ScrollArea, Table, Text } from "@mantine/core";
import useOrder from "@services/hooks/useOrder";
import { IconTrash } from "@tabler/icons";
import { Permissions } from "@utils/constants";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormattedDate, FormattedMessage, FormattedTime } from "react-intl";

import OrdersDetails from "../modalOrder/Orderdetail";

type Props = {
  data?: any;
};

const OrdersTable = ({ data }: Props) => {
  const router = useRouter();
  const {
    showLoadingNotification,
    showSuccessNotification,
    showErrorNotification,
  } = useNotification();
  const { openConfirm } = useConfirmation();

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

  const rows = data.map((item: any) => {
    return (
      <tr key={item._id}>
        <td>
          <Link
            href={`/admins`}
            style={{
              borderBottom: "1px solid #1983FF",
              textDecoration: "none",
            }}
          >
            {item?.salesman === null ? (
              <FormattedMessage id="orders.userNull" />
            ) : (
              item?.salesman?.name
            )}
          </Link>
        </td>
        <td>
          <Link
            href={`/users?details=${item?.user?._id}`}
            style={{
              borderBottom: "1px solid #1983FF",
              textDecoration: "none",
            }}
          >
            {item?.user === null ? (
              <FormattedMessage id="orders.userNull" />
            ) : (
              item?.user?.name
            )}
          </Link>
        </td>
        <td>
          <Link
            href={`/payments`}
            style={{
              borderBottom: "1px solid #1983FF",
              textDecoration: "none",
            }}
          >
            {item?.total}
          </Link>
        </td>
        <td>
          <FormattedDate
            value={item?.createdAt}
            month="numeric"
            year="numeric"
            day="numeric"
          />
          ,&nbsp;
          <FormattedTime value={item?.createdAt} />
        </td>
        <td>
          <FormattedDate
            value={item?.updatedAt}
            month="numeric"
            year="numeric"
            day="numeric"
          />
          ,&nbsp;
          <FormattedTime value={item?.updatedAt} />
        </td>
        <td
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
          }}
        >
          <If hasPerm={Permissions.orders.delete}>
            <ActionIcon>
              <IconTrash
                onClick={() => openDeleteModal(item._id, item.name)}
                style={{ color: "red", cursor: "pointer" }}
              />
            </ActionIcon>
          </If>
          <Button
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
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm" highlightOnHover>
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
      <OrdersDetails orders={data} />
    </ScrollArea>
  );
};

export default OrdersTable;
