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

function SignIn() {
  const [status, setStatus] = useState<
    "idle" | "success" | "error" | "loading"
  >("idle");
  const { mutate } = useSWRConfig();
  const { authorize } = useUser();
  const handleError = useErrorHandler();
  const intl = useIntl();

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
    <Box sx={{ maxWidth: 340, margin: "10% 0" }} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Text sx={{ fontSize: "24px", textAlign: "center", fontWeight: 600 }}>
          <FormattedMessage id="signIn.title" />
        </Text>
        <TextInput
          label={intl.formatMessage({ id: "signIn.textLabel" })}
          placeholder={intl.formatMessage({ id: "signIn.textPlaceholder" })}
          {...form.getInputProps("email")}
          sx={{ margin: "20px 0" }}
          id="email"
          name="email"
          type="email"
          autocomplete="username"
          required
        />
        <PasswordInput
          label={intl.formatMessage({ id: "signIn.passwordLabel" })}
          placeholder={intl.formatMessage({ id: "signIn.passwordPlaceholder" })}
          {...form.getInputProps("password")}
          id="password"
          name="password"
          type={"password"}
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
  );
}

export default SignIn;
