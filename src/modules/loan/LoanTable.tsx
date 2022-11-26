import TableHead from "@components/Table/TableHead";
import { Button, ScrollArea, Table, Text } from "@mantine/core";
import Link from "next/link";
import router from "next/router";
import { memo } from "react";
import { FormattedDate, FormattedMessage, FormattedTime } from "react-intl";

import LoanBatafsil from "./batafsil/LoanBatafsil";

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
                  <Link
                    href={`/users?details=${item?.user?._id}`}
                    style={{
                      borderBottom: "1px solid #1983FF",
                      textDecoration: "none",
                    }}
                  >
                    {item.user === null ? (
                      <Text>
                        <FormattedMessage id="loans.userError" />
                      </Text>
                    ) : (
                      item.user?.name
                    )}
                  </Link>
                </td>
                <td>
                  <Link
                    href={`/users?details=${item?.user?._id}`}
                    style={{
                      borderBottom: "1px solid #1983FF",
                      textDecoration: "none",
                    }}
                  >
                    {item.amount}
                  </Link>
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
                <td>
                  <Button
                    variant="outline"
                    onClick={() => {
                      router.push("/loan", {
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
          })}
        </tbody>
      </Table>
      <LoanBatafsil loan={data} />
    </ScrollArea>
  );
}
export default memo(LoanTable);
