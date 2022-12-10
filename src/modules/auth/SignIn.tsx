import ConfettiComponent from "@components/Confetti/Confetti";
import HeadSkeletonUI from "@components/skeleton/HeadSkeletonUI";
import WithLoading from "@hoc/WithLoading";
import useUser from "@hooks/shared/useUser";
import {
  Box,
  Button,
  Center,
  Group,
  PasswordInput,
  SegmentedControl,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import authFetchers from "@services/api/authFetchers";
import useShop from "@services/hooks/useShop";
import { IconBuildingStore } from "@tabler/icons";
import { RequestQueryKeys } from "@utils/constants";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useErrorHandler } from "react-error-boundary";
import { FormattedMessage, useIntl } from "react-intl";
import { useSWRConfig } from "swr";

import AuthStepper from "./components/AuthStepper";
import useStyles from "./signInStyle";

function SignIn() {
  const [activeStep, setActiveStep] = useState<0 | 1 | 2 | 3>(0);
  const [status, setStatus] = useState<
    "idle" | "success" | "error" | "loading"
  >("idle");
  const { authorize } = useUser();
  const intl = useIntl();
  const handleError = useErrorHandler();
  const { mutate } = useSWRConfig();
  const { classes } = useStyles();

  const form = useForm({
    initialValues: {
      password: "",
      email: "",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length >= 8 ? null : "Password is not valid"),
    },
  });

  const handleSubmit = async (values: { password: string; email: string }) => {
    setStatus("loading");
    try {
      const res = await mutate(
        RequestQueryKeys.login,
        authFetchers.login(values),
        false
      );
      setCookie("token", res.token, {
        expires: new Date(Date.now() + 86400000),
      });
      authorize(res);
      setActiveStep(1);
      setStatus("success");
    } catch (err) {
      handleError(err);
      setStatus("error");
    }
  };

  const contents = {
    0: (
      <Box className={classes.boxLeft}>
        <form onSubmit={form.onSubmit(handleSubmit)} autoComplete="off">
          <Text className={classes.text}>
            <FormattedMessage id="signIn.title" />
          </Text>
          <TextInput
            required
            withAsterisk
            label={intl.formatMessage({ id: "signIn.textLabel" })}
            placeholder={intl.formatMessage({ id: "signIn.textPlaceholder" })}
            {...form.getInputProps("email")}
            my={10}
            type="text"
            autoComplete="off"
            readOnly
            onFocus={(e) => e.target.removeAttribute("readonly")}
          />
          <PasswordInput
            required
            withAsterisk
            label={intl.formatMessage({ id: "signIn.passwordLabel" })}
            placeholder={intl.formatMessage({
              id: "signIn.passwordPlaceholder",
            })}
            {...form.getInputProps("password")}
            autoComplete={"off"}
            readOnly
            onFocus={(e) => e.target.removeAttribute("readonly")}
          />
          <Group position="right" mt="md">
            <Button loading={status === "loading"} type="submit">
              <FormattedMessage id="next" />
            </Button>
          </Group>
        </form>
      </Box>
    ),
    1: <ShopsWrapper onNext={() => setActiveStep(2)} />,
    2: <ComponentCongrats onNext={() => setActiveStep(3)} />,
  };

  return (
    <Box className={classes.boxForm}>
      <AuthStepper activeStep={activeStep} loading={status === "loading"} />
      {contents[activeStep > 2 ? 2 : (activeStep as 0 | 1 | 2)]}
    </Box>
  );
}

export default SignIn;

type Shop = { _id: string; location: string; name: string };

const ShopSelectSection = ({
  onNext,
  data: shopsData,
}: {
  onNext: VoidFunction;
  data: any;
}) => {
  const name = useUser((user) => user.name);

  const form = useForm<{
    shop: string;
  }>({
    initialValues: {
      shop: shopsData?.[0]?._id,
    },
  });

  const shops = shopsData?.map((shop: Shop) => ({
    value: shop._id,
    label: (
      <Center>
        <IconBuildingStore size={16} />
        <Box ml={10}>{shop?.name}</Box>
      </Center>
    ),
  }));

  const handleSubmit = (data: { shop: string }) => {
    const chosenShop = shopsData?.find((shop: Shop) => shop._id === data.shop);
    setCookie("shopId", data.shop, {
      expires: new Date(Date.now() + 86400000),
    });
    setCookie("shopName", chosenShop?.name, {
      expires: new Date(Date.now() + 86400000),
    });
    setCookie("isLoggedIn", true, {
      expires: new Date(Date.now() + 86400000),
    });
    onNext();
  };
  const isMobile = useMediaQuery("(max-width: 600px)");

  return (
    <Box
      component="form"
      onSubmit={form.onSubmit(handleSubmit)}
      sx={{ textAlign: "center" }}
    >
      <h1>Xush kelibsiz {name}</h1>
      <p>Marxamat qilib bugungi ish joyingizni tanlang</p>

      <Group position="center">
        <SegmentedControl
          data={shops}
          {...form.getInputProps("shop")}
          orientation={isMobile ? "vertical" : null}
        />
      </Group>
      <Group position={isMobile ? "center" : "right"} mt="md">
        <Button loading={!shopsData} type="submit">
          <FormattedMessage id="next" />
        </Button>
      </Group>
    </Box>
  );
};

const ComponentCongrats = ({ onNext }: { onNext: VoidFunction }) => {
  const { authNext } = useUser();
  const router = useRouter();

  React.useEffect(() => {
    onNext();
    const timeout = setTimeout(() => {
      authNext();
      router.push("/");
    }, 2000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <Box>
      <ConfettiComponent />
    </Box>
  );
};

const ShopsWrapper = ({ onNext }: { onNext: VoidFunction }) => {
  const { useFetchShop } = useShop();
  const shopQuery = useFetchShop();

  return (
    <WithLoading query={shopQuery} FallbackLoadingUI={HeadSkeletonUI}>
      <ShopSelectSection data={shopQuery.data} onNext={onNext} />
    </WithLoading>
  );
};
