import useNotification from "@hooks/useNotification";
import { Box, Button, Group, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import useShop from "@services/hooks/useShop";
import { FormattedMessage, useIntl } from "react-intl";

import EditStyle from "./EditStyle";

const EditShop: React.FC<{ editItem: any; onClose: () => void }> = ({
  editItem,
  onClose,
}) => {
  const { classes } = EditStyle();
  const {
    showSuccessNotification,
    showErrorNotification,
    showLoadingNotification,
  } = useNotification();
  const intl = useIntl();
  const { editShop } = useShop();

  const form = useForm({
    initialValues: {
      name: editItem?.name ?? "",
      location: editItem?.location ?? "",
    },
  });

  const handleSubmit = async (values: { name: string; location: string }) => {
    showLoadingNotification();
    editShop(
      {
        id: editItem._id,
        values,
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
  };

  return (
    <Box mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Text size={"xl"} weight={700}>
          <FormattedMessage id="shopes.editTitle" />
        </Text>
        <TextInput
          withAsterisk
          name="name"
          label={intl.formatMessage({
            id: "shopes.name",
          })}
          placeholder={intl.formatMessage({
            id: "shopes.name",
          })}
          {...form.getInputProps("name")}
          my={"sm"}
          required
        />
        <TextInput
          withAsterisk
          name="location"
          label={intl.formatMessage({
            id: "shopes.address",
          })}
          placeholder={intl.formatMessage({
            id: "shopes.address",
          })}
          {...form.getInputProps("location")}
          my={"sm"}
          required
        />

        <Group position="right" mt="md">
          <Box className={classes.editBtn}>
            <Button
              type="submit"
              onClick={onClose}
              className={classes.editbutton}
            >
              <FormattedMessage id="shopes.btnSave" />
            </Button>
          </Box>
        </Group>
      </form>
    </Box>
  );
};
export default EditShop;
