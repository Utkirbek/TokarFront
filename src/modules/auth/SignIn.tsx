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
import { useSWRConfig } from "swr";

function SignIn() {
  const { mutate } = useSWRConfig();
  const { authorize } = useUser();

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
    const res = await mutate(
      RequestQueryKeys.login,
      authFetchers.login(values),
      false
    );
    setCookie("token", res.token);
    delete res.token;
    authorize(res);
    router.push("/");
  };

  return (
    <Box sx={{ maxWidth: 340, margin: "10% 0" }} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Text sx={{ fontSize: "24px", textAlign: "center", fontWeight: 600 }}>
          Platformaga Kirish
        </Text>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
          sx={{ margin: "20px 0" }}
          required
        />
        <PasswordInput
          label="Parol"
          placeholder="Password"
          {...form.getInputProps("password")}
          required
        />
        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

export default SignIn;
