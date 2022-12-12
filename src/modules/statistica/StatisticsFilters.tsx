import { Chip } from "@mantine/core";
import useShop from "@services/hooks/useShop";
import React from "react";
import { FormattedMessage } from "react-intl";

type Props = {
  updateActiveShop: (shopId: string) => void;
  activeShop: string;
  setIsAllTrue: (value: boolean | ((prevVar: boolean) => boolean)) => void;
};

const StatisticsFilters: React.FC<Props> = ({
  updateActiveShop,
  activeShop,
  setIsAllTrue,
}) => {
  const { useFetchShop } = useShop();

  const { data, error } = useFetchShop();

  const onFilterChipChange = (value: string) => {
    switch (value) {
      case "all":
        setIsAllTrue((prev) => !prev);
        break;
      default:
        updateActiveShop(value);
    }
  };

  if (!data || !!error) return null;

  return (
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
  );
};

export default StatisticsFilters;
