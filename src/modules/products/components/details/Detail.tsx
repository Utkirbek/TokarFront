import {
  Box,
  Button,
  Card,
  Group,
  Image,
  Modal,
  NumberInput,
  Select,
  Table,
  Text,
} from "@mantine/core";
import { IconChevronDown } from "@tabler/icons";
import { useState } from "react";

import useStyles from "./styleDetail/styleDetail";

const Detail: React.FC<{
  infoProduct: any;
}> = ({ infoProduct }) => {
  const { classes, cx } = useStyles();
  const [opened, setOpened] = useState(false);

  // const rows = infoProduct.map((infoProduct) => (

  // ));
  return (
    <>
      <Modal size="90%" opened={opened} onClose={() => setOpened(false)}>
        <Box className={classes.imageGroup}>
          <Box className={classes.imageBig}></Box>
          <Box className={classes.imageSmallGroup}>
            <Box className={classes.imageSmall}></Box>
          </Box>
        </Box>
        <Box>
          <Card shadow="sm" p="lg" radius="md">
            <Card.Section>
              <Table
                highlightOnHover
                withColumnBorders
                my={"20px"}
                sx={{ textAlign: "center" }}>
                <thead>
                  <tr>
                    <th>Mahsulot Nomi</th>
                    <th>Mahsulot Kodi</th>
                    <th>Asl Narxi </th>
                    <th>Sotuvdagi Narxi </th>
                    <th>Qaysi Valyutada sotib olingani</th>
                    <th>Ombordagi Soni</th>
                    <th>Sotilgan Vaqti</th>
                    <th>Yangilangan Vaqti</th>
                    <th>Tarifi</th>
                  </tr>
                </thead>
                <tbody>
                  <tr key={infoProduct.name}>
                    <td>{infoProduct.position}</td>
                    <td>{infoProduct.name}</td>
                    <td>{infoProduct.name}</td>
                    <td>{infoProduct.position}</td>
                    <td>{infoProduct.name}</td>
                    <td>{infoProduct.name}</td>
                    <td>{infoProduct.symbol}</td>
                    <td>{infoProduct.mass}</td>
                  </tr>
                </tbody>
              </Table>
            </Card.Section>
          </Card>
        </Box>
      </Modal>

      <Group position="center">
        <Button
          variant="outline"
          sx={{ width: "100px", height: "30px" }}
          radius={"xl"}
          onClick={() => setOpened(true)}>
          Batafsil
        </Button>
      </Group>
    </>
  );
};

export default Detail;