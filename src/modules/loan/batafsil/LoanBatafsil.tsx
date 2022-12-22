import FormattedLocalTime from "@components/FormattedLocalTime";
import { Affix, Box, Button, Image, Modal, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconUser } from "@tabler/icons";
import { useRouter } from "next/router";
import queryString from "query-string";
import { FormattedMessage } from "react-intl";

import useLoanStyles from "../component/loanStyle";

type Props = {
  loan?: any;
};

const LoanBatafsil = ({ loan }: Props) => {
  const router = useRouter();
  const { classes, cx } = useLoanStyles();
  const isMobile = useMediaQuery("(max-width: 950px)");

  const query = queryString.parse(router.asPath.split("?")[1]);
  const item = findItem(loan, query.details as string);
  return (
    <Modal
      size="85%"
      fullScreen={isMobile}
      opened={!!item}
      onClose={() => router.back()}
    >
      <Box className={classes.loanAllDisplay}>
        <Box className={classes.loanItemGroup}>
          <Box className={classes.loanImageBox}>
            {item?.image ? (
              <Image
                src={item?.image}
                alt={"Bu yerda foydalanuvchi rasmi"}
                width="100%"
              />
            ) : (
              <IconUser size={230} style={{ width: "100%" }} />
            )}
          </Box>

          <Box className={classes.left}>
            <Text className={classes.titleHead}>
              {item?.user === null ? (
                <Text>
                  <FormattedMessage id="loans.userError" />
                </Text>
              ) : (
                <Text>
                  {item?.user?.name}{" "}
                  <FormattedMessage id="users.userDts.title" />
                </Text>
              )}
            </Text>
            <Box className={classes.boxFlex}>
              <Text className={classes.text}>
                <FormattedMessage id="users.userDts.name" />
              </Text>
              <Text className={classes.textStart}>
                {item?.user === null ? (
                  <Text>
                    <FormattedMessage id="loans.userError" />
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
              <a href={`tel://${item?.user?.phone}`}>
                {item?.user === null ? (
                  <Text className={classes.textStart}>
                    <FormattedMessage id="loans.userError" />
                  </Text>
                ) : (
                  <Text className={classes.textStart}>{item?.user?.phone}</Text>
                )}
              </a>
            </Box>
            <Box className={classes.boxFlex}>
              <Text className={classes.text}>
                <FormattedMessage id="users.userDts.origin" />
              </Text>
              <Text className={classes.textStart}>
                {item?.user === null ? (
                  <Text className={classes.textStart}>
                    <FormattedMessage id="loans.userError" />
                  </Text>
                ) : (
                  <Text className={classes.textStart}>
                    {item?.user?.workplace}
                  </Text>
                )}
              </Text>
            </Box>
            <Box className={classes.boxFlex}>
              <Text className={classes.text}>
                <FormattedMessage id="users.userDts.addition" />
              </Text>
              {item?.user === null ? (
                <Text className={classes.textStart}>
                  <FormattedMessage id="loans.userError" />
                </Text>
              ) : (
                <Text className={classes.textStart}>{item?.user?.extra}</Text>
              )}
            </Box>
            <Box className={classes.boxFlex}>
              <Text className={classes.text}>
                <FormattedMessage id="users.userDts.amount" />
              </Text>
              <Text className={classes.textStart}>{item?.amount}</Text>
            </Box>
            <Box className={classes.boxFlex}>
              <Text className={classes.text}>
                <FormattedMessage id="users.userDts.oldTime" />
              </Text>
              <Text className={classes.textStart}>
                <FormattedLocalTime date={item?.user?.createdAt} />
              </Text>
            </Box>
            <Box className={classes.boxFlex}>
              <Text className={classes.text}>
                <FormattedMessage id="users.userDts.newTime" />
              </Text>
              <Text className={classes.textStart}>
                <FormattedLocalTime date={item?.user?.updatedAt} />
              </Text>
            </Box>
            <Box className={classes.boxFlex}>
              <Text className={classes.text}>
                <FormattedMessage id="users.userDts.shouldPay" />
              </Text>
              <Text className={classes.textStart}>
                <FormattedLocalTime date={item?.user?.shouldPay} />
              </Text>
            </Box>
          </Box>
        </Box>

        <Box className={classes.modalBtn}>
          <Button onClick={() => router.back()} fullWidth>
            <FormattedMessage id="backTo" />
          </Button>
        </Box>
      </Box>
    </Modal>
  );
};

export default LoanBatafsil;

const findItem = (loan: any[], id: any) => {
  return loan?.find((item: any) => item._id === id);
};
