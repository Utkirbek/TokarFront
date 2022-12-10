import {
  ActionIcon,
  Button,
  Flex,
  Group,
  Paper,
  SegmentedControl,
  Tooltip,
} from "@mantine/core";
import salesMethods from "@modules/products/components/buyCart/data";
import { IconPrinter, IconReceiptRefund } from "@tabler/icons";
import React from "react";
import { FormattedMessage } from "react-intl";

interface ActionsTooltipProps {}

const ActionsTooltip: React.FC<ActionsTooltipProps> = ({}) => {
  return (
    <Paper px={5}>
      <Flex justify={"space-between"}>
        <Group position="left">
          <SegmentedControl
            fullWidth
            color="orange"
            data={salesMethods.map(
              (item: { label: string; value: string }) => ({
                label: <FormattedMessage id={item.label} />,
                value: item.value,
              })
            )}
            // {...form.getInputProps("paymentMethod")}
          />
        </Group>
        <Group position="right">
          <Tooltip label="Qaytarish">
            <ActionIcon size={55}>
              <IconReceiptRefund />
            </ActionIcon>
          </Tooltip>
          <Tooltip label="Check chiqarish">
            <ActionIcon size={55}>
              <IconPrinter />
            </ActionIcon>
          </Tooltip>
          <Button>Sotish</Button>
        </Group>
      </Flex>
    </Paper>
  );
};

export default ActionsTooltip;
