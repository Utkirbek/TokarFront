import { showNotification, updateNotification } from "@mantine/notifications";
import { IconCheck } from "@tabler/icons";
import { useCallback } from "react";
import { useIntl } from "react-intl";

const useNotify = () => {
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
          id: messageId || "notification.loadingMessage",
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
          id: messageId || "notification.successMessage",
        }),
        icon: <IconCheck size={16} />,
        autoClose: 2000,
      });
    },
    [intl]
  );

  return {
    showLoadingNotification,
    showSuccessNotification,
  };
};

export default useNotify;
