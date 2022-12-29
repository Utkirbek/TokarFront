import { Button, Group, TextInput } from "@mantine/core";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

const StoreNameForm: React.FC<{
  nextStep: any;
  form: any;
}> = ({ nextStep, form }) => {
  const intl = useIntl();

  return (
    <Group position="center">
      <form style={{ width: "100%" }}>
        <TextInput
          withAsterisk
          label={intl.formatMessage({ id: "shopes.name" })}
          placeholder={intl.formatMessage({
            id: "shopes.name",
          })}
          id={name}
          {...form.getInputProps("name")}
          required
        />

        <Group position="right" my={20}>
          <Button type="submit" onClick={nextStep}>
            <FormattedMessage id="shopes.next" />
          </Button>
        </Group>
      </form>
    </Group>
  );
};

export default StoreNameForm;
