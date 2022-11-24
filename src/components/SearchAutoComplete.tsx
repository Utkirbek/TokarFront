import { Autocomplete, Button, Tooltip } from "@mantine/core";
import { IconSquareLetterX } from "@tabler/icons";
import { useCallback, useEffect, useState } from "react";
import { FormattedMessage, useIntl } from "react-intl";

type Props = {
  onSearchResults: (value: any) => void;
  searchResults: any;
  fetcher: (value: string) => Promise<any>;
  onClear: () => void;
};

function SearchAutoComplete({
  onSearchResults,
  fetcher,
  searchResults,
  onClear,
}: Props) {
  const [value, setValue] = useState("");
  const intl = useIntl();

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
        sx={{ flexGrow: 1, marginRight: 80 }}
        value={value}
        onChange={setValue}
        placeholder="Start typing to see options"
        data={data}
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
                <IconSquareLetterX color="red" />
              </Button>
            </Tooltip>
            <Button onClick={handleSearch}>
              <FormattedMessage id="search" />
            </Button>
          </Button.Group>
        }
      />
    </>
  );
}

export default SearchAutoComplete;
