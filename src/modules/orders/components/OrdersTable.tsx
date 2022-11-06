import { Button, ScrollArea, Table } from "@mantine/core";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";

import tableNameData from "../const/tableTitleName";

type Props = {
  data?: any;
};

const OrdersTable = ({ data }: Props) => {
  const router = useRouter();

  const rows = data.map((item: any) => {
    return (
      <tr key={item._id}>
        <td>{item?.salesman?.name}</td>
        <td>{item?.user?.name}</td>
        <td>{item?.total}</td>
        <td>{item?.user?.workplace}</td>
        <td>{item?.createdAt}</td>
        <td
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Button
            variant="outline"
            sx={{ width: "100px", height: "30px" }}
            radius={"xl"}
            onClick={() => {
              router.push("/orders", {
                query: {
                  details: item._id,
                },
              });
            }}
          >
            <FormattedMessage id="products.details" />
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm" highlightOnHover>
        <thead>
          <tr>
            <th>{tableNameData?.salesman}</th>
            <th>{tableNameData?.user}</th>
            <th>{tableNameData?.total}</th>
            <th>{tableNameData?.origin}</th>
            <th>{tableNameData?.time}</th>
            <th>{tableNameData?.action}</th>
          </tr>
        </thead>
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};

export default OrdersTable;
