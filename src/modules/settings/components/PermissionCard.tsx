import EmptyBox from "@assets/icons/EmptyBox/EmptyBox";
import WithLoading from "@hoc/WithLoading";
import { Card, Grid, Text, TextInput } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { showNotification, updateNotification } from "@mantine/notifications";
import useSettings from "@services/hooks/useSettings";
import { IconCheck, IconPencil, IconTrash } from "@tabler/icons";
import { NextPage } from "next";
import dynamic from "next/dynamic";
import { useRef } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import PermissionText from "@modules/settings/components/PermissionText";

type Props = {
  name: string;
};

const PermissionsCard: React.FC<Props> = ({ name }) => {
  const intl = useIntl();
  return (
    <Grid.Col span="auto" lg={2} md={6} xs={10} sm={6}>
      <Card
        style={{
          background: "linear-gradient( 45deg, #13005a 40%, #350042 60%)",
          textAlign: "center",
          fontFamily: "revert",
          padding: "10px 20px 20px",
        }}
      >
        {/* <IconPencil
        onClick={() => handlePermissionUpdate(permission.name, permission._id)}
        cursor={"pointer"}
        style={{
          position: "absolute",
          right: 20,
          marginRight: 20,
          marginBottom: 10,
        }}
      /> */}
        {/* <IconTrash
        onClick={() => openDeleteModal(permission._id)}
        cursor={"pointer"}
        style={{ marginLeft: 140, marginBottom: 10, color: "red" }}
      /> */}
        <PermissionText name={intl.formatMessage({ id: `perms.${name}` })} />
      </Card>
    </Grid.Col>
  );
};

export default PermissionsCard;
