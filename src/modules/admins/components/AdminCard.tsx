import If from "@components/smart/If";
import {
  ActionIcon,
  Avatar,
  Box,
  Button,
  Grid,
  Group,
  Menu,
  SimpleGrid,
  Text,
} from "@mantine/core";
import { MenuItem } from "@mantine/core/lib/Menu/MenuItem/MenuItem";
import {
  IconBarcode,
  IconChartLine,
  IconDots,
  IconPencil,
  IconTrash,
} from "@tabler/icons";
import { Permissions } from "@utils/constants";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";

import useAdminStyles from "./AdminStyle";
import Salary from "./Salary";

function AdminCard({
  data,
  openDeleteModal,
  editOnClick,
}: {
  data: any;
  openDeleteModal: any;
  editOnClick: any;
}) {
  const router = useRouter();

  const { classes } = useAdminStyles();

  return (
    <SimpleGrid
      cols={4}
      spacing="md"
      breakpoints={[
        { maxWidth: 1080, cols: 3, spacing: "sm" },
        { maxWidth: 830, cols: 2, spacing: "xs" },
        { maxWidth: 540, cols: 1, spacing: "xs" },
      ]}
    >
      {data.map((item: any) => {
        return (
          <Box key={item._id}>
            <Box className={classes.adminCardBox}>
              <Box className={classes.adminBoxColumn}>
                <Box className={classes.adminFlex}>
                  <Text>{item?.name}</Text>
                  <Menu width={200} withArrow>
                    <Menu.Target>
                      <Box>
                        <IconDots />
                      </Box>
                    </Menu.Target>
                    <Menu.Dropdown style={{ width: "400px" }}>
                      <If hasPerm={Permissions.admins.delete}>
                        <Menu.Item
                          onClick={() => openDeleteModal(item._id, item.name)}
                          icon={<IconTrash size={18} />}
                        >
                          <FormattedMessage id="admins.deleteIcon" />
                        </Menu.Item>
                      </If>
                      <If hasPerm={Permissions.admins.edit}>
                        <Menu.Item
                          onClick={editOnClick.bind(null, item)}
                          icon={<IconPencil size={18} />}
                        >
                          <FormattedMessage id="admins.editIcon" />
                        </Menu.Item>
                      </If>
                      <Group style={{ margin: " 10px 15px" }}>
                        <Salary inpStaff={item._id} />
                      </Group>
                    </Menu.Dropdown>
                  </Menu>
                </Box>
                <Box style={{ padding: "5px 5px" }}>
                  <Text>{item?.email}</Text>
                </Box>
                <Box style={{ padding: "5px 5px" }}>
                  <Text>
                    <FormattedMessage id="admins.giveSalary" /> <br />
                    {item?.earned_salary.toFixed(2)}
                  </Text>
                </Box>
                <Box className={classes.adminFlex}>
                  <Box></Box>
                  <Button
                    className={classes.adminBtn}
                    variant="outline"
                    onClick={() => {
                      router.push("/admins", {
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
          </Box>
        );
      })}
    </SimpleGrid>
  );
}

export default AdminCard;
