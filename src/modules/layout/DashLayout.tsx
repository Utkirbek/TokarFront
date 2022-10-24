import ButtonToggleDark from "@components/darkmode/Darkmode";
import Logout from "@components/smart/Logout";
import {
  AppShell,
  Box,
  Burger,
  Header,
  MediaQuery,
  Navbar,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import data from "@modules/layout/dataSidebar";
import useStyles from "@modules/layout/style/dashStyle";
import Link from "next/link";
import { useState } from "react";

function Dashboard({ children }: any) {
  const { classes, cx } = useStyles();
  const [active, setActive] = useState("Billing");
  const [openSceleton, setopenSceleton] = useState(true);
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);

  setTimeout(() => {
    setopenSceleton(!openSceleton);
  }, 2000);

  const links = data.map((item) => (
    <Link href={item.link} key={item.label}>
      <a
        className={cx(classes.link, {
          [classes.linkActive]: item.label === active,
        })}>
        <item.icon className={classes.linkIcon} stroke={1.5} />
        <span>{item.label}</span>
      </a>
    </Link>
  ));

  return (
    <Box sx={{ display: "flex" }}>
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
            width={{ sm: 200, lg: 300 }}>
            <div className={classes.container}>{links}</div>
          </Navbar>
        }
        header={
          <Header height={70} p="md">
            <div
              style={{ display: "flex", alignItems: "center", height: "100%" }}>
              <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                <Burger
                  opened={opened}
                  onClick={() => setOpened((o) => !o)}
                  size="sm"
                  color={theme.colors.gray[6]}
                  mr="xl"
                />
              </MediaQuery>
              <div className={classes.navDesh}>
                <ButtonToggleDark />
                <Link href="">
                  <Text className={classes.title}>Tokar.uz</Text>
                </Link>
                <Box
                  sx={{
                    width: "82%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 5,
                  }}>
                  <TextInput
                    sx={{ width: "92%" }}
                    placeholder="Nima qidiryapsiz...?"
                  />
                  <Logout />
                </Box>
              </div>
            </div>
          </Header>
        }>
        {children}
      </AppShell>
    </Box>
  );
}

export default Dashboard;
