import FormattedLocalTime from "@components/FormattedLocalTime";
import TableHead from "@components/Table/TableHead";
import { Box, Button, Group, Modal, Table, Text } from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { useRouter } from "next/router";
import queryString from "query-string";
import { FormattedMessage } from "react-intl";

import useAdminStyles from "../AdminStyle";

type Props = {
  admins?: any;
};

const AdminsDetails = ({ admins }: Props) => {
  const router = useRouter();
  const { classes } = useAdminStyles();

  const query = queryString.parse(router.asPath.split("?")[1]);
  const item = findItem(admins, query.details as string);
  const isMobile = useMediaQuery("(max-width: 950px)");

  const rowDetail = item?.salary_record.map((prodItem: any) => {
    return (
      <tr key={item._id}>
        <td>{prodItem?.amount}</td>
        <td>
          <FormattedLocalTime date={prodItem?.data} />
        </td>
      </tr>
    );
  });

  return (
    <Modal
      size="85%"
      fullScreen={isMobile}
      opened={!!item}
      onClose={() => router.back()}
    >
      <Box className={classes.adminAllDisplay}>
        <Text className={classes.adminTitleHead}>
          {item?.name}
          <FormattedMessage id="admins.adminTitle" />
        </Text>
        <Box className={classes.adminBoxFlex}>
          <Text className={classes.adminText}>
            <FormattedMessage id="orders.ordersSalesmen" />
          </Text>
          <Text className={classes.adminTextStart}>{item?.name}</Text>
        </Box>
        <Box className={classes.adminBoxFlex}>
          <Text className={classes.adminText}>
            <FormattedMessage id="admins.salary_percent" />
          </Text>
          <Text className={classes.adminTextStart}>
            {item?.salary_percent}%
          </Text>
        </Box>
        <Box className={classes.adminBoxFlex}>
          <Text className={classes.adminText}>
            <FormattedMessage id="admins.giveSalary" />
          </Text>
          <Text className={classes.adminTextStart}>{item?.earned_salary}</Text>
        </Box>
        <Box className={classes.adminBoxFlex}>
          <Text className={classes.adminText}>
            <FormattedMessage id="admins.email" />
          </Text>
          <Text className={classes.adminTextStart}>{item?.email}</Text>
        </Box>
        <Box className={classes.adminBoxFlex}>
          <Text className={classes.adminText}>
            <FormattedMessage id="admins.createdTime" />
          </Text>
          <Text className={classes.adminTextStart}>
            <FormattedLocalTime date={item?.createdAt} />
          </Text>
        </Box>
        <Box className={classes.adminBoxFlex}>
          <Text className={classes.adminText}>
            <FormattedMessage id="orders.newTime" />
          </Text>
          <Text className={classes.adminTextStart}>
            <FormattedLocalTime date={item?.updatedAt} />
          </Text>
        </Box>

        <Group position="center" my={10}>
          <Text sx={{ fontSize: "32px", color: "#1972C2" }}>
            <FormattedMessage id="admins.salaryInfo" />
          </Text>
        </Group>
        <Box
          sx={{
            width: "100%",
            margin: "0 auto",
          }}
        >
          <Table
            verticalSpacing="sm"
            highlightOnHover
            className={classes.tableAdminMedia}
          >
            <TableHead
              data={{
                getSalary: true,
                timeGetSalary: true,
              }}
              prefix="admins"
            />
            <tbody>{rowDetail}</tbody>
          </Table>
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

export default AdminsDetails;

const findItem = (admins: any[], id: any) => {
  return admins?.find((item: any) => item._id === id);
};
