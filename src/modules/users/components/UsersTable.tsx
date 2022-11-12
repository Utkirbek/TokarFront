import If from "@components/smart/If";
import TableHead from "@components/Table/TableHead";
import useConfirmation from "@hooks/useConfirmation";
import useNotification from "@hooks/useNotification";
import { Avatar, Button, Group, ScrollArea, Table } from "@mantine/core";
import useUsers from "@services/hooks/useUsers";
import { IconPencil, IconTrash } from "@tabler/icons";
import { Permissions } from "@utils/constants";
import { getCoverImage } from "@utils/getters";
import { useRouter } from "next/router";
import React, { memo } from "react";
import { FormattedMessage } from "react-intl";

import { usersTableHead } from "../constants";

type Props = {
  data?: any[];
  setEditItem: (item: any) => void;
  toggleOpened: () => void;
};

const UsersTable: React.FC<Props> = ({ data, setEditItem, toggleOpened }) => {
  const router = useRouter();

  const { openConfirm } = useConfirmation();
  const { deleteUser } = useUsers();
  const {
    showLoadingNotification,
    showSuccessNotification,
    showErrorNotification,
  } = useNotification();

  const rows = data?.map((item: any) => {
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

    const onClickMore = () => {
      router.push("/user", {
        query: {
          details: item._id,
        },
      });
    };

    return (
      <tr key={item._id}>
        <td>
          <Group spacing="sm">
            <Avatar size={40} src={getCoverImage(item.image)} radius={26} />
          </Group>
        </td>
        <td>{item.name}</td>
        <td>{item.phone}</td>
        <td>{item.workplace}</td>
        <td>{item.extra}</td>
        <td>
          <If hasPerm={Permissions.users.delete}>
            <IconTrash
              color="red"
              style={{ margin: "0  20px", cursor: "pointer" }}
              onClick={onDeleteClick}
            />
          </If>
          <If hasPerm={Permissions.users.edit}>
            <IconPencil style={{ cursor: "pointer" }} onClick={handleEdit} />
          </If>
        </td>
        <td>
          <Button variant="outline" onClick={onClickMore}>
            <FormattedMessage id="more" />
          </Button>
        </td>
      </tr>
    );
  });

  return (
    <ScrollArea>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm" highlightOnHover>
        <TableHead data={usersTableHead} prefix="users" />
        <tbody>{rows}</tbody>
      </Table>
    </ScrollArea>
  );
};

const areEqual = (prevProps: Props, nextProps: Props) => {
  return prevProps.data === nextProps.data;
};

export default memo(UsersTable, areEqual);
