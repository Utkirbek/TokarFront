import FormattedLocalTime from "@components/FormattedLocalTime";
import TableHead from "@components/Table/TableHead";
import { Pagination, ScrollArea, Table } from "@mantine/core";
import { FormattedMessage } from "react-intl";

export const kassaLocaleUz = {
  title: "Kassa",
  cash: "Naqt",
  terminal: "Terminal",
  click: "Click",
  takeTime: "Olingan vaqti",
  giveTime: "Berish vaqti",
};

export const kassaLocaleEn = {
  title: "Cash",
  cash: "Cash",
  terminal: "Terminal",
  click: "Click",
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
      <td>{item?.cash}</td>
      <td>{item?.terminal}</td>
      <td>{item?.click}</td>
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
          <thead>
            <td>
              <FormattedMessage id="kassa.cash" />
            </td>
            <td>
              <FormattedMessage id="kassa.terminal" />
            </td>
            <td>
              <FormattedMessage id="kassa.click" />
            </td>
            <td>
              <FormattedMessage id="kassa.takeTime" />
            </td>
            <td>
              <FormattedMessage id="kassa.giveTime" />
            </td>
          </thead>
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
