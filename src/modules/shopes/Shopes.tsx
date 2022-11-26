import If from "@components/smart/If";
import WithLoading from "@hoc/WithLoading";
import useConfirmation from "@hooks/useConfirmation";
import useNotification from "@hooks/useNotification";
import {
  ActionIcon,
  Box,
  Button,
  Card,
  Group,
  ScrollArea,
  Skeleton,
  Text,
} from "@mantine/core";
import useStyles from "@modules/shopes/styles/shopStyle";
import useShop from "@services/hooks/useShop";
import { IconMapPin, IconPencil, IconPlus, IconTrash } from "@tabler/icons";
import { Permissions } from "@utils/constants";
import Link from "next/link";
import { FormattedMessage } from "react-intl";

export const Loader = () => {
  return (
    <Box
      my={10}
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 20,
      }}>
      <Skeleton height="350px" width={"350px"} mx={50} />
      <Skeleton height="350px" width={"350px"} mx={50} />
      <Skeleton height="350px" width={"350px"} mx={50} />
      <Skeleton height="350px" width={"350px"} mx={50} />
      <Skeleton height="350px" width={"350px"} mx={50} />
      <Skeleton height="350px" width={"350px"} mx={50} />
    </Box>
  );
};

const Shopes = () => {
  const { classes } = useStyles();
  const { deleteShop } = useShop();

  const {
    showLoadingNotification,
    showSuccessNotification,
    showErrorNotification,
  } = useNotification();
  const { openConfirm } = useConfirmation();

  const { useFetchShop, editShop } = useShop();
  const getShopQuery = useFetchShop();
  const { data: shops } = getShopQuery;

  const openDeleteModal = (id: string) => {
    openConfirm(null, {
      onConfirm: () => {
        showLoadingNotification();
        deleteShop(id, {
          onSuccess: () => showSuccessNotification(),
          onError: () => showErrorNotification(),
        });
      },
    });
  };

  return (
    <>
      <WithLoading query={getShopQuery} FallbackLoadingUI={Loader}>
        <ScrollArea style={{ width: "100%", height: "100vh" }}>
          <Box className={classes.box}>
            <If hasPerm={Permissions.shop.create}>
              <Link href={"/newShop"}>
                <Card
                  shadow="sm"
                  p="lg"
                  radius="md"
                  withBorder
                  className={classes.Cart}>
                  <IconPlus className={classes.plusIcon} />
                </Card>
              </Link>
            </If>

            {shops?.map((item: any, idx: any) => {
              return (
                <Card
                  shadow="sm"
                  p="lg"
                  radius="md"
                  withBorder
                  className={classes.Cart}
                  key={idx}>
                  <Card.Section
                    sx={{
                      width: "350px",
                      display: "flex",
                      justifyContent: "space-between",
                    }}>
                    <Group position="right">
                      <Button radius="md" m={10} className={classes.more}>
                        <FormattedMessage id="shopes.more" />
                      </Button>
                    </Group>
                    <Group position="left" mx={20}>
                      <ActionIcon>
                        <IconPencil />
                      </ActionIcon>
                      <ActionIcon>
                        <IconTrash
                          color="red"
                          onClick={() => openDeleteModal(item._id)}
                        />
                      </ActionIcon>
                    </Group>
                  </Card.Section>

                  <Card className={classes.miniCArt} radius="md">
                    <Group position="center" className={classes.col}>
                      <Group>
                        <Text weight={500} size={25}>
                          {item.name}
                        </Text>
                      </Group>
                      <Group>
                        <IconMapPin />
                        <Text weight={500} size={15}>
                          {item.location}
                        </Text>
                      </Group>

                      <Button variant="gradient" fullWidth mt="md" radius="md">
                        <FormattedMessage id="shopes.enter" />
                      </Button>
                    </Group>
                  </Card>
                </Card>
              );
            })}
          </Box>
        </ScrollArea>
      </WithLoading>
    </>
  );
};
export default Shopes;
