import { createStyles } from "@mantine/core";

const useAdminStyles = createStyles((theme) => ({
  AdminTd: {
    display: "flex",
    justifyContent: "start",
    gap: 10,
    marginTop: "12px",
  },
  admindrawer: {
    width: "30%",
    [`@media (max-width: 600px)`]: {
      width: "90%",
    },
  },
  modalBtn: {
    width: "100%",
    display: "none",
    position: "absolute",
    bottom: "0",
    [`@media (max-width: 800px)`]: {
      display: "block",
    },
  },
  AdminTrash: {
    color: "red",
    cursor: "pointer",
  },
  adminPencil: {
    cursor: "pointer",
    marginRight: "-10px",
    [`@media (max-width: 1040px)`]: {
      marginRight: "0",
    },
  },
  adminBox: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [`@media (max-width: 600px)`]: {
      width: "96%",
      marginBottom: "10px",
    },
  },
  adminCardBox: {
    width: "100%",
    height: "200px",

    padding: "8px",
    border: "0.2px solid #444",
    borderRadius: "8px",
    fontSize: 14,
    [`@media (max-width: 540px)`]: {
      fontSize: "18px",
    },
  },
  adminFlex: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 5px",
  },
  adminBoxColumn: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-around",
    paddingTop: "8px",
  },
  adminFlexBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 15px",
    marginTop: "10px",
  },
  adminBtn: {
    marginTop: "5px",
  },
  AdminTable: {
    [`@media (max-width: 1040px)`]: {
      display: "none",
    },
  },
  AdminCard: {
    display: "none",
    [`@media (max-width: 1040px)`]: {
      display: "block",
      marginBottom: "50px",
    },
  },
  drawerBtn: {
    [`@media (max-width: 600px)`]: {
      display: "none",
    },
  },

  adminAllDisplay: {
    width: "100%",
    minHeight: "75vh",
    position: "relative",
    [`@media (max-width: 800px)`]: {
      height: "90vh",
    },
  },

  adminTitleHead: {
    fontSize: "36px",
    fontWeight: 600,
    textAlign: "center",
    color: "#1971C2",
    [`@media (max-width: 800px)`]: {
      fontSize: 18,
      marginBottom: 15,
    },
  },
  adminTextStart: {
    textAlign: "start",
    fontSize: "23px",
    [`@media (max-width: 800px)`]: {
      fontSize: 15,
    },
  },
  adminText: {
    fontSize: "23px",
    [`@media (max-width: 800px)`]: {
      fontSize: 15,
      textAlign: "start",
    },
  },
  adminBoxFlex: {
    display: "flex",
    justifyContent: "space-between",
    marginTop: "5px",
    padding: "0px 80px",
    [`@media (max-width: 500px)`]: {
      padding: "0px 10px",
    },
  },
  tableAdminMedia: {
    [`@media (max-width: 500px)`]: {
      fontSize: 10,
    },
  },
}));

export default useAdminStyles;
