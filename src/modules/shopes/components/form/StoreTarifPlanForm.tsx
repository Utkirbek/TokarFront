import { Button, Checkbox, Group, Text } from "@mantine/core";
import useStyle from "@modules/shopes/styles/shopStyle";
import React from "react";
import { FormattedMessage } from "react-intl";

const StoreTarifPlanForm: React.FC<{
  prevStep: any;
  handleSubmit: any;
}> = ({ prevStep, handleSubmit }) => {
  const { classes } = useStyle();

  return (
    <Group sx={{ display: "flex", flexDirection: "column" }}>
      <Text size={24}>
        <FormattedMessage id="shopes.newShop.tarifPlan" />
      </Text>
      <Text>
        <FormattedMessage id="shopes.newShop.likeTarif" />
      </Text>
      <Text className={classes.choose}>
        <Checkbox size="md" />
        <FormattedMessage id="shopes.newShop.sms" />
      </Text>
      <Text className={classes.choose}>
        <Checkbox size="md" />
        <FormattedMessage id="shopes.newShop.bot" />
      </Text>
      <Text className={classes.choose}>
        <Checkbox size="md" />
        <FormattedMessage id="shopes.newShop.onlineShop" />
      </Text>

      <Group position="right" my={20}>
        <Button type="submit" onClick={prevStep}>
          <FormattedMessage id="shopes.prev" />
        </Button>
        <Button type="submit" onClick={() => handleSubmit()}>
          <FormattedMessage id="shopes.next" />
        </Button>
      </Group>
    </Group>
  );
};

export default StoreTarifPlanForm;
