import TableHead from "@components/Table/TableHead";
import useConfirmation from "@hooks/useConfirmation";
import useNotification from "@hooks/useNotification";
import {
  ActionIcon,
  Button,
  Group,
  ScrollArea,
  Table,
  TextInput,
} from "@mantine/core";
import useCurrency from "@services/hooks/useCurrency";
import { IconTrash } from "@tabler/icons";
import { useRef } from "react";
import { FormattedDate, FormattedMessage, FormattedTime } from "react-intl";

type Props = {
  data?: any;
};

const CurrencyTable = ({ data }: Props) => {
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

  return (
    <ScrollArea>
      <Group position="right" mx={"xl"} my={"xl"}></Group>
      <Table sx={{ minWidth: 800 }} verticalSpacing="sm">
        <TableHead
          data={{
            currency: true,
            currencyAmount: true,
            createdAt: true,
            updatedAt: true,
            delete: true,
          }}
          prefix={"expenses"}
        />
        <tbody>{rows}</tbody>
      </Table>
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
          style={{ width: "100px" }}
          ref={inputRef}
        />
      </td>
      <td>
        <FormattedTime value={item?.createdAt} />
        ,&nbsp;
        <FormattedDate
          value={item?.createdAt}
          month="numeric"
          year="numeric"
          day="numeric"
        />
      </td>
      <td>
        <FormattedTime value={item.updatedAt} />
        ,&nbsp;
        <FormattedDate
          value={item.updatedAt}
          month="numeric"
          year="numeric"
          day="numeric"
        />
      </td>
      <td
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          marginBottom: "-5px",
        }}
      >
        <ActionIcon>
          <IconTrash
            onClick={() => openDeleteModal(item._id, item.name)}
            style={{ color: "red", cursor: "pointer" }}
          />
        </ActionIcon>
        <Button onClick={() => handleCurrencyEdit(item._id)}>
          <FormattedMessage id="saveCurrency" />
        </Button>
      </td>
    </tr>
  );
};
