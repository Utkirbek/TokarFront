import { createStyles } from "@mantine/core";

const BottomStyle = createStyles((theme, _params, getRef) => {
  const icon = getRef("icon");

  return {
    link: {
      ...theme.fn.focusStyles(),
      margin: "2px 0px",
      display: "flex",
      alignItems: "center",
      textDecoration: "none",
      fontSize: theme.fontSizes.md,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[1]
          : theme.colors.gray[7],
      padding: `${theme.spacing.xs}px ${theme.spacing.sm}px`,
      borderRadius: theme.radius.sm,
      fontWeight: 500,

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[6]
            : theme.colors.gray[0],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,

        [`& .${icon}`]: {
          color: theme.colorScheme === "dark" ? theme.white : theme.black,
        },
      },
    },
  };
});

export default BottomStyle;
