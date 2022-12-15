import FormattedLocalTime from "@components/FormattedLocalTime";
import TableHead from "@components/Table/TableHead";
import {
  Box,
  Button,
  Card,
  Pagination,
  ScrollArea,
  Table,
  Text,
} from "@mantine/core";
import Link from "next/link";
import router from "next/router";
import { memo } from "react";
import { FormattedMessage } from "react-intl";

import LoanBatafsil from "./batafsil/LoanBatafsil";
import LoanCard from "./component/LoanCard";
import useLoanStyles from "./component/loanStyle";

function LoanTable({
  dataloan,
  page,
  onPageChange,
  total,
}: {
  dataloan: any;
  page: number;
  onPageChange: (page: number) => void;
  total: number;
}) {
  const { classes, cx } = useLoanStyles();
  return (
    <ScrollArea style={{ marginBottom: "30%" }}>
      <Table className={classes.loanTable}>
        <TableHead
          data={{
            user: true,
            order: true,
            amount: true,
            shouldPay: true,
            details: true,
          }}
          prefix={"loans"}
        />
        <tbody>
          {dataloan?.map((item: any) => {
            return (
              <tr key={item._id}>
                <td className={classes.loanUserLink}>
                  <Link href={`/users?details=${item?.user?._id}`}>
                    {item.user === null ? (
                      <Text>
                        <FormattedMessage id="loans.userError" />
                      </Text>
                    ) : (
                      item.user?.name
                    )}
                  </Link>
                </td>
                <td className={classes.loanUserLink}>
                  <Link href={`/users?details=${item?.user?._id}`}>
                    {item.amount}
                  </Link>
                </td>
                <td className={classes.LoanTime}>
                  <FormattedLocalTime date={item?.updatedAt} />
                </td>
                <td className={classes.LoanTime}>
                  <FormattedLocalTime date={item?.shouldPay} />
                </td>
                <td>
                  <Button
                    className={classes.loanBtn}
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
      <Box className={classes.loanCard}>
        <LoanCard data={dataloan} />
      </Box>
      <LoanBatafsil loan={dataloan} />
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
}
export default memo(LoanTable);
