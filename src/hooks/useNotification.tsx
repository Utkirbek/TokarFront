import { Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck, IconX } from "@tabler/icons";
import { useCallback } from "react";
import { FormattedMessage, useIntl } from "react-intl";

const useNotification = () => {
  const intl = useIntl();

  const showLoadingNotification = useCallback(
    (messageId?: string, options?: { titleId?: string }) => {
      showNotification({
        id: "load-data",
        loading: true,
        title: intl.formatMessage({
          id: options?.titleId || "useNotify.loadTitle",
        }),
        message: intl.formatMessage({
          id: messageId || "useNotify.loadMsg",
        }),
        autoClose: 2000,
        disallowClose: true,
      });
    },
    [intl]
  );

  const showSuccessNotification = useCallback(
    (messageId?: string, options?: { titleId?: string }) => {
      updateNotification({
        id: "load-data",
        color: "teal",
        title: intl.formatMessage({
          id: options?.titleId || "useNotify.successTitle",
        }),
        message: intl.formatMessage({
          id: messageId || "useNotify.successMsg",
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
          id: options?.titleId || "useNotify.successTitle",
        }),
        message: intl.formatMessage({
          id: messageId || "useNotify.successMsg",
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
          id: options?.titleId || "useNotify.errorTitle",
        }),
        message: intl.formatMessage({
          id: messageId || "useNotify.errorMsg",
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
