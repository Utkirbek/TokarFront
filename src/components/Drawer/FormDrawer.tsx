import { Drawer, useMantineTheme } from "@mantine/core";
import { useRouter } from "next/router";
import React, { memo } from "react";

type Props = {
  opened: boolean;
  toggleOpened?: (bool?: boolean) => void;
  children: React.ReactNode;
  title?: string | React.ReactNode;
  navBack?: boolean;
};

const FormDrawer: React.FC<Props> = ({
  opened,
  toggleOpened,
  children,
  title,
  navBack,
}) => {
  const theme = useMantineTheme();
  const router = useRouter();

  return (
    <Drawer
      style={{ minHeight: "100vh", zIndex: "999" }}
      overlayColor={
        theme.colorScheme === "dark"
          ? theme.colors.dark[9]
          : theme.colors.gray[2]
      }
      opened={opened}
      onClose={() => {
        if (navBack) router.replace(router.pathname);
        else toggleOpened?.(false);
      }}
      padding="xl"
      size="xl"
      position="right"
      title={title}
    >
      {children}
    </Drawer>
  );
};

export default memo(FormDrawer);
