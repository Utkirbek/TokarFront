import { useForm } from "@mantine/form";
import { PasswordInput, Group, Button, Box, TextInput } from "@mantine/core";
import { useRouter } from "next/router";

function SignIn() {
  const router = useRouter();
  const form = useForm({
    initialValues: {
      password: "secret",
      email: "test@test.com",
    },

    validate: {
      email: (value) => (/^\S+@\S+$/.test(value) ? null : "Invalid email"),
      password: (value) => (value.length >= 8 ? null : "Password is not valid"),
    },
  });

  const handleSubmit = (values: { password: string; email: string }) => {
    let headers = new Headers();
    headers.append("Accept", "application/json");
    headers.append("Content-Type", "application/json");

    let body = JSON.stringify(values);

    let requestOptions = {
      method: "POST",
      headers,
      body,
      redirect: "follow",
    };

    fetch(
      "https://toker-mevqk13mg-utkirbek.vercel.app/api/admin/login",
      requestOptions as any
    )
      .then((response) => response.json())
      .then((result) => {
        // TODO implement
        console.log(result);
        if (result.token) {
          router.push("/");
        }
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <Box sx={{ maxWidth: 340 }} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <TextInput
          withAsterisk
          label="Email"
          placeholder="your@email.com"
          {...form.getInputProps("email")}
        />
        <PasswordInput
          label="Password"
          placeholder="Password"
          {...form.getInputProps("password")}
        />
        <Group position="right" mt="md">
          <Button type="submit">Submit</Button>
        </Group>
      </form>
    </Box>
  );
}

export default SignIn;
