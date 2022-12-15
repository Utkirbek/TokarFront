import { Stepper } from "@mantine/core";
import {
  IconBuildingStore,
  IconShieldCheck,
  IconUserCheck,
} from "@tabler/icons";
import React from "react";

import useStyles from "./../signInStyle";

interface AuthStepperProps {
  activeStep: number;
  loading: boolean;
}

const AuthStepper: React.FC<AuthStepperProps> = ({
  activeStep = 0,
  loading,
}) => {
  const { classes } = useStyles();
  return (
    <Stepper
      active={activeStep}
      breakpoint="sm"
      size="xl"
      iconSize={60}
      className={classes.stepper}
    >
      <Stepper.Step
        label="Qadam 1"
        description="Account Ma'lumotlari"
        icon={<IconUserCheck size={18} />}
        loading={activeStep === 0 && loading}
      />
      <Stepper.Step
        label="Qadam 2"
        description="Do'kon tarmog'ini tanlang"
        icon={<IconBuildingStore size={18} />}
        loading={activeStep === 1 && loading}
      />
      <Stepper.Step
        label="Qadam 3"
        description="To'liq ruxsat olish"
        icon={<IconShieldCheck size={18} />}
        loading={activeStep === 2 && loading}
      />
    </Stepper>
  );
};

export default AuthStepper;
