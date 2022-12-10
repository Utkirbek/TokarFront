import TableHead from "@components/Table/TableHead";
import { Pagination, Table } from "@mantine/core";
import { FormattedDate,  FormattedTime } from "react-intl";

export const kassaLocaleUz = {
  title: "Kassa",
  price: "Kassadagi pul",
  takeTime: "Olingan vaqti",
  giveTime: "Berish vaqti",
};

export const kassaLocaleEn = {
  title: "Cash",
  price: "Price",
  takeTime: "Taken time",
  giveTime: "Give time",
};

function KassaTable({
  datakassa,
  page,
  onPageChange,
  total,
}: {
  datakassa: any;
  page: number;
  onPageChange: (page: number) => void;
  total: number;
}) {
  const rows = datakassa?.map((item: any) => (
    <tr key={item?._id}>
      <td>{item?.amount}</td>
      <td>
        <FormattedTime value={item?.createdAt} />
        ,&nbsp;
        <FormattedDate
          value={item?.createdAt}
          month="numeric"
          year="numeric"
          day="numeric"
        />
      </td>
      <td>
        <FormattedTime value={item.updatedAt} />
        ,&nbsp;
        <FormattedDate
          value={item.updatedAt}
          month="numeric"
          year="numeric"
          day="numeric"
        />
      </td>
    </tr>
  ));

  return (
    <Table>
      <TableHead
        data={{
          price: true,
          takeTime: true,
          giveTime: true,
        }}
        prefix={"kassa"}
      />
      <tbody>{rows}</tbody>

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
    </Table>
  );
}

export default KassaTable;
