import { Autocomplete, Button, Tooltip } from "@mantine/core";
import { useHotkeys, useMediaQuery } from "@mantine/hooks";
import useStyles from "@modules/products/components/form/style/inputStyle";
import { IconSearch } from "@tabler/icons";
import { useCallback, useEffect, useRef, useState } from "react";
import { useIntl } from "react-intl";

type Props = {
  onSearchResults: (value: any) => void;
  searchResults: any;
  fetcher: (value: string) => Promise<any>;
  onClear: () => void;
  placeholder?: string | React.ComponentType;
};

function SearchAutoComplete({
  onSearchResults,
  fetcher,
  searchResults,
  onClear,
}: Props) {
  const [value, setValue] = useState("");
  const isMobile = useMediaQuery("(max-width: 600px)");
  const autoCompleteRef = useRef<HTMLInputElement>(null);

  const intl = useIntl();
  const { classes } = useStyles();

  useHotkeys([
    ["F2", () => autoCompleteRef.current?.focus()],
    [
      "alt+c",
      () => {
        onClear();
        setValue("");
      },
    ],
  ]);

  const handleSearch = useCallback(() => {
    if (value.length > 0) {
      fetcher(value).then((res) => {
        if (!!res && Array.isArray(res)) {
          onSearchResults(res);
        }
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value, fetcher]);

  useEffect(() => {
    if (value.length % 3 === 0) handleSearch();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  let data = searchResults?.map((item: any) => ({
    label: item.title,
    value: item._id,
  }));

  return (
    <>
      <Autocomplete
        icon={<IconSearch />}
        className={classes.search}
        sx={{
          flexGrow: 1,
          marginRight: !isMobile ? 60 : 15,
        }}
        value={value}
        onChange={setValue}
        placeholder={intl.formatMessage({ id: "search" })}
        data={data}
        ref={autoCompleteRef}
        rightSection={
          <Button.Group>
            <Tooltip label={intl.formatMessage({ id: "clear" })}>
              <Button
                variant="subtle"
                color={"red"}
                onClick={() => {
                  onClear();
                  setValue("");
                }}
              >
                X
              </Button>
            </Tooltip>
            <Button onClick={handleSearch}>
              <IconSearch />
            </Button>
          </Button.Group>
        }
      />
    </>
  );
}

export default SearchAutoComplete;
