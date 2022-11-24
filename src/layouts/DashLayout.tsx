import If from "@components/smart/If";
import Logout from "@components/smart/Logout";
import { selectIsLoggedIn } from "@hooks/selectors";
import useUser from "@hooks/shared/useUser";
import {
  AppShell,
  Box,
  Burger,
  Header,
  MediaQuery,
  Navbar,
  Text,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { useToggle } from "@mantine/hooks";
import data from "@modules/layout/dataSidebar";
import useStyles from "@modules/layout/style/dashStyle";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { FormattedMessage } from "react-intl";

function DashLayout({ children }: { children: React.ReactNode }) {
  const { classes, cx } = useStyles();
  const theme = useMantineTheme();
  const router = useRouter();
  const [opened, toggleOpened] = useToggle();
  const isLoggedIn = useUser(selectIsLoggedIn);
  const token = getCookie("token");
  const [activeId, setActiveId] = useState(null);
  const [fullView, toggleFullView] = useToggle();

  const activeStyle = {
    background: "#1864AB",
    color: "white",
  };

  if (!isLoggedIn || !token || router.pathname === "/check")
    return <>{children}</>;

  const links = data.map((item: any) => {
    return (
      <If hasPerm={item.permission} key={item.label}>
        <Tooltip
          label={<FormattedMessage id={item.label} />}
          position="left"
          withArrow
        >
          <Link
            key={item.label}
            href={item.link}
            style={item.id === activeId ? activeStyle : {}}
            onClick={() => setActiveId(item.id)}
            className={cx(classes.link, {
              linkActive: item.link === router.pathname,
            })}
          >
            <item.icon
              className={cx(classes.linkIcon, {
                iconFull: !fullView,
              })}
              stroke={1.5}
            />
            <If condition={fullView}>
              <Text>
                <FormattedMessage id={item.label} />
              </Text>
            </If>
          </Link>
        </Tooltip>
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
          hiddenBreakpoint="sm"
          hidden={!opened}
          width={{
            sm: fullView ? 200 : "min-content",
            lg: fullView ? 220 : "min-content",
          }}
          sx={{
            position: !fullView ? "static" : "fixed",
          }}
          p={fullView ? "md" : 0}
        >
          <Box className={classes.container} m={0}>
            {!fullView && (
              <Text className={classes.link}>
                <Burger
                  size={"sm"}
                  opened={fullView}
                  onClick={() => toggleFullView()}
                />
              </Text>
            )}

            {links}
          </Box>
        </Navbar>
      }
      header={
        <If condition={fullView}>
          <Header height={70} p="md">
            <Box
              style={{ display: "flex", alignItems: "center", height: "100%" }}
            >
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
                <Burger opened={fullView} onClick={() => toggleFullView()} />
                <Link href="/">
                  <Text className={classes.title}>Tokar</Text>
                </Link>
                <Box ml="auto">
                  <Logout />
                </Box>
              </Box>
            </Box>
          </Header>
        </If>
      }
    >
      <Box px={fullView ? 0 : "sm"} sx={{ height: "100%" }}>
        {children}
      </Box>
    </AppShell>
  );
}
export default DashLayout;
