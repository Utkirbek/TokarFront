import { Button, Paper, Text } from "@mantine/core";
import {
  IconClipboardList,
  IconShoppingCart,
  IconUserCircle,
  IconUsers,
} from "@tabler/icons";
import Link from "next/link";
import React from "react";

import { useBottomNavStyles } from "./useBottomNavStyles";

interface BottomNavigationProps {}

const BottomNavigation: React.FC<BottomNavigationProps> = ({}) => {
  const { classes } = useBottomNavStyles();

  return (
    <Paper className={classes.bottom_nav}>
      <Button.Group>
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
          href="/sales"
        >
          <IconShoppingCart />
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
  );
};

export default BottomNavigation;
