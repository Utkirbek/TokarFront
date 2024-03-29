import BottomNavigation from "@components/BottomNavigation/BottomNavigation";
import If from "@components/smart/If";
import Logout from "@components/smart/Logout";
import { selectIsLoggedIn } from "@hooks/shared/selectors";
import useUser from "@hooks/shared/useUser";
import {
  AppShell,
  Box,
  Burger,
  Header,
  Navbar,
  Text,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery, useToggle } from "@mantine/hooks";
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
  const isLoggedIn = useUser(selectIsLoggedIn);
  const isLoggedInCok = getCookie("isLoggedIn");
  const token = getCookie("token");
  const [activeId, setActiveId] = useState(null);
  const [fullView, toggleFullView] = useToggle();
  const shopName = getCookie("shopName");
  const isMobile = useMediaQuery("(max-width: 600px)");

  const activeStyle = {
    background: "#1864AB",
    color: "white",
  };

  if (!isLoggedIn || !isLoggedInCok || !token || router.pathname === "/check")
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
      navbarOffsetBreakpoint="xs"
      asideOffsetBreakpoint="xs"
      navbar={
        !isMobile ? (
          <Navbar
            hiddenBreakpoint="sm"
            width={{
              xs: fullView ? "100%" : "min-content",
              lg: fullView ? 220 : "min-content",
            }}
            sx={{
              position: !fullView ? "static" : "fixed",
              zIndex: 9,
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
        ) : (
          <></>
        )
      }
      header={
        <If condition={fullView}>
          <Header height={70} p="md">
            <Box
              style={{ display: "flex", alignItems: "center", height: "100%" }}
            >
              <Box className={classes.navDesh}>
                <Burger opened={fullView} onClick={() => toggleFullView()} />
                <Link href="/">
                  <Text className={classes.title}>{shopName || "Tokar"}</Text>
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
      <Box className={classes.childerns} sx={{ height: "100%" }}>
        {children}
      </Box>
      {isMobile && <BottomNavigation />}
    </AppShell>
  );
}
export default DashLayout;
