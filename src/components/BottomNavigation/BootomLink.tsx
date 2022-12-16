import { Box, Text } from "@mantine/core";
import data from "@modules/layout/dataSidebar";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { FormattedMessage } from "react-intl";

import BottomStyle from "./BottomStyle";

const activeStyle = {
  background: "#1864AB",
  color: "white",
};
const BootomLink: React.FC<{
  setOpened: any;
}> = ({ setOpened }) => {
  const { classes, cx } = BottomStyle();
  const router = useRouter();
  const [activeId, setActiveId] = useState(null);
  function add({ id }: any) {
    setActiveId(id);
    setOpened(false);
  }
  const links = data.map((item: any) => {
    return (
      <Box key={item.label}>
        <Link
          href={item.link}
          style={item.id === activeId ? activeStyle : {}}
          onClick={() => add(item.id)}
          className={cx(classes.link, {
            linkActive: item.link === router.pathname,
          })}
        >
          <item.icon stroke={1.5} />
          <Text style={{ marginLeft: "12px" }}>
            <FormattedMessage id={item.label} />
          </Text>
        </Link>
      </Box>
    );
  });
  return <>{links}</>;
};

export default BootomLink;
