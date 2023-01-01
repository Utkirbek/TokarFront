import { createStyles } from "@mantine/core";

const UserStle = createStyles(() => ({
  userPaper: {
    width: "100%",
    padding: "8px",
    position: "relative",
  },
  userText: {
    fontSize: "16px",
  },
  userIconTrash: {
    position: "absolute",
    top: "3px",
  },
  userIconPencil: {
    position: "absolute",
    right: "0px",
    top: "3px",
  },
  userFlex: {
    display: "grid",
    gridTemplateColumns: "auto auto auto",
    gap: "1rem",
    margin: "2.8rem 0",
    [`@media (max-width: 600px)`]: {
      gridTemplateColumns: "auto auto",
    },
    [`@media (max-width: 400px)`]: {
      gridTemplateColumns: "auto auto ",
      marginLeft: ".4rem",
    },
    [`@media (max-width: 370px)`]: {
      gridTemplateColumns: "auto",
    },
  },

  userHead: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
  userAdd: {
    [`@media (max-width: 900px)`]: {
      display: "none",
    },
  },
  userAddIcon: {
    width: "50px",
    height: "50px",
    borderRadius: "50%",
    backgroundColor: "#1864AB",
    display: "none",
    [`@media (max-width: 900px)`]: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      cursor: "pointer",
    },
  },
  tex: {
    fontSize: 14,
    [`@media (max-width: 800px)`]: {
      width: "50px",
      height: "50px",
      borderRadius: "50%",
    },
  },
  userTable: {
    [`@media (max-width: 900px)`]: {
      display: "none",
      padding: "0px",
      margin: "0px",
      border: "2px solid red",
    },
  },
  userCard: {
    display: "none",
    [`@media (max-width: 900px)`]: {
      display: "block",
      width: "100%",
    },
  },

  userSerch: {
    width: "100%",
    [`@media (max-width: 800px)`]: {
      width: "95%",
      margin: "0 auto",
      position: "fixed",
      top: "8px",
      left: "0px",
      right: "0px",
    },
  },
}));

export default UserStle;
