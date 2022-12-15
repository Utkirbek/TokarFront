import FormattedLocalTime from "@components/FormattedLocalTime";
import TableHead from "@components/Table/TableHead";
import useConfirmation from "@hooks/useConfirmation";
import useNotification from "@hooks/useNotification";
import {
  ActionIcon,
  Box,
  Button,
  Group,
  ScrollArea,
  SimpleGrid,
  Table,
  TextInput,
} from "@mantine/core";
import useCurrency from "@services/hooks/useCurrency";
import { IconTrash } from "@tabler/icons";
import { useRef } from "react";
import { FormattedMessage } from "react-intl";

import CurrencyCard from "./component/currencyCard";
import useCurrencyStyles from "./component/currencyStyle";

type Props = {
  data?: any;
};

const CurrencyTable = ({ data }: Props) => {
  const { classes } = useCurrencyStyles();
  const {
    showLoadingNotification,
    showSuccessNotification,
    showErrorNotification,
  } = useNotification();
  const { openConfirm } = useConfirmation();
  const { deleteCurrency } = useCurrency();

  const handleDelete = async function (id: string) {
    deleteCurrency(id, {
      onSuccess: () => {
        showSuccessNotification();
      },
      onError: () => {
        showErrorNotification();
      },
    });
  };

  const openDeleteModal = (id: string, name: string) =>
    openConfirm(null, {
      onConfirm: async () => {
        showLoadingNotification();
        handleDelete(id);
      },
      onCancel: () => {
        showSuccessNotification();
      },
    });

  const rows = data.map((item: any) => {
    return (
      <TableRow key={item._id} item={item} openDeleteModal={openDeleteModal} />
    );
  });

  const CardRow = data.map((item: any) => {
    return (
      <CurrencyCard
        item={item}
        key={item._id}
        openDeleteModal={openDeleteModal}
      />
    );
  });

  return (
    <ScrollArea>
      <Table
        sx={{ minWidth: 800 }}
        verticalSpacing="sm"
        className={classes.currencyTable}
      >
        <TableHead
          data={{
            currency: true,
            currencyAmount: true,
            createdAt: true,
            delete: true,
          }}
          prefix={"expenses"}
        />
        <tbody>{rows}</tbody>
      </Table>
      <SimpleGrid
        cols={4}
        spacing="md"
        breakpoints={[
          { maxWidth: 900, cols: 3, spacing: "sm" },
          { maxWidth: 750, cols: 2, spacing: "xs" },
          { maxWidth: 450, cols: 1, spacing: "xs" },
        ]}
      >
        {CardRow}
      </SimpleGrid>

      <Box></Box>
    </ScrollArea>
  );
};

export default CurrencyTable;

const TableRow = ({
  item,
  openDeleteModal,
}: {
  item: any;
  openDeleteModal: any;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const { classes } = useCurrencyStyles();
  const { editCurrency } = useCurrency();
  const {
    showLoadingNotification,
    showSuccessNotification,
    showErrorNotification,
  } = useNotification();

  const handleCurrencyEdit = async (id: string) => {
    showLoadingNotification();
    await editCurrency(
      {
        id: id,
        equalsTo: inputRef.current?.value,
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
    <tr>
      <td>{item?.name}</td>
      <td>
        <TextInput
          defaultValue={item.equalsTo}
          ref={inputRef}
          className={classes.input}
        />
      </td>
      <td>
        <FormattedLocalTime date={item?.createdAt} />
      </td>
      <td className={classes.amalTd}>
        <ActionIcon>
          <IconTrash
            className={classes.iconTrash}
            onClick={() => openDeleteModal(item._id, item.name)}
          />
        </ActionIcon>
        <Button onClick={() => handleCurrencyEdit(item._id)}>
          <FormattedMessage id="saveCurrency" />
        </Button>
      </td>
    </tr>
  );
};
