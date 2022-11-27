import useStyles from "@components/errorStyle";
import { Button } from "@mantine/core";
import { useRouter } from "next/router";
import { FormattedMessage } from "react-intl";



function ErrorServer(){
  const router = useRouter();
  const { classes, cx } = useStyles();

 

  return (
    <div className={classes.serverError}>
      <lord-icon
        src="https://cdn.lordicon.com/grpzdfts.json"
        trigger="hover"
        style={{ width: "250px", height: "250px" }}
      ></lord-icon>
      <div style={{ textAlign: "center" }}>
        <span style={{ color: "red", fontSize: "40px", fontWeight: "900" }}>
          505
        </span>
        <h2 style={{ color: "red" }}>
          <FormattedMessage id="serverError" />
        </h2>
      </div>
      
    </div>
  );
}

export default ErrorServer;
