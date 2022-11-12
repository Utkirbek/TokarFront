import { Box, Group, Text, useMantineTheme } from "@mantine/core";
import { SpotlightProvider } from "@mantine/spotlight";
import { useNavActions } from "@services/spotlight";
import dynamic from "next/dynamic";
import Link from "next/link";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const DashLayout = dynamic(() => import("@layouts/DashLayout"), { ssr: false });

const AppWrapper = ({ children }: Props) => {
  const navActions = useNavActions();

  return (
    <SpotlightProvider
      shortcut={["mod + P", "mod + K", "/"]}
      actions={navActions}
      nothingFoundMessage="Hech narsa topilmadi"
      translate="yes"
      searchPlaceholder="Qidirish"
      highlightQuery
      actionsWrapperComponent={ActionsWrapper}
    >
      <DashLayout>{children}</DashLayout>
    </SpotlightProvider>
  );
};

export default AppWrapper;

function ActionsWrapper({ children }: { children: React.ReactNode }) {
  const theme = useMantineTheme();

  return (
    <Box
      sx={{
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[4]
            : theme.colors.gray[1],
      }}
    >
      {children}
      <Group
        position="apart"
        px={15}
        py="xs"
        sx={(theme) => ({
          borderTop: `1px solid ${
            theme.colorScheme === "dark"
              ? theme.colors.dark[4]
              : theme.colors.gray[2]
          }`,
        })}
      >
        <Text size="xs" color="dimmed">
          Search powered by Tespen
        </Text>
        <Link href={"https://tespen.uz"}>Learn more</Link>
      </Group>
    </Box>
  );
}
