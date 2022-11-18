import TableHead from "@components/Table/TableHead";
import { ScrollArea, Table, Text } from "@mantine/core";
import { memo } from "react";
import { FormattedDate, FormattedMessage, FormattedTime } from "react-intl";

function LoanTable({ data }: any) {
  return (
    <ScrollArea>
      <Table style={{ marginTop: 70 }}>
        <TableHead
          data={{
            user: true,
            order: true,
            amount: true,
            shouldPay: true,
          }}
          prefix={"loans"}
        />
        <tbody>
          {data?.map((item: any) => {
            return (
              <tr key={item._id}>
                <td>
                  {item.user === null ? (
                    <Text>
                      <FormattedMessage id="loans.userError" />
                    </Text>
                  ) : (
                    item.user?.name
                  )}
                </td>
                <td>{item.amount}</td>
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
                <td>
                  <FormattedDate
                    value={item?.shouldPay}
                    month="numeric"
                    year="numeric"
                    day="numeric"
                  />
                  ,&nbsp;
                  <FormattedTime value={item?.shouldPay} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </ScrollArea>
  );
}
export default memo(LoanTable);
