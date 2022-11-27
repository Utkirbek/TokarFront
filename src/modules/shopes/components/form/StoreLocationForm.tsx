import { Button, Group, TextInput } from "@mantine/core";
import { IconMapPin } from "@tabler/icons";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

const StoreLocationForm: React.FC<{
  prevStep: any;
  nextStep: any;
  form: any;
}> = ({ prevStep, nextStep, form }) => {
  const intl = useIntl();

  return (
    <Group position="center">
      <form style={{ width: "60%" }}>
        <Group position="center">
          <IconMapPin size={100} color={"#1972C2"} />
        </Group>
        <TextInput
          withAsterisk
          label={intl.formatMessage({ id: "shopes.address" })}
          placeholder={intl.formatMessage({
            id: "shopes.address",
          })}
          {...form.getInputProps("location")}
          required
        />

        <Group position="right" my={20}>
          <Button type="submit" onClick={prevStep}>
            <FormattedMessage id="shopes.prev" />
          </Button>
          <Button type="submit" onClick={nextStep}>
            <FormattedMessage id="shopes.next" />
          </Button>
        </Group>
      </form>
    </Group>
  );
};

export default StoreLocationForm;
