import { Button, Group,Modal } from "@mantine/core";
import { useState } from "react";

const Detail = () => {
  const [opened, setOpened] = useState(false);

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => setOpened(true)}
        title="Introduce yourself!">
        {/* Modal content */}
      </Modal>
    </>
  );
};

export default Detail;
