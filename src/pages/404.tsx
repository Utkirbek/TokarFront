import useStyles from "@components/errorStyle";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { FormattedMessage } from "react-intl";

function Error() {
  const router = useRouter();
  const { classes, cx } = useStyles();
  

  useEffect(() => {
    setTimeout(() => {
      router.push("/");
    }, 5000);
  }, [router]);

  return (
    <div className={classes.serverError}>
      <lord-icon
        src="https://cdn.lordicon.com/spgozyor.json"
        trigger="hover"
        style={{ width: "250px", height: "250px" }}
      ></lord-icon>
      <div style={{ textAlign: "center" }}>
        <span style={{ color: "red", fontSize: "40px", fontWeight: "900" }}>
          404
        </span>
        <h2 style={{ color: "red" }}>
          <FormattedMessage id="pageNotFound" />
        </h2>
      </div>
    </div>
  );
}

export default Error;
