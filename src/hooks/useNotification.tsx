import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
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

  const showErrorNotification = useCallback(
    (messageId?: string, options?: { titleId?: string }) => {
      updateNotification({
        id: "load-data",
        color: "red",
        title: intl.formatMessage({
          id: options?.titleId || "notification.error",
        }),
        message: intl.formatMessage({
          id: messageId || "notification.errorDescription",
        }),
        autoClose: false,
        disallowClose: false,
      });
    },
    [intl]
  );

  return {
    showLoadingNotification,
    showSuccessNotification,
    showErrorNotification,
  };
};

export default useNotification;
