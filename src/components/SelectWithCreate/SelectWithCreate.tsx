import { Select } from "@mantine/core";
import { UseFormReturnType } from "@mantine/form";
import React from "react";
import { useIntl } from "react-intl";

interface SelectWithCreateProps {
  onCreate: (value: string) => void;
  data: { value: string; label: string }[];
  label: string;
  placeholder: string;
  form: UseFormReturnType<any>;
  registerAs: string;
}

const SelectWithCreate: React.FC<SelectWithCreateProps> = ({
  onCreate,
  data,
  placeholder,
  label,
  form,
  registerAs,
}) => {
  const intl = useIntl();

  return (
    <Select
      label={intl.formatMessage({ id: label })}
      data={data}
      placeholder={intl.formatMessage({ id: placeholder })}
      nothingFound={intl.formatMessage({ id: "nothingFound" })}
      searchable
      creatable
      getCreateLabel={(query) => `+ Yangi ${query}`}
      onCreate={(query) => {
        const item = { value: query, label: query };
        onCreate(query);
        return item;
      }}
      {...form.getInputProps(registerAs)}
    />
  );
};

export default SelectWithCreate;
