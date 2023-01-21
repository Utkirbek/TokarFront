import FormDrawer from "@components/Drawer/FormDrawer";
import FormattedLocalTime from "@components/FormattedLocalTime";
import {
  selectRemoveSavedSale,
  selectSavedSales,
  selectUpdateSavedSale,
} from "@hooks/shared/selectors";
import useSalesState from "@hooks/shared/useSales";
import { ActionIcon, Button, Card, Group, Text } from "@mantine/core";
import ContentEditable from "@modules/products/components/contentEditable/ContentEditable";
import { IconTrash } from "@tabler/icons";
import { isValidString } from "@utils";
import { useRouter } from "next/router";
import queryString from "query-string";
import { useCart } from "react-use-cart";

type Props = {};

const SavedSalesDrawer = (props: Props) => {
  const router = useRouter();
  const query = queryString.parse(router.asPath.split("?")[1]);
  const savedSales = useSalesState(selectSavedSales);
  const removeSavedSale = useSalesState(selectRemoveSavedSale);
  const updateSavedSale = useSalesState(selectUpdateSavedSale);
  const { setItems } = useCart();
  const items = typeof savedSales === "object" ? Object.values(savedSales) : [];

  const handleClick = (item: any) => {
    setItems(item.cart);
    removeSavedSale(item.date);
    router.back();
  };

  const onEditLabel = (val: string, dateId: string) => {
    if (isValidString(val)) {
      updateSavedSale(dateId, val as string);
    }
  };

  return (
    <FormDrawer
      navBack
      opened={!!query.savedSales}
      title="Saqlangan Savdolar ro'yxati"
    >
      {items?.map((item, i) => {
        return (
          <Card
            key={item.date}
            shadow="md"
            radius="md"
            sx={{
              cursor: "pointer",
            }}
            mb="md"
          >
            <Card.Section inheritPadding py="md">
              <Group position="apart">
                <ContentEditable
                  value={item.label || `Saqlangan ${i + 1}`}
                  onFinish={(val) => onEditLabel(val as string, item.date)}
                />

                <ActionIcon onClick={() => removeSavedSale(item.date)}>
                  <IconTrash />
                </ActionIcon>
              </Group>
              <Group position="apart" mt="md">
                <Text>
                  <FormattedLocalTime date={item.date} />
                </Text>
                <Button variant="light" onClick={() => handleClick(item)}>
                  Qayta To&apos;ldirish
                </Button>
              </Group>
            </Card.Section>
          </Card>
        );
      })}
    </FormDrawer>
  );
};

export default SavedSalesDrawer;
