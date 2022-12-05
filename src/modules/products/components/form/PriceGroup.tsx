import { Group, NumberInput, Select } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import { IconChevronDown } from "@tabler/icons";
import React from "react";
import { useIntl } from "react-intl";

import { FormAddProps } from "./FormAdd";

interface PriceGroupProps {
  currencies: { _id: string; name: string }[];
  form: UseFormReturnType<FormAddProps>;
  priceLabel: string;
  pricePlaceholder: string;
  registerType: string;
  currencyRegisterType: string;
}

const PriceGroup: React.FC<PriceGroupProps> = ({
  currencies,
  form,
  priceLabel,
  pricePlaceholder,
  registerType,
  currencyRegisterType,
}) => {
  const intl = useIntl();

  return (
    <Group noWrap>
      <NumberInput
        sx={{
          width: "100%",
        }}
        my={1}
        label={priceLabel}
        placeholder={pricePlaceholder}
        precision={2}
        min={0}
        hideControls
        {...form.getInputProps(registerType)}
      />
      <Select
        sx={{ maxWidth: "12ch" }}
        rightSection={<IconChevronDown size={14} />}
        placeholder={intl.formatMessage({
          id: "products.form.currencyPlaceholder",
        })}
        styles={{ rightSection: { pointerEvents: "none" } }}
        label={intl.formatMessage({ id: "products.form.currencyLabel" })}
        data={currencies?.map((item: any) => ({
          value: item._id,
          label: item.name,
        }))}
        {...form.getInputProps(currencyRegisterType)}
      />
    </Group>
  );
};

export default PriceGroup;
