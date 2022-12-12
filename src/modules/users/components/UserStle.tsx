import { createStyles } from "@mantine/core";

const UserStle = createStyles(() => ({
  userPaper: {
    width: "200px",
    padding: "8px",
    position: "relative",
    [`@media (max-width: 470px)`]: {
      width: "170px",
    },
    [`@media (max-width: 380px)`]: {
      width: "300px",
    },
  },
  userText: {
    fontSize: "16px",
    [`@media (max-width: 470px)`]: {
      fontSize: "13px",
    },
    [`@media (max-width: 380px)`]: {
      fontSize: "16px",
    },
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
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-between",
    gap: "10px",
    marginTop: "35px",
    marginBottom: "45px",
    [`@media (max-width: 380px)`]: {
      justifyContent: "center",
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
