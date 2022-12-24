import EmptyBox from "@assets/icons/EmptyBox/EmptyBox";
import FormattedLocalTime from "@components/FormattedLocalTime";
import TableHead from "@components/Table/TableHead";
import { Pagination, ScrollArea, Table } from "@mantine/core";

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
  if (datakassa?.length === 0) return <EmptyBox />;

  const rows = datakassa?.map((item: any) => (
    <tr key={item?._id}>
      <td>{item?.amount}</td>
      <td>
        <FormattedLocalTime date={item?.createdAt} />
      </td>
      <td>
        <FormattedLocalTime date={item?.updatedAt} />
      </td>
    </tr>
  ));

  return (
    <>
      <ScrollArea>
        <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
          <TableHead
            data={{
              price: true,
              takeTime: true,
              giveTime: true,
            }}
            prefix={"kassa"}
          />
          <tbody>{rows}</tbody>
        </Table>
      </ScrollArea>
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

export default KassaTable;
