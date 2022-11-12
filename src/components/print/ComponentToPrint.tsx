import { Box, Table, Text } from "@mantine/core";
import Link from "next/link";
import React from "react";

type Props = {};

const ComponentToPrint = React.forwardRef((props: Props, ref: any) => {
  const ths = (
    <tr>
      <th>Element name</th>
      <th>Symbol</th>
      <th>Atomic mass</th>
    </tr>
  );

  const rows = new Array(4).fill(0).map((element, i) => (
    <tr key={i}>
      <td>Test {i}</td>
      <td>Test {i}</td>
      <td>Test {i}</td>
    </tr>
  ));

  return (
    <Box ref={ref}>
      <h1>Maxsulotlar!</h1>
      <Table captionSide="bottom">
        <caption>Some elements from periodic table</caption>
        <thead>{ths}</thead>
        <tbody>{rows}</tbody>
        <tfoot>{ths}</tfoot>
      </Table>
      <Text>The app is developed by Tespen</Text>{" "}
      <Link href={"https://tespen.uz"}>Tespen.uz</Link>
      Install the app at Playstore
    </Box>
  );
});

ComponentToPrint.displayName = "ComponentToPrint";

export default ComponentToPrint;
