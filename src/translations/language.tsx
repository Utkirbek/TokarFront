import { createStyles, Group, Menu, UnstyledButton } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import { IconChevronDown } from "@tabler/icons";
import { useState } from "react";

import { Lang } from "@/pages/_app";

const useStyles = createStyles((theme, { opened }: { opened: boolean }) => ({
  control: {
    zIndex: 555,
    width: 100,
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 15px",
    borderRadius: theme.radius.md,
    border: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2]
    }`,
    transition: "background-color 150ms ease",
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[opened ? 5 : 6]
        : opened
        ? theme.colors.gray[0]
        : theme.white,

    "&:hover": {
      backgroundColor:
        theme.colorScheme === "dark"
          ? theme.colors.dark[5]
          : theme.colors.gray[0],
      zIndex: 555,
    },
  },

  label: {
    fontWeight: 500,
    fontSize: theme.fontSizes.sm,
    zIndex: 555,
  },

  icon: {
    transition: "transform 150ms ease",
    transform: opened ? "rotate(180deg)" : "rotate(0deg)",
    zIndex: 555,
  },
}));

export default function LanguagePicker() {
  const [activeLang, setActiveLang] = useLocalStorage<Lang>({
    key: "lang",
    defaultValue: Lang.uz,
  });
  const [opened, setOpened] = useState(false);
  const { classes } = useStyles({ opened });

  return (
    <Menu
      onOpen={() => setOpened(true)}
      onClose={() => setOpened(false)}
      radius="md"
      width="target"
    >
      <Menu.Target>
        <UnstyledButton className={classes.control}>
          <Group spacing="xs">
            <span className={classes.label}>{activeLang}</span>
          </Group>
          <IconChevronDown size={16} className={classes.icon} stroke={1.5} />
        </UnstyledButton>
      </Menu.Target>
      <Menu.Dropdown>
        <Menu.Item onClick={() => setActiveLang(Lang.en)}>English</Menu.Item>
        <Menu.Item onClick={() => setActiveLang(Lang.uz)}>Uzbek</Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
}
