import useUser from "@hooks/shared/useUser";
import {
  Box,
  Button,
  Group,
  PasswordInput,
  Text,
  TextInput,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import authFetchers from "@services/api/authFetchers";
import { RequestQueryKeys } from "@utils/constants";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useState } from "react";
import { useErrorHandler } from "react-error-boundary";
import { FormattedMessage, useIntl } from "react-intl";
import { useSWRConfig } from "swr";

import useStyles from "./signInStyle";

function SignIn() {
  const [status, setStatus] = useState<
    "idle" | "success" | "error" | "loading"
  >("idle");
  const { mutate } = useSWRConfig();
  const { authorize } = useUser();
  const handleError = useErrorHandler();
  const intl = useIntl();
  const { classes } = useStyles();

  const router = useRouter();
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
      delete res.token;
      authorize(res);
      router.push("/");
      setStatus("success");
    } catch (err) {
      handleError(err);
      setStatus("error");
    }
  };

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        minHeight: "100vh",
        backgroundImage: `
        linear-gradient(to right, rgba(0, 0, 0, 0.9), rgba(9, 06, 25, 0.9)),
          url(https://t3.ftcdn.net/jpg/04/17/77/78/360_F_417777825_v7o8RvkQhxpZkE0ZBD4xwzri5hGFHkO3.jpg)
        `,
        backgroundSize: "cover",
      }}
    >
      <Box className={classes.boxForm}>
        <Box>
          <form
            className={classes.boxLeft}
            onSubmit={form.onSubmit(handleSubmit)}
          >
            <Text
              sx={{ fontSize: "32px", textAlign: "center", fontWeight: 900 }}
            >
              <FormattedMessage id="signIn.title" />
            </Text>
            <TextInput
              withAsterisk
              label={intl.formatMessage({
                id: "signIn.textLabel",
              })}
              placeholder={intl.formatMessage({
                id: "signIn.textPlaceholder",
              })}
              {...form.getInputProps("email")}
              sx={{ margin: "20px 0" }}
              id="email"
              name="email"
              type="email"
              required
            />
            <PasswordInput
              label={intl.formatMessage({ id: "signIn.passwordLabel" })}
              placeholder={intl.formatMessage({
                id: "signIn.passwordPlaceholder",
              })}
              {...form.getInputProps("password")}
              id="password"
              name="password"
              autoComplete={"current-password"}
              required
            />
            <Group position="right" mt="md">
              <Button loading={status === "loading"} type="submit">
                <FormattedMessage id="submit" />
              </Button>
            </Group>
          </form>
        </Box>
      </Box>
    </Box>
  );
}

export default SignIn;
