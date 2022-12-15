import If from "@components/smart/If";
import useNotification from "@hooks/useNotification";
import {
  ActionIcon,
  Box,
  Button,
  Grid,
  SimpleGrid,
  Text,
  TextInput,
} from "@mantine/core";
import useCurrency from "@services/hooks/useCurrency";
import { IconTrash } from "@tabler/icons";
import { useRouter } from "next/router";
import { useRef } from "react";
import { FormattedMessage } from "react-intl";

import useCurrencyStyles from "./currencyStyle";

function CurrencyCard({
  item,
  openDeleteModal,
}: {
  item: any;
  openDeleteModal: any;
}) {
  const { classes } = useCurrencyStyles();

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
        <Box key={item._id} className={classes.currencyCard}>
          <Box className={classes.CurrencyCardBox}>
            <Box style={{ paddingTop: "8px" }}>
              <Box className={classes.currencyFlex}>
                <Text size={13}>{item?.name}</Text>
                <TextInput
                  defaultValue={item.equalsTo}
                  ref={inputRef}
                  className={classes.input}
                />
              </Box>

              <Box className={classes.currencyFlex}>
                <ActionIcon>
                  <IconTrash
                    className={classes.iconTrash}
                    onClick={() => openDeleteModal(item._id, item.name)}
                  />
                </ActionIcon>
                <Button
                  onClick={() => handleCurrencyEdit(item._id)}
                  className={classes.Btn}
                >
                  <FormattedMessage id="saveCurrency" />
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
  );
}

export default CurrencyCard;
