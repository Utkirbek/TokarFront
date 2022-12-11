import FormattedLocalTime from "@components/FormattedLocalTime";
import useUser from "@hooks/shared/useUser";
import { Box, Image, Text } from "@mantine/core";
import { useLocalStorage } from "@mantine/hooks";
import React from "react";
import { FormattedMessage } from "react-intl";

import useStyles from "./PrintStyle";

export type SalesPrintData = {
  total: number;
  items: {
    _id: string;
    quantity: number;
    price: number;
    title: string;
  }[];
};

const SalesPrint = React.forwardRef((_, ref: any) => {
  const [data] = useLocalStorage<SalesPrintData>({
    key: "last_sale",
  });

  const { classes } = useStyles();
  const { name } = useUser();

  const ths = (
    <Box className={classes.flexC}>
      <Text className={classes.textColor}>
        <FormattedMessage id="checks.vaqti" />
      </Text>
      <Text className={classes.textColor}>
        <FormattedLocalTime date={new Date()} />
      </Text>
    </Box>
  );

  const rows = data.items?.map((item, i) => {
    return (
      <Box key={item._id} className={classes.textBorder}>
        <Text className={classes.textColorB}>
          {i + 1}. {item.title}
        </Text>
        <Box className={classes.flexP}>
          <Text className={classes.textColor}>
            {item?.quantity}X {item.price}
          </Text>
          <Text className={classes.textColor} fw={500}>
            {item.price * item?.quantity} <FormattedMessage id="checks.som" />
          </Text>
        </Box>
      </Box>
    );
  });

  return (
    <Box ref={ref} className={classes.widt}>
      <Text className={classes.titleH}>TOKAR.UZ</Text>
      <Box>
        <Box className={classes.flexC}>
          <Text className={classes.textColor}>Savdogar</Text>
          <Text className={classes.textColor}>{name}</Text>
        </Box>
        <Box>{ths}</Box>
        <Box className={classes.batafsil}></Box>
      </Box>
      <Box>
        <Box className={classes.row}>{rows}</Box>
        <Box className={classes.marWidth}>
          <Text className={classes.paragph}>
            <FormattedMessage id="checks.jami" />
          </Text>
          <Text className={classes.paragph}>
            {data.total} <FormattedMessage id="checks.som" />
          </Text>
        </Box>
      </Box>
      <Box className={classes.imageHead}>
        <Text className={classes.bottomText}>
          <FormattedMessage id="checks.harid" />
        </Text>
        <Image
          style={{
            width: "60px",
            height: "60px",
          }}
          radius="md"
          src="https://res.cloudinary.com/xkitob/image/upload/v1668926049/frame_iatiq6.png"
          alt="Random unsplash image"
        />
      </Box>
    </Box>
  );
});

SalesPrint.displayName = "SalesPrint";

export default SalesPrint;
