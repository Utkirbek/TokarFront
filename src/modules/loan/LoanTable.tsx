import TableHead from "@components/Table/TableHead";
import { ScrollArea, Table, Text } from "@mantine/core";
import { FormattedDate, FormattedMessage, FormattedTime } from "react-intl";

export default function LoanTable({ data }: any) {
  return (
    <ScrollArea>
      <Table style={{ marginTop: 70 }}>
        <TableHead
          data={{
            user: true,
            order: true,
            amount: true,
            amalar: true,
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
                      <FormattedMessage id="loans.foydalanuvchi" />
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
