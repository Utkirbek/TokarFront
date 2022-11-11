import { Table } from "@mantine/core";
import { FormattedDate, FormattedMessage, FormattedTime } from "react-intl";

type Props = {
  data?: any;
};

function KassaTable({ data }: Props) {
  const rows = data.map((item: any) => (
    <tr key={item._id}>
      <td>{item.amount}</td>
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
      <thead>
        <tr>
          <th>
            <FormattedMessage id="kassaTable.narxi" />
          </th>
          <th>
            <FormattedMessage id="kassaTable.olinganVaqt" />
          </th>
          <th>
            <FormattedMessage id="kassaTable.olinganBerish" />
          </th>
        </tr>
      </thead>
      <tbody>{rows}</tbody>
    </Table>
  );
}

export default KassaTable;
