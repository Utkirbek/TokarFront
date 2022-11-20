import { Box, Button, Card, Collapse, List, Tooltip } from "@mantine/core";
import { IconEdit, IconTrash } from "@tabler/icons";
import React from "react";
import { useIntl } from "react-intl";

type Props = {
  name: string;
  _id: string;
  permissions: any[];
};

const RoleCard: React.FC<Props> = ({ name, _id, permissions }) => {
  const [opened, setOpened] = React.useState(false);
  const intl = useIntl();

  const handleEdit = () => {
    //TODO implement
  };

  const handleDelete = () => {
    // TODO implement
  };

  return (
    <Card my={10} p={4} sx={{ boxSizing: "border-box" }}>
      <Card.Section
        px={10}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <h3>{name}</h3>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <Tooltip
            label={intl.formatMessage({ id: "edit" })}
            position="top"
            withArrow
          >
            <Button variant="outline" onClick={handleEdit} mr={5}>
              <IconEdit />
            </Button>
          </Tooltip>
          <Tooltip
            label={intl.formatMessage({ id: "delete" })}
            position="top"
            withArrow
          >
            <Button variant="light" onClick={handleDelete} mr={5}>
              <IconTrash />
            </Button>
          </Tooltip>
          <Button onClick={() => setOpened(!opened)}>
            {opened ? "Yopish" : "Korsatish"}
          </Button>
        </Box>
      </Card.Section>
      <Card.Section>
        <Collapse in={opened} transitionDuration={200}>
          <List>
            {permissions.map((permission: any) => (
              <List.Item key={permission}>
                {permission.name || permission}
              </List.Item>
            ))}
          </List>
        </Collapse>
      </Card.Section>
    </Card>
  );
};

export default RoleCard;
