import TableHead from "@components/Table/TableHead";
import useConfirmation from "@hooks/useConfirmation";
import useNotification from "@hooks/useNotification";
import { Button, ScrollArea, Table } from "@mantine/core";
import useOrder from "@services/hooks/useOrder";
import { IconTrash } from "@tabler/icons";
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
        <td>{item?.salesman?.name}</td>
        <td>{item?.user?.name}</td>
        <td>{item?.total}</td>
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
          <IconTrash
            onClick={() => openDeleteModal(item._id, item.name)}
            style={{ color: "red", cursor: "pointer" }}
          />
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
