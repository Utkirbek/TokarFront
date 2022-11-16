import { Text } from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import React from "react";
import { FormattedMessage, useIntl } from "react-intl";

const useConfirmation = () => {
  const intl = useIntl();

  const openConfirm = (
    children: React.ReactNode,
    {
      titleId = "default.title",
      onConfirm,
      onCancel,
    }: { titleId?: string; onConfirm?: () => void; onCancel?: () => void }
  ) => {
    openConfirmModal({
      title: intl.formatMessage({ id: titleId }),
      centered: true,
      children: children || (
        <Text size="sm">
          <FormattedMessage id="default.message" />
        </Text>
      ),
      labels: {
        confirm: intl.formatMessage({ id: "default.confirm" }),
        cancel: intl.formatMessage({ id: "default.cancel" }),
      },
      confirmProps: { color: "red" },
      cancelProps: { color: "teal" },
      onConfirm,
      onCancel,
    });
  };

  return {
    openConfirm,
  };
};

export default useConfirmation;
