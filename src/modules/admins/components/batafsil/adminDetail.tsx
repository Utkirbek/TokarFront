import TableHead from "@components/Table/TableHead";
import { Box, Group, Modal, ScrollArea, Table, Text } from "@mantine/core";
import useStyles from "@modules/products/components/ProductsTable/styles";
import { useRouter } from "next/router";
import queryString from "query-string";
import { FormattedDate, FormattedMessage, FormattedTime } from "react-intl";

type Props = {
  admins?: any;
};

const AdminsDetails = ({ admins }: Props) => {
  const router = useRouter();
  const { classes, cx } = useStyles();

  const query = queryString.parse(router.asPath.split("?")[1]);
  const item = findItem(admins, query.details as string);

  const rowDetail = item?.salary_record.map((prodItem: any) => {
    return (
      <tr key={item._id}>
        <td>{prodItem?.amount}</td>
        <td>
          <FormattedDate
            value={prodItem?.date}
            month="numeric"
            year="numeric"
            day="numeric"
          />
          ,&nbsp;
          <FormattedTime value={prodItem?.date} />
        </td>
      </tr>
    );
  });

  return (
    <Modal size={"85%"} opened={!!item} onClose={() => router.back()}>
      <Box className={classes.allDisplay}>
        <Box className={classes.itemGroup}>
          <Box className={classes.left}>
            <Text className={classes.titleHead}>
              {item?.name}
              <FormattedMessage id="admins.adminTitle" />
            </Text>
            <Box className={classes.boxHeader}>
              <Box className={classes.boxFlex}>
                <Text className={classes.text}>
                  <FormattedMessage id="orders.ordersSalesmen" />
                </Text>
                <Text className={classes.textStart}>{item?.name}</Text>
              </Box>
              <Box className={classes.boxFlex}>
                <Text className={classes.text}>
                  <FormattedMessage id="admins.salary_percent" />
                </Text>
                <Text className={classes.textStart}>
                  {item?.salary_percent}%
                </Text>
              </Box>
              <Box className={classes.boxFlex}>
                <Text className={classes.text}>
                  <FormattedMessage id="admins.giveSalary" />
                </Text>
                <Text className={classes.textStart}>{item?.earned_salary}</Text>
              </Box>
              <Box className={classes.boxFlex}>
                <Text className={classes.text}>
                  <FormattedMessage id="admins.email" />
                </Text>
                <Text className={classes.textStart}>{item?.email}</Text>
              </Box>
              <Box className={classes.boxFlex}>
                <Text className={classes.text}>
                  <FormattedMessage id="admins.createdTime" />
                </Text>
                <Text className={classes.textStart}>
                  <FormattedDate
                    value={item?.createdAt}
                    month="numeric"
                    year="numeric"
                    day="numeric"
                  />
                  ,&nbsp;
                  <FormattedTime value={item?.createdAt} />
                </Text>
              </Box>
              <Box className={classes.boxFlex}>
                <Text className={classes.text}>
                  <FormattedMessage id="orders.newTime" />
                </Text>
                <Text className={classes.textStart}>
                  <FormattedDate
                    value={item?.updatedAt}
                    month="numeric"
                    year="numeric"
                    day="numeric"
                  />
                  ,&nbsp;
                  <FormattedTime value={item?.updatedAt} />
                </Text>
              </Box>
            </Box>
          </Box>
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
          <Table verticalSpacing="sm" highlightOnHover>
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
      </Box>
    </Modal>
  );
};

export default AdminsDetails;

const findItem = (admins: any[], id: any) => {
  return admins?.find((item: any) => item._id === id);
};
