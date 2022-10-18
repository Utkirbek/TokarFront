import { Button, Drawer, Group, useMantineTheme } from "@mantine/core";
import { useState } from "react";

import FormProduct from "../form/Form";

export default function DrawerNew() {
  const [opened, setOpened] = useState(false);
  const theme = useMantineTheme();

  return (
    <>
      <Drawer
        overlayColor={
          theme.colorScheme === "dark"
            ? theme.colors.dark[9]
            : theme.colors.gray[2]
        }
        opened={opened}
        onClose={() => setOpened(false)}
        padding="xl"
        size="xl"
        position="right"
        sx={{ height: "120vh" }}>
        <FormProduct handleClose={() => setOpened(false)} />
      </Drawer>

      <Group position="right" mx={"xl"}>
        <Button onClick={() => setOpened(true)} variant={"outline"} sx={{}}>
          + Yangi mahsulot qo&apos;shish
        </Button>
      </Group>
    </>
  );
}
