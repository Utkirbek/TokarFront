import ImageUploader from "@components/ImageUploader";
import useNotification from "@hooks/useNotification";
import { Box, Button, Group, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import useStyles from "@modules/products/components/form/style/inputStyle";
import useUsers from "@services/hooks/useUsers";
import { useRef } from "react";
import { FormattedMessage, useIntl } from "react-intl";

const NewUser: React.FC<{
  handleClose: () => void;
  editItem: any;
  data: any;
}> = ({ handleClose, editItem, data }) => {
  const intl = useIntl();
  const imagesRef = useRef<string[]>([]);
  const { classes } = useStyles();
  const { addUser, editUser } = useUsers();
  const {
    showLoadingNotification,
    showSuccessNotification,
    showErrorNotification,
  } = useNotification();
  const inti = useIntl();

  const form = useForm({
    initialValues: {
      name: editItem?.name ?? "",
      phone: editItem?.phone ?? "",
      workplace: editItem?.workplace ?? "",
      extra: editItem?.extra ?? "",
    },
  });

  const handleSubmit = async (values: {
    name: string;
    phone: string;
    workplace: string;
    extra: string;
  }) => {
    handleClose();
    showLoadingNotification();

    const events = {
      onSuccess: () => showSuccessNotification(),
      onError: () => showErrorNotification(),
    };

    if (!!editItem._id) {
      editUser(
        {
          id: editItem._id,
          values: {
            ...values,
            image: imagesRef.current?.join(",") ?? editItem.image,
          },
        },
        events
      );
    } else {
      addUser(
        {
          ...values,
          image: imagesRef.current?.join(",") ?? "",
        },
        events
      );
    }
  };

  return (
    <Box sx={{ maxWidth: 440 }} mx="auto">
      <form onSubmit={form.onSubmit(handleSubmit)}>
        <Text
          sx={{
            fontSize: "24px",
            textAlign: "center",
            fontWeight: 700,
          }}>
          <FormattedMessage
            id="users.formTitle"
            values={{ isNew: !editItem._id }}
          />
        </Text>
        <TextInput
          className={classes.inputStyle}
          withAsterisk
          label={intl.formatMessage({ id: "users.nameLabel" })}
          placeholder={intl.formatMessage({ id: "users.namePlaceholder" })}
          {...form.getInputProps("name")}
          required
        />

        <Box sx={{ maxHeight: "160px", marginBottom: "40px" }}>
          <ImageUploader
            urlsRef={imagesRef}
            dropzoneProps={{
              pb: 0,
            }}
          />
          <Button
            variant="outline"
            sx={{ float: "right", margin: "10px 0" }}
            hidden>
            Rasmni Olib Tashlash
          </Button>
        </Box>
        <TextInput
          className={classes.inputStyle}
          label={intl.formatMessage({ id: "users.numberLabel" })}
          placeholder={intl.formatMessage({ id: "users.numberPlaceholder" })}
          {...form.getInputProps("phone")}
          required
        />

        <TextInput
          className={classes.inputStyle}
          label={intl.formatMessage({ id: "users.addressLabel" })}
          placeholder={intl.formatMessage({ id: "users.addressPlaceholder" })}
          {...form.getInputProps("workplace")}
          required
        />
        <TextInput
          className={classes.inputStyle}
          label={intl.formatMessage({ id: "users.additionLabel" })}
          placeholder={intl.formatMessage({
            id: "users.additionPlaceholder",
          })}
          {...form.getInputProps("extra")}
          required
        />

        <Group position="right" mt="md">
          <Button type="submit">
            <FormattedMessage id="addSmth" values={{ isNew: !editItem._id }} />
          </Button>
        </Group>
      </form>
    </Box>
  );
};
export default NewUser;
