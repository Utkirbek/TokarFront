import { createStyles } from "@mantine/core";

const useCurrencyStyles = createStyles((theme) => ({
  iconTrash: {
    color: "red",
    cursor: "pointer",
  },
  amalTd: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    marginBottom: "-5px",
  },
  input: {
    width: "100px",
  },
  Btn: {
    width: "100px",
  },
  currencyTable: {
    [`@media (max-width: 900px)`]: {
      display: "none",
    },
  },
  currencyCard: {
   opacity : "0",
    [`@media (max-width: 900px)`]: {
      opacity:"1",
      display:"flex",
      flexWrap :"wrap",
    },
  },
  currencyFlex: {
    display: "flex",
    justifyContent: "space-between",
    alignItems : "center",
    marginTop : "15px",
    padding:"0 10px"
    
  },
  CurrencyCardBox: {
    width: "100%",
    height: "150px",
    padding: "8px",
    border: "0.2px solid #444",
    borderRadius: "8px",
    fontSize: 14,
  },
}));

export default useCurrencyStyles;
