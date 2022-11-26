import useNotification from "@hooks/useNotification";
import { Box, Button, Group, Stepper, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import useStyles from "@modules/shopes/styles/shopStyle";
import useShop from "@services/hooks/useShop";
import { IconCircleCheck } from "@tabler/icons";
import Link from "next/link";
import { useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

import StoreLocationForm from "../components/form/StoreLocationForm";
import StoreNameForm from "../components/form/StoreNameForm";
import StoreTarifPlanForm from "../components/form/StoreTarifPlanForm";

const NewShop = () => {
  const [active, setActive] = useState(0);
  const { classes } = useStyles();
  const { addShop } = useShop();
  const intl = useIntl();

  const { showSuccessNotification, showErrorNotification } = useNotification();

  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  const form = useForm({
    initialValues: {
      name: "",
      location: "",
    },
  });

  const handleSubmit = async (values: { name: string; location: string }) => {
    addShop(
      {
        ...form.values,
      },
      {
        onSuccess: () => {
          showSuccessNotification();
        },
        onError: () => {
          showErrorNotification();
        },
      }
    );
    nextStep();
  };
  return (
    <Box className={classes.boxHead}>
      <Text className={classes.title}>
        <FormattedMessage id="shopes.newShop.add" />
      </Text>
      <Box>
        <Box sx={{ width: "60%", margin: "0  auto" }}>
          <Stepper active={active} onStepClick={setActive} breakpoint="sm">
            <Stepper.Step
              label={intl.formatMessage({ id: "shopes.newShop.formOne" })}
              description={intl.formatMessage({ id: "shopes.name" })}>
              <StoreNameForm nextStep={nextStep} form={form} />
            </Stepper.Step>

            <Stepper.Step
              label={intl.formatMessage({ id: "shopes.newShop.formTwo" })}
              description={intl.formatMessage({ id: "shopes.address" })}>
              <StoreLocationForm
                prevStep={prevStep}
                nextStep={nextStep}
                form={form}
              />
            </Stepper.Step>

            <Stepper.Step
              label={intl.formatMessage({ id: "shopes.newShop.formTree" })}
              description={intl.formatMessage({
                id: "shopes.newShop.confirm",
              })}>
              <StoreTarifPlanForm
                prevStep={prevStep}
                handleSubmit={handleSubmit}
              />
            </Stepper.Step>

            <Stepper.Completed>
              <Group
                position="center"
                sx={{ display: "flex", flexDirection: "column" }}>
                <IconCircleCheck size={100} color={"teal"} />
                <Text size={24}>
                  <FormattedMessage id="shopes.newShop.succsess" />
                </Text>

                <Link href={"/shopes"}>
                  <Button>
                    <FormattedMessage id="shopes.newShop.back" />
                  </Button>
                </Link>
              </Group>
            </Stepper.Completed>
          </Stepper>
        </Box>
      </Box>
    </Box>
  );
};

export default NewShop;
