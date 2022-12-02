import ButtonToggleDark from "@components/darkmode/Darkmode";
import If from "@components/smart/If";
import Logout from "@components/smart/Logout";
import {
  AppShell,
  Box,
  Burger,
  Header,
  MediaQuery,
  Navbar,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import data from "@modules/layout/dataSidebar";
import useStyles from "@modules/layout/style/dashStyle";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FormattedMessage } from "react-intl";

function DashLayout({ children }: { children: React.ReactNode }) {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();
  const router = useRouter();
  const [opened, toggleOpened] = useToggle();

  const links = data.map((item: any) => {
    return (
      <If hasPerm={item.permission} key={item.label}>
        <Link
          key={item.label}
          href={item.link}
          className={cx(classes.link, "test", {
            sidebarLink: item.link === router.pathname,
          })}>
          <item.icon className={classes.linkIcon} stroke={1.5} />
          <Text>
            <FormattedMessage id={item.label} />
          </Text>
        </Link>
      </If>
    );
  });

  return (
    <AppShell
      styles={{
        main: {
          background:
            theme.colorScheme === "dark"
              ? theme.colors.dark[8]
              : theme.colors.gray[0],
        },
      }}
      navbarOffsetBreakpoint="sm"
      asideOffsetBreakpoint="sm"
      navbar={
        <Navbar
          p="md"
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{ sm: 200, lg: 270 }}>
          <Box className={classes.container}>{links}</Box>
        </Navbar>
      }
      header={
        <Header height={70} p="md">
          <Box
            style={{ display: "flex", alignItems: "center", height: "100%" }}>
            <MediaQuery largerThan="sm" styles={{ display: "none" }}>
              <Burger
                opened={opened}
                onClick={() => toggleOpened()}
                size="sm"
                color={theme.colors.gray[6]}
                mr="xl"
              />
            </MediaQuery>
            <Box className={classes.navDesh}>
              <ButtonToggleDark />
              <Link href="/">
                <Text className={classes.title}>Tokar</Text>
              </Link>
              <Box ml="auto">
                <Logout />
              </Box>
            </Box>
          </Box>
        </Header>
      }>
      {children}
    </AppShell>
  );
}
export default DashLayout;
