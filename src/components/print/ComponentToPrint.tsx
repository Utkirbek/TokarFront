import { Box, Image, Table, Text } from "@mantine/core";
import Link from "next/link";
import React from "react";
import { FormattedDate, FormattedMessage } from "react-intl";
import { useCart } from "react-use-cart";

import useStyles from "./PrintStyle";

type Props = {};

const ComponentToPrint = React.forwardRef((props: Props, ref: any) => {
  const { items, cartTotal } = useCart();
  const { classes } = useStyles();

  const ths = (
    <Box className={classes.head}>
      <Box className={classes.flexC}>
        <Text className={classes.textColor}>
          <FormattedMessage id="checks.vaqti" />
        </Text>
        <Text className={classes.textColor}>
          <FormattedDate
            value={new Date()}
            hour={"numeric"}
            minute="numeric"
            year="numeric"
            month="numeric"
            day="numeric"
          />
        </Text>
      </Box>
    </Box>
  );

  const rows = items?.map((item) => {
    return (
      <Box key={item._id} className={classes.flexC}>
        <Text className={classes.textColor}>*{item.title}</Text>
        <Text className={classes.textColor}>
          {item.price} <FormattedMessage id="checks.som" />
        </Text>
      </Box>
    );
  });

  return (
    <Box ref={ref} className={classes.widt}>
      <Text className={classes.title}>TOKAR.UZ</Text>
      <Box>
        <Box className={classes.row}>{rows}</Box>
        <Box>{ths}</Box>
        <Box className={classes.marWidth}>
          <Text className={classes.paragph}>
            <FormattedMessage id="checks.jami" />
          </Text>
          <Text className={classes.paragph}>
            {cartTotal} <FormattedMessage id="checks.som" />
          </Text>
        </Box>
      </Box>
      <Box className={classes.imageHead}>
        <Image
          style={{
            width: "150px",
            height: "150px",
            margin: "auto",
          }}
          radius="md"
          src="https://media.istockphoto.com/id/828088276/vector/qr-code-illustration.jpg?s=612x612&w=0&k=20&c=FnA7agr57XpFi081ZT5sEmxhLytMBlK4vzdQxt8A70M="
          alt="Random unsplash image"
        />
      </Box>
      <Text className={classes.bottomText}>
        <FormattedMessage id="checks.harid" />
      </Text>
      <Link href={"https://tespen.uz"} className={classes.textColor}>
        Tespen.uz
      </Link>
    </Box>
  );
});

ComponentToPrint.displayName = "ComponentToPrint";

export default ComponentToPrint;
