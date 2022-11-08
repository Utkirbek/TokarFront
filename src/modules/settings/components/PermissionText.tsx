import { Text } from "@mantine/core";

type Props = {
  name: string;
};

const PermissionText = (props: Props) => {
  return <Text>{props.name}</Text>;
};

export default PermissionText;
