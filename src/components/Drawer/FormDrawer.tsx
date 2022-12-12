import { Drawer, useMantineTheme } from "@mantine/core";
import React, { memo } from "react";

type Props = {
  opened: boolean;
  toggleOpened: (bool?: boolean) => void;
  children: React.ReactNode;
  title?: string | React.ReactNode;
};

const FormDrawer: React.FC<Props> = ({
  opened,
  toggleOpened,
  children,
  title,
}) => {
  const theme = useMantineTheme();

  return (
    <Drawer
      sx={{ minHeight: "100vh" }}
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      opened={opened}
      onClose={() => toggleOpened(false)}
      padding="xl"
      size="xl"
      position="right"
      title={title}
    >
      {children}
    </Drawer>
  );
};

const areEqual = (prevProps: Props, nextProps: Props) => {
  return prevProps.opened === nextProps.opened;
};

export default memo(FormDrawer, areEqual);
