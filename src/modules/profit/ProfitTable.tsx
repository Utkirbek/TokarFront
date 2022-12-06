import TableHead from "@components/Table/TableHead";
import { Pagination, ScrollArea, Table } from "@mantine/core";
import { FormattedDate, FormattedTime } from "react-intl";

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
        <td>{item?.amount}</td>
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
