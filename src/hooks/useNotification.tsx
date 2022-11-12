import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";
import { useCallback } from "react";
import { useIntl } from "react-intl";

const useNotification = () => {
  const intl = useIntl();

  const showLoadingNotification = useCallback(
    (messageId?: string, options?: { titleId?: string }) => {
      showNotification({
        id: "load-data",
        loading: true,
        title: intl.formatMessage({
          id: options?.titleId || "notification.loading",
        }),
        message: intl.formatMessage({
          id: messageId || "notification.loadingDescription",
        }),
        autoClose: 5000,
        disallowClose: true,
      });
    },
    [intl]
  );

  const showSuccessNotification = useCallback(
    (messageId?: string, options?: { titleId?: string }) => {
      return updateNotification({
        id: "load-data",
        color: "teal",
        title: intl.formatMessage({
          id: options?.titleId || "notification.success",
        }),
        message: intl.formatMessage({
          id: messageId || "notification.successDescription",
        }),
        icon: <IconCheck size={16} />,
        autoClose: 2000,
      });
    },
    [intl]
  );
  const showReSuccessNotification = useCallback(
    (messageId?: string, options?: { titleId?: string }) => {
      showNotification({
        title: intl.formatMessage({
          id: options?.titleId || "notification.success",
        }),
        message: intl.formatMessage({
          id: messageId || "notification.successDescription",
        }),
        icon: <IconCheck />,

        styles: (theme) => ({
          root: {
            "&::before": { backgroundColor: theme.colors.teal },
          },
          title: { color: theme.white },
          description: { color: theme.white },
          closeButton: {
            color: theme.white,
            "&:hover": { backgroundColor: theme.colors.blue[7] },
          },
        }),
      });
    },
    [intl]
  );
  const showErrorNotification = useCallback(
    (messageId?: string, options?: { titleId?: string }) => {
      showNotification({
        title: intl.formatMessage({
          id: options?.titleId || "notification.error",
        }),
        message: intl.formatMessage({
          id: messageId || "notification.errorDescription",
        }),
        icon: <IconX />,
        color: "red",
        styles: (theme) => ({
          root: {
            "&::before": { backgroundColor: theme.colors.teal },
          },
          title: { color: theme.white },
          description: { color: theme.white },
          closeButton: {
            color: theme.white,
            "&:hover": { backgroundColor: theme.colors.blue[7] },
          },
        }),
      });
    },
    [intl]
  );

  return {
    showLoadingNotification,
    showSuccessNotification,
    showReSuccessNotification,
    showErrorNotification,
  };
};

export default useNotification;
