import FormattedLocalTime from "@components/FormattedLocalTime";
import TableHead from "@components/Table/TableHead";
import {
  Avatar,
  Box,
  Image,
  Modal,
  ScrollArea,
  Table,
  Text,
} from "@mantine/core";
import userFetcher from "@services/api/userFetcher";
import { RequestQueryKeys } from "@utils/constants";
import { useRouter } from "next/router";
import queryString from "query-string";
import { FormattedMessage } from "react-intl";
import useSWR from "swr";

import useDetailstyles from "./useDetailstyles";

const UserDetails = () => {
  const router = useRouter();
  const { classes } = useDetailstyles();

  const query = queryString.parse(router.asPath.split("?")[1]);
  const userDetail = useSWR(
    !!query.details ? [RequestQueryKeys.userId, query.details] : null,
    (_, id) => {
      return userFetcher.getUsersId(id as string);
    }
  );
  const { data: userBatfsil } = userDetail;
  const rowDetail = userBatfsil?.loans.map((item: any) => {
    return (
      <tr key={item._id}>
        <td>
          <Avatar
            src={item?.product?.image ? `${item?.product?.image}` : ""}
            alt="it's me"
          />
        </td>
        <td>{item?.amount}</td>
        <td>
          <FormattedLocalTime date={item?.createdAt} />
        </td>
        <td>
          <FormattedLocalTime date={item?.shouldPay} />
        </td>
        <td>
          <FormattedLocalTime date={item?.updatedAt} />
        </td>
      </tr>
    );
  });

  return (
    <Modal size={"85%"} opened={!!userBatfsil} onClose={() => router.back()}>
      <Box className={classes.allDisplay}>
        <Box className={classes.itemGroup}>
          <Box className={classes.imageBox}>
            <Image
              src={
                userBatfsil?.user?.image
                  ? `${userBatfsil?.user?.image}`
                  : "https://avatars.githubusercontent.com/u/116545667?s=400&u=a38f7d2eb1a58cdc1b7b004d17647db8aefd9d51&v=4"
              }
              alt={"Bu yerda foydalanuvchi rasmi"}
              style={{
                objectFit: "cover",
                borderRadius: "15px",
              }}
              width="100%"
              height="45vh"
              radius="md"
            />
          </Box>

          <Box className={classes.left}>
            <Text className={classes.titleHead}>
              {userBatfsil?.user.name === null ? (
                <Text>
                  <FormattedMessage id="loans.foydalanuvchi" />
                </Text>
              ) : (
                userBatfsil?.user?.name
              )}
              <FormattedMessage id="users.userDts.title" />
            </Text>
            <Box className={classes.boxHeader}>
              <Box className={classes.boxFlex}>
                <Text className={classes.text}>
                  <FormattedMessage id="users.userDts.phone" />
                </Text>
                <Text className={classes.textStart}>
                  {userBatfsil?.user?.phone}
                </Text>
              </Box>
              <Box className={classes.boxFlex}>
                <Text className={classes.text}>
                  <FormattedMessage id="users.userDts.origin" />
                </Text>
                <Text className={classes.textStart}>
                  {userBatfsil?.user?.workplace}
                </Text>
              </Box>
              <Box className={classes.boxFlex}>
                <Text className={classes.text}>
                  <FormattedMessage id="users.userDts.addition" />
                </Text>
                <Text className={classes.textStart}>
                  {userBatfsil?.user?.extra}
                </Text>
              </Box>
              <Box className={classes.boxFlex}>
                <Text className={classes.text}>
                  <FormattedMessage id="users.userDts.oldTime" />
                </Text>
                <Text className={classes.textStart}>
                  <FormattedLocalTime date={userBatfsil?.user.createdAt} />
                </Text>
              </Box>
              <Box className={classes.boxFlex}>
                <Text className={classes.text}>
                  <FormattedMessage id="users.userDts.newTime" />
                </Text>
                <Text className={classes.textStart}>
                  <FormattedLocalTime date={userBatfsil?.user.updatedAt} />
                </Text>
              </Box>
              <Box className={classes.boxFlex}>
                <Text className={classes.text}>
                  <FormattedMessage id="users.userDts.shouldPay" />
                </Text>
                <Text className={classes.textStart}>
                  <FormattedLocalTime date={userBatfsil?.user.shouldPay} />
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
        <ScrollArea style={{ marginTop: "20px" }}>
          <Table sx={{ minWidth: 700 }} verticalSpacing="sm" highlightOnHover>
            <TableHead
              data={{
                productPicture: true,
                debt: true,
                timeTaken: true,
                updatedTime: true,
                yourTime: true,
              }}
              prefix="users"
            />
            <tbody>{rowDetail}</tbody>
          </Table>
        </ScrollArea>
      </Box>
    </Modal>
  );
};

export default UserDetails;
