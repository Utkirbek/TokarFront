import FormattedLocalTime from "@components/FormattedLocalTime";
import TableHead from "@components/Table/TableHead";
import { Pagination, ScrollArea, Table } from "@mantine/core";

const ProfitTable: React.FC<{
  dataProfit: any;
  page: number;
  onPageChange: (page: number) => void;
  total: number;
}> = ({ dataProfit, page, onPageChange, total }) => {
  const rows = dataProfit?.map((item: any) => {
    return (
      <tr key={item._id}>
        <td>{item?.shop.name}</td>
        <td>{item?.amount.toFixed(2)}</td>
        <td>
          <FormattedLocalTime date={item?.createdAt} />
        </td>
        <td>
          <FormattedLocalTime date={item?.updatedAt} />
        </td>
      </tr>
    );
  });

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm" highlightOnHover>
        <TableHead
          data={{
            shopName: true,
            amount: true,
            createdAt: true,
            updatedAt: true,
          }}
          prefix={"profit"}
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
    </ScrollArea>
  );
};

export default ProfitTable;
