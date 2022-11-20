import tespen from "@assets/tespen/tespen.jpg";
import useUser from "@hooks/shared/useUser";
import { Box, Image, Text } from "@mantine/core";
import React from "react";
import { FormattedDate, FormattedMessage } from "react-intl";
import { useCart } from "react-use-cart";

import useStyles from "./PrintStyle";

type Props = {};

const ComponentToPrint = React.forwardRef((props: Props, ref: any) => {
  const { items, cartTotal } = useCart();
  const { classes } = useStyles();
  const { name } = useUser();

  const ths = (
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
  );

  const rows = items?.map((item, i) => {
    return (
      <Box key={item._id}>
        <Text className={classes.textColorB}>
          {i + 1}. {item.title}
        </Text>
        <Box className={classes.flexP}>
          <Text className={classes.textColor}>
            {item?.quantity}X {item.price}
          </Text>
          <Text className={classes.textColor} fw={500}>
            {/* @ts-ignore */}
            {item.price * item?.quantity} <FormattedMessage id="checks.som" />
          </Text>
        </Box>
      </Box>
    );
  });

  return (
    <Box ref={ref} className={classes.widt}>
      <Text className={classes.title}>TOKAR.UZ</Text>
      <Text className={classes.titleHead}>
        Tushunmovchlik va kamchiliklar uchun 3kun ichda xabar bering.
        TEL:+998973734700
      </Text>
      <Box className={classes.batafsil}>
        <Box className={classes.flexC}>
          <Text className={classes.textColor}>Savdogar</Text>
          <Text className={classes.textColor}>{name}</Text>
        </Box>
        <Box>{ths}</Box>
      </Box>
      <Box>
        <Box className={classes.row}>{rows}</Box>
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
        <Text className={classes.bottomText}>
          <FormattedMessage id="checks.harid" />
        </Text>
        <Image
          style={{
            width: "50px",
            height: "50px",
          }}
          radius="md"
          src="https://res.cloudinary.com/xkitob/image/upload/v1668926049/frame_iatiq6.png"
          alt="Random unsplash image"
        />
      </Box>
    </Box>
  );
});

ComponentToPrint.displayName = "ComponentToPrint";

export default ComponentToPrint;
