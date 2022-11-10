import { Text } from "@mantine/core";

type Props = {
  name: string;
};

const PermissionText = (props: Props) => {
  return <Text style={{marginTop:-25, color:"gray"}}>{props.name}</Text>;
};

export default PermissionText;
