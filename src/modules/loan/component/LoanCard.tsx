import If from "@components/smart/If";
import { Box, Button, Grid, SimpleGrid, Text } from "@mantine/core";
import { Permissions } from "@utils/constants";
import Link from "next/link";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";

import useLoanStyles from "./loanStyle";

function LoanCard({ data }: { data: any }) {
  const router = useRouter();

  const { classes } = useLoanStyles();

  return (
    <SimpleGrid
      cols={4}
      spacing="md"
      breakpoints={[
        { maxWidth: 980, cols: 4, spacing: "sm" },
        { maxWidth: 780, cols: 3, spacing: "xs" },
        { maxWidth: 620, cols: 2, spacing: "xs" },
        { maxWidth: 420, cols: 1, spacing: "xs" },
      ]}
    >
      {data.map((item: any) => {
        return (
          <Box className={classes.LoanCardBox} key={item._id}>
            <Box style={{ paddingTop: "8px" }}>
              <Box style={{ display: "flex", justifyContent: "space-between" }}>
                <Link href={`/users?details=${item?.user?._id}`}>
                  <Text size={13}>{item?.user?.name}</Text>
                </Link>
              </Box>
              <Text mt={20}>
                <FormattedMessage id="loans.allLoans" /> {item?.amount}
              </Text>
              <Box style={{ display: "flex", justifyContent: "space-between" }}>
                <Box></Box>
                <Button
                  variant="outline"
                  mt={15}
                  onClick={() => {
                    router.push("/loans", {
                      query: {
                        details: item._id,
                      },
                    });
                  }}
                >
                  <FormattedMessage id="more" />
                </Button>
              </Box>
            </Box>
          </Box>
        );
      })}
    </SimpleGrid>
  );
}

export default LoanCard;
