import { Button, Drawer, Paper } from "@mantine/core";
import {
  IconClipboardList,
  IconMenu2,
  IconUserCircle,
  IconUsers,
} from "@tabler/icons";
import Link from "next/link";
import React, { useState } from "react";

import BootomLink from "./BootomLink";
import { useBottomNavStyles } from "./useBottomNavStyles";

interface BottomNavigationProps {}

const BottomNavigation: React.FC<BottomNavigationProps> = ({}) => {
  const [opened, setOpened] = useState(false);

  const { classes } = useBottomNavStyles();

  return (
    <>
      <Drawer
        opened={opened}
        onClose={() => setOpened(false)}
        padding="xl"
        size="full"
        style={{ zIndex: "999" }}
      >
        <BootomLink setOpened={setOpened} />
      </Drawer>
      <Paper className={classes.bottom_nav}>
        <Button.Group>
          <Button
            size="lg"
            className={classes.action_btn}
            onClick={() => setOpened(true)}
          >
            <IconMenu2 />
          </Button>
          <Button
            size="lg"
            className={classes.action_btn}
            component={Link}
            href="/users"
          >
            <IconUsers />
          </Button>
          <Button
            size="lg"
            className={classes.action_btn}
            component={Link}
            href="/products"
          >
            <IconClipboardList />
          </Button>

          <Button
            size="lg"
            className={classes.action_btn}
            component={Link}
            href="/orders"
          >
            <IconUserCircle />
          </Button>
        </Button.Group>
      </Paper>
    </>
  );
};

export default BottomNavigation;
