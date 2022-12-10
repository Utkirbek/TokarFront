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
[`@media (max-width: 540px)`]:{
  fontSize : "18px",
}
  },
  adminFlex: {
    display: "flex",
    justifyContent: "space-between",
    padding: "0 5px",
  },
  adminBoxColumn:{
    display: "flex",
    flexDirection : "column",
    justifyContent: "space-around",
    paddingTop: "8px",
   
  },
  adminFlexBox: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "0 15px",
    marginTop : "10px",
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
      marginBottom : "50px",
    },
  },
  drawerBtn: {
    [`@media (max-width: 600px)`]: {
      display: "none",
    },
  },
}));

export default useAdminStyles;
