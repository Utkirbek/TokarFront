import { Box, Image, Modal, Text } from "@mantine/core";
import useStyles from "@modules/products/components/ProductsTable/styles";
import { IconUser, IconUserOff } from "@tabler/icons";
import { useRouter } from "next/router";
import queryString from "query-string";
import { FormattedDate, FormattedMessage, FormattedTime } from "react-intl";

type Props = {
  loan?: any;
};

const LoanBatafsil = ({ loan }: Props) => {
  const router = useRouter();
  const { classes, cx } = useStyles();

  const query = queryString.parse(router.asPath.split("?")[1]);
  const item = findItem(loan, query.details as string);

  return (
    <Modal size={"85%"} opened={!!item} onClose={() => router.back()}>
      <Box className={classes.allDisplay}>
        <Box className={classes.itemGroup}>
          <Box className={classes.imageBox}>
            {item?.image ? (
              <Image
                src={item?.image}
                alt={"Bu yerda foydalanuvchi rasmi"}
                width="100%"
              />
            ) : (
              <IconUser size={380} />
            )}
          </Box>

          <Box className={classes.left}>
            <Text className={classes.titleHead}>
              {item?.user === null ? (
                <Text>
                  <FormattedMessage id="loans.foydalanuvchi" />
                </Text>
              ) : (
                item?.user?.name
              )}
              <FormattedMessage id="users.userDts.title" />
            </Text>
            <Box className={classes.boxHeader}>
              <Box className={classes.boxFlex}>
                <Text className={classes.text}>
                  <FormattedMessage id="users.userDts.name" />
                </Text>
                <Text className={classes.textStart}>
                  {item?.user === null ? (
                    <Text>
                      <FormattedMessage id="loans.foydalanuvchi" />
                    </Text>
                  ) : (
                    item?.user?.name
                  )}
                </Text>
              </Box>
              <Box className={classes.boxFlex}>
                <Text className={classes.text}>
                  <FormattedMessage id="users.userDts.phone" />
                </Text>
                <Text className={classes.textStart}>{item?.user?.phone}</Text>
              </Box>
              <Box className={classes.boxFlex}>
                <Text className={classes.text}>
                  <FormattedMessage id="users.userDts.origin" />
                </Text>
                <Text className={classes.textStart}>
                  {item?.user?.workplace}
                </Text>
              </Box>
              <Box className={classes.boxFlex}>
                <Text className={classes.text}>
                  <FormattedMessage id="users.userDts.addition" />
                </Text>
                <Text className={classes.textStart}>{item?.user?.extra}</Text>
              </Box>
              <Box className={classes.boxFlex}>
                <Text className={classes.text}>
                  <FormattedMessage id="users.userDts.oldTime" />
                </Text>
                <Text className={classes.textStart}>
                  <FormattedDate
                    value={item?.user?.createdAt}
                    month="numeric"
                    year="numeric"
                    day="numeric"
                  />
                  ,&nbsp;
                  <FormattedTime value={item?.user?.createdAt} />
                </Text>
              </Box>
              <Box className={classes.boxFlex}>
                <Text className={classes.text}>
                  <FormattedMessage id="users.userDts.newTime" />
                </Text>
                <Text className={classes.textStart}>
                  <FormattedDate
                    value={item?.user?.updatedAt}
                    month="numeric"
                    year="numeric"
                    day="numeric"
                  />
                  ,&nbsp;
                  <FormattedTime value={item?.user?.updatedAt} />
                </Text>
              </Box>
              <Box className={classes.boxFlex}>
                <Text className={classes.text}>
                  <FormattedMessage id="users.userDts.shouldPay" />
                </Text>
                <Text className={classes.textStart}>
                  <FormattedDate
                    value={item?.shouldPay}
                    month="numeric"
                    year="numeric"
                    day="numeric"
                  />
                  ,&nbsp;
                  <FormattedTime value={item?.shouldPay} />
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default LoanBatafsil;

const findItem = (loan: any[], id: any) => {
  return loan?.find((item: any) => item._id === id);
};
