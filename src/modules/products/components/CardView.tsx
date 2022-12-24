import If from "@components/smart/If";
import TextEllipsis from "@components/TextEllipsis/TextEllipsis";
import useConfirmation from "@hooks/useConfirmation";
import useNotification from "@hooks/useNotification";
import {
  ActionIcon,
  Box,
  Button,
  Group,
  Image,
  Menu,
  Paper,
  Text,
} from "@mantine/core";
import useProducts from "@services/hooks/useProducts";
import { IconDots, IconPencil, IconPhoto, IconTrash } from "@tabler/icons";
import { Permissions } from "@utils/constants";
import { useRouter } from "next/router";
import React, { useCallback } from "react";
import { FormattedMessage } from "react-intl";

import useSalesCardStyles from "./ProductsTable/styles/CardStyle";

type Props = {
  data: any[];
  onEdit: (item: unknown) => void;
};
const CardView: React.FC<Props> = ({ data, onEdit }) => {
  const { classes } = useSalesCardStyles();
  const router = useRouter();
  const { deleteProducts } = useProducts();
  const { openConfirm } = useConfirmation();

  const {
    showLoadingNotification,
    showErrorNotification,
    showSuccessNotification,
  } = useNotification();

  const handleDelete = async function (id: string) {
    showLoadingNotification();
    deleteProducts(id, {
      onSuccess: () => showSuccessNotification(),
      onError: () => showErrorNotification(),
    });
  };

  const openDeleteModal = useCallback((id: string) => {
    openConfirm(null, {
      onConfirm: () => handleDelete(id),
    });
  }, []);

  const Card = () => {
    return (
      <>
        {data.map((item) => (
          <Paper
            key={item._id}
            className={classes.prodactPaper}
            radius="md"
            withBorder
            sx={(theme) => ({
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.white,
            })}
          >
            <Box style={{ textAlign: "center" }}>
              {item.image == "" ? (
                <IconPhoto size={90} />
              ) : (
                <Image
                  width={90}
                  height={90}
                  src="https://images.unsplash.com/long-image-url-was-here.jpg"
                  alt="maxsulotYoq"
                />
              )}
            </Box>

            <Box style={{ textAlign: "center" }}>
              <Text>
                <TextEllipsis
                  text={item.title}
                  maxChars={20}
                  className={classes.userText}
                />
              </Text>
              <Text align="center" color="dimmed" size="sm">
                <FormattedMessage id="products.code" />:{item?.code}
              </Text>
            </Box>
            <Button
              fullWidth
              mt="xs"
              onClick={() => {
                router.push("/products", {
                  query: {
                    details: item._id,
                  },
                });
              }}
            >
              <FormattedMessage id="more" />
            </Button>
            <Box className={classes.prdactPostion}>
              <Menu withArrow offset={-5} position="bottom-end">
                <Menu.Target>
                  <Box>
                    <IconDots />
                  </Box>
                </Menu.Target>
                <Menu.Dropdown style={{ width: "400px" }}>
                  <Group>
                    <ActionIcon>
                      <IconPencil
                        style={{ cursor: "pointer", marginTop: "5px" }}
                        onClick={() => onEdit(item)}
                      />
                    </ActionIcon>

                    <If hasPerm={Permissions.products.delete}>
                      <ActionIcon>
                        <IconTrash
                          color="red"
                          onClick={() => openDeleteModal(item._id)}
                        />
                      </ActionIcon>
                    </If>
                  </Group>
                </Menu.Dropdown>
              </Menu>
            </Box>
          </Paper>
        ))}
      </>
    );
  };
  return (
    <>
      <Box className={classes.prodactFlex}>{Card()}</Box>
    </>
  );
};

export default CardView;
