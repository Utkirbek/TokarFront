import FormDrawer from "@components/Drawer/FormDrawer";
import SearchAutoComplete from "@components/SearchAutoComplete";
import If from "@components/smart/If";
import {
  ActionIcon,
  Box,
  Button,
  Chip,
  Grid,
  Pagination,
  ScrollArea,
} from "@mantine/core";
import { useMediaQuery, useToggle } from "@mantine/hooks";
import productFetchers from "@services/api/productFetchers";
import { IconPlus } from "@tabler/icons";
import { Permissions } from "@utils/constants";
import { useRouter } from "next/router";
import { memo, useCallback, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";
import { useCart } from "react-use-cart";

import BuyCart from "../buyCart/BuyCart";
import CardView from "../CardView";
import FormProduct from "../form/FormAdd";
import useStyles from "../form/style/inputStyle";
import TableView from "../TableView";
import ProductDetails from "./components/ProductDetails";

function ProductsTable({
  data,
  page,
  onPageChange,
  total,
  minQuantity,
  noPrice,
  toggleMinQuantity,
  toggleNoPrice,
}: {
  data: any;
  page: number;
  onPageChange: (page: number) => void;
  total: number;
  minQuantity: boolean;
  noPrice: boolean;
  toggleMinQuantity: (bool?: boolean) => void;
  toggleNoPrice: (bool?: boolean) => void;
}) {
  const [editItem, setEditItem] = useState<{ _id?: string }>({});
  const [searchResults, setSearchResults] = useState([]);
  const [opened, toggleOpened] = useToggle();
  const [isResultsActive, toggleResultsActive] = useToggle();

  const isMobile = useMediaQuery("(max-width: 600px)");

  const intl = useIntl();
  const router = useRouter();
  const { isEmpty } = useCart();
  const { classes } = useStyles();

  const onEdit = useCallback((item: any) => {
    setEditItem(item);
    toggleOpened(true);
  }, []);

  const handleClick = useCallback(() => {
    toggleOpened(true);
    setEditItem({});
  }, []);

  const onSearchResults = useCallback((results: any) => {
    setSearchResults(results);
    toggleResultsActive(true);
  }, []);

  const onSearchClear = useCallback(() => {
    setSearchResults([]);
    toggleResultsActive(false);
  }, []);

  const onFilterChipChange = useCallback(
    (value: string) => {
      switch (value) {
        case "min_quantity":
          if (noPrice) toggleNoPrice(false);
          toggleMinQuantity();
          router.push("/products", {
            query: {
              min_quantity: !minQuantity,
              no_price: false,
              page: 1,
            },
          });
          break;
        case "no_price":
          if (minQuantity) toggleMinQuantity(false);
          toggleNoPrice();
          router.push("/products", {
            query: {
              min_quantity: false,
              no_price: !noPrice,
              page: 1,
            },
          });
          break;
        default:
          if (minQuantity) toggleMinQuantity(false);
          if (noPrice) toggleNoPrice(false);
          router.push("/products", {
            query: {
              min_quantity: false,
              no_price: false,
              page: page,
            },
          });
          break;
      }
    },
    [minQuantity, noPrice, toggleMinQuantity, toggleNoPrice]
  );

  const activeData = isResultsActive ? searchResults : data;

  return (
    <Box sx={{ height: "100%" }}>
      <FormDrawer
        {...{
          opened,
          toggleOpened,
          title: intl.formatMessage(
            {
              id: "products.addEdit",
            },
            {
              isNew: !editItem._id,
            }
          ),
        }}
      >
        <ScrollArea
          style={{ height: "100%", paddingBottom: 60 }}
          scrollbarSize={2}
        >
          <FormProduct
            handleClose={() => toggleOpened(false)}
            editItem={editItem}
          />
        </ScrollArea>
      </FormDrawer>

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 5,
        }}
      >
        <SearchAutoComplete
          searchResults={searchResults}
          onSearchResults={onSearchResults}
          onClear={onSearchClear}
          fetcher={productFetchers.getProductByTitle}
        />
        <If hasPerm={Permissions.products.create}>
          <If condition={!isMobile}>
            <Button
              className={classes.add}
              onClick={handleClick}
              variant={"outline"}
            >
              <FormattedMessage id="products.add" />
            </Button>
          </If>
        </If>
      </Box>

      <Grid pt={10}>
        <Grid.Col
          span={isEmpty ? 12 : 9}
          sm={isEmpty ? 12 : 6}
          md={isEmpty ? 12 : 7}
          lg={isEmpty ? 12 : 9}
          sx={{
            display: "flex",
            flexFlow: "column",
            justifyContent: "space-between",
          }}
        >
          <Chip.Group
            position="left"
            my={5}
            onChange={onFilterChipChange}
            defaultValue="clear"
            value={
              minQuantity ? "min_quantity" : noPrice ? "no_price" : "clear"
            }
          >
            <If hasPerm={Permissions.products.originalPrice}>
              <Chip value={"no_price"}>
                <FormattedMessage id="products.no_price" />
              </Chip>
            </If>
            <Chip value={"min_quantity"}>
              <FormattedMessage id="products.min_quantity" />
            </Chip>
            <Chip value={"clear"}>
              <FormattedMessage id="clear" />
            </Chip>
          </Chip.Group>
          <Box className={classes.tableView}>
            <TableView
              onEdit={onEdit}
              minStock={minQuantity}
              data={activeData}
            />
          </Box>
          <Box className={classes.cardView}>
            <CardView data={activeData} onEdit={onEdit} />
          </Box>
          <Box className={classes.cardPagination}>
            <Pagination
              siblings={0}
              my={10}
              page={page}
              styles={(theme) => ({
                item: {
                  "&[data-active]": {
                    backgroundImage: theme.fn.gradient({
                      from: "red",
                      to: "yellow",
                    }),
                  },
                },
              })}
              total={total}
              onChange={onPageChange}
            />
          </Box>
        </Grid.Col>
        <If condition={!isEmpty}>
          <Grid.Col span={3} sm={6} md={5} lg={3}>
            <BuyCart />
          </Grid.Col>
        </If>
      </Grid>
      <ProductDetails products={data} />
      {isMobile && (
        <ActionIcon
          onClick={handleClick}
          variant="filled"
          sx={{
            position: "fixed",
            bottom: 70,
            right: 20,
            borderRadius: "50%",
            backgroundColor: "#1971C2",
            color: "#fff",
          }}
          size="xl"
        >
          <IconPlus />
        </ActionIcon>
      )}
    </Box>
  );
}

export default memo(ProductsTable);
