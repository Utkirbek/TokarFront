import If from "@components/smart/If";
import useConfirmation from "@hooks/useConfirmation";
import useNotification from "@hooks/useNotification";
import {
  ActionIcon,
  Anchor,
  Avatar,
  Box,
  Button,
  Drawer,
  Grid,
  Image,
  Menu,
  Paper,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import useUsers from "@services/hooks/useUsers";
import { IconDots, IconPencil, IconPhoto, IconTrash } from "@tabler/icons";
import { Permissions } from "@utils/constants";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormattedMessage } from "react-intl";

import NewUser from "../NewUser";
import UserStyle from "./UserStle";

function UserCard({ data }: any) {
  const {
    showLoadingNotification,
    showSuccessNotification,
    showErrorNotification,
  } = useNotification();
  const router = useRouter();

  const { classes } = UserStyle();
  const theme = useMantineTheme();
  const [editItem, setEditItem] = useState({});
  const [opened, toggleOpened] = useToggle();
  const { openConfirm } = useConfirmation();
  const [searchResults, setSearchResults] = useState([]);
  const { deleteUser } = useUsers();
  const Card = (searchResults.length > 0 ? searchResults : data).map(
    (item: any) => {
      const handleEdit = () => {
        setEditItem(item);
        toggleOpened();
      };

      const onDeleteClick = () => {
        openConfirm(null, {
          onConfirm: () => {
            showLoadingNotification();
            deleteUser(item._id, {
              onSuccess: () => {
                showSuccessNotification();
              },
              onError: () => {
                showErrorNotification();
              },
            });
          },
        });
      };

      return (
        <Paper
          key={item._id}
          className={classes.userPaper}
          radius="md"
          withBorder
          sx={(theme) => ({
            backgroundColor:
              theme.colorScheme === "dark" ? theme.colors.dark[8] : theme.white,
          })}
        >
          <Avatar src={item.image} size={90} radius={90} mx="auto" />
          {item.name.length > 15 ? (
            <Text
              align="center"
              className={classes.userText}
              weight={500}
              mt="xs"
            >
              {item.name.substring(0, 15)}...
            </Text>
          ) : (
            <Text
              align="center"
              className={classes.userText}
              weight={500}
              mt="xs"
            >
              {item.name}
            </Text>
          )}

          <Text align="center" color="dimmed" size="sm">
            <Anchor<"a"> size="sm" href={`tel:${item.phone}`}>
              <Text size={14}>{item.phone}</Text>
            </Anchor>
          </Text>

          <Button
            fullWidth
            mt="xs"
            onClick={() => {
              router.push("/user", {
                query: {
                  details: item._id,
                },
              });
            }}
          >
            <FormattedMessage id="more" />
          </Button>
          <Box className={classes.userIconTrash}>
            <If hasPerm={Permissions.users.edit}>
              <ActionIcon>
                <IconPencil
                  style={{
                    cursor: "pointer",
                    marginRight: "-10px",
                  }}
                  onClick={handleEdit}
                />
              </ActionIcon>
            </If>
          </Box>
          <Box className={classes.userIconPencil}>
            <If hasPerm={Permissions.users.delete}>
              <ActionIcon>
                <IconTrash
                  color="red"
                  style={{ cursor: "pointer" }}
                  onClick={onDeleteClick}
                />
              </ActionIcon>
            </If>
          </Box>
        </Paper>
      );
    }
  );

  return (
    <Box>
      <Drawer
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        opened={opened}
        onClose={() => toggleOpened(false)}
        size="xl"
        position="right"
        sx={{ height: "120vh", zIndex: 999 }}
      >
        <NewUser handleClose={() => toggleOpened(false)} editItem={editItem} />
      </Drawer>
      <Box className={classes.userFlex}>{Card}</Box>
    </Box>
  );
}

export default UserCard;
