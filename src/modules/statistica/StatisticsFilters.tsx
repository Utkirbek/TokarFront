import { Chip, createStyles } from "@mantine/core";
import useStyles from "@modules/products/components/form/style/inputStyle";
import useShop from "@services/hooks/useShop";
import React from "react";
import { FormattedMessage } from "react-intl";

type Props = {
  updateActiveShop: (shopId: string) => void;
  activeShop: string;
  setIsAllTrue: (value: boolean | ((prevVar: boolean) => boolean)) => void;
  isAllTrue: boolean;
};

const StatisticsFilters: React.FC<Props> = ({
  updateActiveShop,
  activeShop,
  setIsAllTrue,
  isAllTrue,
}) => {
  const { useFetchShop } = useShop();

  const { data, error } = useFetchShop();
  const { classes } = useStyles();

  const onFilterChipChange = (value: string) => {
    switch (value) {
      case "all":
        setIsAllTrue(true);
        break;
      default:
        updateActiveShop(value);
        if (isAllTrue) {
          setIsAllTrue(false);
        }
    }
  };

  if (!data || !!error) return null;

  return (
    <div className={classes.flow}>
      <Chip.Group
        position="left"
        my={5}
        onChange={onFilterChipChange}
        defaultValue="clear"
        value={activeShop}
      >
        <Chip value={"all"}>
          <FormattedMessage id="all" />
        </Chip>
        {data.map((shop: { name: string; _id: string }) => {
          return (
            <Chip key={shop._id} value={shop._id}>
              {shop.name}
            </Chip>
          );
        })}
      </Chip.Group>
    </div>
  );
};

export default StatisticsFilters;
