import ImageUploader from "@components/ImageUploader";
import useNotification from "@hooks/useNotification";
import { Box, Button, Group, Text, TextInput } from "@mantine/core";
import { useForm } from "@mantine/form";
import useStyles from "@modules/products/components/form/style/inputStyle";
import useUsers from "@services/hooks/useUsers";
import { useRef } from "react";
import { FormattedMessage,useIntl } from "react-intl";

const NewUser: React.FC<{
  handleClose: () => void;
  editItem: any;
}> = ({ handleClose, editItem }) => {
  const intl = useIntl()
  const imagesRef = useRef<string[]>([]);
  const { classes } = useStyles();
  const { addUser, editUser } = useUsers();
  const {
    showLoadingNotification,
    showSuccessNotification,
    showErrorNotification,
  } = useNotification();

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
          }}
        >
          {!editItem._id ? "Yangi Foydalanuvchi qo'shish" : "Tahrirlash"}
        </Text>
        <TextInput
          className={classes.inputStyle}
          withAsterisk
          label={intl.formatMessage({ id: "userTil.namelabel" })}
          placeholder={intl.formatMessage({ id: "userTil.namePlaceholder" })}
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
            hidden
          >
            Rasmni Olib Tashlash
          </Button>
        </Box>
        <TextInput
          className={classes.inputStyle}
          label={intl.formatMessage({ id: "userTil.numberLabel" })}
          placeholder={intl.formatMessage({ id: "userTil.numberPlaceholder" })}
          {...form.getInputProps("phone")}
          required
        />

        <TextInput
          className={classes.inputStyle}
          label={intl.formatMessage({ id: "userTil.workplaceLabel" })}
          placeholder={intl.formatMessage({
            id: "userTil.workplacePlaceholder",
          })}
          {...form.getInputProps("workplace")}
          required
        />
        <TextInput
          className={classes.inputStyle}
          label={intl.formatMessage({ id: "userTil.extraLabel" })}
          placeholder={intl.formatMessage({ id: "userTil.extraPlaceholder" })}
          {...form.getInputProps("extra")}
          required
        />

        <Group position="right" mt="md">
          <Button type="submit">
            {!editItem._id ? "Ro'yxatga Qo'shish" : "Saqlash"}
          </Button>
        </Group>
      </form>
    </Box>
  );
};
export default NewUser;
